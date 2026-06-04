import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComparisonBar from '@/components/ComparisonBar';
import PageTransition from '@/components/PageTransition';
import ClientWidgets from '@/components/ClientWidgets';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const BASE_URL = 'https://raxiezenithestate.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Raxie Zenith Estate | Luxury Property',
    template: '%s | Raxie Zenith Estate',
  },
  description:
    'Discover exceptional luxury properties in London, Dubai and worldwide. Buy, sell or rent prime real estate with Raxie Zenith Estate.',
  keywords: [
    'luxury real estate', 'luxury property London', 'prime property', 'buy property London',
    'Mayfair properties', 'Knightsbridge homes', 'Chelsea real estate', 'luxury homes for sale',
    'high-end property', 'exclusive real estate', 'Raxie Zenith Estate',
  ],
  authors: [{ name: 'Raxie Zenith Estate', url: BASE_URL }],
  creator: 'Raxie Zenith Estate',
  publisher: 'Raxie Zenith Estate',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE_URL,
    siteName: 'Raxie Zenith Estate',
    title: 'Raxie Zenith Estate | Luxury Property',
    description:
      'Discover exceptional luxury properties in London, Dubai and worldwide. Buy, sell or rent prime real estate with Raxie Zenith Estate.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Raxie Zenith Estate — Luxury Property',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RaxieEstate',
    creator: '@RaxieEstate',
    title: 'Raxie Zenith Estate | Luxury Property',
    description:
      'Discover exceptional luxury properties in London, Dubai and worldwide.',
    images: ['/og-default.jpg'],
  },
  alternates: { canonical: BASE_URL },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Raxie Estate',
  },
  formatDetection: { telephone: false },
  themeColor: '#C9A96A',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icons/icon-152x152.svg', sizes: '152x152', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} font-sans lux-site`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 lux-site">
              <ErrorBoundary>
                <PageTransition>{children}</PageTransition>
              </ErrorBoundary>
            </main>
            <Footer />
            <ComparisonBar />
            <ClientWidgets />
          </div>
        </Providers>
      </body>
    </html>
  );
}
