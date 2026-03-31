'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import PropertyCard from '@/components/properties/PropertyCard';
import { ArrowRight, X } from 'lucide-react';

interface ComparisonListing {
  id: string;
  title: string;
  price: number;
  currency: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  yearBuilt?: number;
  lotSize?: number;
  city: string;
  state?: string;
  images?: string[];
  features?: string[];
}

export default function ComparisonPage() {
  const [selectedListings, setSelectedListings] = useState<string[]>([]);

  const { data: listings = [] } = useQuery<ComparisonListing[]>({
    queryKey: ['comparison', selectedListings],
    queryFn: async () => {
      if (selectedListings.length === 0) return [];
      const promises = selectedListings.map(id =>
        api.listings.getById(id).then(res => res.data)
      );
      return Promise.all(promises);
    },
    enabled: selectedListings.length > 0,
  });

  const handleRemove = (id: string) => {
    setSelectedListings(prev => prev.filter(listingId => listingId !== id));
  };

  const comparisonFields = [
    { key: 'price', label: 'Price', format: (val: any, currency: string) => `${currency} ${Number(val).toLocaleString()}` },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'bathrooms', label: 'Bathrooms' },
    { key: 'sqft', label: 'Square Feet', format: (val: any) => Number(val).toLocaleString() },
    { key: 'yearBuilt', label: 'Year Built' },
    { key: 'lotSize', label: 'Lot Size', format: (val: any) => `${Number(val).toLocaleString()} sqft` },
    { key: 'city', label: 'City' },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Property Comparison</h1>
            <p className="text-[#7A6E60]">Compare up to 4 properties side-by-side</p>
          </div>

          {listings.length === 0 ? (
            <div className="lux-card p-12 text-center">
              <p className="text-[#7A6E60] mb-4">No properties selected for comparison</p>
              <a href="/properties" className="lux-button">
                Browse Properties
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Property Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {listings.map((listing: ComparisonListing) => (
                  <div key={listing.id} className="relative">
                    <button
                      onClick={() => handleRemove(listing.id)}
                      className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <PropertyCard listing={listing} />
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="lux-card overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F6F2EC]">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Feature</th>
                      {listings.map((listing: ComparisonListing) => (
                        <th key={listing.id} className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                          {listing.title.slice(0, 20)}...
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E1D7]">
                    {comparisonFields.map((field) => (
                      <tr key={field.key} className="hover:bg-[#F8F6F3]">
                        <td className="px-4 py-3 text-sm font-medium text-[#5F5448]">{field.label}</td>
                        {listings.map((listing: any) => {
                          const value = listing[field.key];
                          const formattedValue = field.format
                            ? field.format(value, listing.currency)
                            : value || 'N/A';
                          return (
                            <td key={listing.id} className="px-4 py-3 text-sm text-[#1C1A17]">
                              {formattedValue}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
