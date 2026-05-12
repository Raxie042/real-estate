'use client';

import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import PropertyCard from '@/components/properties/PropertyCard';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Grid3x3, Map } from 'lucide-react';
import { convertCurrency, formatPrice } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import { usePreferences } from '@/lib/preferences-context';
import { useTranslations } from 'next-intl';
import SectionBoundary from '@/components/layout/SectionBoundary';

const ListingsMap = dynamic(() => import('@/components/ListingsMap'), {
  ssr: false,
  loading: () => <div className="lux-card h-[600px] animate-pulse" />,
});

const SaveSearchModal = dynamic(() => import('@/components/search/SaveSearchModal'), {
  ssr: false,
});

const PROPERTY_TYPE_MAP: Record<string, string> = {
  houses: 'RESIDENTIAL',
  apartments: 'RESIDENTIAL',
  commercial: 'COMMERCIAL',
  land: 'LAND',
};

const BEDROOM_OPTIONS = ['Any', '1', '2', '3', '4', '5+'];
const BATHROOM_OPTIONS = ['Any', '1', '2', '3', '4+'];
const PARKING_OPTIONS = ['Any', '1', '2', '3', '4+'];
const FEATURE_OPTIONS = [
  { id: 'pool', label: 'Pool' },
  { id: 'garage', label: 'Garage' },
  { id: 'fireplace', label: 'Fireplace' },
  { id: 'garden', label: 'Garden' },
  { id: 'gym', label: 'Gym' },
  { id: 'security', label: 'Security System' },
  { id: 'airConditioning', label: 'Air Conditioning' },
  { id: 'heating', label: 'Heating' },
];

function SearchResultsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('Search');
  const { user } = useAuth();
  const { preferences, locale } = usePreferences();
  const pathLocale = pathname?.split('/')[1];
  const localePrefix = pathLocale && ['en', 'fr', 'de', 'ar'].includes(pathLocale) ? pathLocale : preferences.language;
  const propertyTypeParam = searchParams.get('type') || '';
  const listingTypeParam = searchParams.get('listingType') || 'SALE';

  const [filters, setFilters] = useState({
    keyword: '',
    propertyType: propertyTypeParam,
    propertySubType: searchParams.get('subType') || '',
    listingType: listingTypeParam,
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    minBathrooms: '',
    minSqft: '',
    maxSqft: '',
    minYearBuilt: '',
    maxYearBuilt: '',
    minParkingSpaces: '',
    city: '',
    state: '',
    sort: 'newest',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [saveNotifications, setSaveNotifications] = useState(true);
  const [isSavingSearch, setIsSavingSearch] = useState(false);
  const [saveSearchMessage, setSaveSearchMessage] = useState<string | null>(null);

  useEffect(() => {
    setFilters({
      keyword: searchParams.get('search') || '',
      propertyType: searchParams.get('type') || '',
      propertySubType: searchParams.get('subType') || '',
      listingType: searchParams.get('listingType') || 'SALE',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minBedrooms: searchParams.get('minBedrooms') || '',
      minBathrooms: searchParams.get('minBathrooms') || '',
      minSqft: searchParams.get('minSqft') || '',
      maxSqft: searchParams.get('maxSqft') || '',
      minYearBuilt: searchParams.get('minYearBuilt') || '',
      maxYearBuilt: searchParams.get('maxYearBuilt') || '',
      minParkingSpaces: searchParams.get('minParkingSpaces') || '',
      city: searchParams.get('city') || '',
      state: searchParams.get('state') || '',
      sort: searchParams.get('sort') || 'newest',
    });
    
    const featuresParam = searchParams.get('features');
    setSelectedFeatures(featuresParam ? featuresParam.split(',') : []);
  }, [searchParams]);

  const propertyType = filters.propertyType;
  const listingType = filters.listingType;
  const displayName = propertyType
    ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1)
    : 'Properties';
  const schemaPropertyType = useMemo(
    () => (propertyType ? PROPERTY_TYPE_MAP[propertyType.toLowerCase()] : undefined),
    [propertyType]
  );

  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch listings from backend search API
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const res = await api.search.advanced({
          query: filters.keyword || undefined,
          listingType: filters.listingType || undefined,
          propertyType: schemaPropertyType || undefined,
          propertySubType: filters.propertySubType || undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          bedrooms: filters.minBedrooms ? Number(filters.minBedrooms) : undefined,
          bathrooms: filters.minBathrooms ? Number(filters.minBathrooms) : undefined,
          squareFeetMin: filters.minSqft ? Number(filters.minSqft) : undefined,
          squareFeetMax: filters.maxSqft ? Number(filters.maxSqft) : undefined,
          yearBuiltMin: filters.minYearBuilt ? Number(filters.minYearBuilt) : undefined,
          yearBuiltMax: filters.maxYearBuilt ? Number(filters.maxYearBuilt) : undefined,
          amenities: selectedFeatures.length > 0 ? selectedFeatures : undefined,
          city: filters.city || undefined,
          state: filters.state || undefined,
          sortBy: filters.sort || 'newest',
          page: 1,
          limit: 30,
        });
        setData(res.data);
      } catch (e) {
        setData({ data: [] });
      }
      setIsLoading(false);
    };
    fetchListings();
  }, [filters, selectedFeatures, schemaPropertyType]);

  const filteredListings = useMemo(() => data?.data ?? [], [data]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (filters.keyword) params.set('search', filters.keyword);
    if (filters.propertyType) params.set('type', filters.propertyType);
    if (filters.propertySubType) params.set('subType', filters.propertySubType);
    if (filters.listingType) params.set('listingType', filters.listingType);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minBedrooms) params.set('minBedrooms', filters.minBedrooms);
    if (filters.minBathrooms) params.set('minBathrooms', filters.minBathrooms);
    if (filters.minSqft) params.set('minSqft', filters.minSqft);
    if (filters.maxSqft) params.set('maxSqft', filters.maxSqft);
    if (filters.minYearBuilt) params.set('minYearBuilt', filters.minYearBuilt);
    if (filters.maxYearBuilt) params.set('maxYearBuilt', filters.maxYearBuilt);
    if (filters.minParkingSpaces) params.set('minParkingSpaces', filters.minParkingSpaces);
    if (selectedFeatures.length > 0) params.set('features', selectedFeatures.join(','));
    if (filters.city) params.set('city', filters.city);
    if (filters.state) params.set('state', filters.state);
    if (filters.sort) params.set('sort', filters.sort);

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : '/search');
  };

  const handleReset = () => {
    setFilters({
      keyword: '',
      propertyType: '',
      propertySubType: '',
      listingType: 'SALE',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      minBathrooms: '',
      minSqft: '',
      maxSqft: '',
      minYearBuilt: '',
      maxYearBuilt: '',
      minParkingSpaces: '',
      city: '',
      state: '',
      sort: 'newest',
    });
    setSelectedFeatures([]);
    router.push('/search');
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const getCurrentSearchCriteria = () => {
    const criteria: Record<string, string> = {};

    if (filters.keyword) criteria.search = filters.keyword;
    if (filters.propertyType) criteria.type = filters.propertyType;
    if (filters.propertySubType) criteria.subType = filters.propertySubType;
    if (filters.listingType) criteria.listingType = filters.listingType;
    if (filters.minPrice) criteria.minPrice = filters.minPrice;
    if (filters.maxPrice) criteria.maxPrice = filters.maxPrice;
    if (filters.minBedrooms) criteria.minBedrooms = filters.minBedrooms;
    if (filters.minBathrooms) criteria.minBathrooms = filters.minBathrooms;
    if (filters.minSqft) criteria.minSqft = filters.minSqft;
    if (filters.maxSqft) criteria.maxSqft = filters.maxSqft;
    if (filters.minYearBuilt) criteria.minYearBuilt = filters.minYearBuilt;
    if (filters.maxYearBuilt) criteria.maxYearBuilt = filters.maxYearBuilt;
    if (filters.minParkingSpaces) criteria.minParkingSpaces = filters.minParkingSpaces;
    if (filters.city) criteria.city = filters.city;
    if (filters.state) criteria.state = filters.state;
    if (filters.sort) criteria.sort = filters.sort;
    if (selectedFeatures.length > 0) criteria.features = selectedFeatures.join(',');

    return criteria;
  };

  const handleSaveSearch = async () => {
    if (!user) {
      const query = searchParams.toString();
      const currentPath = query ? `${pathname}?${query}` : pathname || '/search';
      router.push(`/${localePrefix}/login?next=${encodeURIComponent(currentPath)}`);
      return;
    }

    if (!searchName.trim()) {
      return;
    }

    setIsSavingSearch(true);
    setSaveSearchMessage(null);

    try {
      await api.savedSearches.create({
        name: searchName.trim(),
        criteria: getCurrentSearchCriteria(),
        notificationsEnabled: saveNotifications,
        frequency: 'DAILY',
      });

      setSaveSearchMessage(t('searchSavedSuccess'));
      setShowSaveModal(false);
      setSearchName('');
      setSaveNotifications(true);
    } catch (error) {
      setSaveSearchMessage(t('searchSavedError'));
    } finally {
      setIsSavingSearch(false);
    }
  };

  const activeFiltersCount = useMemo(
    () =>
      [
        filters.keyword,
        filters.propertyType,
        filters.propertySubType,
        filters.minPrice,
        filters.maxPrice,
        filters.minBedrooms,
        filters.minBathrooms,
        filters.minSqft,
        filters.maxSqft,
        filters.minYearBuilt,
        filters.maxYearBuilt,
        filters.minParkingSpaces,
        filters.city,
        filters.state,
      ].filter(Boolean).length + selectedFeatures.length,
    [filters, selectedFeatures.length]
  );

  const mapListings = useMemo(
    () =>
      filteredListings
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
    [filteredListings]
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F6F2EC]">

      {/* ── Top bar: breadcrumb + view toggle + result count ── */}
      <div className="shrink-0 bg-white border-b border-[#E8E1D7] px-4 py-3 flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-2 text-sm text-[#9A8B7A]">
          <Link href="/" className="hover:text-[#C9A96A] transition">{t('home')}</Link>
          <span>/</span>
          <span className="text-[#1C1A17] font-medium">{displayName} for {listingType === 'SALE' ? 'Sale' : 'Rent'}</span>
          {!isLoading && (
            <span className="text-[#9A8B7A]">· {filteredListings.length} {filteredListings.length === 1 ? 'property' : 'properties'}</span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition ${
              viewMode === 'grid' ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-[#F6F2EC] text-[#5F5448] hover:bg-[#EDE7DC]'
            }`}
          >
            <Grid3x3 size={15} /> {t('grid')}
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition ${
              viewMode === 'map' ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-[#F6F2EC] text-[#5F5448] hover:bg-[#EDE7DC]'
            }`}
          >
            <Map size={15} /> {t('map')}
          </button>
        </div>
      </div>

      {/* ── Split layout ──────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left panel: filters + listings */}
        <div className="w-full lg:w-[42%] xl:w-[38%] flex flex-col overflow-hidden border-r border-[#E8E1D7]">

          {/* Filters accordion */}
          <SectionBoundary sectionName="Search filters">
          <div className="shrink-0 bg-white border-b border-[#E8E1D7]">
            <details className="group">
              <summary className="flex items-center justify-between px-5 py-3 cursor-pointer select-none list-none">
                <span className="text-sm font-medium text-[#1C1A17] flex items-center gap-2">
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#C9A96A] text-[#1C1A17] text-xs px-2 py-0.5 rounded-full font-semibold">{activeFiltersCount}</span>
                  )}
                </span>
                <svg className="w-4 h-4 text-[#9A8B7A] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </summary>
              <div className="px-5 pb-5">
          <form onSubmit={handleSubmit} className="space-y-5 pt-3">
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm text-[#7A6E60]">
                  {activeFiltersCount} active {activeFiltersCount === 1 ? 'filter' : 'filters'}
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-[#C9A96A] hover:text-[#B78F4A] underline"
                >
                  {t('clearAll')}
                </button>
              </div>
            )}
            {/* Search & Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">Keyword</label>
                <input
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="City, address, or keyword"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">City</label>
                <input
                  name="city"
                  value={filters.city}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="London"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#5F5448] mb-1">State</label>
                <input
                  name="state"
                  value={filters.state}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="LDN"
                />
              </div>
            </div>

          {/* Property Type & Listing Type */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#5F5448] mb-1">Listing Type</label>
              <select
                name="listingType"
                value={filters.listingType}
                onChange={handleFilterChange}
                className="lux-input"
              >
                <option value="SALE">For Sale</option>
                <option value="RENT">For Rent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5F5448] mb-1">Property Type</label>
              <select
                name="propertyType"
                value={filters.propertyType}
                onChange={handleFilterChange}
                className="lux-input"
              >
                <option value="">All types</option>
                <option value="houses">Houses</option>
                <option value="apartments">Apartments</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#5F5448] mb-1">Property Sub-Type</label>
              <select
                name="propertySubType"
                value={filters.propertySubType}
                onChange={handleFilterChange}
                className="lux-input"
              >
                <option value="">All sub-types</option>
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="CONDO">Condo</option>
                <option value="TOWNHOUSE">Townhouse</option>
                <option value="VILLA">Villa</option>
                <option value="STUDIO">Studio</option>
                <option value="DUPLEX">Duplex</option>
                <option value="PENTHOUSE">Penthouse</option>
                <option value="OFFICE">Office</option>
                <option value="RETAIL">Retail</option>
                <option value="WAREHOUSE">Warehouse</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="HOTEL">Hotel</option>
                <option value="RESIDENTIAL_LAND">Residential Land</option>
                <option value="COMMERCIAL_LAND">Commercial Land</option>
                <option value="AGRICULTURAL_LAND">Agricultural Land</option>
                <option value="INDUSTRIAL_LAND">Industrial Land</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-3">Price Range</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="minPrice"
                  type="number"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Min Price (£)"
                />
              </div>
              <div>
                <input
                  name="maxPrice"
                  type="number"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Max Price (£)"
                />
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#5F5448] mb-3">Bedrooms</label>
              <div className="flex flex-wrap gap-2">
                {BEDROOM_OPTIONS.map((bed) => (
                  <button
                    key={bed}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minBedrooms: bed === 'Any' ? '' : bed.replace('+', '') }))}
                    className={`px-4 py-2 rounded-full border transition ${
                      (bed === 'Any' && !filters.minBedrooms) || filters.minBedrooms === bed.replace('+', '')
                        ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]'
                        : 'bg-white text-[#2B2620] border-[#E8E1D7] hover:border-[#C9A96A]'
                    }`}
                  >
                    {bed}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5F5448] mb-3">Bathrooms</label>
              <div className="flex flex-wrap gap-2">
                {BATHROOM_OPTIONS.map((bath) => (
                  <button
                    key={bath}
                    type="button"
                    onClick={() => setFilters(prev => ({ ...prev, minBathrooms: bath === 'Any' ? '' : bath.replace('+', '') }))}
                    className={`px-4 py-2 rounded-full border transition ${
                      (bath === 'Any' && !filters.minBathrooms) || filters.minBathrooms === bath.replace('+', '')
                        ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]'
                        : 'bg-white text-[#2B2620] border-[#E8E1D7] hover:border-[#C9A96A]'
                    }`}
                  >
                    {bath}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Square Feet Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-3">Square Feet</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="minSqft"
                  type="number"
                  value={filters.minSqft}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Min Sqft"
                />
              </div>
              <div>
                <input
                  name="maxSqft"
                  type="number"
                  value={filters.maxSqft}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Max Sqft"
                />
              </div>
            </div>
          </div>

          {/* Year Built Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-3">Year Built</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="minYearBuilt"
                  type="number"
                  value={filters.minYearBuilt}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Min Year (e.g., 2000)"
                />
              </div>
              <div>
                <input
                  name="maxYearBuilt"
                  type="number"
                  value={filters.maxYearBuilt}
                  onChange={handleFilterChange}
                  className="lux-input"
                  placeholder="Max Year (e.g., 2023)"
                />
              </div>
            </div>
          </div>

          {/* Parking Spaces */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-3">Parking Spaces</label>
            <div className="flex flex-wrap gap-2">
              {PARKING_OPTIONS.map((spaces) => (
                <button
                  key={spaces}
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, minParkingSpaces: spaces === 'Any' ? '' : spaces.replace('+', '') }))}
                  className={`px-4 py-2 rounded-full border transition ${
                    (spaces === 'Any' && !filters.minParkingSpaces) || filters.minParkingSpaces === spaces.replace('+', '')
                      ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]'
                      : 'bg-white text-[#2B2620] border-[#E8E1D7] hover:border-[#C9A96A]'
                  }`}
                >
                  {spaces}
                </button>
              ))}
            </div>
          </div>

          {/* Property Features */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-3">Property Features</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {FEATURE_OPTIONS.map((feature) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleFeature(feature.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-[#C9A96A] text-white border-[#C9A96A]'
                      : 'bg-white text-[#2B2620] border-[#E8E1D7] hover:border-[#C9A96A]'
                  }`}
                >
                  {feature.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#5F5448] mb-1">Sort By</label>
            <select
              name="sort"
              value={filters.sort}
              onChange={handleFilterChange}
              className="lux-input max-w-xs"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

            <div className="flex flex-wrap gap-3">
              <button type="submit" className="lux-button">
                {t('applyFilters')}
              </button>
              <button type="button" onClick={handleReset} className="lux-button-outline">
                {t('resetAll')}
              </button>
              {user ? (
                <button
                  type="button"
                  onClick={() => setShowSaveModal(true)}
                  className="lux-button-outline"
                >
                  {t('saveSearch')}
                </button>
              ) : (
                <Link href="/login" className="lux-button-outline">
                  {t('loginToSaveSearch')}
                </Link>
              )}
            </div>
          </form>
              </div>
            </details>
          </div>
          </SectionBoundary>

          <SaveSearchModal
            isOpen={showSaveModal}
            searchName={searchName}
            onSearchNameChange={setSearchName}
            saveNotifications={saveNotifications}
            onSaveNotificationsChange={setSaveNotifications}
            isSavingSearch={isSavingSearch}
            onClose={() => setShowSaveModal(false)}
            onSave={handleSaveSearch}
          />

          {/* Scrollable listings */}
          <SectionBoundary sectionName="Search results">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {/* Save this search — shown when there are results and active filters */}
            {!isLoading && filteredListings.length > 0 && activeFiltersCount > 0 && !saveSearchMessage && (
              <div className="bg-[#F6F2EC] border border-[#E8E1D7] rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-4 h-4 text-[#C9A96A] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                  <span className="text-sm text-[#5F5448] truncate">
                    <strong className="text-[#1C1A17]">{filteredListings.length} properties</strong> match your search
                  </span>
                </div>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A96A] hover:text-[#B78F4A] transition whitespace-nowrap flex-shrink-0 border border-[#C9A96A]/40 hover:border-[#C9A96A] px-3 py-1.5 rounded-lg"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/></svg>
                  Save &amp; get alerts
                </button>
              </div>
            )}
            {saveSearchMessage && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700">
                {saveSearchMessage}
              </div>
            )}

            {isLoading && (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="lux-card h-36 animate-pulse" />
                ))}
              </div>
            )}

            {!isLoading && filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#7A6E60] text-base mb-4">No properties found</p>
                <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold text-sm">
                  ← {t('backToHome')}
                </Link>
              </div>
            )}

            {!isLoading && filteredListings.length > 0 && viewMode === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredListings.map((listing: any) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}

            {!isLoading && filteredListings.length > 0 && viewMode === 'map' && (
              <div className="space-y-3">
                {filteredListings.map((listing: any) => (
                  <button
                    key={listing.id}
                    type="button"
                    onClick={() => setSelectedListing(listing)}
                    className={`w-full text-left lux-card flex gap-3 p-3 transition hover:shadow-md ${selectedListing?.id === listing.id ? 'ring-2 ring-[#C9A96A]' : ''}`}
                  >
                    {listing.images?.[0] && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="font-medium text-[#1C1A17] text-sm truncate">{listing.title}</div>
                      <div className="text-xs text-[#9A8B7A] mt-0.5">{listing.city}, {listing.state}</div>
                      <div className="text-[#C9A96A] font-semibold text-sm mt-1 lux-heading">
                        {listing.isPoa ? 'Price on Application' : `$${Number(listing.price).toLocaleString()}`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          </SectionBoundary>
        </div>

        {/* Right panel: map (always visible on desktop) */}
        <div className="hidden lg:flex flex-1 flex-col overflow-hidden">
          <ListingsMap
            listings={mapListings}
            height="100%"
            onMarkerClick={(listing) => setSelectedListing(listing)}
          />
          {selectedListing && viewMode === 'map' && (
            <div className="absolute bottom-8 right-8 w-72 lux-card p-5 shadow-2xl z-20">
              <h3 className="font-medium text-[#1C1A17] mb-1">{selectedListing.title}</h3>
              <p className="text-sm text-[#7A6E60] mb-3">{selectedListing.address || `${selectedListing.city}, ${selectedListing.state}`}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#C9A96A] font-semibold lux-heading">
                  {selectedListing.isPoa ? 'POA' : `$${Number(selectedListing.price).toLocaleString()}`}
                </span>
                <Link href={`/properties/${selectedListing.id}`} className="lux-button text-xs py-1.5 px-4">
                  View
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading search results...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
