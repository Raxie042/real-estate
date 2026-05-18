'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Lock, Bell, Eye, ShieldCheck, Clock, ArrowRight, Bed, Bath, Maximize } from 'lucide-react';
import { useState } from 'react';

const COMING_SOON = [
  {
    id: 1,
    title: 'Chester Square Townhouse',
    address: 'Chester Square, Belgravia, London SW1W',
    guide: '£18,500,000',
    beds: 7,
    baths: 7,
    sqft: 8400,
    available: 'June 2026',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    tag: 'Pre-Market',
    interest: 12,
  },
  {
    id: 2,
    title: 'Strand-on-the-Green Waterfront',
    address: 'Strand-on-the-Green, Chiswick, London W4',
    guide: '£6,950,000',
    beds: 5,
    baths: 4,
    sqft: 5100,
    available: 'July 2026',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    tag: 'Coming Soon',
    interest: 8,
  },
  {
    id: 3,
    title: 'Mayfair Lateral Apartment',
    address: 'Grosvenor Square, Mayfair, London W1K',
    guide: '£14,200,000',
    beds: 4,
    baths: 4,
    sqft: 4600,
    available: 'Immediate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tag: 'Off-Market',
    interest: 19,
  },
  {
    id: 4,
    title: 'Cotswolds Manor House',
    address: 'Bourton-on-the-Water, Gloucestershire',
    guide: '£9,750,000',
    beds: 10,
    baths: 8,
    sqft: 14200,
    available: 'August 2026',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    tag: 'Coming Soon',
    interest: 6,
  },
  {
    id: 5,
    title: 'Edinburgh Georgian Townhouse',
    address: 'Moray Place, Edinburgh EH3',
    guide: '£5,200,000',
    beds: 6,
    baths: 5,
    sqft: 7600,
    available: 'September 2026',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    tag: 'Pre-Market',
    interest: 9,
  },
  {
    id: 6,
    title: 'Sandbanks Peninsula Villa',
    address: 'Panorama Road, Sandbanks, Poole BH13',
    guide: '£7,800,000',
    beds: 5,
    baths: 5,
    sqft: 6200,
    available: 'July 2026',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
    tag: 'Coming Soon',
    interest: 14,
  },
];

