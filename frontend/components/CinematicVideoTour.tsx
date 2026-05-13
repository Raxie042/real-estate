'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, X, Volume2, VolumeX, Maximize2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicVideoTourProps {
  videoUrl?: string;
  posterImage?: string;
  propertyTitle?: string;
}

// Convert any YouTube/Vimeo URL to autoplay embed
function toEmbedUrl(url: string): string {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const id = url.includes('v=')
      ? url.split('v=')[1]?.split('&')[0]
      : url.split('youtu.be/')[1]?.split('?')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`;
  }
  if (url.includes('vimeo.com')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0];
    return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
  }
  return url;
}

// Demo video shown when no listing video is set
const DEMO_VIDEO = 'https://www.youtube.com/watch?v=WXuK6gekU1Y';

export default function CinematicVideoTour({ videoUrl, posterImage, propertyTitle }: CinematicVideoTourProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const src = toEmbedUrl(videoUrl || DEMO_VIDEO);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {/* ── Trigger button — hero style ─────────────────── */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative w-full overflow-hidden rounded-2xl aspect-[16/9] bg-[#1C1A17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96A]"
        aria-label="Watch cinematic property tour"
      >
        {/* Poster / fallback gradient */}
        {posterImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={posterImage}
            alt={propertyTitle ?? 'Property film'}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2C2720] via-[#1C1A17] to-[#0D0C0A]" />
        )}

        {/* Overlay vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

        {/* Gold animated ring + play */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative flex items-center justify-center"
            whileHover={{ scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            {/* Pulsing outer ring */}
            <motion.span
              className="absolute w-24 h-24 rounded-full border border-[#C9A96A]/40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm border border-[#C9A96A]/60 flex items-center justify-center">
              <Play size={32} className="text-[#C9A96A] fill-[#C9A96A] ml-1" />
            </span>
          </motion.div>
        </div>

        {/* Label */}
        <div className="absolute bottom-5 left-6 text-left">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#C9A96A] mb-1">Property Film</p>
          <p className="text-white font-light text-lg lux-heading leading-tight">
            {propertyTitle ? `${propertyTitle}` : 'Watch the Cinematic Tour'}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-white/60 text-xs">
            <Maximize2 size={11} />
            <span>Full screen experience</span>
          </div>
        </div>

        {/* Top-right badge */}
        <div className="absolute top-4 right-4 bg-[#C9A96A]/90 text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1C1A17] animate-pulse" />
          Cinematic Tour
        </div>
      </button>

      {/* ── Fullscreen lightbox ──────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-[#C9A96A]">Property Film</p>
                {propertyTitle && (
                  <p className="text-white font-light lux-heading mt-0.5 text-base">{propertyTitle}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Video */}
            <div className="flex-1 relative">
              <iframe
                ref={iframeRef}
                src={src}
                title={propertyTitle ?? 'Property cinematic tour'}
                allow="autoplay; fullscreen; picture-in-picture; accelerometer; encrypted-media; gyroscope"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>

            {/* Bottom strip */}
            <div className="px-6 py-4 flex items-center justify-between shrink-0 border-t border-white/10">
              <p className="text-white/40 text-xs">Press Esc to close · Full screen recommended</p>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 text-xs text-[#C9A96A] hover:text-[#B78F4A] transition"
              >
                Close film <ChevronRight size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
