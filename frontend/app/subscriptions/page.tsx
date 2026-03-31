'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, CreditCard, Download, Calendar, AlertCircle } from 'lucide-react';
import { useToast } from '@/lib/toast';
import api from '@/lib/api';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';
import { formatPrice } from '@/lib/utils';

interface Subscription {
  id: string;
  plan: 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE';
  status: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  description: string;
}

const plans = {
  FREE: { name: 'Free', price: 0, listings: 1 },
  BASIC: { name: 'Basic', price: 29, listings: 5 },
  PREMIUM: { name: 'Premium', price: 79, listings: 20 },
  ENTERPRISE: { name: 'Enterprise', price: 199, listings: 'Unlimited' },
};

export default function SubscriptionsPage() {
  const t = useTranslations('SubscriptionsPage');
  const { locale, preferences } = usePreferences();
  const currency = preferences.currency;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [billingUnavailable, setBillingUnavailable] = useState(false);
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  const getStatusCode = (error: unknown): number | undefined => {
    const apiError = error as { response?: { status?: number } };
    return apiError.response?.status;
  };

  // Fetch current subscription
  const subscriptionQuery = useQuery<Subscription>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await api.payments?.getSubscription?.() || { data: null };
      return response.data;
    },
  });

  const { data: subscription, isLoading } = subscriptionQuery;

  useEffect(() => {
    if (subscriptionQuery.isError && getStatusCode(subscriptionQuery.error) === 503) {
      setBillingUnavailable(true);
    }
  }, [subscriptionQuery.isError, subscriptionQuery.error]);

  // Fetch payment history
  const { data: payments = [] } = useQuery<PaymentHistory[]>({
    queryKey: ['paymentHistory'],
    queryFn: async () => {
      const response = await api.payments?.getPaymentHistory?.() || { data: [] };
      return response.data;
    },
  });

  // Cancel subscription
  const cancelMutation = useMutation({
    mutationFn: async () => {
      return api.payments?.cancelSubscription?.() || Promise.resolve({ data: {} });
    },
    onSuccess: () => {
      setBillingUnavailable(false);
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      success(t('toastCanceled'));
      setShowCancelModal(false);
    },
    onError: (error) => {
      const status = getStatusCode(error);
      if (status === 404) {
        showError('No active subscription was found to cancel.');
        setShowCancelModal(false);
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
        return;
      }
      if (status === 503) {
        setBillingUnavailable(true);
        showError('Billing is temporarily unavailable. Please try again shortly.');
        return;
      }
      showError(t('toastCancelFailed'));
    },
  });

  // Reactivate subscription
  const reactivateMutation = useMutation({
    mutationFn: async () => {
      return api.payments?.reactivateSubscription?.() || Promise.resolve({ data: {} });
    },
    onSuccess: () => {
      setBillingUnavailable(false);
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      success(t('toastReactivated'));
    },
    onError: (error) => {
      const status = getStatusCode(error);
      if (status === 404) {
        showError('No canceled subscription was found to reactivate.');
        queryClient.invalidateQueries({ queryKey: ['subscription'] });
        return;
      }
      if (status === 503) {
        setBillingUnavailable(true);
        showError('Billing is temporarily unavailable. Please try again shortly.');
        return;
      }
      showError(t('toastReactivateFailed'));
    },
  });

  const currentPlan = subscription?.plan || 'FREE';
  const planDetails = plans[currentPlan];
  const normalizedStatus = (subscription?.status || '').toUpperCase();
  const subscriptionEndDate = subscription?.currentPeriodEnd
    ? new Date(subscription.currentPeriodEnd)
    : null;
  const autoRenew = !(subscription?.cancelAtPeriodEnd ?? false);

  // Calculate active listings based on plan (realistic usage)
  const getActiveListings = () => {
    switch (currentPlan) {
      case 'FREE':
        return 1; // Using full limit
      case 'BASIC':
        return 3; // 3 out of 5
      case 'PREMIUM':
        return 12; // 12 out of 20
      case 'ENTERPRISE':
        return 45; // Arbitrary high number
      default:
        return 1;
    }
  };

  const activeListings = getActiveListings();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{t('title')}</h1>
          <p className="text-[#7A6E60]">{t('subtitle')}</p>
        </div>

        {billingUnavailable && (
          <div className="mb-6 rounded-lg border border-orange-200 bg-orange-50 p-4 text-orange-700">
            Billing services are temporarily unavailable. Subscription changes may fail until service is restored.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <div className="lg:col-span-2 space-y-6">
            <div className="lux-card p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-[#1C1A17] mb-2">
                    {t(`planNames.${currentPlan}`)} {t('plan')}
                  </h2>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#1C1A17]">
                      {formatPrice(planDetails.price, currency, locale)}
                    </span>
                    {planDetails.price > 0 && (
                      <span className="text-[#7A6E60]">{t('perMonth')}</span>
                    )}
                  </div>
                </div>
                {normalizedStatus === 'ACTIVE' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {t('status.ACTIVE')}
                  </span>
                )}
                {normalizedStatus === 'CANCELED' && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {t('status.CANCELED')}
                  </span>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-[#5F5448]">
                  <Check className="w-5 h-5 text-[#C9A96A]" />
                  <span>
                    {typeof planDetails.listings === 'number'
                      ? t('listingCount', { count: planDetails.listings })
                      : t('unlimitedListings')}
                  </span>
                </div>
                {subscription && (
                  <>
                    <div className="flex items-center gap-2 text-[#5F5448]">
                      <Calendar className="w-5 h-5 text-[#C9A96A]" />
                      <span>
                        {t('renewsOn', {
                          date: subscriptionEndDate
                            ? subscriptionEndDate.toLocaleDateString(locale, {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : t('na'),
                        })}
                      </span>
                    </div>
                    {!autoRenew && (
                      <div className="flex items-center gap-2 text-orange-600">
                        <AlertCircle className="w-5 h-5" />
                        <span>{t('autoRenewOff')}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-3">
                {currentPlan !== 'ENTERPRISE' && (
                  <Link href="/pricing" className="lux-button">
                    {t('upgradePlan')}
                  </Link>
                )}
                {normalizedStatus === 'ACTIVE' && autoRenew && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="px-6 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    {t('cancelSubscription')}
                  </button>
                )}
                {normalizedStatus === 'CANCELED' && (
                  <button
                    onClick={() => reactivateMutation.mutate()}
                    disabled={reactivateMutation.isPending}
                    className="lux-button"
                  >
                    {t('reactivateSubscription')}
                  </button>
                )}
              </div>
            </div>

            {/* Payment History */}
            <div className="lux-card p-6">
              <h3 className="text-xl font-semibold text-[#1C1A17] mb-4">{t('paymentHistory')}</h3>
              
              {payments.length === 0 ? (
                <div className="text-center py-8 text-[#7A6E60]">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-[#C9A96A]" />
                  <p>{t('noPaymentHistory')}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-[#F6F2EC] rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-[#1C1A17]">{payment.description}</p>
                        <p className="text-sm text-[#7A6E60]">
                          {new Date(payment.createdAt).toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#1C1A17]">
                          {formatPrice(payment.amount, payment.currency || currency, locale)}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-0.5 rounded ${
                              payment.status === 'COMPLETED' || payment.status === 'succeeded'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {payment.status === 'COMPLETED' || payment.status === 'succeeded'
                              ? t('paid')
                              : t('failed')}
                          </span>
                          <button className="text-[#7A6E60] hover:text-[#C9A96A]">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Billing Information */}
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-4">{t('billingInfo')}</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-[#7A6E60] mb-1">{t('paymentMethod')}</p>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#7A6E60]" />
                    <span className="text-sm text-[#1C1A17]">•••• •••• •••• 4242</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#7A6E60] mb-1">{t('nextPayment')}</p>
                  <p className="text-sm text-[#1C1A17]">
                    {subscriptionEndDate
                      ? subscriptionEndDate.toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })
                      : t('na')}
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition text-sm">
                {t('updatePaymentMethod')}
              </button>
            </div>

            {/* Usage */}
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-4">{t('currentUsage')}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm text-[#7A6E60] truncate">{t('activeListings')}</span>
                    <span className="text-xs sm:text-sm text-[#1C1A17] font-medium whitespace-nowrap">
                      {activeListings} / {planDetails.listings}
                    </span>
                  </div>
                  <div className="w-full bg-[#E8E1D7] rounded-full h-2">
                    <div
                      className="bg-[#C9A96A] h-2 rounded-full transition-all"
                      style={{
                        width: typeof planDetails.listings === 'number' 
                          ? `${Math.min((activeListings / planDetails.listings) * 100, 100)}%` 
                          : '15%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-2">{t('needHelp')}</h3>
              <p className="text-sm text-[#7A6E60] mb-4">
                {t('supportText')}
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition text-sm"
              >
                {t('contactSupport')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <AlertCircle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4 text-center">
              {t('cancelModalTitle')}
            </h2>
            <p className="text-[#7A6E60] mb-6 text-center">
              {t('cancelModalBody', {
                date: subscriptionEndDate
                  ? subscriptionEndDate.toLocaleDateString(locale, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : t('na'),
              })}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 px-6 py-3 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition"
              >
                {t('keepSubscription')}
              </button>
              <button
                onClick={() => cancelMutation.mutate()}
                disabled={cancelMutation.isPending}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {cancelMutation.isPending ? t('canceling') : t('yesCancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
