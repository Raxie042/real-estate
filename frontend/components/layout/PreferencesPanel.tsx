'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Preferences, usePreferences, SUPPORTED_LANGUAGES } from '@/lib/preferences-context';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

interface PreferencesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PreferencesPanel({ isOpen, onClose }: PreferencesPanelProps) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Preferences');
  const { preferences, applyPreferences, options } = usePreferences();
  const [draftPreferences, setDraftPreferences] = useState<Preferences>(preferences);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    setDraftPreferences(preferences);
  }, [isOpen, preferences]);

  const updateDraft = (key: keyof Preferences, value: string) => {
    setDraftPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const apply = () => {
    applyPreferences(draftPreferences);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : pathname || '/';
    const pathWithoutLocale = currentPath.replace(/^\/(en|fr|de|ar)(?=\/|$)/, '') || '/';
    const query = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : '';
    const safeLanguage = SUPPORTED_LANGUAGES.includes(draftPreferences.language as any)
      ? draftPreferences.language
      : 'en';
    const nextPath = `/${safeLanguage}${pathWithoutLocale}`;

    const target = query ? `${nextPath}?${query}` : nextPath;
    router.replace(target);
    router.refresh();

    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      setTimeout(() => {
        if (window.location.pathname !== nextPath) {
          window.location.assign(target);
        }
      }, 200);
    }

    onClose();
  };

  const rows: Array<{ key: keyof Preferences; label: string; choices: { value: string; label: string }[] }> = [
    {
      key: 'language',
      label: t('language'),
      choices: options.language.map((option) => ({
        value: option.value,
        label:
          option.value === 'en'
            ? t('languageEnglish')
            : option.value === 'fr'
            ? t('languageFrench')
            : option.value === 'de'
            ? t('languageGerman')
            : t('languageArabic'),
      })),
    },
    {
      key: 'currency',
      label: t('currency'),
      choices: options.currency.map((option) => ({
        value: option.value,
        label:
          option.value === 'USD'
            ? t('currencyUSD')
            : option.value === 'GBP'
            ? t('currencyGBP')
            : option.value === 'EUR'
            ? t('currencyEUR')
            : t('currencyAED'),
      })),
    },
    {
      key: 'unitSystem',
      label: t('units'),
      choices: options.unitSystem.map((option) => ({
        value: option.value,
        label: option.value === 'imperial' ? t('unitImperial') : t('unitMetric'),
      })),
    },
  ];

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] bg-black/50 flex items-start md:items-center justify-center p-4">
      <div className="w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl border border-[#E8E1D7] bg-gradient-to-b from-[#F8F4EE] to-[#F1E8DA] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E1D7]">
          <h2 className="text-2xl text-[#1C1A17] lux-heading">{t('title')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/60 transition"
            aria-label="Close preferences"
          >
            <X className="w-5 h-5 text-[#5F5448]" />
          </button>
        </div>

        <div className="px-6 py-4">
          {rows.map((row) => {
            const selected = row.choices.find((choice) => choice.value === draftPreferences[row.key]);

            return (
              <div key={row.key} className="border-b border-[#E8E1D7] py-3 last:border-b-0">
                <div className="w-full flex items-center justify-between text-left">
                  <div>
                    <div className="text-sm uppercase tracking-wider text-[#7A6E60]">{row.label}</div>
                    <div className="text-[#1C1A17] font-medium mt-1">{selected?.label}</div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {row.choices.map((choice) => {
                    const active = draftPreferences[row.key] === choice.value;
                    return (
                      <button
                        key={choice.value}
                        onClick={() => updateDraft(row.key, choice.value)}
                        className={`px-3 py-2 rounded-lg border text-sm text-left transition ${
                          active
                            ? 'border-[#C9A96A] bg-[#C9A96A]/15 text-[#1C1A17]'
                            : 'border-[#E8E1D7] bg-white/70 text-[#5F5448] hover:border-[#C9A96A]/60'
                        }`}
                      >
                        {choice.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-5 border-t border-[#E8E1D7] flex justify-end gap-3">
          <button onClick={onClose} className="lux-button-outline">
            {t('cancel')}
          </button>
          <button onClick={apply} className="lux-button">
            {t('apply')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
