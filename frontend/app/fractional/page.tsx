'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Percent, Calendar, TrendingUp, Home, Users, ArrowRight, CheckCircle, Shield } from 'lucide-react';

const PROPERTIES = [
  { id: 'f1', title: 'Belgravia Lateral Apartment', location: 'Belgravia, London SW1', totalValue: '£8,200,000', shareSize: '1/8', sharePrice: '£1,025,000', annualUsage: '6 weeks', projectedYield: '3.4%', available: '3 shares remaining', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', beds: 4, features: ['Managed by Raxie Concierge', 'Weekly cleaning & maintenance', 'Owner portal & booking app', 'Pro-rata capital appreciation'] },
  { id: 'f2', title: 'Palm Jumeirah Beach Villa', location: 'Palm Jumeirah, Dubai', totalValue: 'AED 42,000,000 (£9.1m)', shareSize: '1/4', sharePrice: 'AED 10,500,000', annualUsage: '13 weeks', projectedYield: '4.8%', available: '2 shares remaining', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', beds: 6, features: ['Golden Visa eligible share', 'Full property management', 'Guaranteed minimum usage', 'Exit mechanism at year 5'] },
  { id: 'f3', title: 'Algarve Ocean Villa', location: 'Vale do Lobo, Portugal', totalValue: '€6,400,000', shareSize: '1/8', sharePrice: '€800,000', annualUsage: '6 weeks (incl. 2 peak)', projectedYield: '5.1%', available: '4 shares remaining', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80', beds: 5, features: ['Portugal Golden Visa eligible', 'Rental income when unused', 'Managed short-let programme', 'MPRP compliant structure'] },
  { id: 'f4', title: 'Mykonos Clifftop Villa', location: 'Mykonos, Greece', totalValue: '€4,800,000', shareSize: '1/6', sharePrice: '€800,000', annualUsage: '8 weeks (summer)', projectedYield: '6.2%', available: '1 share remaining', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80', beds: 4, features: ['Greece Golden Visa eligible', 'Summer rental income', 'Private chef & housekeeping', 'Infinity pool & helipad'] },
];

const HOW_IT_WORKS = [
  { num: '01', title: 'Choose Your Share', desc: 'Select the property and fraction size (typically 1/8 to 1/4). Each share grants proportional usage time and ownership.' },
  { num: '02', title: 'Legal Structure', desc: 'Shares are held via an SPV (Special Purpose Vehicle) with full title deeds. Ownership is protected under English or local law.' },
  { num: '03', title: 'Enjoy Your Weeks', desc: 'Book your usage weeks via the owner portal. Managed weeks are let commercially, generating income for all owners.' },
  { num: '04', title: 'Exit & Liquidity', desc: 'Sell your share at any time (subject to right of first refusal to co-owners), or participate in a planned whole-property exit.' },
];

export default function FractionalPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Alternative Ownership</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Fractional &amp; Co-Ownership</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Own a fraction of an exceptional property. Enjoy your weeks, benefit from capital appreciation, and share the management with fellow owners.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mt-6">
            <Link href="/contact" className="lux-button">Enquire Now</Link>
            <Link href="#how" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">How It Works</Link>
          </motion.div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Important:</strong> Fractional property ownership involves legal and financial complexity. Projected yields are illustrative and not guaranteed. Always obtain independent legal and financial advice before proceeding. Capital at risk.
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['1/8 – 1/4', 'Typical Share Sizes'], ['6–13 weeks', 'Annual Usage'], ['3.4%–6.2%', 'Projected Yield Range'], ['SPV-protected', 'Legal Structure']].map(([v, l]) => (
            <div key={l}><p className="font-serif text-lg font-semibold text-[#1C1A17]">{v}</p><p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p></div>
          ))}
        </div>
      </div>

      {/* Properties */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Available Shares</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Fractional Properties</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {PROPERTIES.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <div className="lux-card overflow-hidden">
                <div className="relative h-52">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] bg-[#C9A96A] text-[#1C1A17] font-bold rounded-full px-2.5 py-0.5">{p.available}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-serif text-xl">{p.sharePrice}</p>
                    <p className="text-white/70 text-xs">per {p.shareSize} share ({p.annualUsage}/year)</p>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1C1A17] mb-0.5">{p.title}</h3>
                  <p className="text-xs text-[#9A8B7A] mb-1">{p.location}</p>
                  <div className="flex gap-3 text-xs text-[#5F5448] mb-3">
                    <span className="flex items-center gap-0.5"><Home size={11} />{p.beds} bed</span>
                    <span className="flex items-center gap-0.5"><TrendingUp size={11} />{p.projectedYield} proj. yield</span>
                    <span className="flex items-center gap-0.5"><Calendar size={11} />{p.annualUsage}</span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {p.features.map(f => <li key={f} className="text-xs text-[#5F5448] flex items-start gap-1.5"><CheckCircle size={10} className="text-emerald-600 mt-0.5 shrink-0" />{f}</li>)}
                  </ul>
                  <p className="text-xs text-[#9A8B7A] mb-3">Whole property value: {p.totalValue}</p>
                  <Link href="/contact" className="lux-button-outline text-sm flex items-center gap-1.5 justify-center w-full">Enquire About This Share <ArrowRight size={13} /></Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div id="how" className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">How It Works</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">The Fractional Model Explained</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((h, i) => (
              <ScrollReveal key={h.num} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96A] flex items-center justify-center text-[#1C1A17] font-bold text-sm mx-auto mb-3">{h.num}</div>
                  <h3 className="font-semibold text-[#1C1A17] mb-1.5 text-sm">{h.title}</h3>
                  <p className="text-xs text-[#5F5448] leading-relaxed">{h.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 px-4 text-center">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Get Started</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Speak to a Fractional Specialist</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our team can walk you through the legal structure, tax considerations and available shares. No obligation.</p>
          <Link href="/contact" className="lux-button">Book a Call</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
