'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { RatingStars } from './RatingStars';

export interface ReviewData {
  id: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  unhelpful: number;
  isVerified: boolean;
  createdAt: string;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

interface ReviewCardProps {
  review: ReviewData;
  onDelete?: (reviewId: string) => void;
  onHelpful?: (reviewId: string) => void;
  onUnhelpful?: (reviewId: string) => void;
  currentUserId?: string;
  isAdmin?: boolean;
}

/**
 * Format date to relative time (e.g., "2 days ago")
 */
const formatTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return `${Math.floor(seconds / 2592000)}mo ago`;
};

/**
 * Review card component displaying individual review
 */
export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onDelete,
  onHelpful,
  onUnhelpful,
  currentUserId,
  isAdmin = false,
}) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [unhelpfulCount, setUnhelpfulCount] = useState(review.unhelpful);
  const [userHelpfulVote, setUserHelpfulVote] = useState<boolean | null>(null);

  const handleHelpful = () => {
    setHelpfulCount(prev => prev + 1);
    setUserHelpfulVote(true);
    onHelpful?.(review.id);
  };

  const handleUnhelpful = () => {
    setUnhelpfulCount(prev => prev + 1);
    setUserHelpfulVote(false);
    onUnhelpful?.(review.id);
  };

  const isOwnReview = currentUserId === review.reviewer.id;
  const timeAgo = formatTimeAgo(review.createdAt);

  return (
    <div className="p-4 border-b border-[#E8E1D7] last:border-b-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          {review.reviewer.avatar ? (
            <Image
              src={review.reviewer.avatar}
              alt={review.reviewer.firstName}
              width={40}
              height={40}
              unoptimized
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#E8E1D7] flex items-center justify-center">
              <span className="text-sm font-semibold text-[#7A6E60]">
                {review.reviewer.firstName?.[0]}
                {review.reviewer.lastName?.[0]}
              </span>
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-[#1C1A17]">
                {review.reviewer.firstName} {review.reviewer.lastName}
              </h4>
              {review.isVerified && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Verified Buyer
                </span>
              )}
            </div>
            <p className="text-xs text-[#7A6E60]">{timeAgo}</p>
          </div>
        </div>

        {(isOwnReview || isAdmin) && onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="p-2 hover:bg-red-50 rounded-lg transition"
            title="Delete review"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        )}
      </div>

      {/* Rating & Title */}
      <div className="mb-3">
        <RatingStars rating={review.rating} size="sm" showLabel={false} />
        <h5 className="font-semibold text-[#1C1A17] mt-2">{review.title}</h5>
      </div>

      {/* Content */}
      <p className="text-[#7A6E60] text-sm mb-4 leading-relaxed">
        {review.content}
      </p>

      {/* Helpful/Unhelpful Votes */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleHelpful}
          disabled={userHelpfulVote !== null}
          className={`flex items-center gap-1 text-sm transition ${
            userHelpfulVote === true
              ? 'text-green-600'
              : 'text-[#7A6E60] hover:text-[#1C1A17]'
          } disabled:opacity-50`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>{helpfulCount}</span>
        </button>

        <button
          onClick={handleUnhelpful}
          disabled={userHelpfulVote !== null}
          className={`flex items-center gap-1 text-sm transition ${
            userHelpfulVote === false
              ? 'text-red-600'
              : 'text-[#7A6E60] hover:text-[#1C1A17]'
          } disabled:opacity-50`}
        >
          <ThumbsDown className="w-4 h-4" />
          <span>{unhelpfulCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
