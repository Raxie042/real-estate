'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function SubscriptionCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4">
      <div className="max-w-md w-full lux-card p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#1C1A17] mb-4">
          Subscription Cancelled
        </h1>
        
        <p className="text-[#5F5448] mb-8">
          Your subscription process was cancelled. No charges were made to your account.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="lux-button w-full block text-center"
          >
            View Plans Again
          </Link>
          
          <Link
            href="/contact"
            className="lux-button-outline w-full block text-center"
          >
            Contact Support
          </Link>
          
          <button
            onClick={() => router.push('/')}
            className="w-full text-[#7A6E60] hover:text-[#C9A96A] transition py-2"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
