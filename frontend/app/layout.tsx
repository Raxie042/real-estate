import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComparisonBar from '@/components/ComparisonBar';
import PageTransition from '@/components/PageTransition';
import ClientWidgets from '@/components/ClientWidgets';

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

export const metadata: Metadata = {
  title: 'Raxie Zenith Estate',
  description: 'Find your perfect property worldwide',
  keywords: ['real estate', 'properties', 'homes', 'apartments', 'buy', 'rent'],
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
              <PageTransition>{children}</PageTransition>
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
