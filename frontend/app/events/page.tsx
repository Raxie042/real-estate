'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, Clock, MapPin, Users, ArrowRight, Video } from 'lucide-react';

type EventType = 'Market Briefing' | 'Open House' | 'Webinar' | 'Private Reception' | 'Investment Seminar';

interface EventItem {
  id: number;
  title: string;
  type: EventType;
  date: string;
  time: string;
  location: string;
  capacity: number;
  spotsLeft: number;
  isOnline: boolean;
  image: string;
  description: string;
}

const EVENTS: EventItem[] = [
  { id: 1, title: 'Prime London Market Briefing — Q3 2026', type: 'Market Briefing', date: '20 May 2026', time: '6:00 PM', location: 'Our Mayfair Office, 14 Berkeley Square', capacity: 60, spotsLeft: 14, isOnline: false, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80', description: 'Join our Head of Research for a 90-minute deep-dive into prime London market conditions, transaction volumes, and the outlook for H2 2026.' },
  { id: 2, title: 'Dubai Investment Webinar — 2026 Opportunities', type: 'Webinar', date: '27 May 2026', time: '2:00 PM BST', location: 'Online — Zoom', capacity: 500, spotsLeft: 312, isOnline: true, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80', description: 'A comprehensive overview of the Dubai luxury market, RERA regulations, financing options for non-residents, and top-performing investment zones in 2026.' },
  { id: 3, title: 'Private Reception — New Development Preview', type: 'Private Reception', date: '3 June 2026', time: '7:00 PM', location: 'The Savoy, Strand, London WC2', capacity: 40, spotsLeft: 7, isOnline: false, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80', description: 'By invitation only. An exclusive preview of our most significant new development launch of 2026, presented over champagne and canapés.' },
  { id: 4, title: 'Open House — Mayfair Penthouse, £22.5m', type: 'Open House', date: '7 June 2026', time: '11:00 AM', location: 'Mount Street, Mayfair, London W1K', capacity: 8, spotsLeft: 3, isOnline: false, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80', description: 'A rare opportunity to view one of Mayfair\'s most extraordinary lateral residences by private appointment. Strictly by prior registration.' },
  { id: 5, title: 'Property Investment 101 — Webinar for First-Timers', type: 'Webinar', date: '11 June 2026', time: '1:00 PM BST', location: 'Online — Zoom', capacity: 200, spotsLeft: 89, isOnline: true, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80', description: 'Everything you need to know before your first investment property: yield analysis, mortgage structures, legal costs, and portfolio building principles.' },
  { id: 6, title: 'Edinburgh Luxury Market Briefing', type: 'Market Briefing', date: '18 June 2026', time: '5:30 PM', location: 'Balmoral Hotel, Princes Street, Edinburgh', capacity: 50, spotsLeft: 22, isOnline: false, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', description: 'The first dedicated prime Edinburgh briefing of 2026. Covering New Town supply, demand drivers, and pricing for heritage properties above £1.5m.' },
  { id: 7, title: 'High Net Worth Property Seminar — Monaco & Switzerland', type: 'Investment Seminar', date: '25 June 2026', time: '5:00 PM', location: 'Our London Office, Mayfair', capacity: 30, spotsLeft: 11, isOnline: false, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=700&q=80', description: 'An intimate seminar exploring tax-efficient property ownership in Monaco and Switzerland, with specialist legal and wealth management advisers.' },
  { id: 8, title: 'Singapore & Hong Kong: Asia Pacific Briefing', type: 'Market Briefing', date: '2 July 2026', time: '9:00 AM BST / 4:00 PM SGT', location: 'Online — Zoom', capacity: 300, spotsLeft: 188, isOnline: true, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&q=80', description: 'An update on Singapore\'s ABSD policy changes, Hong Kong\'s recovery indicators, and the comparative investment case for each market in 2026–2027.' },
];

const TYPE_COLORS: Record<EventType, string> = {
  'Market Briefing': 'bg-blue-100 text-blue-700',
  'Open House': 'bg-emerald-100 text-emerald-700',
  'Webinar': 'bg-purple-100 text-purple-700',
  'Private Reception': 'bg-[#C9A96A]/20 text-[#9A6B20]',
  'Investment Seminar': 'bg-amber-100 text-amber-700',
};

const ALL_TYPES: EventType[] = ['Market Briefing', 'Open House', 'Webinar', 'Private Reception', 'Investment Seminar'];

export default function EventsPage() {
  const [activeType, setActiveType] = useState<EventType | 'All'>('All');
  const [registered, setRegistered] = useState<number[]>([]);

  const filtered = activeType === 'All' ? EVENTS : EVENTS.filter(e => e.type === activeType);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Events Calendar</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Market Briefings &amp; Events</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Property tours, investment seminars, market briefings, and exclusive client receptions — all in one place.</motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button onClick={() => setActiveType('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeType === 'All' ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>All Events</button>
          {ALL_TYPES.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition flex items-center gap-1.5 ${activeType === t ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {t === 'Webinar' && <Video size={12} />}{t}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {filtered.map((ev, i) => (
            <ScrollReveal key={ev.id} delay={i * 0.06}>
              <div className="lux-card overflow-hidden md:flex">
                <div className="relative md:w-64 h-44 md:h-auto shrink-0 overflow-hidden">
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  {ev.isOnline && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] rounded-full px-2 py-0.5 flex items-center gap-1"><Video size={9} /> Online</div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5 ${TYPE_COLORS[ev.type]}`}>{ev.type}</span>
                      {ev.spotsLeft <= 10 && <span className="text-[10px] bg-red-100 text-red-600 rounded-full px-2 py-0.5 font-medium">Only {ev.spotsLeft} spots left</span>}
                    </div>
                    <h3 className="font-serif text-xl text-[#1C1A17] mb-2">{ev.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#7A6E60] mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{ev.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{ev.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{ev.location}</span>
                    </div>
                    <p className="text-sm text-[#5F5448] leading-relaxed">{ev.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8E1D7]">
                    <span className="text-xs text-[#9A8B7A] flex items-center gap-1"><Users size={11} />{ev.spotsLeft} of {ev.capacity} spots remaining</span>
                    {registered.includes(ev.id) ? (
                      <span className="text-sm text-emerald-600 font-medium">✓ Registered</span>
                    ) : (
                      <button onClick={() => setRegistered(prev => [...prev, ev.id])}
                        className="lux-button text-sm flex items-center gap-1.5">
                        Register <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Subscribe to events */}
        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Stay Informed</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Never Miss an Event</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Subscribe to receive early invitations to market briefings, exclusive property previews, and investment seminars.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="lux-input flex-1 text-sm" />
            <button className="lux-button shrink-0">Subscribe</button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
