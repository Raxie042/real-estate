import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Property Valuation',
  description:
    'Get an instant AI-powered valuation for your property. Accurate estimates based on live market data and comparable sales in your area.',
  alternates: { canonical: 'https://raxiezenithestate.com/valuation' },
  openGraph: {
    title: 'Free Property Valuation | Raxie Zenith Estate',
    description: 'Get an instant AI-powered valuation for your property based on live market data.',
    url: 'https://raxiezenithestate.com/valuation',
  },
};

export default function ValuationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
