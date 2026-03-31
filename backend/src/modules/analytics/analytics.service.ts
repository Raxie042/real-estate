import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async trackView(listingId: string, userId?: string, metadata?: any) {
    return this.prisma.viewingHistory.create({
      data: {
        listingId,
        userId,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
        referrer: metadata?.referrer,
      },
    });
  }

  async getListingAnalytics(listingId: string) {
    const [listing, viewHistory] = await Promise.all([
      this.prisma.listing.findUnique({
        where: { id: listingId },
        select: {
          viewCount: true,
          inquiryCount: true,
        },
      }),
      this.prisma.viewingHistory.groupBy({
        by: ['viewedAt'],
        where: { listingId },
        _count: true,
      }),
    ]);

    return {
      totalViews: listing?.viewCount || 0,
      totalInquiries: listing?.inquiryCount || 0,
      viewHistory,
    };
  }

  async getUserAnalytics(userId: string) {
    const [listings, favorites, searches] = await Promise.all([
      this.prisma.listing.count({
        where: { userId, deletedAt: null },
      }),
      this.prisma.favorite.count({
        where: { userId },
      }),
      this.prisma.savedSearch.count({
        where: { userId },
      }),
    ]);

    return {
      totalListings: listings,
      totalFavorites: favorites,
      totalSavedSearches: searches,
    };
  }
}
