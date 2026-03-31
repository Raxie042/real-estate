'use client';

import { useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { usePreferences } from '@/lib/preferences-context';
import { trackError, trackPageView } from '@/lib/telemetry';

export default function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { preferences } = usePreferences();
  const lastTrackedRef = useRef<string>('');

  const route = useMemo(() => {
    if (!pathname) return '/';
    if (typeof window === 'undefined') return pathname;
    return `${pathname}${window.location.search || ''}`;
  }, [pathname]);

  useEffect(() => {
    if (!route || route === lastTrackedRef.current) return;
    lastTrackedRef.current = route;
    trackPageView(route, preferences.language);
  }, [route, preferences.language]);

  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      trackError(event.message || 'Unhandled window error', {
        source: 'window.onerror',
        stack: event.error?.stack,
        metadata: {
          file: event.filename,
          line: event.lineno,
          column: event.colno,
        },
      });
    };

    const onUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      trackError(
        reason?.message || (typeof reason === 'string' ? reason : 'Unhandled promise rejection'),
        {
          source: 'window.unhandledrejection',
          stack: reason?.stack,
        }
      );
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onUnhandledRejection);

    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onUnhandledRejection);
    };
  }, []);

  return <>{children}</>;
}
