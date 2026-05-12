'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=90',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
];

export default function Hero() {
  const t = useTranslations('Home');
  const [imgIndex, setImgIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Cycle hero images every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setImgIndex(i => (i + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden">

      {/* Crossfading background images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={imgIndex}
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{
            backgroundImage: `url(${HERO_IMAGES[imgIndex]})`,
            transform: `translateY(${scrollY * 0.35}px)`,
          }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Gradient overlay — darker at bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.p
          className="text-xs md:text-sm uppercase tracking-[0.5em] text-[#E9D7B0] mb-6 font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {t('heroTagline')}
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-[6.5rem] font-light text-white mb-8 leading-[1.05] lux-heading max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
        >
          {t('heroTitle')}
        </motion.h1>

        <motion.div
          className="w-16 h-px bg-[#C9A96A] mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.8 }}
        />

        <motion.p
          className="text-lg md:text-xl text-white/85 font-light mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link
            href="/search"
            className="px-8 py-4 bg-[#C9A96A] text-[#1C1A17] font-semibold text-sm uppercase tracking-[0.12em] rounded-full hover:bg-[#b8924a] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(201,169,106,0.6)]"
          >
            Explore Properties
          </Link>
          <Link
            href="/valuation"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/40 font-semibold text-sm uppercase tracking-[0.12em] rounded-full hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5"
          >
            Request Valuation
          </Link>
        </motion.div>
      </div>

      {/* Image pagination dots */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === imgIndex ? 'w-8 h-1.5 bg-[#C9A96A]' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-px h-10 bg-white/30 origin-top"
          animate={{ scaleY: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
