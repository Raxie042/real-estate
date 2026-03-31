'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  priority?: boolean;
}

/**
 * Lazy loading image component with blurred placeholder
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = 300,
  height = 200,
  className = '',
  onClick,
  fill,
  objectFit = 'cover',
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
      onClick={onClick}
    >
      {/* Blurred placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-100 animate-pulse" />
      )}

      {/* Image - only render if in view or priority */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          className={`w-full h-full object-${objectFit} transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoadingComplete={() => setIsLoading(false)}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
    </div>
  );
};

export default LazyImage;
