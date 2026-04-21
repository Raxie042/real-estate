import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getPlatformPerformance() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [totalUsers, totalListings, totalOffers, acceptedOffers, activeListings, viewsRecent] =
      await Promise.all([
        this.prisma.user.count({ where: { deletedAt: null } }),
        this.prisma.listing.count({ where: { deletedAt: null } }),
        this.prisma.offer.count(),
        this.prisma.offer.count({ where: { status: 'ACCEPTED' } }),
        this.prisma.listing.count({ where: { status: 'ACTIVE', deletedAt: null } }),
        this.prisma.viewingHistory.findMany({
          where: { viewedAt: { gte: thirtyDaysAgo } },
          select: { viewedAt: true },
        }),
      ]);

    const offerConversionRate = totalOffers > 0 ? (acceptedOffers / totalOffers) * 100 : 0;

    const dayBuckets: Record<string, number> = {};
    for (let i = 0; i < 30; i += 1) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      dayBuckets[key] = 0;
    }
    for (const view of viewsRecent) {
      const key = view.viewedAt.toISOString().slice(0, 10);
      if (key in dayBuckets) {
        dayBuckets[key] += 1;
      }
    }

    const trafficSeries = Object.entries(dayBuckets)
      .sort(([first], [second]) => (first < second ? -1 : 1))
      .map(([date, views]) => ({ date, views }));

    return {
      overview: {
        totalUsers,
        totalListings,
        activeListings,
        totalOffers,
        acceptedOffers,
        offerConversionRate: Number(offerConversionRate.toFixed(2)),
      },
      traffic: {
        last30DaysViews: viewsRecent.length,
        series: trafficSeries,
      },
    };
  }

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
