'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const DEVELOPMENTS = [
  {
    name: 'The Whiteley',
    location: 'Queensway, London W2',
    developer: 'MARK & Finchatton',
    completionQ: 'Completed 2024',
    priceFrom: '£1,350,000',
    units: 139,
    type: 'Mixed-Use',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    features: ['Rooftop pool', 'Private cinema', 'Spa & wellness', 'Concierge'],
    bedrooms: '1–4 bed',
  },
  {
    name: 'One Crown Place',
    location: 'Sun Street, Shoreditch EC2',
    developer: 'Cain Hoy & UBS AM',
    completionQ: 'Completed 2023',
    priceFrom: '£1,100,000',
    units: 246,
    type: 'Residential Tower',
    status: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    features: ['24-hr concierge', 'Gym', 'Residents lounge', 'City views'],
    bedrooms: '1–3 bed',
  },
  {
    name: 'Holland Park Villas',
    location: 'Holland Park, London W14',
    developer: 'Hazen',
    completionQ: 'Q3 2026',
    priceFrom: '£3,850,000',
    units: 36,
    type: 'Villa Residences',
    status: 'Off-Plan Available',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    features: ['Private gardens', 'Underground parking', 'Porcelain finishes', 'Holland Park views'],
    bedrooms: '3–5 bed',
  },
  {
    name: 'The Lanterns',
    location: 'Chelsea, London SW3',
    developer: 'St James Group',
    completionQ: 'Q1 2027',
    priceFrom: '£2,250,000',
    units: 58,
    type: 'Boutique Residential',
    status: 'Off-Plan Available',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    features: ['Landscaped courtyard', 'Private gym', 'Porter', 'Chelsea location'],
    bedrooms: '2–4 bed',
  },
  {
    name: 'Canary Wharf Residences',
    location: 'Wood Wharf, London E14',
    developer: 'Canary Wharf Group',
    completionQ: 'Q4 2026',
    priceFrom: '£650,000',
    units: 330,
    type: 'High-Rise Residential',
    status: 'Off-Plan Available',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    features: ['Private waterfront', 'Rooftop terrace', 'Gym', 'Marina views'],
    bedrooms: 'Studio–3 bed',
  },
  {
    name: 'Hyde Park Quarter',
    location: 'Paddington, London W2',
    developer: 'European Land',
    completionQ: 'Q2 2027',
    priceFrom: '£895,000',
    units: 480,
    type: 'Mixed-Use Quarter',
    status: 'Off-Plan Available',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    features: ['Retail & restaurants', 'Residents\' club', '24-hr concierge', 'Park views'],
    bedrooms: '1–4 bed',
  },
];

const STATUS_COLORS: Record<string, string> = {
  'Ready to Move': 'bg-green-100 text-green-700',
  'Off-Plan Available': 'bg-[#C9A96A]/15 text-[#9A7A3A]',
};

const FILTERS = ['All', 'Ready to Move', 'Off-Plan Available'];

export default function NewDevelopmentsPage() {
  const [filter, setFilter] = useState('All');
  const shown = filter === 'All' ? DEVELOPMENTS : DEVELOPMENTS.filter(d => d.status === filter);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>New Developments</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Architect-Designed<br />New Residences</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Off-plan and new-build residences from the world&apos;s most celebrated developers — exclusively available through Raxie Zenith Estate.</motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-3 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-sm rounded-full transition-colors ${filter === f ? 'bg-[#1C1A17] text-white' : 'bg-white text-[#5F5448] border border-[#E8E1D7] hover:bg-[#F0EBE3]'}`}>{f}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map(dev => (
            <ScrollReveal key={dev.name}>
              <div className="lux-card overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <img src={dev.image} alt={dev.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full font-medium ${STATUS_COLORS[dev.status]}`}>{dev.status}</span>
                  <p className="absolute bottom-3 left-3 text-white text-xs opacity-80">{dev.completionQ}</p>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#1C1A17] mb-1">{dev.name}</h3>
                  <p className="text-sm text-[#C9A96A] mb-1">📍 {dev.location}</p>
                  <p className="text-xs text-[#7A6E60] mb-3">By {dev.developer} · {dev.bedrooms} · {dev.units} residences</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dev.features.map(f => <span key={f} className="px-2 py-0.5 text-xs bg-[#F0EBE3] text-[#7A6E60] rounded-full">{f}</span>)}
                  </div>
                  <div className="pt-3 border-t border-[#E8E1D7] flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#1C1A17]">From {dev.priceFrom}</span>
                    <Link href={`/search?query=${encodeURIComponent(dev.name)}`} className="lux-button-outline text-xs">Enquire</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 lux-card p-8 bg-[#1C1A17] text-white text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-widest mb-3">Off-Market Developments</p>
          <h2 className="text-3xl font-light lux-heading mb-4">Access Before They Launch</h2>
          <p className="text-[#9A8B7A] mb-6 max-w-xl mx-auto">Register with our New Developments team to receive early access to off-market launches, price reductions and developer incentives before they go public.</p>
          <Link href="/contact" className="lux-button">Register Interest</Link>
        </div>
      </div>
    </div>
  );
}
