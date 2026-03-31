'use client';

import { useListings } from '@/lib/hooks';
import PropertyCard from '@/components/properties/PropertyCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SimilarPropertiesProps {
  currentListingId: string;
  propertyType: string;
  city: string;
}

export default function SimilarProperties({ currentListingId, propertyType, city }: SimilarPropertiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fetch listings with same property type or city, excluding current listing
  const { data: listings, isLoading } = useListings({
    propertyType,
    city,
    page: 1,
    limit: 9,
  });

  if (isLoading) {
    return (
      <div className="py-12">
        <h2 className="text-3xl font-semibold text-[#1C1A17] mb-8">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="lux-card h-96 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // Filter out current listing and limit to 6 results
  const similarListings = (listings?.data || [])
    .filter((listing: any) => listing.id !== currentListingId)
    .slice(0, 6);

  if (similarListings.length === 0) {
    return null;
  }

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, Math.ceil(similarListings.length / itemsPerPage) - 1);
  const visibleListings = similarListings.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-[#1C1A17]">Similar Properties</h2>
        
        {similarListings.length > itemsPerPage && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white border border-[#E8E1D7] hover:bg-[#F8F6F3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-[#1C1A17]" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className="p-2 rounded-full bg-white border border-[#E8E1D7] hover:bg-[#F8F6F3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-[#1C1A17]" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleListings.map((listing: any) => (
          <PropertyCard key={listing.id} listing={listing} />
        ))}
      </div>

      {similarListings.length > itemsPerPage && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-[#C9A96A] w-8' : 'bg-[#E8E1D7] hover:bg-[#C9A96A]/50'
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
