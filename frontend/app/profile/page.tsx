'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useFavorites, useToggleFavorite } from '@/lib/hooks';
import { Heart, LogOut, Shield, Download, Trash2 } from 'lucide-react';
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
  const [gdprConfirmDelete, setGdprConfirmDelete] = useState(false);

  function handleDataExport() {
    const data = {
      exportedAt: new Date().toISOString(),
      account: { email: user?.email, name: `${user?.firstName} ${user?.lastName}`, role: user?.role, createdAt: user?.createdAt },
      savedProperties: favorites?.length || 0,
      note: 'Full data export including activity logs available within 30 days per GDPR Art. 20 on request.',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'my-raxie-zenith-data.json'; a.click();
    URL.revokeObjectURL(url);
  }

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
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-6 py-3 font-semibold rounded-full transition ${
              activeTab === 'privacy'
                ? 'bg-[#C9A96A] text-[#1C1A17]'
                : 'bg-white/70 text-[#1C1A17] border border-[#E8E1D7] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield size={20} />
              Privacy &amp; Data
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
        {/* Privacy & GDPR tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div className="lux-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Download size={18} className="text-[#C9A96A]" />
                <h2 className="text-xl font-semibold text-[#1C1A17]">Export Your Data</h2>
              </div>
              <p className="text-[#5F5448] text-sm mb-4">
                Under GDPR Article 20 (Right to Data Portability), you can request a copy of all personal data we hold about you. Click below to download a summary, or contact us for a full data package within 30 days.
              </p>
              <button
                onClick={handleDataExport}
                className="flex items-center gap-2 lux-button"
              >
                <Download size={16} />
                Download My Data (JSON)
              </button>
            </div>

            <div className="lux-card p-6 border border-red-100">
              <div className="flex items-center gap-2 mb-4">
                <Trash2 size={18} className="text-red-500" />
                <h2 className="text-xl font-semibold text-[#1C1A17]">Delete Account</h2>
              </div>
              <p className="text-[#5F5448] text-sm mb-4">
                Under GDPR Article 17 (Right to Erasure), you may request deletion of your account and all associated data. This action is permanent and cannot be undone.
              </p>
              {!gdprConfirmDelete ? (
                <button
                  onClick={() => setGdprConfirmDelete(true)}
                  className="px-5 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-sm font-semibold transition"
                >
                  Request Account Deletion
                </button>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-700 mb-3 font-medium">Are you sure? This will permanently delete your account, saved properties, and all personal data.</p>
                  <div className="flex gap-3">
                    <a href="mailto:privacy@raxiezenith.com?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20account%3A%20" className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition">
                      Confirm via Email
                    </a>
                    <button onClick={() => setGdprConfirmDelete(false)} className="px-4 py-2 rounded-lg border border-[#E8E1D7] text-sm text-[#5F5448] hover:bg-[#F6F2EC] transition">
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-[#9A8B7A] mt-2">We will process your request within 30 days per GDPR Article 17.</p>
                </div>
              )}
            </div>

            <div className="lux-card p-5 text-sm text-[#5F5448]">
              <p>For any data-related queries, contact our Data Protection Officer: <a href="mailto:privacy@raxiezenith.com" className="text-[#C9A96A] hover:underline">privacy@raxiezenith.com</a></p>
            </div>
          </div>
        )}      </div>
    </div>
    </ProtectedRoute>
  );
}
