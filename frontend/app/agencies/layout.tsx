import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Agencies',
  description:
    'Partner agencies on the Raxie Zenith Estate platform. Find leading luxury property agencies in London, Dubai and worldwide.',
  alternates: { canonical: 'https://raxiezenithestate.com/agencies' },
  openGraph: {
    title: 'Property Agencies | Raxie Zenith Estate',
    description: 'Find leading luxury property agencies on the Raxie Zenith Estate platform.',
    url: 'https://raxiezenithestate.com/agencies',
  },
};

export default function AgenciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
