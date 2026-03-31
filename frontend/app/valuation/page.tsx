'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useTranslations } from 'next-intl';

const ValuationCalculator = dynamic(() => import('@/components/ValuationCalculator'), {
  loading: () => <div className="lux-card h-96 animate-pulse" />,
});

export default function ValuationPage() {
  const t = useTranslations('Valuation');

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-[#F8F6F3] to-[#F1ECE4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/" className="text-[#C9A96A] hover:text-[#B78F4A]">
              {t('home')}
            </Link>
            <span className="mx-2 text-[#9A8B7A]">/</span>
            <span className="text-[#2B2620] font-semibold">{t('breadcrumb')}</span>
          </div>

          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-semibold text-[#1C1A17] mb-4 lux-heading">
              {t('title')}
            </h1>
            <p className="text-lg text-[#7A6E60] max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Valuation Calculator */}
          <ValuationCalculator />

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="lux-card p-6 text-center">
              <div className="text-3xl font-bold text-[#C9A96A] mb-2">95%</div>
              <p className="text-[#7A6E60]">{t('statsAccuracy')}</p>
            </div>
            <div className="lux-card p-6 text-center">
              <div className="text-3xl font-bold text-[#C9A96A] mb-2">10M+</div>
              <p className="text-[#7A6E60]">{t('statsAnalyzed')}</p>
            </div>
            <div className="lux-card p-6 text-center">
              <div className="text-3xl font-bold text-[#C9A96A] mb-2">24/7</div>
              <p className="text-[#7A6E60]">{t('statsInstant')}</p>
            </div>
          </div>

          {/* How it Works */}
          <div className="mt-12 lux-card p-8">
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6 lux-heading">{t('howItWorks')}</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A96A] text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{t('step1Title')}</h3>
                  <p className="text-[#7A6E60]">{t('step1Body')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A96A] text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{t('step2Title')}</h3>
                  <p className="text-[#7A6E60]">{t('step2Body')}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C9A96A] text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{t('step3Title')}</h3>
                  <p className="text-[#7A6E60]">{t('step3Body')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center pb-12">
          <p className="text-[#7A6E60] mb-4">{t('ctaPrompt')}</p>
          <Link href="/contact" className="lux-button inline-block">
            {t('ctaButton')}
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
