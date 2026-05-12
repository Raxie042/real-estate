'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  if (!images || images.length === 0) return null;

  const go = useCallback((newIndex: number) => {
    setDirection(newIndex > selectedIndex ? 1 : -1);
    setSelectedIndex((newIndex + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const prev = () => go(selectedIndex - 1);
  const next = () => go(selectedIndex + 1);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isLightboxOpen, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = isLightboxOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="mb-8">
      {/* Main image — 2:3 editorial ratio */}
      <div
        className="relative rounded-2xl overflow-hidden cursor-pointer group border border-[#E8E1D7]"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${title} — ${selectedIndex + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Expand hint */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <Expand size={13} />
          View all {images.length} photos
        </div>
        <div className="absolute bottom-4 left-4 lux-badge bg-black/60 text-white border-white/20">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 snap-x">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > selectedIndex ? 1 : -1); setSelectedIndex(i); }}
              className={`relative flex-shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 snap-start transition-all duration-200 ${
                i === selectedIndex
                  ? 'border-[#C9A96A] ring-2 ring-[#C9A96A]/30 scale-[1.04]'
                  : 'border-[#E8E1D7] hover:border-[#C9A96A]/50 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-[0.3em]">{selectedIndex + 1} / {images.length}</p>
                <p className="text-white/80 font-light lux-heading text-lg">{title}</p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="text-white/60 hover:text-[#C9A96A] transition p-2 rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main image with crossfade */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22,1,0.36,1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[selectedIndex]}
                    alt={`${title} — ${selectedIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next */}
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A96A] hover:bg-white/10 p-3 rounded-full transition"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-[#C9A96A] hover:bg-white/10 p-3 rounded-full transition"
              >
                <ChevronRight size={36} />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-2 justify-center px-6 py-4 overflow-x-auto shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > selectedIndex ? 1 : -1); setSelectedIndex(i); }}
                  className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedIndex ? 'border-[#C9A96A]' : 'border-white/20 opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
