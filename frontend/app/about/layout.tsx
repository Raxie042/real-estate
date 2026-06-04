import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Raxie Zenith Estate — a London-based luxury real estate firm redefining prime property. Our story, mission and global offices.',
  alternates: { canonical: 'https://raxiezenithestate.com/about' },
  openGraph: {
    title: 'About Raxie Zenith Estate',
    description: 'A London-based luxury real estate firm redefining prime property.',
    url: 'https://raxiezenithestate.com/about',
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
