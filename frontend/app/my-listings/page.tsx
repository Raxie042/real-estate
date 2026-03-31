'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Edit2, Trash2, Plus, Eye, EyeOff, Search, X, Calendar, FileText, MessageSquare, Tag } from 'lucide-react';
import api from '@/lib/api';
import { useMyListings } from '@/lib/hooks';
import { formatNumber, formatPrice } from '@/lib/utils';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Listing {
  id: string;
  title: string;
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  price: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  status: string;
  images?: string[] | string;
  createdAt: string;
}

export default function MyListingsPage() {
      // Bulk publish mutation

      // Bulk publish mutation
      const bulkPublishMutation = useMutation({
        mutationFn: async (publish: boolean) => {
          // You may need to add this endpoint in your backend
          // For now, use Promise.all to publish each listing
          return Promise.all(Array.from(selectedListings).map(id => publish ? api.listings.publish(id) : api.listings.unpublish(id)));
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['myListings'] });
          setSelectedListings(new Set());
        },
      });

      // Bulk delete mutation
      const bulkDeleteMutation = useMutation({
        mutationFn: async () => {
          return Promise.all(Array.from(selectedListings).map(id => api.listings.delete(id)));
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['myListings'] });
          setSelectedListings(new Set());
        },
      });

      // Single publish mutation
      const publishMutation = useMutation({
        mutationFn: async ({ id, publish }: { id: string; publish: boolean }) => {
          return publish ? api.listings.publish(id) : api.listings.unpublish(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['myListings'] });
        },
      });

      // Single delete mutation
      const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
          return api.listings.delete(id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['myListings'] });
        },
      });

      // Handler functions
      function handleBulkPublish(publish: boolean) {
        bulkPublishMutation.mutate(publish);
      }

      function handleBulkDelete() {
        bulkDeleteMutation.mutate();
      }

      function handlePublish(id: string, publish: boolean) {
        publishMutation.mutate({ id, publish: !publish });
      }

      function handleDelete(id: string) {
        deleteMutation.mutate(id);
      }
    // Helper for status color
    function getStatusColor(status: string) {
      switch (status) {
        case 'ACTIVE':
          return 'bg-green-100 text-green-700';
        case 'DRAFT':
          return 'bg-yellow-100 text-yellow-700';
        case 'PENDING':
          return 'bg-orange-100 text-orange-700';
        case 'SOLD':
          return 'bg-gray-100 text-gray-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    }
  const queryClient = useQueryClient();
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedListings, setSelectedListings] = useState<Set<string>>(new Set());

  // Fetch user's listings
  const { data, isLoading } = useMyListings({ limit: 100 });
  const listings: Listing[] = data?.data || [];

  // Filter and search listings
  // ...existing code...

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-[#1C1A17]">My Listings</h1>
              <p className="text-[#7A6E60] mt-2">Manage your property listings</p>
            </div>
            <Link href="/list-property" className="flex items-center gap-2 lux-button">
              <Plus size={20} />
              List New Property
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8B7A] w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 lux-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8B7A] hover:text-[#1C1A17]"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Status filter tabs */}
            <div className="flex flex-wrap gap-2">
              {['ALL', 'ACTIVE', 'DRAFT', 'PENDING', 'SOLD'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                    statusFilter === status
                      ? 'bg-[#C9A96A] text-white'
                      : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'
                  }`}
                >
                  {status === 'ALL' ? 'All' : status}
                  {status !== 'ALL' && (
                    <span className="ml-1.5 text-xs opacity-75">
                      ({listings.filter((l: Listing) => l.status === status).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bulk actions */}
              {selectedListings.size > 0 && (
                <div className="flex items-center justify-between bg-[#F6F2EC] border border-[#E8E1D7] rounded-xl p-4">
                  <p className="text-sm font-medium text-[#1C1A17]">
                    {selectedListings.size} listing{selectedListings.size > 1 ? 's' : ''} selected
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkPublish(true)}
                      disabled={bulkPublishMutation.isPending}
                      className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 rounded-lg transition"
                    >
                      Publish
                    </button>
                    <button
                      onClick={() => handleBulkPublish(false)}
                      disabled={bulkPublishMutation.isPending}
                      className="px-4 py-2 text-sm font-medium bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-lg transition"
                    >
                      Unpublish
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      disabled={bulkDeleteMutation.isPending}
                      className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 rounded-lg transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedListings(new Set())}
                      className="px-4 py-2 text-sm font-medium bg-white border border-[#E8E1D7] text-[#5F5448] hover:bg-[#F6F2EC] rounded-lg transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Stats with Phase 2 Features */}
            {listings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                <div className="lux-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#C9A96A]" />
                    <p className="text-[#7A6E60] text-sm">Total Listings</p>
                  </div>
                  <p className="text-2xl font-semibold text-[#1C1A17]">{listings.length}</p>
                </div>
                <div className="lux-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-green-600" />
                    <p className="text-[#7A6E60] text-sm">Active</p>
                  </div>
                  <p className="text-2xl font-semibold text-green-600">
                    {listings.filter((l: Listing) => l.status === 'ACTIVE').length}
                  </p>
                </div>
                <div className="lux-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-yellow-600" />
                    <p className="text-[#7A6E60] text-sm">Draft</p>
                  </div>
                  <p className="text-2xl font-semibold text-yellow-600">
                    {listings.filter((l: Listing) => l.status === 'DRAFT').length}
                  </p>
                </div>
                <div className="lux-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#C9A96A]" />
                    <p className="text-[#7A6E60] text-sm">Open Houses</p>
                  </div>
                  <p className="text-2xl font-semibold text-[#C9A96A]">0</p>
                  <p className="text-xs text-[#9A8B7A] mt-1">Upcoming</p>
                </div>
                <div className="lux-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    <p className="text-[#7A6E60] text-sm">Pending Offers</p>
                  </div>
                  <p className="text-2xl font-semibold text-blue-600">0</p>
                  <p className="text-xs text-[#9A8B7A] mt-1">Awaiting review</p>
                </div>
              </div>
            )}

            {/* Listings Table */}
            {isLoading ? (
              <div className="lux-card p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-[#EFE8DD] rounded-xl" />
                  ))}
                </div>
              </div>
            ) : listings.length > 0 ? (
              <div className="lux-card overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#F6F2EC] border-b border-[#E8E1D7]">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">
                        Listed
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-[#1C1A17]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8E1D7]">
                    {listings.map((listing: Listing) => {
                      const images = Array.isArray(listing.images)
                        ? listing.images
                        : listing.images
                          ? [listing.images]
                          : [];
                      const addressLine = [listing.addressLine1, listing.addressLine2]
                        .filter(Boolean)
                        .join(' ');
                      const location = [listing.city, listing.state].filter(Boolean).join(', ');

                      return (
                      <tr key={listing.id} className="hover:bg-[#F6F2EC] transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                                    {images.length > 0 && (
                              <Image
                                    src={images[0]}
                            alt={listing.title}
                            width={48}
                            height={48}
                            unoptimized
                            className="w-12 h-12 object-cover rounded-lg border border-[#E8E1D7]"
                          />
                        )}
                        <div>
                          <Link
                            href={`/properties/${listing.id}`}
                            className="text-sm font-medium text-[#1C1A17] hover:text-[#C9A96A]"
                          >
                            {listing.title}
                          </Link>
                          <p className="text-xs text-[#7A6E60]">
                                    {listing.bedrooms ?? 'N/A'} bed • {listing.bathrooms ?? 'N/A'} bath •{' '}
                                    {listing.sqft ? formatNumber(Number(listing.sqft)) : 'N/A'} sqft
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#1C1A17]">
                                {location || 'Location unavailable'}
                      </p>
                              <p className="text-xs text-[#7A6E60]">{addressLine || 'Address unavailable'}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-[#1C1A17]">
                                {formatPrice(Number(listing.price), listing.currency)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-[#7A6E60]" title="Offers">
                          <Tag className="w-3.5 h-3.5" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#7A6E60]" title="Open Houses">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#7A6E60]" title="Documents">
                          <FileText className="w-3.5 h-3.5" />
                          <span>0</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#7A6E60]">
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            handlePublish(listing.id, listing.status === 'ACTIVE')
                          }
                          disabled={publishMutation.isPending}
                          className={`p-2 rounded-lg transition ${
                            listing.status === 'ACTIVE'
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-green-50 text-green-600 hover:bg-green-100'
                          }`}
                          title={
                            listing.status === 'ACTIVE'
                              ? 'Unpublish'
                              : 'Publish'
                          }
                        >
                          {listing.status === 'ACTIVE' ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                        <Link
                          href={`/edit-listing/${listing.id}`}
                          className="p-2 rounded-lg bg-[#F6F2EC] text-[#8B7D6A] hover:bg-[#EFE8DD] transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(listing.id)}
                          disabled={deleteMutation.isPending}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="lux-card p-12 text-center">
            <Plus size={48} className="mx-auto mb-4 text-[#B9AA98]" />
            <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">No listings yet</h3>
            <p className="text-[#7A6E60] mb-6">
              Start by creating your first property listing
            </p>
            <Link href="/list-property" className="inline-block lux-button">
              Create Your First Listing
            </Link>
          </div>
        )}
          </div>
        </div>
      </ProtectedRoute>
    );
  }
