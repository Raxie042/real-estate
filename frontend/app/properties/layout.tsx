import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luxury Properties For Sale & Rent',
  description:
    'Browse our exclusive collection of luxury properties for sale and rent. Prime London, Dubai and international real estate.',
  alternates: { canonical: 'https://raxiezenithestate.com/properties' },
  openGraph: {
    title: 'Luxury Properties For Sale & Rent | Raxie Zenith Estate',
    description: 'Browse our exclusive collection of luxury properties for sale and rent.',
    url: 'https://raxiezenithestate.com/properties',
  },
};

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
