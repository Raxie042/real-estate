'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Bed, Bath, Ruler, Scale } from 'lucide-react';
import { convertCurrency, formatArea, formatPrice } from '@/lib/utils';
import FavoriteButton from '@/components/FavoriteButton';
import { useComparisonStore } from '@/lib/comparison-store';
import { usePreferences } from '@/lib/preferences-context';

interface PropertyCardProps {
  listing: any;
}

function toMediaArray(value: any): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === 'string' && item.trim().length > 0);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return [];

    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        return toMediaArray(JSON.parse(trimmed));
      } catch {
        return [trimmed];
      }
    }

    return [trimmed];
  }

  if (typeof value === 'object') {
    const asRecord = value as Record<string, unknown>;

    if (Array.isArray(asRecord.urls)) {
      return asRecord.urls.filter((item) => typeof item === 'string' && item.trim().length > 0) as string[];
    }

    if (typeof asRecord.url === 'string' && asRecord.url.trim().length > 0) {
      return [asRecord.url];
    }
  }

  return [];
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  const { addProperty, removeProperty, isInComparison } = useComparisonStore();
  const { preferences, locale } = usePreferences();
  const images = toMediaArray(listing.images);
  const videos = toMediaArray(listing.videos);
  const imageCount = images.length;
  const videoCount = videos.length;
  const mainImage = images[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80';
  const location = [listing.city, listing.state].filter(Boolean).join(', ');
  const inComparison = isInComparison(listing.id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeProperty(listing.id);
    } else {
      addProperty({
        id: listing.id,
        title: listing.title,
        price: listing.price,
        images,
        city: listing.city,
        state: listing.state,
      });
    }
  };

  const convertedPrice = convertCurrency(
    Number(listing.price),
    listing.currency || 'USD',
    preferences.currency
  );

  return (
    <Link href={`/properties/${listing.id}`}>
      <div className="lux-card overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-40px_rgba(20,15,10,0.7)] transition">
        <div className="relative h-48">
          <Image
            src={mainImage}
            alt={listing.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 lux-badge">
            {listing.listingType}
          </div>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <FavoriteButton listingId={listing.id} size={18} />
          </div>
          <button
            onClick={handleCompareClick}
            className={`absolute bottom-3 right-3 p-2 rounded-lg shadow-lg backdrop-blur-sm transition ${
              inComparison
                ? 'bg-[#C9A96A] text-white'
                : 'bg-white/90 text-[#1C1A17] hover:bg-[#C9A96A] hover:text-white'
            }`}
            title={inComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate text-[#1C1A17]">{listing.title}</h3>
          </div>

          <p className="text-[#7A6E60] text-sm mb-2">
            {location || 'Location unavailable'}
          </p>

          {(imageCount > 0 || videoCount > 0) && (
            <p className="text-xs text-[#8B7D6A] mb-2">
              {imageCount > 0 ? `${imageCount} photo${imageCount === 1 ? '' : 's'}` : '0 photos'}
              {videoCount > 0 ? ` • ${videoCount} video${videoCount === 1 ? '' : 's'}` : ''}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-[#8B7D6A] mb-3">
            {listing.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                {listing.bedrooms} beds
              </span>
            )}
            {listing.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                {listing.bathrooms} baths
              </span>
            )}
            {listing.sqft && (
              <span className="flex items-center gap-1">
                <Ruler className="w-4 h-4" />
                {formatArea(Number(listing.sqft), preferences.unitSystem, locale)}
              </span>
            )}
          </div>

          <div className="text-2xl font-semibold text-[#C9A96A]">
            {formatPrice(convertedPrice, preferences.currency, locale)}
          </div>
        </div>
      </div>
    </Link>
  );
}
