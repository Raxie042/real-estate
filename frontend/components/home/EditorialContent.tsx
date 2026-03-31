'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const editorialItems = [
  {
    id: 1,
    title: 'The Art of Living Well',
    subtitle: 'Design & Architecture',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=90',
    excerpt: 'Discover how exceptional design transforms everyday living into an extraordinary experience.',
    category: 'Design',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Global Market Insights',
    subtitle: 'Market Trends 2024',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=90',
    excerpt: 'Expert analysis on luxury real estate markets across major global cities.',
    category: 'Market',
    readTime: '8 min read'
  },
  {
    id: 3,
    title: 'Sustainable Luxury',
    subtitle: 'Green Living',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=90',
    excerpt: 'How cutting-edge sustainable design is redefining luxury living.',
    category: 'Sustainability',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: 'Collector&apos;s Homes',
    subtitle: 'Art & Culture',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=90',
    excerpt: 'Inside the homes of the world&apos;s most discerning art collectors.',
    category: 'Culture',
    readTime: '7 min read'
  },
];

export default function EditorialContent() {
  const t = useTranslations('Home');
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % editorialItems.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + editorialItems.length) % editorialItems.length);
  };

  const activeItem = editorialItems[activeIndex];

  return (
    <div className="bg-[#F8F6F3] py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#1C1A17] mb-4 lux-heading">
            {t('editorialTitle')}
          </h2>
          <p className="text-lg text-[#6E6255] font-light">
            {t('editorialSubtitle')}
          </p>
        </div>

        {/* Featured Editorial */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-2xl lux-card aspect-[21/9] md:aspect-[21/8]">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%), url(${activeItem.image})`
              }}
            />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-2xl px-8 md:px-16 py-12">
                <div className="inline-block bg-[#C9A96A] text-white px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-6">
                  {activeItem.category}
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/80 mb-4 font-light">
                  {activeItem.subtitle}
                </p>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight lux-heading">
                  {activeItem.title}
                </h3>
                <p className="text-lg text-white/90 mb-8 font-light leading-relaxed">
                  {activeItem.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/resources?article=${activeItem.id}`}
                    className="lux-button"
                  >
                    {t('readArticle')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <span className="text-white/70 text-sm">{activeItem.readTime}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition flex items-center justify-center text-white"
              aria-label="Previous article"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition flex items-center justify-center text-white"
              aria-label="Next article"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {editorialItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* More Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/guides" className="group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 lux-card">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=90)'}}
              />
            </div>
            <p className="text-xs uppercase tracking-wider text-[#C9A96A] mb-2">Buying Guide</p>
            <h4 className="text-xl font-light text-[#1C1A17] group-hover:text-[#C9A96A] transition lux-heading">
              First-Time Luxury Home Buyer&apos;s Guide
            </h4>
          </Link>

          <Link href="/guides" className="group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 lux-card">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=90)'}}
              />
            </div>
            <p className="text-xs uppercase tracking-wider text-[#C9A96A] mb-2">Investment</p>
            <h4 className="text-xl font-light text-[#1C1A17] group-hover:text-[#C9A96A] transition lux-heading">
              Global Real Estate Investment Trends
            </h4>
          </Link>

          <Link href="/guides" className="group">
            <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 lux-card">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=90)'}}
              />
            </div>
            <p className="text-xs uppercase tracking-wider text-[#C9A96A] mb-2">Lifestyle</p>
            <h4 className="text-xl font-light text-[#1C1A17] group-hover:text-[#C9A96A] transition lux-heading">
              Designing Your Dream Home Interior
            </h4>
          </Link>
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link 
            href="/resources" 
            className="inline-flex items-center text-[#1C1A17] hover:text-[#C9A96A] transition font-light text-lg group"
          >
            {t('viewAllArticles')}
            <svg 
              className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
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
