import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Agents',
  description:
    'Meet our award-winning team of luxury property specialists across London, Dubai and international markets.',
  alternates: { canonical: 'https://raxiezenithestate.com/agents' },
  openGraph: {
    title: 'Our Agents | Raxie Zenith Estate',
    description: 'Award-winning luxury property specialists across London, Dubai and international markets.',
    url: 'https://raxiezenithestate.com/agents',
  },
};

export default function AgentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
