'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/lib/auth-context';
import { useTranslations } from 'next-intl';
import { SUPPORTED_LANGUAGES, usePreferences } from '@/lib/preferences-context';

function LoginPageContent() {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { preferences } = usePreferences();
  const { login, loginWithToken, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pathLocale = pathname?.split('/')[1];
  const hasLocalePrefix = !!pathLocale && SUPPORTED_LANGUAGES.includes(pathLocale as (typeof SUPPORTED_LANGUAGES)[number]);
  const effectiveLocale = hasLocalePrefix ? pathLocale : preferences.language;
  const withLocale = (path: string) => `/${effectiveLocale}${path}`;
  const nextPath = searchParams.get('next');
  const tokenFromSocial = searchParams.get('token');
  const loginRedirectTarget = nextPath && nextPath.startsWith('/') ? nextPath : withLocale('/');
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(loginRedirectTarget);
    }
  }, [isAuthenticated, router, loginRedirectTarget]);

  useEffect(() => {
    const completeSocialLogin = async () => {
      if (!tokenFromSocial || isAuthenticated) return;

      setLoading(true);
      setError('');

      try {
        await loginWithToken(tokenFromSocial);
        router.push(loginRedirectTarget);
      } catch (err: any) {
        setError(err?.message || t('loginFailed'));
      } finally {
        setLoading(false);
      }
    };

    completeSocialLogin();
  }, [tokenFromSocial, isAuthenticated, loginWithToken, router, loginRedirectTarget, t]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!validateEmail(email)) {
      setError(t('invalidEmail'));
      return;
    }

    if (password.length < 6) {
      setError(t('passwordMin'));
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      router.push(loginRedirectTarget);
    } catch (err: any) {
      setError(err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    const state = encodeURIComponent(loginRedirectTarget);
    window.location.href = `${apiBase}/api/auth/${provider}?state=${state}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 lux-card p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] text-center">{t('welcomeBack')}</p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-[#1C1A17]">{t('signIn')}</h2>
          <p className="mt-2 text-center text-sm text-[#7A6E60]">
            {t('noAccount')}{' '}
            <Link href={withLocale('/register')} className="text-[#C9A96A] hover:text-[#B78F4A] font-medium">
              {t('getStarted')}
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl bg-red-50 p-4 border border-red-200">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('emailAddress')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="lux-input"
                placeholder={t('emailAddress')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="lux-input"
                placeholder={t('password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full lux-button disabled:opacity-50"
          >
            {loading ? t('signingIn') : t('signIn')}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E8E1D7]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#9A8B7A]">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full lux-button-outline inline-flex gap-2"
            >
              <FaGoogle className="w-4 h-4" />
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="w-full lux-button-outline inline-flex gap-2"
            >
              <FaApple className="w-4 h-4" />
              Continue with Apple
            </button>
          </div>

          <div className="text-center">
            <Link href="#" className="text-sm text-[#C9A96A] hover:text-[#B78F4A]">
              {t('forgotPassword')}
            </Link>
          </div>
        </form>

        <p className="text-center text-xs text-[#9A8B7A]">
          {t('demoAccount')}
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 lux-card p-8">
            <div className="h-6 bg-[#EFE8DD] rounded animate-pulse" />
            <div className="h-12 bg-[#EFE8DD] rounded animate-pulse" />
            <div className="h-12 bg-[#EFE8DD] rounded animate-pulse" />
          </div>
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
