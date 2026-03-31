'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useFavorites, useToggleFavorite } from '@/lib/hooks';
import { Heart, LogOut } from 'lucide-react';
import PropertyCard from '@/components/properties/PropertyCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTranslations } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';

export default function ProfilePage() {
  const t = useTranslations('ProfilePage');
  const { locale } = usePreferences();
  const { user, logout } = useAuth();
  const { data: favorites, isLoading: favoritesLoading } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();
  const [activeTab, setActiveTab] = useState('favorites');

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile header */}
          <div className="lux-card p-6 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">
                  {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-[#7A6E60]">{user?.email}</p>
                {user?.phone && <p className="text-[#7A6E60]">{user?.phone}</p>}
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B2620] text-[#F4EFE8] hover:bg-[#1C1A17] transition"
              >
                <LogOut size={18} />
                {t('logout')}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E1D7]">
              <div>
                <p className="text-[#7A6E60] text-sm">{t('accountType')}</p>
                <p className="text-lg font-semibold text-[#1C1A17]">{user?.role || t('user')}</p>
              </div>
              <div>
                <p className="text-[#7A6E60] text-sm">{t('memberSince')}</p>
                <p className="text-lg font-semibold text-[#1C1A17]">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(locale) : t('na')}
                </p>
              </div>
              <div>
                <p className="text-[#7A6E60] text-sm">{t('savedProperties')}</p>
                <p className="text-lg font-semibold text-[#1C1A17]">{favorites?.length || 0}</p>
              </div>
            </div>
          </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-6 py-3 font-semibold rounded-full transition ${
              activeTab === 'favorites'
                ? 'bg-[#C9A96A] text-[#1C1A17]'
                : 'bg-white/70 text-[#1C1A17] border border-[#E8E1D7] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart size={20} />
              {t('savedProperties')} ({favorites?.length || 0})
            </div>
          </button>
        </div>

        {/* Favorites tab */}
        {activeTab === 'favorites' && (
          <div>
            {favoritesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="lux-card h-80 animate-pulse" />
                ))}
              </div>
            ) : favorites && favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <PropertyCard listing={favorite.listing} />
                    <button
                      onClick={() =>
                        toggleFavoriteMutation.mutate({
                          listingId: favorite.listing.id,
                          isFavorite: true,
                        })
                      }
                      disabled={toggleFavoriteMutation.isPending}
                      className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition z-10"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lux-card p-12 text-center">
                <Heart size={48} className="mx-auto mb-4 text-[#B9AA98]" />
                <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">{t('emptyTitle')}</h3>
                <p className="text-[#7A6E60] mb-6">
                  {t('emptyBody')}
                </p>
                <Link href="/properties" className="inline-block lux-button">
                  {t('browseProperties')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
  );
}
