import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Raxie Zenith Estate. Our luxury property specialists are available in London, Dubai and internationally.',
  alternates: { canonical: 'https://raxiezenithestate.com/contact' },
  openGraph: {
    title: 'Contact Raxie Zenith Estate',
    description: 'Speak to our luxury property specialists in London, Dubai and internationally.',
    url: 'https://raxiezenithestate.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
