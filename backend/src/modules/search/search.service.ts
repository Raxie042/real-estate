import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calculate distance between two coordinates using Haversine formula
   * Returns distance in kilometers
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Search listings by radius from a point
   * Returns results with calculated distance from search point
   */
  async searchByRadius(params: {
    latitude: number;
    longitude: number;
    radiusKm: number;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    listingType?: string;
    sortBy?: 'distance' | 'price' | 'newest';
  }) {
    const {
      latitude,
      longitude,
      radiusKm,
      page = 1,
      limit = 20,
      minPrice,
      maxPrice,
      propertyType,
      listingType,
      sortBy = 'distance',
    } = params;

    if (!latitude || !longitude || !radiusKm) {
      throw new BadRequestException('latitude, longitude, and radiusKm are required');
    }

    if (radiusKm <= 0 || radiusKm > 500) {
      throw new BadRequestException('radiusKm must be between 1 and 500');
    }

    const skip = (page - 1) * limit;

    // Convert radius in km to degrees (approximate)
    // 1 degree ≈ 111 km
    const radiusDegrees = radiusKm / 111;

    const where: any = {
      deletedAt: null,
      status: 'ACTIVE',
      latitude: { gte: latitude - radiusDegrees, lte: latitude + radiusDegrees },
      longitude: { gte: longitude - radiusDegrees, lte: longitude + radiusDegrees },
    };

    if (minPrice) where.price = { ...where.price, gte: new Decimal(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: new Decimal(maxPrice) };
    if (propertyType) where.propertyType = propertyType;
    if (listingType) where.listingType = listingType;

    // First get all listings within approximate bounding box
    const listings = await this.prisma.listing.findMany({
      where,
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
    });

    // Calculate distances and filter results within radius
    const resultsWithDistance = listings
      .map((listing) => ({
        ...listing,
        distance: this.calculateDistance(latitude, longitude, listing.latitude, listing.longitude),
      }))
      .filter((listing) => listing.distance <= radiusKm);

    // Sort results
    let sorted = resultsWithDistance;
    if (sortBy === 'distance') {
      sorted = resultsWithDistance.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === 'price') {
      sorted = resultsWithDistance.sort((a, b) => a.price.toNumber() - b.price.toNumber());
    } else if (sortBy === 'newest') {
      sorted = resultsWithDistance.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }

    // Paginate
    const total = sorted.length;
    const paginatedResults = sorted.slice(skip, skip + limit);

    return {
      data: paginatedResults,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      searchParams: {
        latitude,
        longitude,
        radiusKm,
      },
    };
  }

  /**
   * Search listings within a bounding box
   */
  async searchByBounds(params: {
    north: number;
    south: number;
    east: number;
    west: number;
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    propertyType?: string;
    listingType?: string;
    sortBy?: 'price' | 'newest' | 'popular';
  }) {
    const {
      north,
      south,
      east,
      west,
      page = 1,
      limit = 20,
      minPrice,
      maxPrice,
      propertyType,
      listingType,
      sortBy = 'newest',
    } = params;

    if (!north || !south || !east || !west) {
      throw new BadRequestException('north, south, east, and west bounds are required');
    }

    if (north < south || east < west) {
      throw new BadRequestException('Invalid bounds: north > south and east > west required');
    }

    const skip = (page - 1) * limit;

    const where: any = {
      deletedAt: null,
      status: 'ACTIVE',
      latitude: { gte: south, lte: north },
      longitude: { gte: west, lte: east },
    };

    if (minPrice) where.price = { ...where.price, gte: new Decimal(minPrice) };
    if (maxPrice) where.price = { ...where.price, lte: new Decimal(maxPrice) };
    if (propertyType) where.propertyType = propertyType;
    if (listingType) where.listingType = listingType;

    // Determine sort order
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'popular') {
      orderBy = { viewCount: 'desc' };
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

  /**
   * Get search suggestions based on partial queries
   */
  async getSearchSuggestions(query: string) {
    if (!query || query.length < 2) {
      throw new BadRequestException('Query must be at least 2 characters');
    }

    const [cities, states, propertyTypes] = await Promise.all([
      this.prisma.listing.findMany({
        where: {
          deletedAt: null,
          city: { contains: query, mode: 'insensitive' },
        },
        select: { city: true },
        distinct: ['city'],
        take: 5,
      }),
      this.prisma.listing.findMany({
        where: {
          deletedAt: null,
          state: { contains: query, mode: 'insensitive' },
        },
        select: { state: true },
        distinct: ['state'],
        take: 5,
      }),
      this.prisma.listing.findMany({
        where: {
          deletedAt: null,
          title: { contains: query, mode: 'insensitive' },
        },
        select: { title: true },
        take: 5,
      }),
    ]);

    return {
      cities: cities.map((c) => c.city),
      states: states.map((s) => s.state),
      listings: propertyTypes.map((p) => p.title),
    };
  }

  /**
   * Advanced search with filters
   */
  async advancedSearch(params: {
    priceMin?: number;
    priceMax?: number;
    bedrooms?: number;
    bathrooms?: number;
    squareFeetMin?: number;
    squareFeetMax?: number;
    yearBuiltMin?: number;
    yearBuiltMax?: number;
    propertyTypes?: string[];
    amenities?: string[];
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: 'newest' | 'price-low' | 'price-high' | 'popular';
  }) {
    const {
      priceMin = 0,
      priceMax = 999999999,
      bedrooms,
      bathrooms,
      squareFeetMin = 0,
      squareFeetMax = 999999,
      yearBuiltMin = 1900,
      yearBuiltMax = 2026,
      propertyTypes = [],
      amenities = [],
      search,
      page = 1,
      limit = 20,
      sortBy = 'newest',
    } = params;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      deletedAt: null,
      status: 'ACTIVE',
      price: {
        gte: priceMin,
        lte: priceMax,
      },
    };

    if (bedrooms) {
      where.bedrooms = { gte: bedrooms };
    }

    if (bathrooms) {
      where.bathrooms = { gte: bathrooms };
    }

    if (propertyTypes.length > 0) {
      where.propertyType = { in: propertyTypes };
    }

    if (amenities.length > 0) {
      where.features = { hasSome: amenities };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { addressLine1: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Determine sort order
    let orderBy: any = { createdAt: 'desc' };
    if (sortBy === 'price-low') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'price-high') {
      orderBy = { price: 'desc' };
    }

    // Get total count
    const total = await this.prisma.listing.count({ where });

    // Fetch listings
    const listings = await this.prisma.listing.findMany({
      where,
      select: {
        id: true,
        title: true,
        addressLine1: true,
        city: true,
        state: true,
        price: true,
        bedrooms: true,
        bathrooms: true,
        sqft: true,
        propertyType: true,
        yearBuilt: true,
        description: true,
      },
      skip,
      take: limit,
      orderBy,
    });

    // Filter by sqft
    let filtered = listings.filter(
      (l) => !l.sqft || (l.sqft >= squareFeetMin && l.sqft <= squareFeetMax),
    );

    // Filter by year built
    filtered = filtered.filter(
      (l) => !l.yearBuilt || (l.yearBuilt >= yearBuiltMin && l.yearBuilt <= yearBuiltMax),
    );

    return {
      data: filtered,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Save a search for later
   */
  async saveSearch(userId: string, name: string, filters: Record<string, any>) {
    return this.prisma.savedSearch.create({
      data: {
        userId,
        name,
        filters,
      },
    });
  }

  /**
   * Get user's saved searches
   */
  async getSavedSearches(userId: string) {
    return this.prisma.savedSearch.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Delete a saved search
   */
  async deleteSavedSearch(searchId: string, userId: string) {
    return this.prisma.savedSearch.deleteMany({
      where: {
        id: searchId,
        userId,
      },
    });
  }

  /**
   * Run a saved search
   */
  async runSavedSearch(searchId: string, userId: string) {
    const saved = await this.prisma.savedSearch.findUnique({
      where: { id: searchId },
    });

    if (!saved || saved.userId !== userId) {
      throw new Error('Saved search not found');
    }

    return this.advancedSearch(saved.filters as any);
  }
}
