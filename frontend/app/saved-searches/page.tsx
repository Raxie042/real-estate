'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Bell, BellOff, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';

interface SavedSearch {
  id: string;
  name: string;
  filters: any;
  isActive: boolean;
  createdAt: string;
}

export default function SavedSearchesPage() {
  const t = useTranslations('SavedSearches');
  const { locale } = usePreferences();
  const queryClient = useQueryClient();

  const { data: searches = [], isLoading } = useQuery<SavedSearch[]>({
    queryKey: ['saved-searches'],
    queryFn: async () => {
      const response = await api.savedSearches.getAll();
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.savedSearches.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
    },
  });

  const toggleNotificationsMutation = useMutation({
    mutationFn: (id: string) => api.savedSearches.toggleNotifications(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-searches'] });
    },
  });

  const buildSearchUrl = (filters: any) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, String(value));
    });
    return `/search?${params.toString()}`;
  };

  const formatCriteria = (filters: any) => {
    const parts = [];
    if (filters.city) parts.push(filters.city);
    if (filters.propertyType) parts.push(filters.propertyType);
    if (filters.minPrice) parts.push(`$${Number(filters.minPrice).toLocaleString()}+`);
    if (filters.minBedrooms) parts.push(`${filters.minBedrooms}+ beds`);
    return parts.join(' • ');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{t('title')}</h1>
            <p className="text-[#7A6E60]">{t('subtitle')}</p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="lux-card h-24 animate-pulse" />
              ))}
            </div>
          ) : searches.length === 0 ? (
            <div className="lux-card p-12 text-center">
              <Search className="w-16 h-16 text-[#B9AA98] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">{t('emptyTitle')}</h3>
              <p className="text-[#7A6E60] mb-6">
                {t('emptyBody')}
              </p>
              <Link href="/search" className="lux-button">
                {t('startSearching')}
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {searches.map((search: SavedSearch) => (
                <div
                  key={search.id}
                  className="lux-card p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={buildSearchUrl(search.filters)}
                        className="text-lg font-semibold text-[#1C1A17] hover:text-[#C9A96A] mb-2 block"
                      >
                        {search.name}
                      </Link>
                      <p className="text-sm text-[#7A6E60] mb-3">
                        {formatCriteria(search.filters)}
                      </p>
                      <p className="text-xs text-[#9A8B7A]">
                        {t('savedOn')} {new Date(search.createdAt).toLocaleDateString(locale)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleNotificationsMutation.mutate(search.id)}
                        disabled={toggleNotificationsMutation.isPending}
                        className={`p-2 rounded-lg transition ${
                          search.isActive
                            ? 'bg-[#C9A96A] text-white hover:bg-[#B78F4A]'
                            : 'bg-[#F6F2EC] text-[#7A6E60] hover:bg-[#EFE8DD]'
                        }`}
                        title={search.isActive ? t('disableNotifications') : t('enableNotifications')}
                      >
                        {search.isActive ? (
                          <Bell className="w-5 h-5" />
                        ) : (
                          <BellOff className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(t('confirmDelete'))) {
                            deleteMutation.mutate(search.id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        title={t('delete')}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
