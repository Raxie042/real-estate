'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useListing } from '@/lib/hooks';
import FavoriteButton from '@/components/FavoriteButton';
import ImageGallery from '@/components/ImageGallery';
import ShareButtons from '@/components/ShareButtons';
import { convertCurrency, formatArea, formatDate, formatNumber, formatPrice } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { usePreferences } from '@/lib/preferences-context';
import { useTranslations } from 'next-intl';
import SectionBoundary from '@/components/layout/SectionBoundary';

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  ssr: false,
  loading: () => <div className="lux-card h-[400px] animate-pulse" />,
});

const VirtualTour = dynamic(() => import('@/components/VirtualTour'));
const MortgageCalculator = dynamic(() => import('@/components/MortgageCalculator'));
const OpenHouseList = dynamic(() => import('@/components/OpenHouseList'));
const ContactSellerForm = dynamic(() => import('@/components/ContactSellerForm'), {
  loading: () => <div className="lux-card h-72 animate-pulse" />,
});
const SimilarProperties = dynamic(() => import('@/components/SimilarProperties'), {
  loading: () => <div className="lux-card h-64 mt-8 animate-pulse" />,
});
const NeighborhoodInsights = dynamic(() => import('@/components/NeighborhoodInsights'), {
  ssr: false,
  loading: () => <div className="lux-card h-64 animate-pulse" />,
});
const ChatBox = dynamic(() => import('@/components/ChatBox'), { ssr: false });
const MakeOffer = dynamic(() => import('@/components/MakeOffer'), { ssr: false });

