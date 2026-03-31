import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ComparisonBar from '@/components/ComparisonBar';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

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
      <body className={`${inter.className} ${playfair.variable} lux-site`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 lux-site">{children}</main>
            <Footer />
            <ComparisonBar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
