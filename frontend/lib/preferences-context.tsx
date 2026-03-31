'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export type Preferences = {
  language: string;
  currency: string;
  unitSystem: 'imperial' | 'metric';
};

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'ar'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

type PreferenceOption = {
  value: string;
  label: string;
};

const LANGUAGE_OPTIONS: PreferenceOption[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ar', label: 'العربية' },
];

const CURRENCY_OPTIONS: PreferenceOption[] = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'AED', label: 'AED (د.إ)' },
];

const UNIT_OPTIONS: PreferenceOption[] = [
  { value: 'imperial', label: 'Imperial (sq ft)' },
  { value: 'metric', label: 'Metric (m²)' },
];

const DEFAULT_PREFERENCES: Preferences = {
  language: 'en',
  currency: 'USD',
  unitSystem: 'imperial',
};

const STORAGE_KEY = 'raxie-preferences';
const COOKIE_KEY = 'raxie-preferences';

const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'EUR', 'AED'] as const;
const SUPPORTED_UNITS = ['imperial', 'metric'] as const;

function languageToLocale(language: string): string {
  switch (language) {
    case 'fr':
      return 'fr-FR';
    case 'de':
      return 'de-DE';
    case 'ar':
      return 'ar-AE';
    case 'en':
    default:
      return 'en-US';
  }
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function persistPreferences(preferences: Preferences) {
  if (typeof window === 'undefined') return;

  const serialized = JSON.stringify(preferences);
  localStorage.setItem(STORAGE_KEY, serialized);
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(serialized)}; path=/; max-age=31536000; SameSite=Lax`;
}

function normalizePreferences(value: Partial<Preferences> | null | undefined): Preferences {
  const nextLanguage = value?.language;
  const nextCurrency = value?.currency;
  const nextUnitSystem = value?.unitSystem;

  return {
    language: SUPPORTED_LANGUAGES.includes(nextLanguage as SupportedLanguage)
      ? (nextLanguage as SupportedLanguage)
      : DEFAULT_PREFERENCES.language,
    currency: SUPPORTED_CURRENCIES.includes(nextCurrency as (typeof SUPPORTED_CURRENCIES)[number])
      ? (nextCurrency as (typeof SUPPORTED_CURRENCIES)[number])
      : DEFAULT_PREFERENCES.currency,
    unitSystem: SUPPORTED_UNITS.includes(nextUnitSystem as (typeof SUPPORTED_UNITS)[number])
      ? (nextUnitSystem as (typeof SUPPORTED_UNITS)[number])
      : DEFAULT_PREFERENCES.unitSystem,
  };
}

function getInitialPreferences(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;

  const localeFromPath = window.location.pathname.split('/')[1];
  const pathLanguage = SUPPORTED_LANGUAGES.includes(localeFromPath as SupportedLanguage)
    ? (localeFromPath as SupportedLanguage)
    : null;

  const fromStorage = localStorage.getItem(STORAGE_KEY);
  if (fromStorage) {
    try {
      return {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(fromStorage),
        ...(pathLanguage ? { language: pathLanguage } : {}),
      };
    } catch {
      return {
        ...DEFAULT_PREFERENCES,
        ...(pathLanguage ? { language: pathLanguage } : {}),
      };
    }
  }

  const fromCookie = readCookie(COOKIE_KEY);
  if (fromCookie) {
    try {
      return {
        ...DEFAULT_PREFERENCES,
        ...JSON.parse(fromCookie),
        ...(pathLanguage ? { language: pathLanguage } : {}),
      };
    } catch {
      return {
        ...DEFAULT_PREFERENCES,
        ...(pathLanguage ? { language: pathLanguage } : {}),
      };
    }
  }

  return {
    ...DEFAULT_PREFERENCES,
    ...(pathLanguage ? { language: pathLanguage } : {}),
  };
}

type PreferencesContextValue = {
  preferences: Preferences;
  locale: string;
  applyPreferences: (next: Preferences) => void;
  options: {
    language: PreferenceOption[];
    currency: PreferenceOption[];
    unitSystem: PreferenceOption[];
  };
};

const PreferencesContext = createContext<PreferencesContextValue | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [preferences, setPreferences] = useState<Preferences>(getInitialPreferences);

  useEffect(() => {
    document.documentElement.lang = preferences.language;
  }, [preferences.language]);

  useEffect(() => {
    const localeFromPath = pathname?.split('/')[1];
    const pathLanguage = SUPPORTED_LANGUAGES.includes(localeFromPath as SupportedLanguage)
      ? (localeFromPath as SupportedLanguage)
      : null;

    if (!pathLanguage || pathLanguage === preferences.language) return;

    const merged = normalizePreferences({ ...preferences, language: pathLanguage });
    setPreferences(merged);
    persistPreferences(merged);
  }, [pathname, preferences]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      locale: languageToLocale(preferences.language),
      applyPreferences: (next) => {
        const merged = normalizePreferences({
          ...preferences,
          ...next,
        });
        setPreferences(merged);
        persistPreferences(merged);
      },
      options: {
        language: LANGUAGE_OPTIONS,
        currency: CURRENCY_OPTIONS,
        unitSystem: UNIT_OPTIONS,
      },
    }),
    [preferences]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }

  return context;
}
