'use client';

import { FormEvent, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/lib/toast';
import api from '@/lib/api';
import { SUPPORTED_LANGUAGES, usePreferences } from '@/lib/preferences-context';

export default function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);
  const [submittingApplication, setSubmittingApplication] = useState(false);
  const [application, setApplication] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    market: '',
    portfolioSize: '',
    message: '',
  });
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const { preferences } = usePreferences();
  const { success, error } = useToast();

  const pathLocale = pathname?.split('/')[1];
  const hasLocalePrefix = !!pathLocale && SUPPORTED_LANGUAGES.includes(pathLocale as (typeof SUPPORTED_LANGUAGES)[number]);
  const locale = hasLocalePrefix ? pathLocale : preferences.language;

  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      period: '',
      priceId: null, // Free plan doesn't need a Stripe price ID
      features: ['List up to 5 properties', 'Basic analytics', 'Email support', 'Mobile app access']
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PROFESSIONAL || 'price_professional',
      features: ['Unlimited listings', 'Advanced analytics', 'Priority support', 'Professional photos', 'Market insights', 'Lead management'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      priceId: null, // Enterprise requires contact
      features: ['All Professional features', 'Dedicated account manager', 'Custom branding', 'API access', 'Training & onboarding', 'White-label option']
    }
  ];

  const handleSubscribe = async (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      error('Please sign in to subscribe');
      router.push(`/${locale}/login?next=${encodeURIComponent(pathname || '/pricing')}`);
      return;
    }

    if (plan.name === 'Enterprise') {
      // Redirect to contact page for enterprise
      router.push('/contact');
      return;
    }

    if (plan.name === 'Starter') {
      // Free plan - just redirect to dashboard
      success('Starter plan activated!');
      router.push('/profile');
      return;
    }

    try {
      setLoading(plan.name);
      // Ensure priceId is a string (not null)
      const priceId = plan.priceId || '';
      const response = await api.payments.createCheckoutSession(priceId);
      
      if (response.data.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.url;
      } else {
        error('Failed to create checkout session');
      }
    } catch (err) {
      error('Failed to start checkout process');
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  const handleApply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSubmittingApplication(true);
      await api.invitations.createApplication({
        firstName: application.firstName.trim(),
        lastName: application.lastName.trim(),
        email: application.email.trim(),
        phone: application.phone.trim() || undefined,
        company: application.company.trim() || undefined,
        market: application.market.trim() || undefined,
        portfolioSize: application.portfolioSize.trim() || undefined,
        message: application.message.trim() || undefined,
      });

      success('Application submitted. Our team will review it shortly.');
      setApplication({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        market: '',
        portfolioSize: '',
        message: '',
      });
    } catch (err) {
      error('Unable to submit your application right now. Please try again.');
      console.error(err);
    } finally {
      setSubmittingApplication(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1ED]">
      {/* Hero Section */}
      <section className="bg-[#15120D] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-[#C9A96A]">Simple, Transparent Pricing</h1>
          <p className="text-xl text-[#E7D8C2]">Choose the plan that works best for your real estate business.</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`lux-card p-8 flex flex-col ${
                  plan.highlighted ? 'ring-2 ring-[#C9A96A] shadow-2xl transform scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <span className="bg-[#C9A96A] text-white text-sm font-bold px-3 py-1 rounded w-fit mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-2xl font-bold text-[#C9A96A] mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#1C1A17]">{plan.price}</span>
                  <span className="text-[#5F5448] ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[#5F5448]">
                      <span className="w-2 h-2 bg-[#C9A96A] rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading !== null}
                  className={`${plan.highlighted ? 'lux-button w-full' : 'lux-button-outline w-full'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.name ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : plan.name === 'Enterprise' ? (
                    'Contact Sales'
                  ) : (
                    'Get Started'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#1C1A17] text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.'
              },
              {
                q: 'Is there a setup fee?',
                a: 'No, there are no setup fees or hidden charges. You only pay for your chosen plan.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee for annual plans if you\'re not satisfied.'
              }
            ].map((item, idx) => (
              <div key={idx} className="lux-card p-6">
                <h3 className="font-semibold text-[#C9A96A] mb-2">{item.q}</h3>
                <p className="text-[#5F5448]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto lux-card p-8">
          <h2 className="text-3xl font-bold mb-2 text-[#1C1A17]">Apply for Invitation Access</h2>
          <p className="text-[#5F5448] mb-8">
            Request access to our invitation-only private network for premium properties and concierge support.
          </p>

          <form onSubmit={handleApply} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="First name"
                value={application.firstName}
                onChange={(e) => setApplication((prev) => ({ ...prev, firstName: e.target.value }))}
                className="lux-input"
              />
              <input
                type="text"
                required
                placeholder="Last name"
                value={application.lastName}
                onChange={(e) => setApplication((prev) => ({ ...prev, lastName: e.target.value }))}
                className="lux-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                required
                placeholder="Email address"
                value={application.email}
                onChange={(e) => setApplication((prev) => ({ ...prev, email: e.target.value }))}
                className="lux-input"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={application.phone}
                onChange={(e) => setApplication((prev) => ({ ...prev, phone: e.target.value }))}
                className="lux-input"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company or family office"
                value={application.company}
                onChange={(e) => setApplication((prev) => ({ ...prev, company: e.target.value }))}
                className="lux-input"
              />
              <input
                type="text"
                placeholder="Primary market"
                value={application.market}
                onChange={(e) => setApplication((prev) => ({ ...prev, market: e.target.value }))}
                className="lux-input"
              />
            </div>

            <input
              type="text"
              placeholder="Portfolio size (optional)"
              value={application.portfolioSize}
              onChange={(e) => setApplication((prev) => ({ ...prev, portfolioSize: e.target.value }))}
              className="lux-input"
            />

            <textarea
              placeholder="Tell us about your acquisition criteria"
              value={application.message}
              onChange={(e) => setApplication((prev) => ({ ...prev, message: e.target.value }))}
              className="lux-input min-h-[130px]"
            />

            <button
              type="submit"
              disabled={submittingApplication}
              className="lux-button w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submittingApplication ? 'Submitting Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
