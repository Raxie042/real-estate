import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  ListingReportStatus,
  ListingStatus,
  ListingType,
  PropertySubType,
  PropertyType,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ListingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    status?: ListingStatus;
    listingType?: ListingType;
    propertyType?: PropertyType;
    propertySubType?: PropertySubType;
    city?: string;
    state?: string;
    country?: string;
    neighborhoods?: string[];
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minBathrooms?: number;
    sort?: string;
    search?: string;
  }) {
    const {
      page = 1,
      limit = 20,
      status = 'ACTIVE',
      listingType,
      propertyType,
      propertySubType,
      city,
      state,
      country,
      neighborhoods,
      minPrice,
      maxPrice,
      minBedrooms,
      minBathrooms,
      sort = 'createdAt',
      search,
    } = params;

    if (page < 1 || limit < 1 || limit > 100) {
      throw new BadRequestException('Invalid pagination parameters');
    }

    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
    };

    if (status) where.status = status;
    if (listingType) where.listingType = listingType;
    if (propertyType) where.propertyType = propertyType;
    if (propertySubType) where.propertySubType = propertySubType;
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (state) where.state = { contains: state, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };

    const normalizedNeighborhoods = (neighborhoods || [])
      .map((value) => value?.trim())
      .filter(Boolean) as string[];

    if (normalizedNeighborhoods.length > 0) {
      const neighborhoodOrFilters = normalizedNeighborhoods.flatMap((neighborhood) => [
        { addressLine1: { contains: neighborhood, mode: 'insensitive' } },
        { addressLine2: { contains: neighborhood, mode: 'insensitive' } },
        { title: { contains: neighborhood, mode: 'insensitive' } },
        { description: { contains: neighborhood, mode: 'insensitive' } },
      ]);

      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: neighborhoodOrFilters }];
        delete where.OR;
      } else {
        where.OR = neighborhoodOrFilters;
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = new Decimal(minPrice);
      if (maxPrice) where.price.lte = new Decimal(maxPrice);
    }

    // Bedrooms filter
    if (minBedrooms) where.bedrooms = { gte: minBedrooms };

    // Bathrooms filter
    if (minBathrooms) where.bathrooms = { gte: new Decimal(minBathrooms) };

    // Full text search
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { addressLine1: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Determine sort order
    const orderBy: any = {};
    switch (sort) {
      case 'price-asc':
        orderBy.price = 'asc';
        break;
      case 'price-desc':
        orderBy.price = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'oldest':
        orderBy.createdAt = 'asc';
        break;
      case 'popular':
        orderBy.viewCount = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              avatar: true,
            },
          },
          agency: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
        orderBy,
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      data: listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        agency: true,
        favorites: {
          select: { userId: true },
        },
      },
    });

    if (!listing || listing.deletedAt) {
      throw new NotFoundException('Listing not found');
    }

    // Increment view count asynchronously
    this.prisma.listing
      .update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      })
      .catch(() => {
        // Silently fail if view count update fails
      });

    return listing;
  }

  async getListingAnalytics(listingId: string, userId: string, timeRange: string = '30d') {
    // Verify ownership
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { userId: true, viewCount: true, inquiryCount: true },
    });

    if (!listing || listing.userId !== userId) {
      throw new NotFoundException('Unauthorized or listing not found');
    }

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(0); // All time
    }

    // Get viewing history
    const views = await this.prisma.viewingHistory.findMany({
      where: {
        listingId,
        viewedAt: { gte: startDate },
      },
      orderBy: { viewedAt: 'asc' },
    });

    // Calculate unique visitors
    const uniqueVisitorIds = new Set(views.filter((v) => v.userId).map((v) => v.userId));
    const uniqueIps = new Set(views.filter((v) => v.ipAddress).map((v) => v.ipAddress));
    const uniqueVisitors = Math.max(uniqueVisitorIds.size, uniqueIps.size);

    // Calculate average duration
    const durationsWithValue = views.filter((v) => v.duration && v.duration > 0);
    const avgDuration =
      durationsWithValue.length > 0
        ? durationsWithValue.reduce((sum, v) => sum + (v.duration || 0), 0) /
          durationsWithValue.length
        : 0;

    // Get favorites count
    const favoritesCount = await this.prisma.favorite.count({
      where: { listingId },
    });

    // Get referrers
    const referrers = views
      .filter((v) => v.referrer)
      .reduce(
        (acc, v) => {
          const ref = v.referrer || 'Direct';
          acc[ref] = (acc[ref] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

    const topReferrers = Object.entries(referrers)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      views: views.map((v) => ({
        date: v.viewedAt,
        count: 1,
      })),
      totalViews: listing.viewCount,
      uniqueVisitors,
      avgDuration: Math.round(avgDuration),
      favorites: favoritesCount,
      inquiries: listing.inquiryCount,
      topReferrers,
    };
  }

  async findBySlug(slug: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
        agency: true,
        favorites: {
          select: { userId: true },
        },
      },
    });

    if (!listing || listing.deletedAt) {
      throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async findByUserId(
    userId: string,
    params: { page?: number; limit?: number; status?: ListingStatus } = {},
  ) {
    const { page = 1, limit = 20, status } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      userId,
      deletedAt: null,
    };

    if (status) where.status = status;

    const [listings, total] = await Promise.all([
      this.prisma.listing.findMany({
        where,
        skip,
        take: limit,
        include: {
          agency: {
            select: { id: true, name: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.listing.count({ where }),
    ]);

    return {
      data: listings,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async create(userId: string, data: any) {
    if (!data.title || !data.price || !data.city || !data.country) {
      throw new BadRequestException('Missing required fields: title, price, city, country');
    }

    // Generate unique slug
    const slug = await this.generateUniqueSlug(data.title);

    return this.prisma.listing.create({
      data: {
        ...data,
        slug,
        userId,
        status: data.status || 'DRAFT',
        price: new Decimal(data.price),
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async update(id: string, userId: string, data: any) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { userId: true, slug: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.userId !== userId) {
      throw new ForbiddenException('You can only edit your own listings');
    }

    // If title changed, update slug
    let slug = listing.slug;
    if (data.title && data.title !== listing.slug) {
      slug = await this.generateUniqueSlug(data.title);
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        ...data,
        slug,
        price: data.price ? new Decimal(data.price) : undefined,
      },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.userId !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    return this.prisma.listing.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async publish(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.userId !== userId) {
      throw new ForbiddenException('You can only publish your own listings');
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        status: 'ACTIVE',
        publishedAt: new Date(),
      },
    });
  }

  async incrementInquiryCount(id: string) {
    return this.prisma.listing.update({
      where: { id },
      data: { inquiryCount: { increment: 1 } },
    });
  }

  async reportListing(
    listingId: string,
    reporterId: string,
    data: { reason: string; details?: string },
  ) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
      select: { id: true, userId: true, deletedAt: true },
    });

    if (!listing || listing.deletedAt) {
      throw new NotFoundException('Listing not found');
    }

    const existingPendingReport = await this.prisma.listingReport.findFirst({
      where: {
        listingId,
        reporterId,
        status: { in: ['PENDING', 'REVIEWING'] },
      },
    });

    if (existingPendingReport) {
      throw new BadRequestException('You already have an active report for this listing');
    }

    return this.prisma.listingReport.create({
      data: {
        listingId,
        reporterId,
        reason: data.reason,
        details: data.details,
        status: 'PENDING',
      },
    });
  }

  async getReportsQueue(params: {
    status?: ListingReportStatus;
    page?: number;
    limit?: number;
  }) {
    const { status = 'PENDING', page = 1, limit = 20 } = params;
    const skip = (page - 1) * limit;

    const where = { status };

    const [reports, total] = await Promise.all([
      this.prisma.listingReport.findMany({
        where,
        skip,
        take: limit,
        include: {
          listing: {
            select: {
              id: true,
              title: true,
              slug: true,
              status: true,
              isVerified: true,
              city: true,
              country: true,
              userId: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.listingReport.count({ where }),
    ]);

    return {
      data: reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async reviewListingReport(
    reportId: string,
    reviewerId: string,
    data: {
      decision: 'RESOLVED' | 'REJECTED';
      notes?: string;
      markListingVerified?: boolean;
      suspendListing?: boolean;
    },
  ) {
    const report = await this.prisma.listingReport.findUnique({
      where: { id: reportId },
      include: { listing: { select: { id: true, status: true } } },
    });

    if (!report) {
      throw new NotFoundException('Report not found');
    }

    if (report.status === 'RESOLVED' || report.status === 'REJECTED') {
      throw new BadRequestException('Report has already been reviewed');
    }

    const updatedReport = await this.prisma.listingReport.update({
      where: { id: reportId },
      data: {
        status: data.decision,
        reviewedById: reviewerId,
        reviewedAt: new Date(),
        reviewNotes: data.notes,
      },
    });

    if (data.markListingVerified) {
      await this.prisma.listing.update({
        where: { id: report.listingId },
        data: {
          isVerified: true,
          verifiedAt: new Date(),
          verifiedById: reviewerId,
        },
      });
    }

    if (data.suspendListing && data.decision === 'RESOLVED') {
      await this.prisma.listing.update({
        where: { id: report.listingId },
        data: { status: 'WITHDRAWN' },
      });
    }

    return updatedReport;
  }

  async setListingVerification(listingId: string, reviewerId: string, isVerified: boolean) {
    const listing = await this.prisma.listing.findUnique({ where: { id: listingId } });

    if (!listing || listing.deletedAt) {
      throw new NotFoundException('Listing not found');
    }

    return this.prisma.listing.update({
      where: { id: listingId },
      data: {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
        verifiedById: isVerified ? reviewerId : null,
      },
    });
  }

  async unpublish(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.userId !== userId) {
      throw new ForbiddenException('You can only unpublish your own listings');
    }

    return this.prisma.listing.update({
      where: { id },
      data: {
        status: 'DRAFT',
      },
    });
  }

  async getListingStats(userId: string) {
    const [total, active, draft, sold] = await Promise.all([
      this.prisma.listing.count({ where: { userId, deletedAt: null } }),
      this.prisma.listing.count({ where: { userId, status: 'ACTIVE', deletedAt: null } }),
      this.prisma.listing.count({ where: { userId, status: 'DRAFT', deletedAt: null } }),
      this.prisma.listing.count({ where: { userId, status: 'SOLD', deletedAt: null } }),
    ]);

    return { total, active, draft, sold };
  }

  private async generateUniqueSlug(title: string): Promise<string> {
    const slug = this.generateSlugFromTitle(title);
    let count = 0;
    let finalSlug = slug;

    while (await this.prisma.listing.findUnique({ where: { slug: finalSlug } })) {
      count++;
      finalSlug = `${slug}-${count}`;
    }

    return finalSlug;
  }

  private generateSlugFromTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
