import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewsService) {}

  /**
   * Create a new review
   */
  @Post()
  async createReview(
    @Body()
    body: {
      reviewerId: string;
      listingId?: string;
      agentId?: string;
      rating: number;
      title: string;
      content: string;
      transactionId?: string;
    },
  ) {
    return this.reviewService.createReview(body);
  }

  /**
   * Get reviews for a listing
   */
  @Get('listing/:listingId')
  async getListingReviews(
    @Param('listingId') listingId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.reviewService.getListingReviews(listingId, parseInt(page), parseInt(limit));
  }

  /**
   * Get review statistics for a listing
   */
  @Get('listing/:listingId/stats')
  async getListingReviewStats(@Param('listingId') listingId: string) {
    return this.reviewService.getListingReviewStats(listingId);
  }

  /**
   * Get reviews for an agent
   */
  @Get('agent/:agentId')
  async getAgentReviews(
    @Param('agentId') agentId: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.reviewService.getAgentReviews(agentId, parseInt(page), parseInt(limit));
  }

  /**
   * Get review statistics for an agent
   */
  @Get('agent/:agentId/stats')
  async getAgentReviewStats(@Param('agentId') agentId: string) {
    return this.reviewService.getAgentReviewStats(agentId);
  }

  /**
   * Mark review as helpful
   */
  @Post(':reviewId/helpful')
  async markHelpful(@Param('reviewId') reviewId: string) {
    return this.reviewService.markHelpful(reviewId);
  }

  /**
   * Mark review as unhelpful
   */
  @Post(':reviewId/unhelpful')
  async markUnhelpful(@Param('reviewId') reviewId: string) {
    return this.reviewService.markUnhelpful(reviewId);
  }

  /**
   * Delete a review
   */
  @Delete(':reviewId')
  async deleteReview(@Param('reviewId') reviewId: string, @Query('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.reviewService.deleteReview(reviewId, userId);
  }

  /**
   * Get pending reviews (admin)
   */
  @Get('admin/pending')
  async getPendingReviews(@Query('page') page = '1', @Query('limit') limit = '20') {
    return this.reviewService.getPendingReviews(parseInt(page), parseInt(limit));
  }

  /**
   * Approve or reject review (admin)
   */
  @Post(':reviewId/approve')
  async approveReview(@Param('reviewId') reviewId: string, @Query('approved') approved = 'true') {
    return this.reviewService.updateReviewStatus(reviewId, approved === 'true');
  }
}
