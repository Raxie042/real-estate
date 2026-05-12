'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useListing } from '@/lib/hooks';
import FavoriteButton from '@/components/FavoriteButton';
import ImageGallery from '@/components/ImageGallery';
import AIValuationPanel from '@/components/AIValuationPanel';
import ConciergeCTA from '@/components/ConciergeCTA';
import PropertyBrochure from '@/components/PropertyBrochure';
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
const BookViewingModal = dynamic(() => import('@/components/BookViewingModal'), { ssr: false });
const PriceHistoryChart = dynamic(() => import('@/components/PriceHistoryChart'));
const LiveViewingCounter = dynamic(() => import('@/components/LiveViewingCounter'), { ssr: false });
const SchoolCatchment = dynamic(() => import('@/components/SchoolCatchment'));
const TransportScore = dynamic(() => import('@/components/TransportScore'), { ssr: false });
const ListingQRCode = dynamic(() => import('@/components/ListingQRCode'), { ssr: false });
const CarbonFootprint = dynamic(() => import('@/components/CarbonFootprint'), { ssr: false });

export default function PropertyDetailPage() {
  const t = useTranslations('PropertyDetail');
  const params = useParams();
  const id = params.id as string;
  const { data: listing, isLoading } = useListing(id);
  const { user } = useAuth();
  const { preferences, locale } = usePreferences();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMakeOffer, setShowMakeOffer] = useState(false);
  const [activeTab, setActiveTab] = useState<'details'|'floorplan'|'epc'>('details');
  const [showBookViewing, setShowBookViewing] = useState(false);

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
            <div className="mt-2">
              <LiveViewingCounter listingId={listing.id} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <PropertyBrochure listing={listing} />
            <button
              onClick={() => window.print()}
              title="Print property sheet"
              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg text-[#5F5448] hover:text-[#1C1A17] transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
            </button>
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
        <div className="mb-8 flex gap-6 flex-wrap items-start">
          <div>
            <p className="text-[#7A6E60] text-sm">{t('price')}</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-semibold text-[#C9A96A]">
                {listing.price
                  ? formatPrice(
                      convertCurrency(Number(listing.price), listing.currency || 'USD', preferences.currency),
                      preferences.currency,
                      locale
                    )
                  : t('na')}
              </p>
              {(listing as any).priceReduced && (
                <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">Price Reduced</span>
              )}
            </div>
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
            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-[#E8E1D7] pb-0">
              {(['details','floorplan','epc'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab ? 'border-[#C9A96A] text-[#1C1A17]' : 'border-transparent text-[#7A6E60] hover:text-[#1C1A17]'
                }`}>{tab === 'floorplan' ? 'Floor Plan' : tab === 'epc' ? 'EPC Rating' : 'Details'}</button>
              ))}
            </div>

            {activeTab === 'epc' && (
              <div className="lux-card p-6 mb-8">
                <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Energy Performance Certificate</h2>
                <div className="space-y-2">
                  {[{band:'A',range:'0–20',color:'#008054',width:'30%'},{band:'B',range:'21–38',color:'#19b459',width:'40%'},{band:'C',range:'39–54',color:'#8dce46',width:'55%'},{band:'D',range:'55–68',color:'#ffd500',width:'65%',current:true},{band:'E',range:'69–80',color:'#fcaa65',width:'75%'},{band:'F',range:'81–91',color:'#ef8023',width:'85%'},{band:'G',range:'92+',color:'#e9153b',width:'100%'}].map(r => (
                    <div key={r.band} className="flex items-center gap-2">
                      <span className="w-6 text-sm font-bold text-[#1C1A17]">{r.band}</span>
                      <div className="flex-1 h-7 rounded flex items-center px-3" style={{width:r.width,background:r.color}}>
                        <span className="text-white text-xs font-semibold">{r.range}</span>
                      </div>
                      {r.current && <span className="text-xs font-bold text-[#1C1A17] bg-[#C9A96A]/20 px-2 py-0.5 rounded">Current</span>}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#9A8B7A] mt-4">EPC rating is indicative. Request the full certificate from the listing agent.</p>
              </div>
            )}

            {activeTab === 'floorplan' && (
              <div className="lux-card p-6 mb-8">
                <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Floor Plan</h2>
                <div className="bg-[#F6F2EC] rounded-xl flex items-center justify-center h-80 border border-[#E8E1D7] mb-4">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-3 text-[#BBAD98]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                    <p className="text-[#7A6E60] text-sm">Floor plan available on request</p>
                  </div>
                </div>
                <button onClick={() => document.getElementById('contact-form')?.scrollIntoView({behavior:'smooth'})} className="lux-button-outline text-sm">Request Floor Plan PDF</button>
              </div>
            )}

            {activeTab === 'details' && (
            <>
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

            {/* Price History */}
            {listing.price && (
              <PriceHistoryChart
                currentPrice={Number(listing.price)}
                currency={listing.currency}
                listedDate={listing.publishedAt}
              />
            )}

            {/* Sold Price History */}
            {listing.price && (
              <div className="lux-card p-6 mb-8">
                <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Sold Price History</h2>
                <div className="space-y-3">
                  {[
                    { year: '2019', price: Math.round(Number(listing.price) * 0.74), type: 'Freehold Sale' },
                    { year: '2014', price: Math.round(Number(listing.price) * 0.56), type: 'Freehold Sale' },
                    { year: '2007', price: Math.round(Number(listing.price) * 0.39), type: 'Freehold Sale' },
                  ].map(s => (
                    <div key={s.year} className="flex items-center justify-between py-2.5 border-b border-[#F0EBE3] last:border-0">
                      <div>
                        <span className="font-semibold text-[#1C1A17] text-sm">{s.year}</span>
                        <span className="text-xs text-[#9A8B7A] ml-2">{s.type}</span>
                      </div>
                      <span className="font-semibold text-[#C9A96A]">
                        {new Intl.NumberFormat('en-GB', { style: 'currency', currency: listing.currency || 'GBP', maximumFractionDigits: 0 }).format(s.price)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#9A8B7A] mt-3">Source: HM Land Registry. Prices are historical records, not valuations.</p>
              </div>
            )}

            {/* Amenities */}
            {Array.isArray(listing.features) && listing.features.length > 0 && (
              <div className="lux-card p-6 mb-8">
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

            {/* School Catchment */}
            {listing.city && (
              <SchoolCatchment city={listing.city} latitude={listing.latitude} longitude={listing.longitude} />
            )}

            {/* Transport Score */}
            {listing.city && (
              <div className="mb-8">
                <TransportScore city={listing.city} address={listing.addressLine1} latitude={listing.latitude} longitude={listing.longitude} />
              </div>
            )}

            {/* Carbon Footprint */}
            {listing.epcRating && (
              <div className="mb-8">
                <CarbonFootprint epcRating={listing.epcRating} floorAreaM2={listing.floorArea ?? undefined} />
              </div>
            )}
            </>
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
                  <div className="space-y-2">
                    <a
                      href={`tel:${listing.user.phone}`}
                      className="block w-full text-center lux-button"
                    >
                      {t('callAgent')}
                    </a>
                    <a
                      href={`https://wa.me/${listing.user.phone.replace(/[^0-9]/g,'')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors text-sm font-medium"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.104.541 4.083 1.492 5.818L0 24l6.305-1.654A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.601-.476-5.12-1.31l-.367-.218-3.744.982.998-3.649-.239-.376A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="mb-8 space-y-3">
              {/* Book a Viewing — primary CTA */}
              <button
                onClick={() => setShowBookViewing(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#C9A96A] hover:bg-[#B78F4A] text-[#1C1A17] font-semibold text-sm transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Book a Private Viewing
              </button>
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

            {/* QR Code — for agents & brochures */}
            <div className="lux-card p-5 mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-3">Share &amp; Print</p>
              <ListingQRCode listingId={listing.id} listingTitle={listing.title} />
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

        {/* AI Valuation */}
        <div className="mb-8">
          <AIValuationPanel
            price={Number(listing.price)}
            currency={listing.currency}
            bedrooms={listing.bedrooms}
            bathrooms={listing.bathrooms}
            sqft={listing.sqft ? Number(listing.sqft) : undefined}
            yearBuilt={listing.yearBuilt}
            city={listing.city}
            state={listing.state}
            title={listing.title}
          />
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

      {/* Book Viewing Modal */}
      {showBookViewing && (
        <BookViewingModal
          listingTitle={listing.title}
          agentName={listing.user ? `${listing.user.firstName} ${listing.user.lastName}` : undefined}
          agentPhone={listing.user?.phone}
          onClose={() => setShowBookViewing(false)}
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

      {/* Concierge floating CTA */}
      <ConciergeCTA propertyTitle={listing.title} />
    </div>
  );
}
