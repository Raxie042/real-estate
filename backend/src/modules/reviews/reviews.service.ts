import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(data: {
    reviewerId: string;
    listingId?: string;
    agentId?: string;
    rating: number;
    title: string;
    content: string;
    transactionId?: string;
  }) {
    return this.prisma.review.create({
      data: {
        reviewerId: data.reviewerId,
        listingId: data.listingId,
        agentId: data.agentId,
        rating: data.rating,
        title: data.title,
        content: data.content,
        transactionId: data.transactionId,
        isApproved: true, // Auto-approve for now
        isVerified: true,
      },
      include: {
        reviewer: { select: { id: true, firstName: true, lastName: true } },
        listing: { select: { id: true, title: true } },
        agent: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }

  async getListingReviews(listingId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { listingId, isApproved: true },
        include: {
          reviewer: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.review.count({ where: { listingId, isApproved: true } }),
    ]);

    return {
      data: reviews,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async getListingReviewStats(listingId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { listingId, isApproved: true },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;

    const ratingBreakdown = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingBreakdown,
    };
  }

  async getAgentReviews(agentId: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { agentId, isApproved: true },
        include: {
          reviewer: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.review.count({ where: { agentId, isApproved: true } }),
    ]);

    return {
      data: reviews,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async getAgentReviewStats(agentId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { agentId, isApproved: true },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;

    const ratingBreakdown = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      ratingBreakdown,
    };
  }

  async markHelpful(reviewId: string, userId?: string) {
    void userId;
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { helpful: { increment: 1 } },
    });
  }

  async markUnhelpful(reviewId: string, userId?: string) {
    void userId;
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { unhelpful: { increment: 1 } },
    });
  }

  async deleteReview(reviewId: string, userId: string) {
    // Only allow deletion by reviewer or admin (simplified check)
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (review && review.reviewerId !== userId) {
      throw new Error('Unauthorized');
    }

    return this.prisma.review.delete({
      where: { id: reviewId },
    });
  }

  async getPendingReviews(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { isApproved: false },
        include: {
          reviewer: { select: { id: true, firstName: true, lastName: true } },
          listing: { select: { id: true, title: true } },
          agent: { select: { id: true, firstName: true, lastName: true } },
        },
        orderBy: { createdAt: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.review.count({ where: { isApproved: false } }),
    ]);

    return {
      data: reviews,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    };
  }

  async updateReviewStatus(reviewId: string, approved: boolean) {
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { isApproved: approved },
      include: {
        reviewer: { select: { id: true, firstName: true, lastName: true } },
      },
    });
  }
}
