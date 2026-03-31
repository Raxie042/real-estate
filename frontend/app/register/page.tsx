'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useAuth } from '@/lib/auth-context';
import { SUPPORTED_LANGUAGES, usePreferences } from '@/lib/preferences-context';

function RegisterPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { preferences } = usePreferences();
  const { register, loginWithToken, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pathLocale = pathname?.split('/')[1];
  const hasLocalePrefix =
    !!pathLocale &&
    SUPPORTED_LANGUAGES.includes(pathLocale as (typeof SUPPORTED_LANGUAGES)[number]);
  const effectiveLocale = hasLocalePrefix ? pathLocale : preferences.language;
  const withLocale = useCallback((path: string) => `/${effectiveLocale}${path}`, [effectiveLocale]);
  const tokenFromSocial = searchParams.get('token');
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(withLocale('/'));
    }
  }, [isAuthenticated, router, withLocale]);

  useEffect(() => {
    const completeSocialLogin = async () => {
      if (!tokenFromSocial || isAuthenticated) return;

      setLoading(true);
      setError('');

      try {
        await loginWithToken(tokenFromSocial);
        router.push(withLocale('/'));
      } catch (err: any) {
        setError(err?.message || 'Social login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    completeSocialLogin();
  }, [tokenFromSocial, isAuthenticated, loginWithToken, router, withLocale]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register({ email, password, firstName, lastName });
      router.push(withLocale('/'));
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    const state = encodeURIComponent(withLocale('/'));
    window.location.href = `${apiBase}/api/auth/${provider}?state=${state}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 lux-card p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#C9A96A] text-center">Create account</p>
          <h2 className="mt-3 text-center text-3xl font-semibold text-[#1C1A17]">Create Account</h2>
          <p className="mt-2 text-center text-sm text-[#7A6E60]">
            Already have an account?{' '}
            <Link href={withLocale('/login')} className="text-[#C9A96A] hover:text-[#B78F4A] font-medium">
              Sign In
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#5F5448] mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="lux-input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#5F5448] mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="lux-input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5F5448] mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                className="lux-input"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5F5448] mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="lux-input"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5F5448] mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="lux-input"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full lux-button disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Get Started'}
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
        </form>

        <p className="text-center text-xs text-[#9A8B7A]">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
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
      <RegisterPageContent />
    </Suspense>
  );
}
