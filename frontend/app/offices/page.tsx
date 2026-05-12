'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const OFFICES = [
  {
    city: 'London — Mayfair',
    country: 'United Kingdom',
    address: '45 Berkeley Square, Mayfair, London W1J 5AT',
    phone: '+44 20 7123 4567',
    email: 'london@raxiezenithestate.com',
    hours: 'Mon–Fri 8:30–18:30, Sat 10:00–16:00',
    head: 'Felix Attah',
    headRole: 'Chief Executive Officer & Founder',
    headImage: '/images/felix-attah.png',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    flag: '🇬🇧',
    type: 'Global HQ',
  },
  {
    city: 'Dubai — DIFC',
    country: 'United Arab Emirates',
    address: 'Gate Village Building 2, DIFC, Dubai, UAE',
    phone: '+971 4 123 4567',
    email: 'dubai@raxiezenithestate.com',
    hours: 'Sun–Thu 9:00–18:00',
    head: 'Fatima Al-Rasheed',
    headRole: 'Director, Middle East',
    headImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    flag: '🇦🇪',
    type: 'Regional Office',
  },
  {
    city: 'New York — Manhattan',
    country: 'United States',
    address: '590 Madison Avenue, 37th Floor, New York, NY 10022',
    phone: '+1 212 555 0100',
    email: 'newyork@raxiezenithestate.com',
    hours: 'Mon–Fri 9:00–18:00 EST',
    head: 'Alexandra Chen',
    headRole: 'Director, Americas',
    headImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
    flag: '🇺🇸',
    type: 'Regional Office',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    address: '1 Raffles Place, Level 22, Singapore 048616',
    phone: '+65 6789 1234',
    email: 'singapore@raxiezenithestate.com',
    hours: 'Mon–Fri 9:00–18:00 SGT',
    head: 'Marcus Tan',
    headRole: 'Director, Asia Pacific',
    headImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    flag: '🇸🇬',
    type: 'Regional Office',
  },
  {
    city: 'Monaco',
    country: 'Monaco',
    address: '5 Avenue de Grande Bretagne, Monaco MC 98000',
    phone: '+377 97 98 99 00',
    email: 'monaco@raxiezenithestate.com',
    hours: 'Mon–Fri 9:00–18:00 CET',
    head: 'Sophie Leconte',
    headRole: 'Director, Monaco & Riviera',
    headImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1555069559-7c5a43b97e81?w=800&q=80',
    flag: '🇲🇨',
    type: 'Boutique Office',
  },
  {
    city: 'Hong Kong',
    country: 'Hong Kong SAR',
    address: 'Two International Finance Centre, 8 Finance Street, HK',
    phone: '+852 2345 6789',
    email: 'hongkong@raxiezenithestate.com',
    hours: 'Mon–Fri 9:00–18:00 HKT',
    head: 'David Kwok',
    headRole: 'Director, Greater China',
    headImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80',
    flag: '🇭🇰',
    type: 'Regional Office',
  },
];

export default function OfficesPage() {
  const [selected, setSelected] = useState(0);
  const office = OFFICES[selected];

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Global Offices</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>A Truly<br />Global Presence</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Six offices across four continents — connecting buyers and sellers worldwide.</motion.p>
        </div>
      </div>

      {/* Office tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-[#E8E1D7] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-1 py-2 min-w-max">
            {OFFICES.map((o, i) => (
              <button key={o.city} onClick={() => setSelected(i)} className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${selected === i ? 'bg-[#1C1A17] text-white' : 'text-[#5F5448] hover:bg-[#F0EBE3]'}`}>{o.flag} {o.city.split(' — ')[0]}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected office detail */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-72 lg:h-auto rounded-2xl overflow-hidden">
            <img src={office.image} alt={office.city} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/50 to-transparent" />
            <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-[#C9A96A] text-[#1C1A17] font-semibold">{office.type}</span>
            <span className="absolute top-4 left-4 text-4xl">{office.flag}</span>
          </div>
          <div className="lux-card p-8">
            <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-1">{office.city}</h2>
            <p className="text-[#7A6E60] mb-5">{office.country}</p>
            <div className="space-y-4 mb-7">
              <div className="flex items-start gap-3 text-sm"><span className="mt-0.5 text-[#C9A96A]">📍</span><span className="text-[#5F5448]">{office.address}</span></div>
              <div className="flex items-center gap-3 text-sm"><span className="text-[#C9A96A]">📞</span><a href={`tel:${office.phone.replace(/ /g,'')}`} className="text-[#5F5448] hover:text-[#1C1A17]">{office.phone}</a></div>
              <div className="flex items-center gap-3 text-sm"><span className="text-[#C9A96A]">✉️</span><a href={`mailto:${office.email}`} className="text-[#5F5448] hover:text-[#1C1A17]">{office.email}</a></div>
              <div className="flex items-start gap-3 text-sm"><span className="mt-0.5 text-[#C9A96A]">🕒</span><span className="text-[#5F5448]">{office.hours}</span></div>
            </div>
            <div className="pt-5 border-t border-[#E8E1D7] flex items-center gap-4">
              <img src={office.headImage} alt={office.head} onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(office.head)}&background=1C1A17&color=C9A96A&size=200`; }} className="w-12 h-12 rounded-full object-cover" />
              <div><p className="font-semibold text-[#1C1A17] text-sm">{office.head}</p><p className="text-xs text-[#7A6E60]">{office.headRole}</p></div>
            </div>
          </div>
        </div>

        {/* All offices grid */}
        <ScrollReveal>
          <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">All Offices</h3>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {OFFICES.map((o, i) => (
            <button key={o.city} onClick={() => setSelected(i)} className={`rounded-xl p-4 text-center transition-all ${selected === i ? 'bg-[#1C1A17] text-white' : 'lux-card hover:shadow-md'}`}>
              <span className="text-3xl block mb-2">{o.flag}</span>
              <p className={`text-xs font-semibold ${selected === i ? 'text-white' : 'text-[#1C1A17]'}`}>{o.city.split(' — ')[0]}</p>
              <p className={`text-xs mt-0.5 ${selected === i ? 'text-[#C9A96A]' : 'text-[#9A8B7A]'}`}>{o.country}</p>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-light text-white lux-heading mb-4">Plan a Visit</h2>
          <p className="text-[#9A8B7A] mb-7">All our offices welcome clients by appointment. Contact the office nearest to you to arrange a private consultation.</p>
          <Link href="/contact" className="lux-button">Book an Appointment</Link>
        </div>
      </div>
    </div>
  );
}
