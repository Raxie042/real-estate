'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Home');

  return (
    <div className="relative h-[90vh] min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(20,15,10,0.38), rgba(20,15,10,0.55)), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90)',
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-5xl">
          <p className="text-sm uppercase tracking-[0.4em] text-[#E9D7B0] mb-6 font-light">
            {t('heroTagline')}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight leading-[1.1] lux-heading">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}
