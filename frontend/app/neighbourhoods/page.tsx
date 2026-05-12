'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';

const NEIGHBOURHOODS = [
  {
    slug: 'mayfair',
    name: 'Mayfair',
    city: 'London',
    country: 'UK',
    tagline: 'London\'s most prestigious address',
    description: 'The beating heart of prime central London. Stately Georgian townhouses, Michelin-starred dining and Savile Row tailoring define one of the world\'s most coveted postcodes.',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&q=80',
    avgPrice: '£8.2M',
    priceChange: '+4.2%',
    type: 'Ultra Prime',
    highlights: ['Berkeley Square', 'Mount Street', 'The Connaught'],
    schools: 'Outstanding',
    transport: 'Green Park · Bond St',
  },
  {
    slug: 'knightsbridge',
    name: 'Knightsbridge',
    city: 'London',
    country: 'UK',
    tagline: 'Harrods, Hyde Park & unrivalled elegance',
    description: 'Home to Harrods, Hyde Park and some of the most sought-after white stucco residences in the world. Knightsbridge is synonymous with understated luxury.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
    avgPrice: '£6.8M',
    priceChange: '+3.1%',
    type: 'Prime Central',
    highlights: ['Harrods', 'Hyde Park', 'Mandarin Oriental'],
    schools: 'Outstanding',
    transport: 'Knightsbridge · Hyde Park Corner',
  },
  {
    slug: 'chelsea',
    name: 'Chelsea',
    city: 'London',
    country: 'UK',
    tagline: 'Bohemian charm meets blue-chip property',
    description: 'From the King\'s Road boutiques to the tranquil streets around Cheyne Walk, Chelsea blends artistic heritage with blue-chip residential values in equal measure.',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=900&q=80',
    avgPrice: '£4.5M',
    priceChange: '+2.8%',
    type: 'Prime Central',
    highlights: ['King\'s Road', 'Sloane Square', 'Cheyne Walk'],
    schools: 'Outstanding',
    transport: 'Sloane Square · South Kensington',
  },
  {
    slug: 'notting-hill',
    name: 'Notting Hill',
    city: 'London',
    country: 'UK',
    tagline: 'Pastel-fronted townhouses and village charm',
    description: 'Iconic pastel-coloured townhouses, Portobello Road\'s antique market and a vibrant restaurant scene make Notting Hill one of London\'s most characterful and expensive neighbourhoods.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80',
    avgPrice: '£3.2M',
    priceChange: '+5.1%',
    type: 'Prime West London',
    highlights: ['Portobello Market', 'Holland Park', 'Electric Cinema'],
    schools: 'Excellent',
    transport: 'Notting Hill Gate · Ladbroke Grove',
  },
  {
    slug: 'belgravia',
    name: 'Belgravia',
    city: 'London',
    country: 'UK',
    tagline: 'The world\'s most exclusive garden squares',
    description: 'Developed by the Grosvenor Estate in the 1820s, Belgravia\'s immaculate stucco-fronted townhouses and private garden squares represent the pinnacle of London residential architecture.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80',
    avgPrice: '£7.1M',
    priceChange: '+3.7%',
    type: 'Ultra Prime',
    highlights: ['Eaton Square', 'Belgrave Square', 'Elizabeth Street'],
    schools: 'Outstanding',
    transport: 'Victoria · Sloane Square',
  },
  {
    slug: 'hampstead',
    name: 'Hampstead',
    city: 'London',
    country: 'UK',
    tagline: 'Village serenity with panoramic city views',
    description: 'High above the city on its ancient heath, Hampstead has long attracted artists, writers and intellectuals. Today it commands some of the highest residential prices outside central London.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
    avgPrice: '£3.8M',
    priceChange: '+6.2%',
    type: 'Prime North London',
    highlights: ['Hampstead Heath', 'Flask Walk', 'Kenwood House'],
    schools: 'Outstanding',
    transport: 'Hampstead · Belsize Park',
  },
  {
    slug: 'cotswolds',
    name: 'The Cotswolds',
    city: 'Gloucestershire',
    country: 'UK',
    tagline: 'England\'s most beautiful rural retreat',
    description: 'Honey-stone villages, rolling farmland and an unhurried pace of life. The Cotswolds remains the destination of choice for those seeking a principal or second country residence of distinction.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=80',
    avgPrice: '£1.8M',
    priceChange: '+8.4%',
    type: 'Country & Rural',
    highlights: ['Chipping Campden', 'Burford', 'Stow-on-the-Wold'],
    schools: 'Excellent',
    transport: '90 min to London Paddington',
  },
  {
    slug: 'dubai-marina',
    name: 'Dubai Marina',
    city: 'Dubai',
    country: 'UAE',
    tagline: 'Waterfront luxury in the heart of New Dubai',
    description: 'One of the world\'s largest man-made marinas, lined with striking towers, waterfront dining and a world-class promenade. Consistently among Dubai\'s highest-demand residential addresses.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80',
    avgPrice: 'AED 3.4M',
    priceChange: '+11.2%',
    type: 'Waterfront',
    highlights: ['Marina Walk', 'JBR Beach', 'Dubai Eye'],
    schools: 'Very Good',
    transport: 'Dubai Marina · DMCC Metro',
  },
];

