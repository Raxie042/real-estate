'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { RatingStars } from './RatingStars';
import { ReviewCard, ReviewData } from './ReviewCard';
import { ReviewForm } from './ReviewForm';
import { useAuth } from '@/lib/auth-context';
import axios from 'axios';

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

interface PropertyReviewsProps {
  listingId: string;
  onlyShowReviews?: boolean;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

/**
 * Component displaying property reviews with statistics
 */
export const PropertyReviews: React.FC<PropertyReviewsProps> = ({
  listingId,
  onlyShowReviews = false,
}) => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const loadReviews = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `/reviews/listing/${listingId}?page=${currentPage}&limit=10`
      );
      setReviews(response.data.data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setIsLoading(false);
    }
  }, [listingId, currentPage]);

  const loadStats = useCallback(async () => {
    try {
      const response = await apiClient.get(
        `/reviews/listing/${listingId}/stats`
      );
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load review stats:', error);
    }
  }, [listingId]);

  useEffect(() => {
    loadReviews();
    loadStats();
  }, [loadReviews, loadStats]);

  const handleSubmitReview = async (data: {
    rating: number;
    title: string;
    content: string;
  }) => {
    if (!user) {
      alert('Please log in to submit a review');
      return false;
    }

    setIsSubmitting(true);
    try {
      await apiClient.post('/reviews', {
        reviewerId: user.id,
        listingId,
        rating: data.rating,
        title: data.title,
        content: data.content,
      });

      setShowForm(false);
      await loadReviews();
      await loadStats();
      return true;
    } catch (error) {
      console.error('Failed to submit review:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      await apiClient.delete(`/reviews/${reviewId}?userId=${user?.id}`);
      await loadReviews();
      await loadStats();
    } catch (error) {
      console.error('Failed to delete review:', error);
      alert('Failed to delete review');
    }
  };

  const handleHelpful = async (reviewId: string) => {
    try {
      await apiClient.post(`/reviews/${reviewId}/helpful`);
    } catch (error) {
      console.error('Failed to mark as helpful:', error);
    }
  };

  const handleUnhelpful = async (reviewId: string) => {
    try {
      await apiClient.post(`/reviews/${reviewId}/unhelpful`);
    } catch (error) {
      console.error('Failed to mark as unhelpful:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-[#1C1A17]">Reviews</h2>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B8956A] transition"
          >
            {showForm ? 'Cancel' : 'Write Review'}
          </button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          listingId={listingId}
          onSubmit={handleSubmitReview}
          onCancel={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {/* Statistics */}
      {stats && stats.totalReviews > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-[#FDFBF7] rounded-lg border border-[#E8E1D7]">
          {/* Overall Rating */}
          <div className="flex items-start gap-6">
            <div>
              <div className="text-5xl font-bold text-[#C9A96A]">
                {stats.averageRating.toFixed(1)}
              </div>
              <RatingStars rating={Math.round(stats.averageRating)} showLabel={false} />
              <p className="text-sm text-[#7A6E60] mt-2">
                Based on {stats.totalReviews} reviews
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#1C1A17] w-10">
                  {star} ★
                </span>
                <div className="flex-1 h-2 bg-[#E8E1D7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A96A] transition-all"
                    style={{
                      width: `${(stats.ratingDistribution[star as keyof typeof stats.ratingDistribution] / stats.totalReviews) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-[#7A6E60] w-10">
                  {stats.ratingDistribution[star as keyof typeof stats.ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Login Prompt */}
      {!user && !onlyShowReviews && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <a href="/login" className="font-semibold hover:underline">
              Log in
            </a>
            {' '}to write a review
          </p>
        </div>
      )}

      {/* Reviews List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="spinner" />
          <p className="text-[#7A6E60] mt-2">Loading reviews...</p>
        </div>
      ) : reviews.length > 0 ? (
        <div className="border border-[#E8E1D7] rounded-lg overflow-hidden">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onDelete={user?.id === review.reviewer.id ? handleDeleteReview : undefined}
              onHelpful={handleHelpful}
              onUnhelpful={handleUnhelpful}
              currentUserId={user?.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-[#7A6E60]">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
};

export default PropertyReviews;
