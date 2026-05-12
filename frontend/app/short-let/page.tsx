'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, MapPin, Bed, Bath, Star, Search, ArrowRight } from 'lucide-react';

const PROPERTIES = [
  { id: 's1', title: 'Mayfair Penthouse Pied-à-Terre', location: 'Mayfair, London W1', beds: 2, baths: 2, nightly: '£1,800', weekly: '£11,000', monthly: '£38,000', seasons: ['Summer', 'Winter', 'Year-round'], available: 'From June 2026', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', tag: 'Exclusive' },
  { id: 's2', title: 'Waterfront Villa — Scottish Loch', location: 'Perthshire, Scotland', beds: 5, baths: 4, nightly: null, weekly: '£8,500', monthly: '£28,000', seasons: ['Summer', 'Autumn'], available: 'July–November 2026', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', tag: 'Seasonal' },
  { id: 's3', title: 'Knightsbridge Townhouse', location: 'Knightsbridge, London SW3', beds: 4, baths: 3, nightly: '£2,400', weekly: '£15,000', monthly: '£50,000', seasons: ['Year-round'], available: 'Year-round', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', tag: 'Available Now' },
  { id: 's4', title: 'Palm Jumeirah Beach Villa', location: 'Palm Jumeirah, Dubai', beds: 6, baths: 6, nightly: 'AED 9,500', weekly: 'AED 58,000', monthly: 'AED 190,000', seasons: ['Winter', 'Spring'], available: 'Oct 2026–April 2027', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', tag: 'Winter Sun' },
  { id: 's5', title: 'Algarve Estate with Pool', location: 'Vale do Lobo, Portugal', beds: 4, baths: 4, nightly: null, weekly: '£6,200', monthly: '£22,000', seasons: ['Summer'], available: 'June–September 2026', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80', tag: 'Summer Only' },
  { id: 's6', title: 'Mykonos Villa — Private Infinity Pool', location: 'Mykonos, Greece', beds: 3, baths: 3, nightly: null, weekly: '£9,000', monthly: null, seasons: ['Summer'], available: 'June–September 2026', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', tag: 'Peak Season' },
];

const SEASONS = ['All', 'Year-round', 'Summer', 'Winter', 'Spring', 'Autumn'];
const RATE_TYPES = ['Weekly', 'Monthly'];

export default function ShortLetPage() {
  const [season, setSeason] = useState('All');
  const [rateType, setRateType] = useState('Weekly');
  const [search, setSearch] = useState('');

  const filtered = PROPERTIES.filter(p => {
    const matchesSeason = season === 'All' || p.seasons.includes(season);
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    return matchesSeason && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Seasonal &amp; Short-Let</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Short-Let &amp; Seasonal Rentals</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Prime London, Scottish retreats, Mediterranean escapes and Dubai winter sun. Privately managed, fully serviced, seasonally curated.</motion.p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-white border-b border-[#E8E1D7] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="lux-input w-full pl-8 text-sm py-2" placeholder="Search location or property…" />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {SEASONS.map(s => (
              <button key={s} onClick={() => setSeason(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${season === s ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]' : 'bg-white text-[#5F5448] border-[#E8E1D7] hover:border-[#C9A96A]'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl border border-[#E8E1D7] overflow-hidden">
            {RATE_TYPES.map(r => (
              <button key={r} onClick={() => setRateType(r)}
                className={`px-3 py-1.5 text-xs font-medium transition ${rateType === r ? 'bg-[#1C1A17] text-white' : 'bg-white text-[#5F5448] hover:bg-[#F6F2EC]'}`}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#9A8B7A]">{filtered.length} properties available</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.07}>
              <div className="lux-card overflow-hidden group">
                <div className="relative h-48">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="text-[10px] bg-[#C9A96A] text-[#1C1A17] font-bold rounded-full px-2 py-0.5">{p.tag}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#1C1A17] text-sm mb-0.5 line-clamp-2">{p.title}</h3>
                  <p className="text-xs text-[#9A8B7A] flex items-center gap-0.5 mb-2"><MapPin size={10} />{p.location}</p>
                  <div className="flex items-center gap-3 text-xs text-[#5F5448] mb-3">
                    <span className="flex items-center gap-0.5"><Bed size={11} />{p.beds}</span>
                    <span className="flex items-center gap-0.5"><Bath size={11} />{p.baths}</span>
                    <span className="flex items-center gap-0.5"><Calendar size={11} />{p.available}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {rateType === 'Weekly' && p.weekly && <p className="font-serif text-lg text-[#C9A96A]">{p.weekly}<span className="text-xs text-[#9A8B7A] font-sans">/week</span></p>}
                      {rateType === 'Monthly' && p.monthly && <p className="font-serif text-lg text-[#C9A96A]">{p.monthly}<span className="text-xs text-[#9A8B7A] font-sans">/month</span></p>}
                      {rateType === 'Monthly' && !p.monthly && <p className="text-xs text-[#9A8B7A]">Weekly rate only</p>}
                    </div>
                    <Link href={`/properties/${p.id}`} className="text-xs text-[#C9A96A] hover:underline flex items-center gap-0.5">View <ArrowRight size={11} /></Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Private Register</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Request a Private Rental</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Many of our short-let properties are handled on a discreet basis. Contact our team to discuss your requirements and we&apos;ll curate a private selection.</p>
          <Link href="/contact" className="lux-button">Speak to Our Team</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
