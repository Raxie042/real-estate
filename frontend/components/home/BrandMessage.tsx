"use client";

import { useTranslations } from 'next-intl';

export default function BrandMessage() {
  const t = useTranslations('Home');

  return (
    <div className="bg-gradient-to-b from-[#F8F6F3] to-[#F1ECE4] py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1A17] mb-8 leading-tight lux-heading">
          {t('brandTitle')}
        </h2>
        <div className="w-24 h-px bg-[#C9A96A] mx-auto mb-8" />
        <p className="text-lg md:text-xl text-[#6E6255] leading-relaxed mb-6 font-light">
          {t('brandSubtitle')}
        </p>
        <p className="text-lg md:text-xl text-[#6E6255] leading-relaxed font-light">
          {t('brandBody')}
        </p>
        <div className="mt-12 grid grid-cols-3 gap-8 md:gap-16">
          <div className="lux-card-solid py-6 px-2">
            <div className="text-4xl md:text-5xl font-light text-[#C9A96A] mb-2">1,000+</div>
            <div className="text-sm uppercase tracking-wider text-[#7A6E60]">{t('statsOffices')}</div>
          </div>
          <div className="lux-card-solid py-6 px-2">
            <div className="text-4xl md:text-5xl font-light text-[#C9A96A] mb-2">81</div>
            <div className="text-sm uppercase tracking-wider text-[#7A6E60]">{t('statsCountries')}</div>
          </div>
          <div className="lux-card-solid py-6 px-2">
            <div className="text-4xl md:text-5xl font-light text-[#C9A96A] mb-2">26,000+</div>
            <div className="text-sm uppercase tracking-wider text-[#7A6E60]">{t('statsAssociates')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
