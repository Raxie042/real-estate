'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { apiClient } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await apiClient.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch {
      // Always show success to prevent email enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F6F2EC] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-[#7A6E60] hover:text-[#C9A96A] transition-colors text-sm mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
          <h1 className="font-serif text-3xl text-[#1C1A17] mb-2">Forgot Password</h1>
          <p className="text-[#7A6E60]">Enter your email and we&apos;ll send you a reset link.</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8E1D7]">
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-[#1C1A17] mb-2">Check your inbox</h2>
              <p className="text-[#7A6E60] mb-6">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset link. The link expires in <strong>1 hour</strong>.
              </p>
              <p className="text-sm text-[#B9AA98] mb-4">
                Don&apos;t see it? Check your spam folder.
              </p>
              <Link href="/login" className="lux-button inline-block">
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#5F5448] mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B9AA98]" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3 border border-[#E8E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent text-[#1C1A17] placeholder:text-[#B9AA98]"
                  />
                </div>
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="lux-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Send Reset Link'}
              </button>

              <p className="text-center text-sm text-[#7A6E60]">
                Remembered it?{' '}
                <Link href="/login" className="text-[#C9A96A] hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