const BENEFITS = [
  {
    icon: Lock,
    title: 'Complete Discretion',
    body: 'Access properties before they reach the open market. Sellers preserve privacy; buyers avoid competitive bidding wars.',
  },
  {
    icon: Clock,
    title: 'First-Mover Advantage',
    body: 'Act before public demand drives up interest. Our registered clients are always first to know when a matching property is available.',
  },
  {
    icon: Eye,
    title: 'Curated for You',
    body: 'Register your requirements and our Private Client team will proactively match you with relevant pre-market opportunities.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified & Qualified',
    body: 'Every pre-market property is verified by our team. You deal only with qualified sellers in an environment of complete trust.',
  },
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInterest = (id: number) => {
    setRegisteredIds(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#15120D] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-5">Private Access</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F4EFE8] mb-6 leading-tight">
            Before They Hit<br />the Market
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto mb-10">
            A curated portfolio of pre-market, coming-soon and off-market properties. Available exclusively to registered clients before public launch.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#properties" className="lux-button-outline px-8 py-3">Browse Pre-Market</a>
            <a href="#register" className="lux-button px-8 py-3">Register for Alerts</a>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '40%', label: 'of our sales are off-market' },
            { value: '£2.8bn+', label: 'in pre-market transactions' },
            { value: '1,200+', label: 'registered private buyers' },
            { value: '48 hrs', label: 'average time to close' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/75 text-xs uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Why Off-Market</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">The Private Advantage</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Discover properties that never appear on Rightmove or Zoopla. Our private network connects discretionary sellers with qualified buyers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(b => (
            <div key={b.title} className="lux-card p-6">
              <b.icon className="w-7 h-7 text-[#C9A96A] mb-4" />
              <h3 className="font-semibold text-[#1C1A17] mb-2">{b.title}</h3>
              <p className="text-sm text-[#7A6E60] leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div id="properties" className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Pre-Market Portfolio</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Available to Registered Clients</h2>
            <p className="text-[#9A8B7A] max-w-xl mx-auto">Register your interest on any property below. Our team will arrange a private viewing before public launch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMING_SOON.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#252220] rounded-xl overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                      p.tag === 'Off-Market' ? 'bg-[#1C1A17] text-[#C9A96A] border border-[#C9A96A]' :
                      p.tag === 'Pre-Market' ? 'bg-[#C9A96A] text-[#1C1A17]' :
                      'bg-white/90 text-[#1C1A17]'
                    }`}>{p.tag}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {p.interest} interested
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#F4EFE8] mb-1">{p.title}</h3>
                  <p className="text-[#9A8B7A] text-sm mb-3">{p.address}</p>
                  <div className="flex items-center gap-3 text-[#9A8B7A] text-sm mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{p.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{p.baths}</span>
                    <span className="flex items-center gap-1"><Maximize className="w-4 h-4" />{p.sqft.toLocaleString()} ft²</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#C9A96A] font-semibold text-lg">{p.guide}</p>
                      <p className="text-[#6B5E52] text-xs">Available: {p.available}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInterest(p.id)}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all ${
                      registeredIds.includes(p.id)
                        ? 'bg-[#C9A96A]/20 text-[#C9A96A] border border-[#C9A96A]/40 cursor-default'
                        : 'bg-[#C9A96A] text-[#1C1A17] hover:bg-[#B89059]'
                    }`}
                  >
                    {registeredIds.includes(p.id) ? '✓ Interest Registered' : 'Register Interest'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Process</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">How Pre-Market Access Works</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Register', body: 'Create your private buyer profile with your requirements, budget and preferred areas.' },
            { step: '02', title: 'Be Matched', body: 'Our team proactively matches your criteria against our private seller network.' },
            { step: '03', title: 'Private Preview', body: 'Receive an exclusive preview before the property is listed publicly or anywhere else.' },
            { step: '04', title: 'Make Your Move', body: 'Negotiate and transact with complete discretion, supported by our advisory team.' },
          ].map(s => (
            <div key={s.step} className="text-center">
              <div className="text-5xl font-serif text-[#C9A96A]/30 font-bold mb-3">{s.step}</div>
              <h3 className="font-semibold text-[#1C1A17] mb-2">{s.title}</h3>
              <p className="text-sm text-[#7A6E60]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Register form */}
      <div id="register" className="bg-[#1C1A17] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Bell className="w-10 h-10 text-[#C9A96A] mx-auto mb-6" />
          <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Get Pre-Market Alerts</h2>
          <p className="text-[#9A8B7A] mb-8 text-lg">Register to receive confidential notifications when new pre-market properties matching your criteria become available.</p>
          {!submitted ? (
            <form onSubmit={handleAlertSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" required className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#F4EFE8] rounded-lg placeholder-[#6B5E52] focus:outline-none focus:border-[#C9A96A]" />
                <input type="text" placeholder="Last Name" required className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#F4EFE8] rounded-lg placeholder-[#6B5E52] focus:outline-none focus:border-[#C9A96A]" />
              </div>
              <input type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#F4EFE8] rounded-lg placeholder-[#6B5E52] focus:outline-none focus:border-[#C9A96A]" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#F4EFE8] rounded-lg placeholder-[#6B5E52] focus:outline-none focus:border-[#C9A96A]" />
              <select className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#9A8B7A] rounded-lg focus:outline-none focus:border-[#C9A96A]">
                <option value="">Budget Range</option>
                <option>£1m – £3m</option>
                <option>£3m – £7m</option>
                <option>£7m – £15m</option>
                <option>£15m – £30m</option>
                <option>£30m+</option>
              </select>
              <textarea placeholder="Property Requirements (areas, bedrooms, property type)" rows={3} className="w-full px-4 py-3 bg-[#252220] border border-[#3A3530] text-[#F4EFE8] rounded-lg placeholder-[#6B5E52] focus:outline-none focus:border-[#C9A96A] resize-none" />
              <button type="submit" className="lux-button w-full py-3">Register for Private Access</button>
              <p className="text-[#6B5E52] text-xs">Your information is treated with complete confidentiality. We never share client details.</p>
            </form>
          ) : (
            <div className="lux-card p-10 bg-[#252220]">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-[#C9A96A] font-serif text-2xl mb-3">Registration Confirmed</h3>
              <p className="text-[#9A8B7A]">Thank you. Our Private Client team will be in touch within 24 hours to discuss your requirements in confidence.</p>
              <Link href="/properties" className="lux-button inline-block mt-6">Browse All Properties</Link>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <p className="text-[#7A6E60] mb-2">Have a property you'd like to sell discreetly?</p>
        <h3 className="font-serif text-2xl text-[#1C1A17] mb-6">Sell Off-Market with Complete Discretion</h3>
        <div className="flex gap-4 justify-center">
          <Link href="/sell" className="lux-button px-8 py-3">How We Sell</Link>
          <Link href="/contact" className="lux-button-outline px-8 py-3">Speak to an Advisor</Link>
        </div>
      </div>
    </div>
  );
}
