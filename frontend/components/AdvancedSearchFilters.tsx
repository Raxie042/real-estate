'use client';

import React, { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';

export interface SearchFilters {
  priceMin: number;
  priceMax: number;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeetMin: number;
  squareFeetMax: number;
  yearBuiltMin: number;
  yearBuiltMax: number;
  propertyTypes: string[];
  amenities: string[];
}

interface AdvancedSearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onSaveSearch?: (filters: SearchFilters, name: string) => void;
  initialFilters?: Partial<SearchFilters>;
}

const propertyTypes = [
  { value: 'house', label: 'House' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

const amenities = [
  { value: 'pool', label: 'Pool' },
  { value: 'garage', label: 'Garage' },
  { value: 'outdoor_space', label: 'Outdoor Space' },
  { value: 'modern_kitchen', label: 'Modern Kitchen' },
  { value: 'hardwood_floors', label: 'Hardwood Floors' },
  { value: 'fireplace', label: 'Fireplace' },
];

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  onFiltersChange,
  onSaveSearch,
  initialFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [filters, setFilters] = useState<SearchFilters>({
    priceMin: initialFilters?.priceMin || 0,
    priceMax: initialFilters?.priceMax || 5000000,
    bedrooms: initialFilters?.bedrooms || null,
    bathrooms: initialFilters?.bathrooms || null,
    squareFeetMin: initialFilters?.squareFeetMin || 0,
    squareFeetMax: initialFilters?.squareFeetMax || 10000,
    yearBuiltMin: initialFilters?.yearBuiltMin || 1900,
    yearBuiltMax: initialFilters?.yearBuiltMax || 2026,
    propertyTypes: initialFilters?.propertyTypes || [],
    amenities: initialFilters?.amenities || [],
  });

  const handleFilterChange = useCallback((newFilters: Partial<SearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  }, [filters, onFiltersChange]);

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      handleFilterChange({ priceMin: Math.min(value, filters.priceMax) });
    } else {
      handleFilterChange({ priceMax: Math.max(value, filters.priceMin) });
    }
  };

  const handlePropertyTypeToggle = (type: string) => {
    const updated = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter(t => t !== type)
      : [...filters.propertyTypes, type];
    handleFilterChange({ propertyTypes: updated });
  };

  const handleAmenityToggle = (amenity: string) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    handleFilterChange({ amenities: updated });
  };

  const handleSaveSearch = async () => {
    if (!searchName.trim() || !onSaveSearch) return;

    setIsSaving(true);
    try {
      await onSaveSearch(filters, searchName.trim());
      setShowSaveModal(false);
      setSearchName('');
    } finally {
      setIsSaving(false);
    }
  };

  const resetFilters = () => {
    const defaults: SearchFilters = {
      priceMin: 0,
      priceMax: 5000000,
      bedrooms: null,
      bathrooms: null,
      squareFeetMin: 0,
      squareFeetMax: 10000,
      yearBuiltMin: 1900,
      yearBuiltMax: 2026,
      propertyTypes: [],
      amenities: [],
    };
    setFilters(defaults);
    onFiltersChange(defaults);
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[#E8E1D7] shadow-sm">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F6F2EC] transition"
      >
        <h3 className="text-lg font-semibold text-[#1C1A17]">Advanced Filters</h3>
        <svg
          className={`w-5 h-5 text-[#7A6E60] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-[#E8E1D7] space-y-6 bg-[#FDFBF7]">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-[#1C1A17] mb-3">
              Price Range
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  value={filters.priceMin}
                  onChange={(e) => handlePriceChange('min', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  Min: ${filters.priceMin.toLocaleString()}
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  value={filters.priceMax}
                  onChange={(e) => handlePriceChange('max', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  Max: ${filters.priceMax.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms ?? ''}
                onChange={(e) => handleFilterChange({ bedrooms: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 border border-[#E8E1D7] rounded-lg text-[#1C1A17] focus:outline-none focus:border-[#C9A96A]"
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                Bathrooms
              </label>
              <select
                value={filters.bathrooms ?? ''}
                onChange={(e) => handleFilterChange({ bathrooms: e.target.value ? parseFloat(e.target.value) : null })}
                className="w-full px-3 py-2 border border-[#E8E1D7] rounded-lg text-[#1C1A17] focus:outline-none focus:border-[#C9A96A]"
              >
                <option value="">Any</option>
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}+
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Square Footage */}
          <div>
            <label className="block text-sm font-medium text-[#1C1A17] mb-3">
              Square Footage
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.squareFeetMin}
                  onChange={(e) => handleFilterChange({ squareFeetMin: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  Min: {filters.squareFeetMin.toLocaleString()} sqft
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.squareFeetMax}
                  onChange={(e) => handleFilterChange({ squareFeetMax: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  Max: {filters.squareFeetMax.toLocaleString()} sqft
                </div>
              </div>
            </div>
          </div>

          {/* Year Built */}
          <div>
            <label className="block text-sm font-medium text-[#1C1A17] mb-3">
              Year Built
            </label>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="range"
                  min="1900"
                  max="2026"
                  value={filters.yearBuiltMin}
                  onChange={(e) => handleFilterChange({ yearBuiltMin: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  From: {filters.yearBuiltMin}
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="range"
                  min="1900"
                  max="2026"
                  value={filters.yearBuiltMax}
                  onChange={(e) => handleFilterChange({ yearBuiltMax: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="text-xs text-[#7A6E60] mt-1">
                  To: {filters.yearBuiltMax}
                </div>
              </div>
            </div>
          </div>

          {/* Property Types */}
          <div>
            <label className="block text-sm font-medium text-[#1C1A17] mb-3">
              Property Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {propertyTypes.map((type) => (
                <label key={type.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.propertyTypes.includes(type.value)}
                    onChange={() => handlePropertyTypeToggle(type.value)}
                    className="w-4 h-4 rounded border-[#E8E1D7]"
                  />
                  <span className="text-sm text-[#1C1A17]">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-[#1C1A17] mb-3">
              Amenities
            </label>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity) => (
                <label key={amenity.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity.value)}
                    onChange={() => handleAmenityToggle(amenity.value)}
                    className="w-4 h-4 rounded border-[#E8E1D7]"
                  />
                  <span className="text-sm text-[#1C1A17]">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E8E1D7]">
            <button
              onClick={resetFilters}
              className="flex-1 px-4 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition text-sm font-medium"
            >
              Reset Filters
            </button>

            {onSaveSearch && (
              <button
                onClick={() => setShowSaveModal(true)}
                className="flex-1 px-4 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B8956A] transition text-sm font-medium flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                Save Search
              </button>
            )}
          </div>
        </div>
      )}

      {/* Save Search Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Save This Search</h3>

            <input
              type="text"
              placeholder="e.g., 'Luxury homes under $500k'"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg text-[#1C1A17] placeholder-[#A39F95] focus:outline-none focus:border-[#C9A96A] mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 px-4 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSearch}
                disabled={isSaving || !searchName.trim()}
                className="flex-1 px-4 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B8956A] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilters;
