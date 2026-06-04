import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'List Your Property',
  description:
    'List your luxury property on Raxie Zenith Estate. Reach thousands of high-net-worth buyers and tenants across London, Dubai and internationally.',
  alternates: { canonical: 'https://raxiezenithestate.com/list-property' },
  openGraph: {
    title: 'List Your Property | Raxie Zenith Estate',
    description: 'Reach thousands of high-net-worth buyers and tenants with your luxury property listing.',
    url: 'https://raxiezenithestate.com/list-property',
  },
};

export default function ListPropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
