'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VirtualTourProps {
  url: string;
  title?: string;
}

export default function VirtualTour({ url, title = 'Virtual Tour' }: VirtualTourProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Determine if URL is a video or 360 iframe
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isVimeo = url.includes('vimeo.com');
  const isMatterport = url.includes('matterport.com');
  const isVideo = isYouTube || isVimeo;

  // Convert URLs to embed format
  const getEmbedUrl = () => {
    if (isYouTube) {
      const videoId = url.includes('v=') 
        ? url.split('v=')[1]?.split('&')[0]
        : url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (isVimeo) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full lux-card p-6 hover:shadow-xl transition group"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C9A96A] to-[#B78F4A] flex items-center justify-center group-hover:scale-110 transition">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
          <div className="text-left flex-1">
            <h3 className="text-xl font-semibold text-[#2B2620] mb-1">{title}</h3>
            <p className="text-sm text-[#7A6E60]">
              {isMatterport ? 'Experience in 3D' : isVideo ? 'Watch video tour' : 'View 360° tour'}
            </p>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
              allowFullScreen
              title={title}
            />
          </div>
        </div>
      )}
    </>
  );
}
