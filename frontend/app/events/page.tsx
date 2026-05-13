'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Calendar, Clock, MapPin, Users, ArrowRight, Video, Lock, Star, CheckCircle, X, ChevronRight } from 'lucide-react';

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
  inviteOnly: boolean;
  image: string;
  description: string;
  dresscode?: string;
  host?: string;
}

const EVENTS: EventItem[] = [
  { id: 1, title: 'Prime London Market Briefing — Q3 2026', type: 'Market Briefing', date: '20 May 2026', time: '6:00 PM', location: 'Our Mayfair Office, 14 Berkeley Square', capacity: 60, spotsLeft: 14, isOnline: false, inviteOnly: false, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80', description: 'Join our Head of Research for a 90-minute deep-dive into prime London market conditions, transaction volumes, and the outlook for H2 2026.' },
  { id: 2, title: 'Dubai Investment Webinar — 2026 Opportunities', type: 'Webinar', date: '27 May 2026', time: '2:00 PM BST', location: 'Online — Zoom', capacity: 500, spotsLeft: 312, isOnline: true, inviteOnly: false, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80', description: 'A comprehensive overview of the Dubai luxury market, RERA regulations, financing options for non-residents, and top-performing investment zones in 2026.' },
  { id: 3, title: 'Private Reception — New Development Preview', type: 'Private Reception', date: '3 June 2026', time: '7:00 PM', location: 'The Savoy, Strand, London WC2', capacity: 40, spotsLeft: 7, isOnline: false, inviteOnly: true, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80', description: 'An exclusive preview of our most significant new development launch of 2026, presented over champagne and canapés. Invitations issued to existing clients and approved applications only.', dresscode: 'Black Tie Optional', host: 'James Harrington, CEO' },
  { id: 4, title: 'Open House — Mayfair Penthouse, £22.5m', type: 'Open House', date: '7 June 2026', time: '11:00 AM', location: 'Mount Street, Mayfair, London W1K', capacity: 8, spotsLeft: 3, isOnline: false, inviteOnly: false, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80', description: 'A rare opportunity to view one of Mayfair\'s most extraordinary lateral residences by private appointment. Strictly by prior registration.' },
  { id: 5, title: 'Property Investment 101 — Webinar for First-Timers', type: 'Webinar', date: '11 June 2026', time: '1:00 PM BST', location: 'Online — Zoom', capacity: 200, spotsLeft: 89, isOnline: true, inviteOnly: false, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80', description: 'Everything you need to know before your first investment property: yield analysis, mortgage structures, legal costs, and portfolio building principles.' },
  { id: 6, title: 'Edinburgh Luxury Market Briefing', type: 'Market Briefing', date: '18 June 2026', time: '5:30 PM', location: 'Balmoral Hotel, Princes Street, Edinburgh', capacity: 50, spotsLeft: 22, isOnline: false, inviteOnly: false, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', description: 'The first dedicated prime Edinburgh briefing of 2026. Covering New Town supply, demand drivers, and pricing for heritage properties above £1.5m.' },
  { id: 7, title: 'Private Collectors Dinner — Art & Architecture', type: 'Private Reception', date: '25 June 2026', time: '7:30 PM', location: 'Christie\'s Auction House, King Street, London', capacity: 24, spotsLeft: 6, isOnline: false, inviteOnly: true, image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=700&q=80', description: 'An intimate seated dinner for collectors and connoisseurs, exploring the relationship between fine art, architecture, and residential property values. Hosted in Christie\'s private dining rooms.', dresscode: 'Black Tie', host: 'Sophia Chen, Director of Private Client Services' },
  { id: 8, title: 'Singapore & Hong Kong: Asia Pacific Briefing', type: 'Market Briefing', date: '2 July 2026', time: '9:00 AM BST / 4:00 PM SGT', location: 'Online — Zoom', capacity: 300, spotsLeft: 188, isOnline: true, inviteOnly: false, image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=700&q=80', description: 'An update on Singapore\'s ABSD policy changes, Hong Kong\'s recovery indicators, and the comparative investment case for each market in 2026–2027.' },
];

const TYPE_COLORS: Record<EventType, string> = {
  'Market Briefing': 'bg-blue-100 text-blue-700',
  'Open House': 'bg-emerald-100 text-emerald-700',
  'Webinar': 'bg-purple-100 text-purple-700',
  'Private Reception': 'bg-[#C9A96A]/20 text-[#9A6B20]',
  'Investment Seminar': 'bg-amber-100 text-amber-700',
};

const ALL_TYPES: EventType[] = ['Market Briefing', 'Open House', 'Webinar', 'Private Reception', 'Investment Seminar'];

type ModalState = { eventId: number; step: 'apply' | 'waitlist' | 'confirmed' } | null;

function InviteModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const [step, setStep] = useState<'apply' | 'confirmed'>('apply');
  const [form, setForm] = useState({ fullName: '', email: '', invitedBy: '', title: '', notes: '' });

  const isFull = event.spotsLeft === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Dark header */}
        <div className="bg-[#1C1A17] px-7 pt-7 pb-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={18} /></button>
          <div className="flex items-center gap-2 mb-2">
            <Star size={13} className="text-[#C9A96A]" fill="#C9A96A" />
            <span className="text-[#C9A96A] text-[11px] uppercase tracking-[0.4em]">By Invitation Only</span>
          </div>
          <h2 className="text-white font-light text-xl lux-heading leading-snug">{event.title}</h2>
          <div className="flex flex-wrap gap-3 mt-3 text-[#B9AA98] text-xs">
            <span className="flex items-center gap-1"><Calendar size={11} />{event.date}</span>
            <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>
            <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>
            {event.dresscode && <span className="flex items-center gap-1"><Star size={11} />{event.dresscode}</span>}
          </div>
        </div>

        <div className="p-7">
          <AnimatePresence mode="wait">
            {step === 'apply' ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {isFull ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
                    This event is fully subscribed. You may join the waitlist and will be contacted if a place becomes available.
                  </div>
                ) : (
                  <p className="text-sm text-[#7A6E60] mb-5 leading-relaxed">
                    {event.spotsLeft} place{event.spotsLeft !== 1 ? 's' : ''} remaining. Please complete your application — all requests are reviewed within 24 hours.
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#7A6E60] mb-1 block">Full Name *</label>
                      <input required className="w-full lux-input text-sm" value={form.fullName}
                        onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs text-[#7A6E60] mb-1 block">Title</label>
                      <select className="w-full lux-input text-sm" value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}>
                        <option value="">Select</option>
                        <option>Mr</option><option>Mrs</option><option>Ms</option>
                        <option>Dr</option><option>Prof</option><option>Lord</option><option>Lady</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6E60] mb-1 block">Email Address *</label>
                    <input required type="email" className="w-full lux-input text-sm" value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6E60] mb-1 block">Invited by / Source of Invitation</label>
                    <input className="w-full lux-input text-sm" placeholder="e.g. Client referral, Raxie Zenith client team"
                      value={form.invitedBy} onChange={e => setForm(f => ({ ...f, invitedBy: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6E60] mb-1 block">Additional Notes</label>
                    <textarea rows={2} className="w-full lux-input text-sm resize-none" placeholder="Dietary requirements, accessibility needs, bringing a guest..."
                      value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="w-full lux-button flex items-center justify-center gap-2 mt-1">
                    {isFull ? 'Join Waitlist' : 'Submit Application'} <ChevronRight size={14} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <CheckCircle size={44} className="text-[#C9A96A] mx-auto mb-4" />
                <h3 className="text-xl font-light text-[#1C1A17] lux-heading mb-2">
                  {event.spotsLeft === 0 ? 'Added to Waitlist' : 'Application Received'}
                </h3>
                <p className="text-sm text-[#7A6E60] leading-relaxed max-w-xs mx-auto">
                  {event.spotsLeft === 0
                    ? 'We will contact you immediately if a place becomes available.'
                    : 'Our team will confirm your place within 24 hours. A formal invitation will follow by post.'}
                </p>
                <button onClick={onClose} className="mt-6 lux-button-outline text-sm px-8">Close</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function EventsPage() {
  const [activeType, setActiveType] = useState<EventType | 'All'>('All');
  const [registered, setRegistered] = useState<number[]>([]);
  const [modal, setModal] = useState<EventItem | null>(null);

  const filtered = activeType === 'All' ? EVENTS : EVENTS.filter(e => e.type === activeType);

  const handleRegister = (ev: EventItem) => {
    if (ev.inviteOnly) {
      setModal(ev);
    } else {
      setRegistered(prev => [...prev, ev.id]);
    }
  };

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
              {t === 'Webinar' && <Video size={12} />}
              {t === 'Private Reception' && <Star size={12} />}
              {t}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="space-y-6">
          {filtered.map((ev, i) => (
            <ScrollReveal key={ev.id} delay={i * 0.06}>
              <div className={`lux-card overflow-hidden md:flex ${ev.inviteOnly ? 'border-[#C9A96A]/40 ring-1 ring-[#C9A96A]/20' : ''}`}>
                {/* Image */}
                <div className="relative md:w-64 h-44 md:h-auto shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                  {ev.isOnline && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] rounded-full px-2 py-0.5 flex items-center gap-1"><Video size={9} /> Online</div>
                  )}
                  {ev.inviteOnly && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                      <div className="flex items-center gap-1.5 bg-[#C9A96A] text-[#1C1A17] rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        <Star size={10} fill="currentColor" /> Invite Only
                      </div>
                    </div>
                  )}
                </div>

                <div className={`p-6 flex flex-col justify-between flex-1 ${ev.inviteOnly ? 'bg-gradient-to-br from-white to-[#FBF8F3]' : ''}`}>
                  <div>
                    <div className="flex items-start gap-2 mb-2 flex-wrap">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-0.5 ${TYPE_COLORS[ev.type]}`}>{ev.type}</span>
                      {ev.spotsLeft <= 10 && ev.spotsLeft > 0 && <span className="text-[10px] bg-red-100 text-red-600 rounded-full px-2 py-0.5 font-medium">Only {ev.spotsLeft} spots left</span>}
                      {ev.spotsLeft === 0 && <span className="text-[10px] bg-gray-100 text-gray-500 rounded-full px-2 py-0.5 font-medium">Fully Subscribed — Waitlist Open</span>}
                    </div>
                    <h3 className="font-serif text-xl text-[#1C1A17] mb-2">{ev.title}</h3>
                    {ev.inviteOnly && ev.host && (
                      <p className="text-xs text-[#C9A96A] mb-2">Hosted by {ev.host}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#7A6E60] mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{ev.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{ev.time}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={13} />{ev.location}</span>
                    </div>
                    {ev.dresscode && (
                      <p className="text-xs text-[#9A8B7A] mb-2 flex items-center gap-1"><Star size={10} className="text-[#C9A96A]" /> Dress: {ev.dresscode}</p>
                    )}
                    <p className="text-sm text-[#5F5448] leading-relaxed">{ev.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8E1D7]">
                    <span className="text-xs text-[#9A8B7A] flex items-center gap-1">
                      {ev.inviteOnly ? <Lock size={11} className="text-[#C9A96A]" /> : <Users size={11} />}
                      {ev.inviteOnly
                        ? (ev.spotsLeft === 0 ? 'Fully subscribed' : `${ev.spotsLeft} of ${ev.capacity} places`)
                        : `${ev.spotsLeft} of ${ev.capacity} spots remaining`}
                    </span>
                    {registered.includes(ev.id) ? (
                      <span className="text-sm text-emerald-600 font-medium flex items-center gap-1"><CheckCircle size={14} /> Registered</span>
                    ) : (
                      <button onClick={() => handleRegister(ev)}
                        className={`text-sm flex items-center gap-1.5 ${ev.inviteOnly ? 'lux-button' : 'lux-button-outline'}`}>
                        {ev.inviteOnly ? <><Star size={12} fill="currentColor" /> Request Invitation</> : <>Register <ArrowRight size={13} /></>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Subscribe */}
        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Stay Informed</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Never Miss an Event</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Subscribe to receive early invitations to market briefings, exclusive property previews, and private client receptions.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="lux-input flex-1 text-sm" />
            <button className="lux-button shrink-0">Subscribe</button>
          </div>
        </ScrollReveal>
      </div>

      {/* Invite modal */}
      <AnimatePresence>
        {modal && (
          <InviteModal event={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

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
