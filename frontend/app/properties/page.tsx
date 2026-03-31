'use client';

import { useListings } from '@/lib/hooks';
import PropertyCard from '@/components/properties/PropertyCard';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { Map, Grid3x3 } from 'lucide-react';
import { convertCurrency, formatPrice } from '@/lib/utils';
import { usePreferences } from '@/lib/preferences-context';
import { useTranslations } from 'next-intl';

const ListingsMap = dynamic(() => import('@/components/ListingsMap'), {
  ssr: false,
  loading: () => <div className="lux-card h-[600px] animate-pulse" />,
});

export default function PropertiesPage() {
  const t = useTranslations('PropertiesPage');
  const { preferences, locale } = usePreferences();
  const { data, isLoading } = useListings({
    status: 'ACTIVE',
    sort: 'newest',
    limit: 60,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const listings = useMemo(() => data?.data ?? [], [data]);
  
  const mapListings = useMemo(
    () =>
      listings
        .filter((listing: any) => Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude))
        .map((listing: any) => {
          const addressLine = [listing.addressLine1, listing.addressLine2]
            .filter(Boolean)
            .join(' ');
          const address = [addressLine, listing.city, listing.state]
            .filter(Boolean)
            .join(', ');

          return {
            id: listing.id,
            latitude: listing.latitude,
            longitude: listing.longitude,
            title: listing.title,
            address,
            price: Number(listing.price),
            currency: listing.currency,
            bedrooms: listing.bedrooms,
            bathrooms: listing.bathrooms,
          };
        }),
    [listings]
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
            {t('home')}
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <span className="text-[#2B2620] font-semibold">{t('properties')}</span>
        </div>

        {/* Header with View Toggle */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-semibold mb-2">{t('title')}</h1>
            <p className="text-[#7A6E60]">
              {isLoading ? t('loading') : t('showingAvailable', { count: listings.length || 0 })}
            </p>
          </div>
          {!isLoading && listings.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  viewMode === 'grid'
                    ? 'bg-[#C9A96A] text-[#1C1A17]'
                    : 'bg-white/70 text-[#2B2620] border border-[#E8E1D7] hover:bg-white'
                }`}
              >
                <Grid3x3 size={20} />
                {t('grid')}
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  viewMode === 'map'
                    ? 'bg-[#C9A96A] text-[#1C1A17]'
                    : 'bg-white/70 text-[#2B2620] border border-[#E8E1D7] hover:bg-white'
                }`}
              >
                <Map size={20} />
                {t('map')}
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="lux-card h-96 animate-pulse" />
            ))}
          </div>
        )}

        {/* Grid View */}
        {!isLoading && viewMode === 'grid' && listings.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing: any) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : null}

        {/* Map View */}
        {!isLoading && viewMode === 'map' && listings.length > 0 ? (
          <div>
            <ListingsMap
              listings={mapListings}
              height="600px"
              onMarkerClick={(listing) => setSelectedListing(listing)}
            />
            {selectedListing && (
              <div className="mt-6 lux-card p-6">
                <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">{selectedListing.title}</h3>
                <p className="text-[#7A6E60] mb-4">{selectedListing.address}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-3xl font-semibold text-[#C9A96A]">
                      {formatPrice(
                        convertCurrency(selectedListing.price, selectedListing.currency || 'USD', preferences.currency),
                        preferences.currency,
                        locale
                      )}
                    </p>
                    <p className="text-[#7A6E60] text-sm">
                      {selectedListing.bedrooms} bed • {selectedListing.bathrooms} bath
                    </p>
                  </div>
                  <Link
                    href={`/properties/${selectedListing.id}`}
                    className="lux-button"
                  >
                    {t('viewDetails')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* No Results */}
        {!isLoading && listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#7A6E60] text-lg mb-4">{t('noProperties')}</p>
            <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
              ← {t('backToHome')}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
