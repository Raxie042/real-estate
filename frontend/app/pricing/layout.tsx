import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Subscription Plans',
  description:
    'Flexible pricing plans for property sellers, landlords and agents. List your property with Raxie Zenith Estate from free to enterprise.',
  alternates: { canonical: 'https://raxiezenithestate.com/pricing' },
  openGraph: {
    title: 'Pricing & Subscription Plans | Raxie Zenith Estate',
    description: 'Flexible pricing plans for property sellers, landlords and agents.',
    url: 'https://raxiezenithestate.com/pricing',
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
