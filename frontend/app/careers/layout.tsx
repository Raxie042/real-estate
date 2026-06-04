import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Raxie Zenith Estate team. Explore career opportunities in luxury real estate, technology, marketing and more.',
  alternates: { canonical: 'https://raxiezenithestate.com/careers' },
  openGraph: {
    title: 'Careers at Raxie Zenith Estate',
    description: 'Explore career opportunities in luxury real estate, technology, marketing and more.',
    url: 'https://raxiezenithestate.com/careers',
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
