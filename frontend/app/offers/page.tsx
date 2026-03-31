'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Clock, DollarSign, FileText, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useToast } from '@/lib/toast';
import { formatPrice } from '@/lib/utils';
import api from '@/lib/api';
import { useTranslations } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';

interface Offer {
  id: string;
  listing: {
    id: string;
    title: string;
    price: number;
    currency: string;
    images: string[];
  };
  buyer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  amount: number;
  currency: string;
  status: string;
  message?: string;
  conditions?: any;
  createdAt: string;
  expiresAt?: string;
}

export default function OffersPage() {
  const t = useTranslations('OffersPage');
  const { locale, preferences } = usePreferences();
  const currency = preferences.currency;
  const { success, error: showError } = useToast();
  const queryClient = useQueryClient();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [counterAmount, setCounterAmount] = useState<number>(0);
  const [counterMessage, setCounterMessage] = useState('');

  const { data: offers, isLoading } = useQuery({
    queryKey: ['my-offers'],
    queryFn: async () => {
      const response = await api.offers.getMine();
      return response.data as Offer[];
    },
  });

  const respondMutation = useMutation({
    mutationFn: async ({
      offerId,
      action,
      counterAmount,
      counterMessage,
    }: {
      offerId: string;
      action: 'accept' | 'reject' | 'counter';
      counterAmount?: number;
      counterMessage?: string;
    }) => {
      if (action === 'accept') {
        return api.offers.accept(offerId);
      } else if (action === 'reject') {
        return api.offers.reject(offerId, { message: counterMessage });
      } else {
        return api.offers.counter(offerId, {
          counterAmount,
          counterMessage,
        });
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['my-offers'] });
      setSelectedOffer(null);
      setCounterAmount(0);
      setCounterMessage('');
      
      if (variables.action === 'accept') {
        success(t('toastAccepted'));
      } else if (variables.action === 'reject') {
        success(t('toastRejected'));
      } else {
        success(t('toastCounterSent'));
      }
    },
    onError: () => {
      showError(t('toastRespondFailed'));
    },
  });

  const activeOffers = offers?.filter((o) => o.status === 'PENDING') || [];
  const acceptedOffers = offers?.filter((o) => o.status === 'ACCEPTED') || [];
  const rejectedOffers = offers?.filter((o) => o.status === 'REJECTED') || [];
  const expiredOffers = offers?.filter((o) => o.status === 'EXPIRED') || [];

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{t('title')}</h1>
            <p className="text-[#7A6E60]">{t('subtitle')}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <p className="text-[#7A6E60] text-sm">{t('status.PENDING')}</p>
              </div>
              <p className="text-2xl font-semibold text-orange-500">{activeOffers.length}</p>
            </div>
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-[#7A6E60] text-sm">{t('status.ACCEPTED')}</p>
              </div>
              <p className="text-2xl font-semibold text-green-500">{acceptedOffers.length}</p>
            </div>
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <p className="text-[#7A6E60] text-sm">{t('status.REJECTED')}</p>
              </div>
              <p className="text-2xl font-semibold text-red-500">{rejectedOffers.length}</p>
            </div>
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#7A6E60]" />
                <p className="text-[#7A6E60] text-sm">{t('status.EXPIRED')}</p>
              </div>
              <p className="text-2xl font-semibold text-[#7A6E60]">{expiredOffers.length}</p>
            </div>
          </div>

          {/* Offers List */}
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="lux-card p-6 animate-pulse">
                  <div className="h-24 bg-[#EFE8DD] rounded" />
                </div>
              ))}
            </div>
          ) : !offers || offers.length === 0 ? (
            <div className="lux-card p-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-[#B9AA98]" />
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-2">{t('noOffersTitle')}</h3>
              <p className="text-[#7A6E60]">{t('noOffersBody')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pending Offers */}
              {activeOffers.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('pendingOffers')}</h2>
                  <div className="space-y-4">
                    {activeOffers.map((offer) => (
                      <OfferCard
                        key={offer.id}
                        offer={offer}
                        onRespond={() => setSelectedOffer(offer)}
                        locale={locale}
                        currency={currency}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Accepted Offers */}
              {acceptedOffers.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('acceptedOffers')}</h2>
                  <div className="space-y-4">
                    {acceptedOffers.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} locale={locale} currency={currency} />
                    ))}
                  </div>
                </div>
              )}

              {/* Other Offers */}
              {(rejectedOffers.length > 0 || expiredOffers.length > 0) && (
                <div>
                  <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('pastOffers')}</h2>
                  <div className="space-y-4">
                    {[...rejectedOffers, ...expiredOffers].map((offer) => (
                      <OfferCard key={offer.id} offer={offer} locale={locale} currency={currency} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Respond Modal */}
          {selectedOffer && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
                <h3 className="text-2xl font-semibold text-[#1C1A17] mb-4">{t('respondToOffer')}</h3>
                
                <div className="mb-6">
                  <p className="text-sm text-[#7A6E60] mb-1">{t('property')}</p>
                  <p className="font-semibold text-[#1C1A17]">{selectedOffer.listing.title}</p>
                  <p className="text-sm text-[#7A6E60]">
                    {t('listedAt')} {formatPrice(selectedOffer.listing.price, selectedOffer.listing.currency || currency, locale)}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#7A6E60] mb-1">{t('buyer')}</p>
                  <p className="font-semibold text-[#1C1A17]">
                    {selectedOffer.buyer.firstName} {selectedOffer.buyer.lastName}
                  </p>
                  <p className="text-sm text-[#7A6E60]">{selectedOffer.buyer.email}</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-[#7A6E60] mb-1">{t('offerAmount')}</p>
                  <p className="text-3xl font-semibold text-[#C9A96A]">
                    {formatPrice(Number(selectedOffer.amount), selectedOffer.currency || currency, locale)}
                  </p>
                </div>

                {selectedOffer.message && (
                  <div className="mb-6 p-4 bg-[#F6F2EC] rounded-lg">
                    <p className="text-sm text-[#7A6E60] mb-1">{t('message')}</p>
                    <p className="text-[#1C1A17]">{selectedOffer.message}</p>
                  </div>
                )}

                  {/* Counter Offer Section */}
                <div className="mb-6 p-4 border border-[#E8E1D7] rounded-lg">
                  <h4 className="font-semibold text-[#1C1A17] mb-3">{t('sendCounterOffer')}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1C1A17] mb-1">
                        {t('counterAmount')}
                      </label>
                      <input
                        type="number"
                        value={counterAmount || ''}
                        onChange={(e) => setCounterAmount(Number(e.target.value))}
                        className="w-full lux-input"
                        placeholder={t('counterAmountPlaceholder')}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1C1A17] mb-1">
                        {t('messageOptional')}
                      </label>
                      <textarea
                        value={counterMessage}
                        onChange={(e) => setCounterMessage(e.target.value)}
                        className="w-full lux-input"
                        rows={3}
                        placeholder={t('counterMessagePlaceholder')}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      respondMutation.mutate({ offerId: selectedOffer.id, action: 'accept' })
                    }
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium disabled:opacity-50"
                  >
                    {t('acceptOffer')}
                  </button>
                  <button
                    onClick={() =>
                      counterAmount > 0
                        ? respondMutation.mutate({
                            offerId: selectedOffer.id,
                            action: 'counter',
                            counterAmount,
                            counterMessage,
                          })
                        : null
                    }
                    disabled={!counterAmount || respondMutation.isPending}
                    className="flex-1 bg-[#C9A96A] text-white py-3 rounded-lg hover:bg-[#B78F4A] transition font-medium disabled:opacity-50"
                  >
                    {t('sendCounter')}
                  </button>
                  <button
                    onClick={() =>
                      respondMutation.mutate({ offerId: selectedOffer.id, action: 'reject' })
                    }
                    disabled={respondMutation.isPending}
                    className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium disabled:opacity-50"
                  >
                    {t('reject')}
                  </button>
                  <button
                    onClick={() => setSelectedOffer(null)}
                    className="px-6 py-3 border border-[#E8E1D7] rounded-lg hover:bg-[#F6F2EC] transition"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

function OfferCard({
  offer,
  onRespond,
  locale,
  currency,
}: {
  offer: Offer;
  onRespond?: () => void;
  locale: string;
  currency: string;
}) {
  const t = useTranslations('OffersPage');
  const isExpired = offer.expiresAt && new Date(offer.expiresAt) < new Date();
  
  return (
    <div className="lux-card p-6">
      <div className="flex items-start gap-4">
        {offer.listing.images?.[0] && (
          <Image
            src={offer.listing.images[0]}
            alt={offer.listing.title}
            width={96}
            height={96}
            unoptimized
            className="w-24 h-24 object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link
                href={`/properties/${offer.listing.id}`}
                className="text-lg font-semibold text-[#1C1A17] hover:text-[#C9A96A]"
              >
                {offer.listing.title}
              </Link>
              <p className="text-sm text-[#7A6E60]">
                {t('listedAt')} {formatPrice(offer.listing.price, offer.listing.currency || currency, locale)}
              </p>
            </div>
            <StatusBadge status={offer.status} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs text-[#7A6E60]">{t('buyer')}</p>
              <p className="text-sm font-medium text-[#1C1A17]">
                {offer.buyer.firstName} {offer.buyer.lastName}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#7A6E60]">{t('offerAmount')}</p>
              <p className="text-xl font-semibold text-[#C9A96A]">
                {formatPrice(Number(offer.amount), offer.currency || currency, locale)}
              </p>
            </div>
          </div>

          {offer.message && (
            <div className="mb-3 p-3 bg-[#F6F2EC] rounded-lg">
              <p className="text-sm text-[#5F5448]">{offer.message}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-[#7A6E60]">
              <span>{t('submitted')} {new Date(offer.createdAt).toLocaleDateString(locale)}</span>
              {offer.expiresAt && (
                <span className={isExpired ? 'text-red-600' : ''}>
                  {isExpired ? t('status.EXPIRED') : `${t('expires')} ${new Date(offer.expiresAt).toLocaleDateString(locale)}`}
                </span>
              )}
            </div>
            {onRespond && offer.status === 'PENDING' && !isExpired && (
              <button onClick={onRespond} className="lux-button-secondary text-sm">
                {t('respond')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('OffersPage');
  const styles: Record<string, string> = {
    PENDING: 'bg-orange-100 text-orange-700',
    ACCEPTED: 'bg-green-100 text-green-700',
    REJECTED: 'bg-red-100 text-red-700',
    EXPIRED: 'bg-gray-100 text-gray-700',
    COUNTERED: 'bg-blue-100 text-blue-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.PENDING}`}>
      {t(`status.${status}`)}
    </span>
  );
}
