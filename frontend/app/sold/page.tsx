'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, Bed, Bath, TrendingUp, Calendar } from 'lucide-react';

const SOLD = [
  { id: 1, title: 'Belgravia Townhouse', address: 'Eaton Square, London SW1W', price: 14_250_000, soldDate: 'March 2026', beds: 6, baths: 6, sqft: 7200, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80', tag: 'Off-Market', daysOnMarket: 12 },
  { id: 2, title: 'Chelsea Garden House', address: 'Cheyne Walk, London SW3', price: 9_800_000, soldDate: 'February 2026', beds: 5, baths: 4, sqft: 5400, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', tag: 'Sold', daysOnMarket: 21 },
  { id: 3, title: 'Mayfair Penthouse', address: 'Mount Street, London W1K', price: 22_500_000, soldDate: 'January 2026', beds: 4, baths: 4, sqft: 5100, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', tag: 'Sold', daysOnMarket: 8 },
  { id: 4, title: 'Dubai Marina Penthouse', address: 'Princess Tower, Dubai Marina', price: 8_900_000, soldDate: 'December 2025', beds: 5, baths: 5, sqft: 6800, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', tag: 'Sold', daysOnMarket: 17 },
  { id: 5, title: 'Notting Hill Victorian Villa', address: 'Ladbroke Grove, London W11', price: 7_400_000, soldDate: 'November 2025', beds: 6, baths: 5, sqft: 5600, image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80', tag: 'Sold', daysOnMarket: 29 },
  { id: 6, title: 'Edinburgh New Town Mansion', address: 'Heriot Row, Edinburgh EH3', price: 3_200_000, soldDate: 'October 2025', beds: 7, baths: 5, sqft: 6100, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', tag: 'Sold', daysOnMarket: 14 },
  { id: 7, title: 'Knightsbridge Apartment', address: 'Hans Crescent, London SW1X', price: 5_600_000, soldDate: 'September 2025', beds: 3, baths: 3, sqft: 2900, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', tag: 'Off-Market', daysOnMarket: 5 },
  { id: 8, title: 'Palm Jumeirah Villa', address: 'Frond G, Palm Jumeirah, Dubai', price: 18_000_000, soldDate: 'August 2025', beds: 7, baths: 8, sqft: 12000, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80', tag: 'Sold', daysOnMarket: 9 },
  { id: 9, title: 'Holland Park Family Home', address: 'Addison Road, London W14', price: 6_750_000, soldDate: 'July 2025', beds: 5, baths: 4, sqft: 4800, image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80', tag: 'Sold', daysOnMarket: 19 },
];

const STATS = [
  { value: '£2.1bn+', label: 'Total Transacted', sub: 'since 2018' },
  { value: '98.6%', label: 'Avg. Achieved vs. Ask', sub: 'last 24 months' },
  { value: '14 days', label: 'Avg. Time to Sell', sub: 'prime London' },
  { value: '340+', label: 'Completions', sub: 'last 12 months' },
];

function fmt(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}m`;
  return `£${n.toLocaleString('en-GB')}`;
}

export default function SoldPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Transaction Record</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#F6F2EC] mb-4">Recently Sold</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">A record of exceptional properties we have successfully transacted. Every sale reflects the trust our clients place in us.</motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/80 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-[#1C1A17]/60 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLD.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.05}>
              <div className="lux-card overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 bg-[#1C1A17] text-[#C9A96A] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded">
                    {p.tag === 'Off-Market' ? 'Off-Market Sold' : 'Sold STC'}
                  </span>
                  <span className="absolute bottom-3 left-3 text-white font-serif text-xl">{fmt(p.price)}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#1C1A17] mb-1">{p.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-[#7A6E60] mb-3">
                    <MapPin size={12} /><span>{p.address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[#5F5448] mb-3">
                    <span className="flex items-center gap-1"><Bed size={13} />{p.beds}</span>
                    <span className="flex items-center gap-1"><Bath size={13} />{p.baths}</span>
                    <span>{p.sqft.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#9A8B7A] pt-3 border-t border-[#E8E1D7]">
                    <span className="flex items-center gap-1"><Calendar size={11} />{p.soldDate}</span>
                    <span className="flex items-center gap-1"><TrendingUp size={11} />{p.daysOnMarket} days on market</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Sell with us CTA */}
        <ScrollReveal delay={0.2} className="mt-16 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Thinking of Selling?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Get a Complimentary Valuation</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our track record speaks for itself. Let us show you what your property could achieve in today's market.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/valuation" className="lux-button">Request a Valuation</Link>
            <Link href="/contact" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Speak to an Agent</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
