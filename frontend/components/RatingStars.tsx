'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * Interactive rating stars component
 */
export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  onRatingChange,
  interactive = false,
  size = 'md',
  showLabel = true,
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => {
              if (interactive && onRatingChange) {
                onRatingChange(star);
              }
            }}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`transition-transform ${
              interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'
            }`}
            disabled={!interactive}
          >
            <Star
              className={`${sizeMap[size]} ${
                star <= displayRating
                  ? 'fill-[#C9A96A] text-[#C9A96A]'
                  : 'text-[#E8E1D7]'
              } transition-colors`}
            />
          </button>
        ))}
      </div>

      {showLabel && (
        <span className="text-sm font-medium text-[#1C1A17]">
          {displayRating > 0 ? displayRating : rating}
          <span className="text-[#7A6E60]"> / 5</span>
        </span>
      )}
    </div>
  );
};

export default RatingStars;
