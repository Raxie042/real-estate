'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const AGENCIES = [
  {
    name: 'Beauchamp Estates',
    type: 'Residential Brokerage',
    specialties: ['Prime Central London', 'Super-Prime', 'International'],
    offices: 3,
    founded: 1990,
    areas: ['Mayfair', 'Knightsbridge', 'Chelsea'],
    logo: 'BE',
    description: 'One of London\'s most respected prime residential agencies, specialising in properties above £5m across PCL.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    phone: '+44 20 7499 7722',
    email: 'info@beauchampestates.com',
    verified: true,
  },
  {
    name: 'Black Brick',
    type: 'Buying Agency',
    specialties: ['Buying Advisory', 'PCL', 'Country Estates'],
    offices: 1,
    founded: 2007,
    areas: ['London', 'Home Counties'],
    logo: 'BB',
    description: 'Award-winning buying agency acting exclusively for purchasers. Unbiased advice, off-market access, full negotiation service.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    phone: '+44 20 3141 9861',
    email: 'hello@blackbrick.com',
    verified: true,
  },
  {
    name: 'Prime Purchase',
    type: 'Buying Agency',
    specialties: ['PCL', 'Country', 'Investment'],
    offices: 2,
    founded: 2011,
    areas: ['London', 'Cotswolds', 'Hampshire'],
    logo: 'PP',
    description: 'Exclusive buyer representation across prime residential and country estate markets.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    phone: '+44 20 7224 1234',
    email: 'contact@primepurchase.co.uk',
    verified: true,
  },
  {
    name: 'Wetherell',
    type: 'Residential Brokerage',
    specialties: ['Mayfair', 'St James\'s', 'Belgravia'],
    offices: 2,
    founded: 1992,
    areas: ['Mayfair', 'Belgravia', 'St James\'s'],
    logo: 'W',
    description: 'The definitive estate agency for Mayfair. Unrivalled local knowledge across London\'s most prestigious square mile.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    phone: '+44 20 7493 6935',
    email: 'mayfair@wetherell.co.uk',
    verified: true,
  },
  {
    name: 'Lurot Brand',
    type: 'Residential Brokerage',
    specialties: ['Mews Properties', 'PCL', 'Lettings'],
    offices: 1,
    founded: 1971,
    areas: ['Notting Hill', 'Kensington', 'Chelsea'],
    logo: 'LB',
    description: 'London\'s leading mews specialist. Over 50 years of experience in London\'s most charming hidden streets.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80',
    phone: '+44 20 7590 2520',
    email: 'info@lurotbrand.co.uk',
    verified: false,
  },
  {
    name: 'Sotheby\'s Realty Dubai',
    type: 'International Brokerage',
    specialties: ['Dubai', 'Off-Plan', 'Luxury Villas'],
    offices: 4,
    founded: 2008,
    areas: ['Dubai Marina', 'Palm Jumeirah', 'Downtown Dubai'],
    logo: 'SR',
    description: 'Sotheby\'s International Realty brand in Dubai. Specialising in ultra-prime residential and waterfront properties.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    phone: '+971 4 425 0100',
    email: 'dubai@sothebysrealty.ae',
    verified: true,
  },
];

const TYPES = ['All', 'Residential Brokerage', 'Buying Agency', 'International Brokerage'];

export default function AgenciesPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? AGENCIES : AGENCIES.filter(a => a.type === filter);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Agency Network</motion.p>
          <motion.h1 className="text-5xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Verified Agencies</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>A curated network of the finest residential, buying and commercial agencies — each verified by our team.</motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-2 flex-wrap mb-10">
          {TYPES.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 text-sm rounded-full transition-colors ${filter === t ? 'bg-[#1C1A17] text-white' : 'bg-white text-[#5F5448] hover:bg-[#F0EBE3] border border-[#E8E1D7]'}`}>{t}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(agency => (
            <ScrollReveal key={agency.name}>
              <div className="lux-card overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-44 overflow-hidden">
                  <img src={agency.image} alt={agency.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/70 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-[#1C1A17] text-sm">{agency.logo}</div>
                    {agency.verified && <span className="px-2 py-0.5 text-xs bg-[#C9A96A] text-white rounded-full">✓ Verified</span>}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#1C1A17] mb-1">{agency.name}</h3>
                  <p className="text-xs text-[#C9A96A] uppercase tracking-wider mb-2">{agency.type}</p>
                  <p className="text-sm text-[#5F5448] mb-3 leading-relaxed">{agency.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {agency.areas.map(a => <span key={a} className="px-2 py-0.5 text-xs bg-[#F0EBE3] text-[#7A6E60] rounded-full">{a}</span>)}
                  </div>
                  <div className="pt-3 border-t border-[#E8E1D7] flex justify-between text-xs text-[#7A6E60]">
                    <span>{agency.offices} office{agency.offices > 1 ? 's' : ''}</span>
                    <span>Est. {agency.founded}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <a href={`tel:${agency.phone}`} className="block text-sm text-[#C9A96A] hover:underline">{agency.phone}</a>
                    <a href={`mailto:${agency.email}`} className="block text-sm text-[#7A6E60] hover:underline truncate">{agency.email}</a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 lux-card p-8 text-center bg-[#1C1A17] text-white">
          <p className="text-[#C9A96A] text-xs uppercase tracking-widest mb-3">For Agencies</p>
          <h2 className="text-3xl font-light lux-heading mb-4">List Your Agency</h2>
          <p className="text-[#9A8B7A] mb-6 max-w-xl mx-auto">Join our verified network and reach thousands of high-net-worth buyers and sellers every month.</p>
          <Link href="/founding-partner" className="lux-button">Apply for Listing</Link>
        </div>
      </div>
    </div>
  );
}

