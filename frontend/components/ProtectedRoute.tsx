'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { SUPPORTED_LANGUAGES, usePreferences } from '@/lib/preferences-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const { preferences } = usePreferences();
  const router = useRouter();
  const pathname = usePathname();

  const pathLocale = pathname?.split('/')[1];
  const hasLocalePrefix = !!pathLocale && SUPPORTED_LANGUAGES.includes(pathLocale as (typeof SUPPORTED_LANGUAGES)[number]);
  const effectiveLocale = hasLocalePrefix ? pathLocale : preferences.language;
  const redirectHasLocale = /^\/(en|fr|de|ar)(\/|$)/.test(redirectTo);
  const localizedRedirect = !redirectHasLocale ? `/${effectiveLocale}${redirectTo}` : redirectTo;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(localizedRedirect);
    }
  }, [isAuthenticated, isLoading, router, localizedRedirect]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="lux-card h-32 w-96" />
          <div className="lux-card h-8 w-64" />
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
