'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const cities = [
  {
    name: 'London',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=90',
    description: 'Global Gateway',
    listings: '2,341'
  },
  {
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=90',
    description: 'Manhattan & Beyond',
    listings: '1,892'
  },
  {
    name: 'Miami',
    image: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800&q=90',
    description: 'Coastal Elegance',
    listings: '1,567'
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=90',
    description: 'City of Light',
    listings: '987'
  },
  {
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=90',
    description: 'Modern Luxury',
    listings: '1,234'
  },
  {
    name: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=800&q=90',
    description: 'California Dreams',
    listings: '2,109'
  },
];

export default function PopularCities() {
  const t = useTranslations('Home');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  return (
    <div className="bg-[#F8F6F3] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1A17] mb-4 lux-heading">
            {t('citiesTitle')}
          </h2>
          <p className="text-lg text-[#6E6255] font-light">
            {t('citiesSubtitle')}
          </p>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/search?location=${city.name}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] block lux-card"
              onMouseEnter={() => setHoveredCity(city.name)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${city.image})`
                }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className={`transform transition-all duration-500 ${
                  hoveredCity === city.name ? 'translate-y-0' : 'translate-y-2'
                }`}>
                  <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-2 font-light">
                    {city.description}
                  </p>
                  <h3 className="text-4xl font-light text-white mb-3">
                    {city.name}
                  </h3>
                  <div className="flex items-center text-white/90">
                    <span className="text-sm font-light">{city.listings} {t('propertiesLabel')}</span>
                    <svg 
                      className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${
                        hoveredCity === city.name ? 'translate-x-2' : 'translate-x-0'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-[#C9A96A]/20 transition-opacity duration-300 ${
                hoveredCity === city.name ? 'opacity-100' : 'opacity-0'
              }`} />
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            href="/search" 
            className="inline-flex items-center lux-button-outline group"
          >
            {t('viewAllLocations')}
            <svg 
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
