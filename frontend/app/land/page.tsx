'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, TrendingUp, Home, MapPin, ArrowRight, Trees } from 'lucide-react';

const PLOTS = [
  { id: 'p1', title: 'Freehold Building Plot — Wentworth Estate', location: 'Surrey, UK', size: '0.8 acres', planning: 'Outline Planning Granted', guide: '£2,850,000', type: 'Residential Plot', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', features: ['Outline planning for 7,000 sq ft residence', 'Services to boundary', 'Adjoining Wentworth Golf Club', 'AONB setting'] },
  { id: 'p2', title: 'Georgian Townhouse Conversion Opportunity', location: 'Edinburgh New Town', size: '8,400 sq ft (GIA)', planning: 'Change of Use Consent', guide: '£4,200,000', type: 'Development Opportunity', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', features: ['Consent for 6 prime apartments', 'A-listed building', 'Full refurbishment required', 'Exceptional final GDV potential'] },
  { id: 'p3', title: 'Prime Mayfair Development Site', location: 'Mayfair, London W1', size: '4,200 sq ft (GIA)', planning: 'Full Planning — 8 Apartments', guide: '£12,500,000', type: 'Development Site', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80', features: ['Full planning approved', 'Demolition of existing structure', 'Prime W1 postcode', '8 x lateral apartments, 2 x penthouses'] },
  { id: 'p4', title: 'Equestrian Estate with Development Land', location: 'Cotswolds, Gloucestershire', size: '62 acres', planning: 'Equestrian / Agricultural', guide: '£6,800,000', type: 'Agricultural & Equestrian', image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=600&q=80', features: ['Grade II listed manor house', '22-stable yard', '3 further outbuildings', 'River frontage'] },
  { id: 'p5', title: 'Dubai Off-Plan Land Parcel — Palm Jebel Ali', location: 'Palm Jebel Ali, Dubai', size: '12,000 sq ft (freehold)', planning: 'Residential Freehold Plot', guide: 'AED 18,500,000', type: 'Freehold Plot', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', features: ['Freehold ownership', 'Infrastructure complete', 'Golden Visa eligible', 'Direct sea frontage'] },
  { id: 'p6', title: 'Scottish Sporting Estate', location: 'Perthshire, Scotland', size: '4,800 acres', planning: 'Sporting / Agricultural', guide: '£9,500,000', type: 'Sporting Estate', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', features: ['28,000 acres grouse moor rights', 'Salmon fishing — 3 miles of the Tay', 'Shooting lodge (12 bedrooms)', 'Stalking and fishing rights'] },
];

const TYPES = ['All', 'Residential Plot', 'Development Site', 'Development Opportunity', 'Agricultural & Equestrian', 'Sporting Estate', 'Freehold Plot'];

export default function LandPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Specialist Category</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Land &amp; Development Plots</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Building plots, development opportunities, agricultural estates, and sporting land. Sourced from across the UK and internationally.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/properties?propertyType=LAND" className="lux-button">All Land Listings</Link>
            <Link href="/contact" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Off-Market Enquiry</Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['42', 'Active Plots & Sites'], ['6 countries', 'Coverage'], ['£750k–£12.5m', 'Typical Range'], ['Off-market access', 'Private Register']].map(([v, l]) => (
            <div key={l}><p className="font-serif text-lg font-semibold text-[#1C1A17]">{v}</p><p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p></div>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Featured Plots &amp; Sites</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Available Now</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PLOTS.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.07}>
              <div className="lux-card overflow-hidden group">
                <div className="relative h-52">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] bg-[#C9A96A] text-[#1C1A17] font-bold rounded-full px-2.5 py-0.5">{p.type}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-white font-serif text-lg">{p.guide}</span>
                    <span className="text-white/80 text-xs flex items-center gap-1"><Trees size={11} />{p.size}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1C1A17] mb-0.5">{p.title}</h3>
                  <p className="text-xs text-[#9A8B7A] flex items-center gap-1 mb-2"><MapPin size={10} />{p.location}</p>
                  <p className="text-xs text-[#C9A96A] mb-3">{p.planning}</p>
                  <ul className="space-y-1 mb-4">
                    {p.features.map(f => <li key={f} className="text-xs text-[#5F5448] flex items-start gap-1.5"><span className="text-[#C9A96A] mt-0.5">✓</span>{f}</li>)}
                  </ul>
                  <Link href={`/properties/${p.id}`} className="lux-button-outline text-sm flex items-center gap-1 w-full justify-center">
                    View Details <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Off-Market Register</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Register Your Requirements</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Many of our best land and development opportunities never reach the public market. Register your acquisition criteria and we&apos;ll match you privately.</p>
          <Link href="/contact" className="lux-button">Register Interest</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
