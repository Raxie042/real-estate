'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/lib/toast';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { success } = useToast();

  useEffect(() => {
    success('Subscription activated successfully!');
  }, [success]);

  return (
    <div className="min-h-screen bg-[#F5F1ED] flex items-center justify-center px-4">
      <div className="max-w-md w-full lux-card p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-[#1C1A17] mb-4">
          Welcome to Premium!
        </h1>
        
        <p className="text-[#5F5448] mb-8">
          Your subscription has been activated successfully. You now have access to all premium features.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/subscriptions"
            className="lux-button w-full block text-center"
          >
            View Subscription Details
          </Link>
          
          <Link
            href="/list-property"
            className="lux-button-outline w-full block text-center"
          >
            List Your First Property
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
