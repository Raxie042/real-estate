'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, Bed, Bath, Calendar, Shield, Star, Search, PhoneCall } from 'lucide-react';
import { useState } from 'react';

const FEATURED = [
  { id: 1, title: 'Knightsbridge Penthouse', address: 'Montpelier Street, SW7', price: 28500, period: 'pcm', beds: 4, baths: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80', tag: 'Furnished', available: 'Now' },
  { id: 2, title: 'Chelsea Townhouse', address: 'Cheyne Walk, SW3', price: 22000, period: 'pcm', beds: 5, baths: 4, sqft: 5100, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', tag: 'Part Furnished', available: 'Jun 2026' },
  { id: 3, title: 'Mayfair Duplex', address: 'Berkeley Square, W1J', price: 35000, period: 'pcm', beds: 3, baths: 3, sqft: 3800, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80', tag: 'Furnished', available: 'Now' },
  { id: 4, title: 'Notting Hill Garden Flat', address: 'Ladbroke Grove, W11', price: 8500, period: 'pcm', beds: 2, baths: 2, sqft: 1600, image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=700&q=80', tag: 'Unfurnished', available: 'Jul 2026' },
  { id: 5, title: 'Canary Wharf Tower Suite', address: 'South Quay, E14', price: 6200, period: 'pcm', beds: 2, baths: 2, sqft: 1200, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80', tag: 'Furnished', available: 'Now' },
  { id: 6, title: 'Belgravia Mews House', address: 'Eaton Mews North, SW1', price: 16500, period: 'pcm', beds: 3, baths: 2, sqft: 2700, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80', tag: 'Furnished', available: 'Aug 2026' },
];

const SERVICES = [
  { icon: Shield, title: 'Fully Managed', desc: 'We handle everything — maintenance, tenant relations, rent collection and compliance, 24/7.' },
  { icon: Search, title: 'Tenant Find', desc: 'We identify, reference and qualify vetted tenants from our global database of 8,000+ registered applicants.' },
  { icon: Star, title: 'Short-Let & Corporate', desc: 'Premium furnished lets from 1 week to 12 months, serviced for executives, diplomats and international travellers.' },
  { icon: Calendar, title: 'Rent Collection', desc: 'Automated rent tracking, arrears management, and monthly landlord statements with full accounting.' },
  { icon: PhoneCall, title: 'Lettings Advisory', desc: 'Expert rental price guidance backed by live market data across prime central and outer London zones.' },
  { icon: MapPin, title: 'Property Compliance', desc: 'Gas Safety, EICR, EPC, HMO licensing and all statutory obligations handled on your behalf.' },
];

const STATS = [
  { value: '1,400+', label: 'Active Lettings', sub: 'across prime London' },
  { value: '7 days', label: 'Avg. Let Time', sub: 'for prime properties' },
  { value: '99.2%', label: 'Rent Collected', sub: 'on time, every month' },
  { value: '£94m', label: 'Rental Income', sub: 'managed annually' },
];

const LANDLORD_STEPS = [
  { n: '01', title: 'Free Lettings Appraisal', desc: 'A senior lettings expert visits your property to assess rental value, presentation and compliance needs.' },
  { n: '02', title: 'Professional Photography', desc: 'Our editorial photographers capture your property at its finest for all marketing channels.' },
  { n: '03', title: 'Multi-Channel Marketing', desc: 'Featured placement on Raxie, Rightmove, Zoopla, our private tenant database and international portals.' },
  { n: '04', title: 'Tenant Referencing', desc: 'Full credit, employment and previous landlord checks via our certified referencing partners.' },
  { n: '05', title: 'Tenancy Agreement', desc: 'Legally reviewed AST, deposit registration with DPS and move-in inspection report.' },
  { n: '06', title: 'Ongoing Management', desc: 'Your dedicated property manager handles every aspect so you can invest with complete peace of mind.' },
];

function fmt(n: number) {
  return `£${n.toLocaleString('en-GB')}`;
}

export default function LettingsPage() {
  const [tab, setTab] = useState<'tenant' | 'landlord'>('tenant');

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#1C1A17]">
        <Image src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80" alt="Luxury lettings" fill className="object-cover opacity-30" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-24">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Prime & Super-Prime Lettings</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
            London's Finest<br />Rental Properties
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#B9AA98] text-lg mb-10 max-w-xl mx-auto">
            From Mayfair to Marylebone, Knightsbridge to Kensington — we represent the most sought-after rental homes in prime central London.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/search?type=rent" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors">
              Search Rentals
            </Link>
            <Link href="#landlord" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors">
              For Landlords
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
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

      {/* Tab toggle */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-6">
        <div className="flex gap-2 bg-[#EDE8DF] rounded-full p-1 w-fit mx-auto">
          {(['tenant', 'landlord'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-8 py-2 rounded-full text-sm font-semibold transition-all ${tab === t ? 'bg-[#1C1A17] text-[#F6F2EC]' : 'text-[#7A6E60] hover:text-[#1C1A17]'}`}>
              {t === 'tenant' ? 'I\'m Looking to Rent' : 'I\'m a Landlord'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'tenant' ? (
        <>
          {/* Featured rentals */}
          <section className="max-w-6xl mx-auto px-4 py-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-2">Available Now & Coming Soon</p>
                <h2 className="font-serif text-4xl text-[#1C1A17] mb-3">Featured Lettings</h2>
                <p className="text-[#7A6E60] max-w-xl mx-auto">A curated selection of our finest current and forthcoming rental opportunities across prime London.</p>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.05}>
                  <div className="lux-card overflow-hidden group cursor-pointer">
                    <div className="relative h-52 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#1C1A17]/90 text-[#C9A96A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{p.tag}</span>
                      <span className={`absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${p.available === 'Now' ? 'bg-emerald-600 text-white' : 'bg-[#C9A96A] text-[#1C1A17]'}`}>
                        {p.available === 'Now' ? 'Available Now' : `Avail. ${p.available}`}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-[#1C1A17] mb-1">{p.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-[#7A6E60] mb-3">
                        <MapPin size={12} /><span>{p.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#5F5448] mb-4">
                        <span className="flex items-center gap-1"><Bed size={13} />{p.beds}</span>
                        <span className="flex items-center gap-1"><Bath size={13} />{p.baths}</span>
                        <span>{p.sqft.toLocaleString()} sq ft</span>
                      </div>
                      <div className="pt-3 border-t border-[#E8E1D7] flex items-end justify-between">
                        <div>
                          <p className="font-serif text-2xl text-[#1C1A17]">{fmt(p.price)}</p>
                          <p className="text-xs text-[#9A8B7A]">per calendar month</p>
                        </div>
                        <button className="text-[#C9A96A] text-xs font-semibold uppercase tracking-wider hover:text-[#B8935A] transition-colors">Enquire →</button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.3} className="text-center mt-10">
              <Link href="/search?type=rent" className="lux-button-outline inline-block">View All Lettings</Link>
            </ScrollReveal>
          </section>

          {/* Why rent with us */}
          <section className="bg-[#1C1A17] py-20 px-4">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal className="text-center mb-14">
                <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Why Rent With Us</p>
                <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">The Tenant Experience</h2>
                <p className="text-[#B9AA98] max-w-xl mx-auto">We don't just find you a property — we ensure your every year as a tenant is seamless, secure and truly exceptional.</p>
              </ScrollReveal>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { t: 'Vetted Properties Only', d: 'Every rental property on our books meets our strict presentation, maintenance and safety standards before we market it.' },
                  { t: 'Priority Access', d: 'Registered tenants receive 48-hour advance notice of new properties before they are publicly marketed.' },
                  { t: 'Dedicated Tenant Manager', d: 'You have a single named point of contact for every aspect of your tenancy, from move-in to renewal.' },
                  { t: 'Fast Referencing', d: 'Our digital referencing process is completed in under 48 hours, so you never lose a property to slow admin.' },
                  { t: 'Relocation Support', d: 'Moving from abroad? We offer virtual viewings, school search, and area orientation for international tenants.' },
                  { t: 'Renewal Management', d: 'We proactively negotiate your renewal at least 3 months before expiry, protecting you from uncertainty.' },
                ].map((item, i) => (
                  <ScrollReveal key={item.t} delay={i * 0.05}>
                    <div className="bg-[#252220] p-6 rounded-lg border border-[#3A3530]">
                      <div className="w-8 h-0.5 bg-[#C9A96A] mb-4" />
                      <h3 className="text-[#F4EFE8] font-semibold mb-2">{item.t}</h3>
                      <p className="text-[#9A8B7A] text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Landlord section */
        <section id="landlord" className="max-w-6xl mx-auto px-4 py-16">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">For Property Owners</p>
            <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Maximise Your Rental Return</h2>
            <p className="text-[#7A6E60] max-w-xl mx-auto">Our lettings specialists will appraise your property, find exceptional tenants and manage everything — so you don't have to.</p>
          </ScrollReveal>

          {/* Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <div className="lux-card p-7">
                  <s.icon size={28} className="text-[#C9A96A] mb-4" />
                  <h3 className="text-[#1C1A17] font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-[#7A6E60] text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* How it works */}
          <ScrollReveal>
            <div className="bg-[#1C1A17] rounded-2xl p-10 mb-10">
              <h3 className="font-serif text-3xl text-[#F6F2EC] text-center mb-10">How We Let Your Property</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {LANDLORD_STEPS.map((step, i) => (
                  <div key={step.n} className="flex gap-4">
                    <span className="font-serif text-3xl text-[#C9A96A] font-bold leading-none">{step.n}</span>
                    <div>
                      <h4 className="text-[#F4EFE8] font-semibold mb-1">{step.title}</h4>
                      <p className="text-[#9A8B7A] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="text-center">
            <h3 className="font-serif text-3xl text-[#1C1A17] mb-4">Book Your Free Lettings Appraisal</h3>
            <p className="text-[#7A6E60] mb-8 max-w-lg mx-auto">Find out exactly what your property could achieve in today's prime rental market. No obligation, no pressure.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?dept=lettings" className="lux-button">Book Appraisal</Link>
              <Link href="tel:+442070000000" className="lux-button-outline">Call +44 20 7000 0000</Link>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* Corporate & Diplomatic */}
      <section className="bg-[#F0EAE0] py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal className="flex-1">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Corporate & Diplomatic Relocation</p>
            <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Homes for Executives & Diplomats</h2>
            <p className="text-[#5F5448] mb-6 leading-relaxed">We are preferred suppliers to several FTSE 100 companies, international law firms, diplomatic missions and private family offices seeking furnished rentals for key personnel. Our corporate lettings team understands the demands of high-profile tenancies and provides a discreet, end-to-end service.</p>
            <ul className="space-y-2 mb-8">
              {['Instant access to off-market furnished stock', 'Short-notice availability for urgent relocations', 'Pet-friendly and family homes at every level', 'Dedicated corporate account manager', 'Monthly billing and consolidated invoicing available'].map(item => (
                <li key={item} className="flex items-center gap-2 text-[#5F5448] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Link href="/contact?dept=lettings" className="lux-button">Contact Corporate Team</Link>
          </ScrollReveal>
          <ScrollReveal delay={0.2} className="flex-1">
            <div className="relative h-80 rounded-xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80" alt="Corporate lettings" fill className="object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
