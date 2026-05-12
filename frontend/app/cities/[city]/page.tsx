'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, TrendingUp, Home, Percent, ArrowRight } from 'lucide-react';

interface CityData {
  name: string;
  country: string;
  hero: string;
  tagline: string;
  description: string;
  avgPrice: string;
  priceChange: string;
  grossYield: string;
  totalListings: number;
  currency: string;
  highlights: string[];
  neighbourhoods: { name: string; avg: string; type: string }[];
  properties: { title: string; price: string; beds: number; sqft: number; image: string }[];
}

const CITY_DATA: Record<string, CityData> = {
  london: {
    name: 'London', country: 'United Kingdom', currency: '£',
    hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',
    tagline: 'The World\'s Premier Property Market',
    description: 'Prime Central London remains the global benchmark for luxury residential property. From the stucco-fronted mansions of Belgravia to lateral apartments in Knightsbridge, London offers an unmatched combination of cultural heritage, global connectivity, and long-term capital preservation.',
    avgPrice: '£4.2m', priceChange: '+3.1%', grossYield: '2.8–4.5%', totalListings: 142,
    highlights: ['Stable rule of law & property rights', 'Excellent international schools', 'World-class healthcare', 'Global financial hub', 'No restrictions on foreign ownership'],
    neighbourhoods: [
      { name: 'Mayfair', avg: '£7.8m', type: 'Ultra-prime' },
      { name: 'Belgravia', avg: '£6.4m', type: 'Ultra-prime' },
      { name: 'Knightsbridge', avg: '£5.1m', type: 'Prime' },
      { name: 'Chelsea', avg: '£4.2m', type: 'Prime' },
      { name: 'Notting Hill', avg: '£3.8m', type: 'Prime' },
      { name: 'Holland Park', avg: '£3.6m', type: 'Prime' },
    ],
    properties: [
      { title: 'Mayfair Penthouse', price: '£22.5m', beds: 4, sqft: 5100, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80' },
      { title: 'Belgravia Townhouse', price: '£14.25m', beds: 6, sqft: 7200, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80' },
      { title: 'Knightsbridge Lateral Apartment', price: '£5.6m', beds: 3, sqft: 2900, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80' },
    ],
  },
  dubai: {
    name: 'Dubai', country: 'United Arab Emirates', currency: 'AED',
    hero: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
    tagline: 'The Gulf\'s Most Dynamic Luxury Market',
    description: 'Dubai has emerged as one of the world\'s top luxury property destinations, combining 0% income tax, world-class infrastructure, and an extraordinary lifestyle proposition. With yields of 5–8% and a rapidly growing prime market, it attracts investors and end-users from over 170 countries.',
    avgPrice: 'AED 8.4m', priceChange: '+7.2%', grossYield: '5–8%', totalListings: 89,
    highlights: ['0% income tax & capital gains tax', 'Golden Visa programme', 'Freehold ownership for foreigners', 'World-class infrastructure', '12 months of sunshine'],
    neighbourhoods: [
      { name: 'Palm Jumeirah', avg: 'AED 22m', type: 'Ultra-prime' },
      { name: 'Downtown Dubai', avg: 'AED 9.5m', type: 'Prime' },
      { name: 'Dubai Marina', avg: 'AED 6.8m', type: 'Prime' },
      { name: 'Emirates Hills', avg: 'AED 28m', type: 'Ultra-prime' },
      { name: 'Arabian Ranches', avg: 'AED 4.2m', type: 'Premium' },
      { name: 'City Walk', avg: 'AED 5.1m', type: 'Prime' },
    ],
    properties: [
      { title: 'Palm Jumeirah Villa', price: 'AED 68m', beds: 7, sqft: 12000, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80' },
      { title: 'Downtown Penthouse', price: 'AED 38m', beds: 5, sqft: 8200, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80' },
      { title: 'Marina Sky Villa', price: 'AED 12.5m', beds: 4, sqft: 5400, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&q=80' },
    ],
  },
  edinburgh: {
    name: 'Edinburgh', country: 'Scotland, UK', currency: '£',
    hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    tagline: 'Scotland\'s Capital of Culture & Architecture',
    description: 'Edinburgh\'s New Town is one of Europe\'s finest examples of Georgian urban planning and a UNESCO World Heritage Site. Its prime residential market is remarkably undersupplied, commanding significant premiums for Grade A listed townhouses and apartments in historic streets.',
    avgPrice: '£1.8m', priceChange: '+4.2%', grossYield: '3.5–5.5%', totalListings: 38,
    highlights: ['UNESCO World Heritage Site', 'Top UK university city', 'Strong rental demand', 'Growing financial & tech sector', 'Outstanding quality of life'],
    neighbourhoods: [
      { name: 'New Town', avg: '£2.8m', type: 'Prime' },
      { name: 'Stockbridge', avg: '£1.4m', type: 'Premium' },
      { name: 'Morningside', avg: '£1.1m', type: 'Premium' },
      { name: 'Marchmont', avg: '£750k', type: 'Good' },
      { name: 'Murrayfield', avg: '£950k', type: 'Premium' },
      { name: 'Grange', avg: '£1.2m', type: 'Premium' },
    ],
    properties: [
      { title: 'Heriot Row Mansion', price: '£3.2m', beds: 7, sqft: 6100, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80' },
      { title: 'Charlotte Square Apartment', price: '£1.85m', beds: 4, sqft: 2800, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80' },
      { title: 'Ann Street Georgian Villa', price: '£2.4m', beds: 5, sqft: 3600, image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&q=80' },
    ],
  },
  monaco: {
    name: 'Monaco', country: 'Principality of Monaco', currency: '€',
    hero: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1600&q=80',
    tagline: 'The World\'s Most Exclusive Address',
    description: 'Monaco is the world\'s most densely populated sovereign state and the global benchmark for ultra-prime real estate scarcity. With no income tax, no capital gains tax, and extraordinarily limited new supply, Monaco property consistently appreciates and maintains its position as the world\'s most expensive property market per square metre.',
    avgPrice: '€8.2m', priceChange: '+5.8%', grossYield: '1.5–2.5%', totalListings: 12,
    highlights: ['No income tax, no CGT', 'Extreme scarcity of supply', 'World\'s highest security', 'Mediterranean lifestyle', 'European access via Nice airport'],
    neighbourhoods: [
      { name: 'Monte Carlo', avg: '€12m', type: 'Ultra-prime' },
      { name: 'Fontvieille', avg: '€8m', type: 'Prime' },
      { name: 'Larvotto', avg: '€10m', type: 'Prime' },
      { name: 'La Condamine', avg: '€7.5m', type: 'Prime' },
      { name: 'Moneghetti', avg: '€6.8m', type: 'Premium' },
      { name: 'Les Révoires', avg: '€9m', type: 'Prime' },
    ],
    properties: [
      { title: 'Tour Odéon Penthouse', price: '€48m', beds: 5, sqft: 7200, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80' },
      { title: 'Monte Carlo Apartment', price: '€12m', beds: 3, sqft: 2400, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80' },
      { title: 'Larvotto Sea View', price: '€7.8m', beds: 2, sqft: 1800, image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&q=80' },
    ],
  },
};

export default function CityLandingPage() {
  const params = useParams();
  const citySlug = (params?.city as string || '').toLowerCase();
  const city = CITY_DATA[citySlug];

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F2EC]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#1C1A17] mb-4">City not found</h1>
          <Link href="/properties" className="lux-button">Browse All Properties</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative h-96 overflow-hidden">
        <Image src={city.hero} alt={city.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#1C1A17]/90" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">{city.country}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-white mb-3">{city.name}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/70 text-lg">{city.tagline}</motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['Avg. Prime Price', city.avgPrice],
            ['YoY Change', city.priceChange],
            ['Gross Yield', city.grossYield],
            ['Our Listings', `${city.totalListings} properties`],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="font-serif text-xl font-semibold text-[#1C1A17]">{value}</p>
              <p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-14">
        {/* Description */}
        <ScrollReveal className="mb-12">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">About the Market</p>
              <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Why {city.name}?</h2>
              <p className="text-[#5F5448] leading-relaxed mb-6">{city.description}</p>
              <Link href={`/properties?city=${city.name}`} className="lux-button inline-flex items-center gap-2">
                Browse {city.name} Properties <ArrowRight size={14} />
              </Link>
            </div>
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {city.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-[#5F5448]">
                    <span className="text-[#C9A96A] mt-0.5">✓</span>{h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Neighbourhoods */}
        <ScrollReveal className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Neighbourhood Guide</p>
          <h2 className="font-serif text-3xl text-[#1C1A17] mb-6">Prime Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {city.neighbourhoods.map(n => (
              <div key={n.name} className="lux-card p-4">
                <h3 className="font-semibold text-[#1C1A17] mb-1">{n.name}</h3>
                <p className="text-[#C9A96A] font-medium text-sm mb-1">{n.avg}</p>
                <span className="text-[10px] text-[#9A8B7A] border border-[#E8E1D7] rounded-full px-2 py-0.5">{n.type}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Properties */}
        <ScrollReveal className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Featured Properties</p>
          <h2 className="font-serif text-3xl text-[#1C1A17] mb-6">Available in {city.name}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {city.properties.map((p, i) => (
              <div key={p.title} className="lux-card overflow-hidden group">
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-serif">{p.price}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1C1A17] text-sm mb-1">{p.title}</h3>
                  <p className="text-xs text-[#7A6E60]">{p.beds} bed · {p.sqft.toLocaleString()} sq ft</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href={`/properties?city=${city.name}`} className="lux-button inline-flex items-center gap-2">
              View All {city.totalListings} Properties in {city.name} <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 px-4 text-center">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Expert Guidance</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Speak to Our {city.name} Team</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our local experts have unmatched knowledge of {city.name}&apos;s prime market. Get personalised advice on the best opportunities available.</p>
          <Link href="/contact" className="lux-button">Contact Us</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
