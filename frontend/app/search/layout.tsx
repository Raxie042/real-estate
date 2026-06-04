import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Luxury Properties',
  description:
    'Search thousands of luxury properties for sale and rent in London, Dubai and worldwide. Filter by price, location, size and more.',
  alternates: { canonical: 'https://raxiezenithestate.com/search' },
  openGraph: {
    title: 'Search Luxury Properties | Raxie Zenith Estate',
    description: 'Search thousands of luxury properties for sale and rent in London, Dubai and worldwide.',
    url: 'https://raxiezenithestate.com/search',
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
