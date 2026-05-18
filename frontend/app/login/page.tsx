'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaApple, FaLinkedin } from 'react-icons/fa';
import { useAuth } from '@/lib/auth-context';
import { useTranslations } from 'next-intl';
import { SUPPORTED_LANGUAGES, usePreferences } from '@/lib/preferences-context';

function LoginPageContent() {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { preferences } = usePreferences();
  const { login, loginWithToken, isAuthenticated, user } = useAuth();
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
  const loginRedirectTarget = nextPath && nextPath.startsWith('/') ? nextPath : null;
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  function getRoleRedirect(role?: string): string {
    if (loginRedirectTarget) return loginRedirectTarget;
    switch (role) {
      case 'PLATFORM_ADMIN': return withLocale('/admin');
      case 'AGENCY_ADMIN':   return withLocale('/dashboard');
      case 'AGENT':          return withLocale('/dashboard');
      case 'SELLER':         return withLocale('/dashboard');
      case 'BUYER':          return withLocale('/dashboard');
      default:               return withLocale('/');
    }
  }

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(getRoleRedirect(user?.role));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    const completeSocialLogin = async () => {
      if (!tokenFromSocial || isAuthenticated) return;

      setLoading(true);
      setError('');

      try {
        const role = await loginWithToken(tokenFromSocial);
        router.push(getRoleRedirect(role));
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
      const role = await login(email, password);
      router.push(getRoleRedirect(role));
    } catch (err: any) {
      setError(err.message || t('loginFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple' | 'linkedin' | 'microsoft') => {
    const state = loginRedirectTarget ? encodeURIComponent(loginRedirectTarget) : '';
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

          <div className="grid grid-cols-2 gap-3">
            {/* Google – white bg, multicolour logo */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E0E0E0] bg-white px-4 py-2.5 text-sm font-medium text-[#3C4043] shadow-sm hover:bg-gray-50 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Apple – black bg, white text */}
            <button
              type="button"
              onClick={() => handleSocialLogin('apple')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              <FaApple className="w-4 h-4" />
              Apple
            </button>

            {/* LinkedIn – #0A66C2 blue */}
            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#004182] transition-colors"
            >
              <FaLinkedin className="w-4 h-4" />
              LinkedIn
            </button>

            {/* Microsoft – white bg, 4-colour logo */}
            <button
              type="button"
              onClick={() => handleSocialLogin('microsoft')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8C8C8C] bg-[#2F2F2F] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
                <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
                <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
                <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
              </svg>
              Microsoft
            </button>
          </div>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-[#C9A96A] hover:text-[#B78F4A]">
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