const TYPE_COLORS: Record<string, string> = {
  'Ultra Prime': 'bg-[#1C1A17] text-[#C9A96A]',
  'Prime Central': 'bg-[#C9A96A] text-[#1C1A17]',
  'Prime West London': 'bg-[#C9A96A]/80 text-[#1C1A17]',
  'Prime North London': 'bg-[#C9A96A]/70 text-[#1C1A17]',
  'Country & Rural': 'bg-[#7A6E60] text-white',
  'Waterfront': 'bg-[#1B5E9B] text-white',
};

export default function NeighbourhoodsPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            Area Guides
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white lux-heading mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
          >
            Neighbourhood Guides
          </motion.h1>
          <motion.div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.35 }} />
          <motion.p
            className="text-lg text-white/60 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Hyperlocal intelligence on the world's finest addresses — schools, lifestyle, price trends and everything in between.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Featured hero neighbourhood */}
        <ScrollReveal>
          <Link href="/neighbourhoods/mayfair" className="group block mb-16 relative overflow-hidden rounded-2xl h-[420px]">
            <img src={NEIGHBOURHOODS[0].image} alt="Mayfair" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A17]/90 via-[#1C1A17]/50 to-transparent" />
            <div className="absolute inset-0 flex items-end p-10 md:p-14">
              <div className="max-w-lg">
                <span className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 block">Featured Guide</span>
                <h2 className="text-5xl font-light text-white lux-heading mb-3">{NEIGHBOURHOODS[0].name}</h2>
                <p className="text-white/60 mb-5 font-light">{NEIGHBOURHOODS[0].tagline}</p>
                <div className="flex items-center gap-6 text-sm text-white/70 mb-6">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {NEIGHBOURHOODS[0].city}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={13} className="text-[#C9A96A]" /> Avg {NEIGHBOURHOODS[0].avgPrice}</span>
                  <span className="text-green-400">{NEIGHBOURHOODS[0].priceChange} YoY</span>
                </div>
                <span className="inline-flex items-center gap-2 text-[#C9A96A] font-medium group-hover:gap-3 transition-all">
                  Read Guide <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Grid */}
        <ScrollReveal>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">All Areas</p>
            <h2 className="text-4xl font-light text-[#1C1A17] lux-heading">Explore by Neighbourhood</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEIGHBOURHOODS.slice(1).map((n, i) => (
            <ScrollReveal key={n.slug} delay={i * 0.07}>
              <Link href={`/neighbourhoods/${n.slug}`} className="group lux-card overflow-hidden flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${TYPE_COLORS[n.type] || 'bg-[#C9A96A] text-[#1C1A17]'}`}>
                    {n.type}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <div>
                      <p className="text-white font-medium lux-heading text-xl">{n.name}</p>
                      <p className="text-white/60 text-xs flex items-center gap-1"><MapPin size={10} /> {n.city}, {n.country}</p>
                    </div>
                    <span className="text-green-400 text-xs font-medium">{n.priceChange}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[#7A6E60] font-light text-sm leading-relaxed mb-4 flex-1">{n.tagline}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E1D7] text-sm">
                    <span className="text-[#1C1A17] font-medium">Avg {n.avgPrice}</span>
                    <span className="text-[#C9A96A] font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Explore <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 bg-[#1C1A17] rounded-2xl p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Bespoke Research</p>
            <h3 className="text-3xl font-light text-white lux-heading mb-4">Need a tailored area report?</h3>
            <p className="text-white/50 font-light mb-7 max-w-xl mx-auto">Our research team produces private, in-depth area analysis for clients considering a significant acquisition. Complimentary for qualified buyers.</p>
            <Link href="/contact" className="lux-button inline-flex items-center gap-2">
              Request Report <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
