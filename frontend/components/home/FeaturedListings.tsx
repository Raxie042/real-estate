'use client';

import { useState } from 'react';
import { useListings } from '@/lib/hooks';
import PropertyCard from '../properties/PropertyCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FeaturedListings() {
  const t = useTranslations('Home');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: listings, isLoading } = useListings({
    status: 'ACTIVE',
    sort: 'newest',
    page: 1,
    limit: 60,
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#F8F6F3] to-[#F1ECE4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] mb-3">Featured</p>
            <h2 className="text-4xl font-semibold text-[#1C1A17] mb-4 lux-heading">{t('featuredLoadingTitle')}</h2>
            <p className="text-[#7A6E60] text-lg">{t('featuredLoadingSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="lux-card h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredListings = (listings?.data || []).slice(0, 15);

  if (featuredListings.length === 0) {
    return null;
  }

  const itemsPerPage = 3;
  const maxIndex = Math.max(0, Math.ceil(featuredListings.length / itemsPerPage) - 1);
  const visibleListings = featuredListings.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F6F3] to-[#F1ECE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-[#1C1A17] mb-6 tracking-tight lux-heading">{t('featuredTitle')}</h2>
          {t('featuredSubtitle') ? (
            <p className="text-[#7A6E60] text-xl max-w-2xl mx-auto">{t('featuredSubtitle')}</p>
          ) : null}
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          {featuredListings.length > itemsPerPage && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white/90 border border-[#E8E1D7] text-[#1C1A17] hover:bg-[#C9A96A] hover:border-[#C9A96A] hover:text-white shadow-lg transition-all"
                aria-label="Previous properties"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white/90 border border-[#E8E1D7] text-[#1C1A17] hover:bg-[#C9A96A] hover:border-[#C9A96A] hover:text-white shadow-lg transition-all"
                aria-label="Next properties"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Property cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleListings.map((listing: any) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>

          {/* Pagination dots */}
          {featuredListings.length > itemsPerPage && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-[#C9A96A] w-8' : 'bg-[#E8E1D7] w-2 hover:bg-[#C9A96A]/50'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <a href="/properties" className="lux-button-outline">
            {t('viewAllProperties')}
          </a>
        </div>
      </div>
    </section>
  );
}
