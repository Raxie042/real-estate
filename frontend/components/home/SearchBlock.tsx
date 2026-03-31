'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBlock() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceMin) params.append('minPrice', priceMin);
    if (priceMax) params.append('maxPrice', priceMax);
    params.append('listingType', searchType);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="relative bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Type Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm border border-gray-200" role="group">
            <button
              type="button"
              onClick={() => setSearchType('buy')}
              className={`px-8 py-3 text-sm font-medium transition ${
                searchType === 'buy'
                  ? 'bg-[#15120D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } rounded-l-md`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setSearchType('rent')}
              className={`px-8 py-3 text-sm font-medium transition ${
                searchType === 'rent'
                  ? 'bg-[#15120D] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } rounded-r-md border-l border-gray-200`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white shadow-xl rounded-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
            {/* Location */}
            <div className="lg:col-span-2">
              <label htmlFor="location" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, neighborhood, or address"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-gray-900"
              />
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Property Type
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="priceMin" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  id="priceMin"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  placeholder="Min"
                  className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-gray-900"
                />
                <input
                  type="number"
                  id="priceMax"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  placeholder="Max"
                  className="w-full px-3 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="px-6 pb-6">
            <button
              type="submit"
              className="w-full bg-[#15120D] text-white py-4 rounded-md hover:bg-[#C9A96A] hover:text-[#15120D] transition font-medium uppercase tracking-wider text-sm"
            >
              Search Properties
            </button>
          </div>
        </form>

        {/* Quick Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <button
            onClick={() => router.push('/search?location=London')}
            className="text-gray-600 hover:text-[#C9A96A] transition"
          >
            London
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => router.push('/search?location=New York')}
            className="text-gray-600 hover:text-[#C9A96A] transition"
          >
            New York
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => router.push('/search?location=Miami')}
            className="text-gray-600 hover:text-[#C9A96A] transition"
          >
            Miami
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => router.push('/search?location=Paris')}
            className="text-gray-600 hover:text-[#C9A96A] transition"
          >
            Paris
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => router.push('/search')}
            className="text-[#C9A96A] hover:text-[#15120D] transition font-medium"
          >
            More Filters
          </button>
        </div>
      </div>
    </div>
  );
}
