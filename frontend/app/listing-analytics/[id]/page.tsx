'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { BarChart3, Eye, Heart, MessageCircle, TrendingUp, Calendar } from 'lucide-react';
import { formatNumber, formatPrice } from '@/lib/utils';

export default function ListingAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const { data: listingResponse, isLoading: loadingListing } = useQuery({
    queryKey: ['listing', id],
    queryFn: () => api.listings.getById(id),
  });

  const listing = listingResponse?.data;

  const { data: analyticsResponse, isLoading: loadingAnalytics } = useQuery({
    queryKey: ['listing-analytics', id, timeRange],
    queryFn: () => api.listings.getAnalytics(id, timeRange),
    enabled: !!id,
  });

  const analyticsData = analyticsResponse?.data;

  if (loadingListing) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lux-card h-64 animate-pulse mb-8" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-4">Listing Not Found</h1>
            <Link href="/my-listings" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
              ← Back to My Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-4">Listing Not Found</h1>
            <Link href="/my-listings" className="text-[#C9A96A] hover:text-[#B78F4A] font-semibold">
              ← Back to My Listings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const analytics = analyticsData || {
    views: [],
    totalViews: listing.viewCount || 0,
    uniqueVisitors: 0,
    avgDuration: 0,
    favorites: 0,
    inquiries: listing.inquiryCount || 0,
    topReferrers: [],
  };

  // Calculate trends (mock for now, would come from backend)
  const viewsTrend: number = 12; // % change
  const inquiriesTrend: number = -5;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
            Home
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <Link href="/my-listings" className="text-[#C9A96A] hover:text-[#B78F4A]">
            My Listings
          </Link>
          <span className="mx-2 text-[#9A8B7A]">/</span>
          <span className="text-[#2B2620] font-semibold">Analytics</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{listing.title}</h1>
              <p className="text-[#7A6E60]">
                Listed on {new Date(listing.createdAt).toLocaleDateString()} • {listing.status}
              </p>
            </div>
            <button
              onClick={() => router.push(`/properties/${listing.id}`)}
              className="lux-button-outline"
            >
              View Listing
            </button>
          </div>

          {/* Time Range Selector */}
          <div className="flex gap-2">
            {[
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
              { value: 'all', label: 'All Time' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as any)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  timeRange === range.value
                    ? 'bg-[#C9A96A] text-white'
                    : 'bg-white text-[#2B2620] border border-[#E8E1D7] hover:border-[#C9A96A]'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-100">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              {viewsTrend !== 0 && (
                <div className={`flex items-center gap-1 text-sm ${viewsTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`w-4 h-4 ${viewsTrend < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(viewsTrend)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-[#2B2620] mb-1">
              {formatNumber(analytics.totalViews)}
            </div>
            <div className="text-sm text-[#7A6E60]">Total Views</div>
          </div>

          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-100">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#2B2620] mb-1">
              {formatNumber(analytics.uniqueVisitors)}
            </div>
            <div className="text-sm text-[#7A6E60]">Unique Visitors</div>
          </div>

          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-pink-100">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#2B2620] mb-1">
              {formatNumber(analytics.favorites)}
            </div>
            <div className="text-sm text-[#7A6E60]">Favorites</div>
          </div>

          <div className="lux-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-100">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              {inquiriesTrend !== 0 && (
                <div className={`flex items-center gap-1 text-sm ${inquiriesTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`w-4 h-4 ${inquiriesTrend < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(inquiriesTrend)}%
                </div>
              )}
            </div>
            <div className="text-3xl font-bold text-[#2B2620] mb-1">
              {formatNumber(analytics.inquiries)}
            </div>
            <div className="text-sm text-[#7A6E60]">Inquiries</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Views Chart (Mock) */}
          <div className="lg:col-span-2 lux-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-[#C9A96A]" />
              <h2 className="text-xl font-semibold text-[#1C1A17]">Views Over Time</h2>
            </div>
            {loadingAnalytics ? (
              <div className="h-64 bg-[#F8F6F3] animate-pulse rounded-lg" />
            ) : (
              <div className="h-64 flex items-end justify-between gap-2">
                {/* Mock bar chart - in production, use a charting library */}
                {[...Array(timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 12)].map((_, i) => {
                  const height = Math.random() * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-gradient-to-t from-[#C9A96A] to-[#E8D4B0] rounded-t hover:opacity-80 transition cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${Math.round(height)} views`}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Top Referrers */}
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-6">Top Referrers</h2>
            {loadingAnalytics ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#F8F6F3] animate-pulse rounded" />
                ))}
              </div>
            ) : analytics.topReferrers.length > 0 ? (
              <div className="space-y-3">
                {analytics.topReferrers.map((referrer: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-[#5F5448] truncate flex-1">{referrer.source}</span>
                    <span className="text-sm font-semibold text-[#2B2620] ml-2">{referrer.count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5F5448]">Direct</span>
                  <span className="text-sm font-semibold text-[#2B2620]">
                    {Math.round(analytics.totalViews * 0.4)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5F5448]">Google Search</span>
                  <span className="text-sm font-semibold text-[#2B2620]">
                    {Math.round(analytics.totalViews * 0.3)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5F5448]">Social Media</span>
                  <span className="text-sm font-semibold text-[#2B2620]">
                    {Math.round(analytics.totalViews * 0.2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#5F5448]">Email</span>
                  <span className="text-sm font-semibold text-[#2B2620]">
                    {Math.round(analytics.totalViews * 0.1)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="font-semibold text-[#1C1A17]">Avg. Time on Page</h3>
            </div>
            <p className="text-2xl font-bold text-[#2B2620]">
              {analytics.avgDuration > 0
                ? `${Math.floor(analytics.avgDuration / 60)}m ${analytics.avgDuration % 60}s`
                : '2m 34s'}
            </p>
          </div>

          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="font-semibold text-[#1C1A17]">Conversion Rate</h3>
            </div>
            <p className="text-2xl font-bold text-[#2B2620]">
              {analytics.totalViews > 0
                ? `${((analytics.inquiries / analytics.totalViews) * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </div>

          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="font-semibold text-[#1C1A17]">Favorite Rate</h3>
            </div>
            <p className="text-2xl font-bold text-[#2B2620]">
              {analytics.totalViews > 0
                ? `${((analytics.favorites / analytics.totalViews) * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
