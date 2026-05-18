'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { apiClient } from '@/lib/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || token.length !== 64) {
      setError('This reset link is invalid or has expired. Please request a new one.');
    }
  }, [token]);

  const passwordStrong = password.length >= 8;
  const passwordsMatch = password === confirm && confirm.length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passwordStrong) { setError('Password must be at least 8 characters.'); return; }
    if (!passwordsMatch) { setError('Passwords do not match.'); return; }

    setError('');
    setLoading(true);

    try {
      await apiClient.post('/auth/reset-password', { token, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      setError(msg || 'This reset link is invalid or has expired. Please request a new one.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-4">
        <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-[#1C1A17] mb-2">Password updated!</h2>
        <p className="text-[#7A6E60] mb-2">Your password has been reset successfully.</p>
        <p className="text-sm text-[#B9AA98]">Redirecting to login…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#5F5448] mb-1.5">
          New password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B9AA98]" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            autoComplete="new-password"
            className="w-full pl-10 pr-10 py-3 border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-[#1C1A17] placeholder:text-[#B9AA98]"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B9AA98] hover:text-[#7A6E60]"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {password.length > 0 && !passwordStrong && (
          <p className="text-red-500 text-xs mt-1">Password must be at least 8 characters.</p>
        )}
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-[#5F5448] mb-1.5">
          Confirm new password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B9AA98]" />
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            required
            autoComplete="new-password"
            className="w-full pl-10 pr-4 py-3 border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-[#1C1A17] placeholder:text-[#B9AA98]"
          />
        </div>
        {confirm.length > 0 && !passwordsMatch && (
          <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !passwordStrong || !passwordsMatch || !token}
        className="lux-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving…' : 'Set New Password'}
      </button>

      <p className="text-center text-sm text-[#7A6E60]">
        Need a new link?{' '}
        <Link href="/forgot-password" className="text-[#C9A96A] hover:underline">
          Request again
        </Link>
      </p>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl text-[#1C1A17] mb-2">Set New Password</h1>
          <p className="text-[#7A6E60]">Choose a strong password for your account.</p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E1D7]">
          <Suspense fallback={<div className="text-center py-8 text-[#7A6E60]">Loading…</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
