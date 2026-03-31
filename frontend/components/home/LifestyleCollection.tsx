'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

const lifestyles = [
  {
    title: 'Waterfront Living',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=90',
    description: 'Exclusive waterfront estates and coastal residences',
    tag: 'Waterfront'
  },
  {
    title: 'Ski & Mountain',
    image: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=90',
    description: 'Alpine chalets and mountain retreats',
    tag: 'Mountain'
  },
  {
    title: 'Golf Communities',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=90',
    description: 'Premier golf course properties worldwide',
    tag: 'Golf'
  },
  {
    title: 'Island Paradises',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=90',
    description: 'Private islands and tropical escapes',
    tag: 'Island'
  },
  {
    title: 'Wine Country',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=90',
    description: 'Vineyards and estates in renowned wine regions',
    tag: 'Wine'
  },
  {
    title: 'Urban Penthouses',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=90',
    description: 'Sky-high luxury in premier cities',
    tag: 'Urban'
  },
];

const featuredDestinations = [
  {
    name: 'Caribbean',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=90',
    video:
      'https://player.vimeo.com/external/364623806.sd.mp4?s=4f5f4b49f7f5f40c8d14313f3702c4aa1e9e6fb1&profile_id=164&oauth2_token_id=57447761',
  },
  {
    name: 'French Riviera',
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=900&q=90',
  },
  {
    name: 'Tuscany',
    image: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=900&q=90',
  },
  {
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=90',
    video:
      'https://player.vimeo.com/external/434045526.sd.mp4?s=08be6f7566bbb6d6f74a09a87e237c54b4cf2d80&profile_id=164&oauth2_token_id=57447761',
  },
  {
    name: 'Aspen',
    image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=90',
  },
  {
    name: 'Monaco',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=900&q=90',
  },
  {
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=900&q=90',
  },
  {
    name: 'Santorini',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=90',
  },
];

export default function LifestyleCollection() {
  const t = useTranslations('Home');

  return (
    <div className="bg-gradient-to-b from-[#F8F6F3] to-[#F1ECE4] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1A17] mb-4 lux-heading">
            {t('lifestyleTitle')}
          </h2>
          <p className="text-lg text-[#6E6255] font-light max-w-2xl mx-auto">
            {t('lifestyleSubtitle')}
          </p>
        </div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lifestyles.map((lifestyle) => (
            <Link
              key={lifestyle.title}
              href={`/search?lifestyle=${lifestyle.tag.toLowerCase()}`}
              className="group relative overflow-hidden lux-card hover:-translate-y-0.5 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(${lifestyle.image})`
                  }}
                />
                
                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="lux-badge uppercase tracking-wider">
                    {lifestyle.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-light text-[#1C1A17] mb-2 group-hover:text-[#C9A96A] transition-colors lux-heading">
                  {lifestyle.title}
                </h3>
                <p className="text-[#6E6255] font-light leading-relaxed mb-4">
                  {lifestyle.description}
                </p>
                <div className="flex items-center text-[#C9A96A] text-sm font-medium group">
                  <span>{t('exploreCollection')}</span>
                  <svg 
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Destinations */}
        <div className="mt-20">
          <h3 className="text-3xl font-light text-[#1C1A17] text-center mb-10 lux-heading">
            {t('featuredDestinations')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.name}
                href={`/search?location=${destination.name}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                {destination.video ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={destination.image}
                  >
                    <source src={destination.video} type="video/mp4" />
                  </video>
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${destination.image})`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg font-light group-hover:scale-110 transition-transform">
                    {destination.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
