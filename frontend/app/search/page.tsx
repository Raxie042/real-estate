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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionBoundary sectionName="Search header">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
              {t('home')}
            </Link>
            <span className="mx-2 text-[#9A8B7A]">/</span>
            <span className="text-[#2B2620] font-semibold">{displayName}</span>
          </div>

          {/* Header */}
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-2">{displayName} for {listingType === 'SALE' ? 'Sale' : 'Rent'}</h1>
              <p className="text-[#7A6E60]">
                {isLoading ? t('loading') : t('foundProperties', { count: filteredListings.length })}
              </p>
            </div>
            {!isLoading && filteredListings.length > 0 && (
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
        </SectionBoundary>

        <SectionBoundary sectionName="Search filters">
          {/* Filters */}
          <form onSubmit={handleSubmit} className="lux-card p-6 mb-10">
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

          {saveSearchMessage && (
            <div className="mb-6 text-sm text-[#5F5448]">
              {saveSearchMessage}
            </div>
          )}

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
        </SectionBoundary>

        <SectionBoundary sectionName="Search results">
          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="lux-card h-96 animate-pulse" />
              ))}
            </div>
          )}

        {/* Results */}
        {!isLoading && filteredListings.length > 0 && viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing: any) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : null}

        {!isLoading && filteredListings.length > 0 && viewMode === 'map' ? (
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
                    View Details
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : null}

          {!isLoading && filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#7A6E60] text-lg mb-4">No properties found</p>
              <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
                ← {t('backToHome')}
              </Link>
            </div>
          ) : null}
        </SectionBoundary>
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
