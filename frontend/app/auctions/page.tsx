'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const UPCOMING = [
  {
    id: 'lot-001',
    title: 'Georgian Manor House',
    location: 'Oxfordshire, UK',
    guide: '£2,800,000 – £3,200,000',
    date: 'June 18, 2026',
    time: '14:00 BST',
    type: 'Residential',
    bedrooms: 7,
    acres: 12,
    status: 'Accepting Bids',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
  },
  {
    id: 'lot-002',
    title: 'Prime Mayfair Development Site',
    location: 'Mayfair, London W1',
    guide: '£8,500,000 – £10,000,000',
    date: 'June 18, 2026',
    time: '15:30 BST',
    type: 'Development Land',
    bedrooms: null,
    acres: null,
    status: 'Accepting Bids',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 'lot-003',
    title: 'Coastal Cliff House',
    location: 'Cornwall, UK',
    guide: '£1,200,000 – £1,500,000',
    date: 'July 9, 2026',
    time: '13:00 BST',
    type: 'Residential',
    bedrooms: 5,
    acres: 2,
    status: 'Registration Open',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80',
  },
  {
    id: 'lot-004',
    title: 'Commercial Freehold Portfolio',
    location: 'Central London',
    guide: '£4,200,000 – £4,800,000',
    date: 'July 9, 2026',
    time: '14:30 BST',
    type: 'Commercial',
    bedrooms: null,
    acres: null,
    status: 'Registration Open',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
];

const PAST = [
  { title: 'Kensington Townhouse', price: '£6,750,000', date: 'May 2026', aboveGuide: true },
  { title: 'Hampshire Country Estate', price: '£3,200,000', date: 'April 2026', aboveGuide: false },
  { title: 'Cotswolds Farm Portfolio', price: '£2,900,000', date: 'March 2026', aboveGuide: true },
];

const STATUS_COLORS: Record<string, string> = {
  'Accepting Bids': 'bg-green-100 text-green-700',
  'Registration Open': 'bg-[#C9A96A]/15 text-[#9A7A3A]',
};

export default function AuctionsPage() {
  const [reg, setReg] = useState({ name: '', email: '', lot: '', phone: '' });
  const [regSent, setRegSent] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Auctions & Tenders</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Exceptional Properties.<br />Exceptional Results.</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Our auction and sale-by-tender service creates competitive conditions that consistently deliver above-guide prices for sellers.</motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['94%','Sold Rate'],['£1.8B+','Auctioned to Date'],['108%','Avg. % of Guide Price'],['18 Days','Avg. to Exchange']].map(([val,label]) => (
            <div key={label}><p className="text-2xl font-semibold text-[#1C1A17]">{val}</p><p className="text-xs uppercase tracking-widest text-[#1C1A17]/70 mt-1">{label}</p></div>
          ))}
        </div>
      </div>

      {/* Upcoming lots */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ScrollReveal><p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Coming Up</p><h2 className="text-4xl font-light text-[#1C1A17] lux-heading mb-10">Upcoming Lots</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPCOMING.map(lot => (
            <ScrollReveal key={lot.id}>
              <div className="lux-card overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={lot.image} alt={lot.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full font-medium ${STATUS_COLORS[lot.status]}`}>{lot.status}</span>
                  <span className="absolute bottom-3 left-3 text-xs text-white bg-[#1C1A17]/60 px-2 py-1 rounded">Lot #{lot.id.split('-')[1]}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-[#1C1A17] mb-1">{lot.title}</h3>
                  <p className="text-sm text-[#C9A96A] mb-2">📍 {lot.location}</p>
                  <div className="flex gap-3 text-xs text-[#7A6E60] mb-3">
                    <span>🗓 {lot.date}</span>
                    <span>⏰ {lot.time}</span>
                    <span className="px-2 py-0.5 bg-[#F0EBE3] rounded-full">{lot.type}</span>
                  </div>
                  {lot.bedrooms && <p className="text-xs text-[#7A6E60] mb-1">{lot.bedrooms} bed · {lot.acres} acres</p>}
                  <p className="text-[#1C1A17] font-semibold text-sm mb-4">Guide: {lot.guide}</p>
                  <div className="flex gap-2">
                    <a href="#register" className="lux-button text-sm flex-1 text-center">Register to Bid</a>
                    <Link href={`/search`} className="lux-button-outline text-sm">Details</Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Past results */}
      <div className="bg-[#F0EBE3] py-14">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal><h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-8">Recent Results</h2></ScrollReveal>
          <div className="space-y-3">
            {PAST.map(p => (
              <div key={p.title} className="lux-card p-4 flex items-center justify-between">
                <div><p className="font-semibold text-[#1C1A17]">{p.title}</p><p className="text-xs text-[#7A6E60]">{p.date}</p></div>
                <div className="text-right">
                  <p className="font-semibold text-[#1C1A17]">{p.price}</p>
                  {p.aboveGuide && <span className="text-xs text-green-600">Above guide price</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Register */}
      <div id="register" className="max-w-3xl mx-auto px-6 py-16">
        <ScrollReveal><h2 className="text-3xl font-light text-[#1C1A17] lux-heading text-center mb-10">Register to Bid</h2></ScrollReveal>
        {regSent ? (
          <div className="lux-card p-10 text-center"><p className="text-2xl font-light text-[#1C1A17] mb-3">Registration Received</p><p className="text-[#5F5448]">Our auctions team will contact you to complete verification and provide bidder credentials.</p></div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setRegSent(true); }} className="lux-card p-8 space-y-5">
            <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Full Name *</label><input required value={reg.name} onChange={e => setReg({...reg, name: e.target.value})} className="lux-input w-full" placeholder="Your full name" /></div>
            <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Email *</label><input required type="email" value={reg.email} onChange={e => setReg({...reg, email: e.target.value})} className="lux-input w-full" placeholder="your@email.com" /></div>
            <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Phone Number *</label><input required value={reg.phone} onChange={e => setReg({...reg, phone: e.target.value})} className="lux-input w-full" placeholder="+44 7xxx xxxx" /></div>
            <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Lot of Interest</label><select value={reg.lot} onChange={e => setReg({...reg, lot: e.target.value})} className="lux-input w-full"><option value="">Select a lot...</option>{UPCOMING.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}</select></div>
            <button type="submit" className="lux-button w-full">Register Now</button>
            <p className="text-xs text-[#9A8B7A] text-center">Identity verification required. Registration closes 48 hours before auction.</p>
          </form>
        )}
      </div>
    </div>
  );
}
