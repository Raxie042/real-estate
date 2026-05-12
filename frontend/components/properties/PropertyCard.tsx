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
      <div className="lux-card overflow-hidden group cursor-pointer">
        {/* Image with zoom */}
        <div className="relative h-56 property-img-wrap overflow-hidden">
          <Image
            src={mainImage}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
          {/* Dark gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Badges */}
          <div className="absolute top-3 right-3 lux-badge">
            {listing.listingType}
          </div>
          {listing.isPoa && (
            <div className="absolute top-3 left-3 bg-[#1C1A17]/80 backdrop-blur-sm text-[#C9A96A] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-semibold">
              POA
            </div>
          )}
          {!listing.isPoa && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <FavoriteButton listingId={listing.id} size={18} />
            </div>
          )}
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
          {imageCount > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {imageCount}
            </div>
          )}
        </div>

        <div className="p-5">
          {/* Price — POA or formatted */}
          <div className="mb-2">
            {listing.isPoa ? (
              <span className="price-poa">Price on Application</span>
            ) : (
              <div className="text-xl font-semibold text-[#C9A96A] lux-heading">
                {formatPrice(convertedPrice, preferences.currency, locale)}
              </div>
            )}
          </div>

          <h3 className="font-medium text-base text-[#1C1A17] mb-1 truncate">{listing.title}</h3>

          <p className="text-[#7A6E60] text-sm mb-3 flex items-center gap-1">
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {location || 'Location unavailable'}
          </p>

          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-[#8B7D6A] pt-3 border-t border-[#F0EAE0]">
            {listing.bedrooms && (
              <span className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5" />
                {listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}
              </span>
            )}
            {listing.bathrooms && (
              <span className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5" />
                {listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}
              </span>
            )}
            {listing.sqft && (
              <span className="flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                {formatArea(Number(listing.sqft), preferences.unitSystem, locale)}
              </span>
            )}
            {/* ESG / EPC badge — shown if epcRating is A or B */}
            {(listing.epcRating === 'A' || listing.epcRating === 'B') && (
              <span className="ml-auto flex items-center gap-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 fill-emerald-600"><path d="M6 1l1.5 3h3.5l-2.8 2 1 3L6 7.5 2.8 9l1-3L1 4h3.5z"/></svg>
                EPC {listing.epcRating}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
