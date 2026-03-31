'use client';

import React, { useState } from 'react';
import { RatingStars } from './RatingStars';
import { Loader } from 'lucide-react';

interface ReviewFormProps {
  listingId?: string;
  agentId?: string;
  onSubmit: (data: {
    rating: number;
    title: string;
    content: string;
  }) => Promise<boolean>;
  onCancel?: () => void;
  isLoading?: boolean;
}

/**
 * Form for submitting a new review
 */
export const ReviewForm: React.FC<ReviewFormProps> = ({
  listingId,
  agentId,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }

    if (!content.trim() || content.length < 10) {
      setError('Please write at least 10 characters in your review');
      return;
    }

    try {
      const success = await onSubmit({
        rating,
        title: title.trim(),
        content: content.trim(),
      });

      if (success) {
        setSubmitted(true);
        setRating(0);
        setTitle('');
        setContent('');

        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError('Failed to submit review. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (submitted) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
        <p className="text-green-700 font-semibold">✅ Review submitted successfully!</p>
        <p className="text-sm text-green-600 mt-1">
          Thank you for your feedback. Your review will be displayed after moderation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-[#FDFBF7] rounded-lg border border-[#E8E1D7]">
      <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Share Your Experience</h3>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-[#1C1A17] mb-2">
          Your Rating *
        </label>
        <RatingStars
          rating={rating}
          onRatingChange={setRating}
          interactive={true}
          size="lg"
          showLabel={true}
        />
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[#1C1A17] mb-2">
          Review Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Great property, amazing agent!"
          maxLength={150}
          className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg text-[#1C1A17] placeholder-[#A39F95] focus:outline-none focus:border-[#C9A96A]"
        />
        <p className="text-xs text-[#7A6E60] mt-1">{title.length}/150 characters</p>
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-[#1C1A17] mb-2">
          Your Review * (minimum 10 characters)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share details about your experience..."
          rows={4}
          maxLength={1000}
          className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg text-[#1C1A17] placeholder-[#A39F95] focus:outline-none focus:border-[#C9A96A] resize-none"
        />
        <p className="text-xs text-[#7A6E60] mt-1">
          {content.length}/1000 characters
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition disabled:opacity-50"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isLoading || !rating}
          className="flex-1 px-4 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B8956A] transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