export default function PropertyDetailPage() {
  const t = useTranslations('PropertyDetail');
  const params = useParams();
  const id = params.id as string;
  const { data: listing, isLoading } = useListing(id);
  const { user } = useAuth();
  const { preferences, locale } = usePreferences();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMakeOffer, setShowMakeOffer] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lux-card h-96 animate-pulse mb-8" />
          <div className="space-y-4">
            <div className="lux-card h-8 w-3/4 animate-pulse" />
            <div className="lux-card h-6 w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-4">{t('notFound')}</h1>
            <Link href="/properties" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
              ← {t('backToProperties')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
            {t('home')}
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <Link href="/properties" className="text-[#C9A96A] hover:text-[#B78F4A]">
            {t('properties')}
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <span className="text-[#2B2620] font-semibold">{listing.title}</span>
        </div>

        {/* Header with title and price */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-semibold text-[#1C1A17] mb-2">{listing.title}</h1>
            <p className="text-[#7A6E60] text-lg">
              {[listing.addressLine1, listing.addressLine2, listing.city, listing.state]
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <ShareButtons 
              listingId={listing.id} 
              title={listing.title}
              description={listing.description || ''}
              imageUrl={listing.images?.[0] || ''}
            />
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <FavoriteButton listingId={listing.id} size={24} showCount />
            </div>
          </div>
        </div>

        {/* Price and type */}
        <div className="mb-8 flex gap-6">
          <div>
            <p className="text-[#7A6E60] text-sm">{t('price')}</p>
            <p className="text-3xl font-semibold text-[#C9A96A]">
              {listing.price
                ? formatPrice(
                    convertCurrency(Number(listing.price), listing.currency || 'USD', preferences.currency),
                    preferences.currency,
                    locale
                  )
                : t('na')}
            </p>
          </div>
          <div>
            <p className="text-[#7A6E60] text-sm">{t('type')}</p>
            <p className="text-lg font-semibold text-[#1C1A17]">{listing.propertyType}</p>
          </div>
          <div>
            <p className="text-[#7A6E60] text-sm">{t('listingType')}</p>
            <p className="text-lg font-semibold text-[#1C1A17]">{listing.listingType}</p>
          </div>
        </div>

        {/* Image Gallery */}
        {listing.images && listing.images.length > 0 && (
          <div className="mb-8">
            <ImageGallery images={listing.images} title={listing.title} />
          </div>
        )}

        {/* Map */}
        {Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude) && (
          <SectionBoundary sectionName="Property map">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">{t('location')}</h2>
              <PropertyMap
                latitude={listing.latitude}
                longitude={listing.longitude}
                address={[listing.addressLine1, listing.addressLine2, listing.city, listing.state]
                  .filter(Boolean)
                  .join(', ')}
                title={listing.title}
                height="400px"
              />
            </div>
          </SectionBoundary>
        )}

        {/* Neighborhood Insights */}
        {Number.isFinite(listing.latitude) && Number.isFinite(listing.longitude) && (
          <SectionBoundary sectionName="Neighborhood insights">
            <div className="mb-8">
              <NeighborhoodInsights 
                latitude={listing.latitude}
                longitude={listing.longitude}
                address={[listing.addressLine1, listing.city, listing.state, listing.zipCode]
                  .filter(Boolean)
                  .join(', ')}
              />
            </div>
          </SectionBoundary>
        )}

        <div className="grid grid-cols-3 gap-8">
          {/* Main content */}
          <div className="col-span-2">
            {/* Key features */}
            <div className="lux-card p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">{t('keyFeatures')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('bedrooms')}:</span>
                  <span className="text-[#1C1A17] ml-2">{listing.bedrooms || t('na')}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('bathrooms')}:</span>
                  <span className="text-[#1C1A17] ml-2">{listing.bathrooms || t('na')}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('squareFeet')}:</span>
                  <span className="text-[#1C1A17] ml-2">
                    {listing.sqft ? formatArea(Number(listing.sqft), preferences.unitSystem, locale) : t('na')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('yearBuilt')}:</span>
                  <span className="text-[#1C1A17] ml-2">{listing.yearBuilt || t('na')}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('lotSize')}:</span>
                  <span className="text-[#1C1A17] ml-2">
                    {listing.lotSize ? formatNumber(Number(listing.lotSize), locale) : t('na')}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#7A6E60] font-semibold">{t('propertyType')}:</span>
                  <span className="text-[#1C1A17] ml-2">{listing.propertySubType || t('na')}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {listing.description && (
              <div className="lux-card p-6 mb-8">
                <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">{t('aboutProperty')}</h2>
                <p className="text-[#5F5448] leading-relaxed">{listing.description}</p>
              </div>
            )}

            {/* Virtual Tour */}
            {listing.virtualTour && (
              <div className="mb-8">
                <VirtualTour url={listing.virtualTour} title="Property Virtual Tour" />
              </div>
            )}

            {/* Mortgage Calculator */}
            {listing.price && listing.listingType === 'SALE' && (
              <div className="mb-8">
                <MortgageCalculator propertyPrice={Number(listing.price)} currency={listing.currency} />
              </div>
            )}

            {/* Amenities */}
            {Array.isArray(listing.features) && listing.features.length > 0 && (
              <div className="lux-card p-6">
                <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">{t('amenities')}</h2>
                <div className="grid grid-cols-2 gap-3">
                  {listing.features.map((amenity: string, idx: number) => (
                    <div key={idx} className="flex items-center text-[#5F5448]">
                      <span className="w-2 h-2 bg-[#C9A96A] rounded-full mr-2" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="col-span-1">
            {/* Agent info */}
            {listing.user && (
              <div className="lux-card p-6 mb-8">
                <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('agent')}</h3>
                <div className="flex items-center mb-4">
                  {listing.user.avatar && (
                    <Image
                      src={listing.user.avatar}
                      alt={listing.user.firstName}
                      width={48}
                      height={48}
                      unoptimized
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-[#1C1A17]">
                      {listing.user.firstName} {listing.user.lastName}
                    </p>
                    <p className="text-sm text-[#7A6E60]">{listing.user.email}</p>
                  </div>
                </div>
                {listing.user.phone && (
                  <a
                    href={`tel:${listing.user.phone}`}
                    className="block w-full text-center lux-button"
                  >
                    {t('callAgent')}
                  </a>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-8 space-y-3">
              {user && listing.listingType === 'SALE' && (
                <button
                  onClick={() => setShowMakeOffer(true)}
                  className="w-full lux-button"
                >
                  {t('makeOffer')}
                </button>
              )}
              {user && (
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="w-full lux-button-secondary"
                >
                  {t('chatWithAgent')}
                </button>
              )}
            </div>

            {/* Contact Seller Form */}
            <SectionBoundary sectionName="Contact form">
              <div className="mb-8">
                <ContactSellerForm listingId={listing.id} listingTitle={listing.title} />
              </div>
            </SectionBoundary>

            {/* Open Houses */}
            <SectionBoundary sectionName="Open houses">
              <div className="mb-8">
                <OpenHouseList listingId={listing.id} />
              </div>
            </SectionBoundary>

            {/* Listing info */}
            <div className="lux-card p-6">
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('listingDetails')}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#7A6E60]">{t('status')}:</span>
                  <span className="font-semibold text-[#1C1A17]">{listing.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A6E60]">{t('listed')}:</span>
                  <span className="font-semibold text-[#1C1A17]">
                    {listing.publishedAt ? formatDate(listing.publishedAt, locale) : t('na')}
                  </span>
                </div>
                {listing.viewCount && (
                  <div className="flex justify-between">
                    <span className="text-[#7A6E60]">{t('views')}:</span>
                    <span className="font-semibold text-[#1C1A17]">{listing.viewCount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <SectionBoundary sectionName="Similar properties">
          <SimilarProperties 
            currentListingId={listing.id} 
            propertyType={listing.propertyType}
            city={listing.city}
          />
        </SectionBoundary>
      </div>

      {/* Chat Box Modal */}
      {isChatOpen && user && (
        <ChatBox
          roomId={`listing-${listing.id}`}
          userId={user.id}
          listingTitle={listing.title}
          onClose={() => setIsChatOpen(false)}
        />
      )}

      {/* Make Offer Modal */}
      {showMakeOffer && user && (
        <MakeOffer
          listingId={listing.id}
          listingTitle={listing.title}
          listingPrice={Number(listing.price)}
          onClose={() => setShowMakeOffer(false)}
        />
      )}
    </div>
  );
}
