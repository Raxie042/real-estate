'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider } from '@/lib/auth-context';
import { ToastProvider } from '@/lib/toast';
import { PreferencesProvider } from '@/lib/preferences-context';
import { NextIntlClientProvider } from 'next-intl';
import { usePreferences } from '@/lib/preferences-context';
import { messagesByLanguage } from '@/lib/messages';
import { usePathname } from 'next/navigation';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import TelemetryProvider from '@/components/TelemetryProvider';
import { WhiteLabelProvider } from '@/lib/white-label-context';

function IntlBridge({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { preferences } = usePreferences();
  const localeFromPath = pathname?.split('/')[1];
  const language =
    (preferences.language in messagesByLanguage
      ? preferences.language
      : localeFromPath && localeFromPath in messagesByLanguage
        ? localeFromPath
        : 'en') as keyof typeof messagesByLanguage;
  const messages = messagesByLanguage[language] || messagesByLanguage.en;

  return (
    <NextIntlClientProvider locale={language} messages={messages} timeZone="UTC">
      {children}
    </NextIntlClientProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <PreferencesProvider>
          <WhiteLabelProvider>
            <ErrorBoundary>
              <TelemetryProvider>
                <IntlBridge>
                  <AuthProvider>
                    {children}
                  </AuthProvider>
                </IntlBridge>
              </TelemetryProvider>
            </ErrorBoundary>
          </WhiteLabelProvider>
        </PreferencesProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
}
