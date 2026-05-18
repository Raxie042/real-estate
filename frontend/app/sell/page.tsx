'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Video, Globe, Users, BarChart2, Star, CheckCircle, ArrowRight, Phone } from 'lucide-react';

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Private Network Launch',
    duration: 'Weeks 1–2',
    color: '#C9A96A',
    description: 'Your property is first offered exclusively to our private buyer network of over 1,200 qualified clients. Discretion guaranteed. No public listing. Ideal for sellers who value privacy.',
    tactics: ['Direct outreach to matched buyers', 'Off-market showings by appointment', 'Confidential price guidance', 'No digital footprint until you choose'],
  },
  {
    phase: 'Phase 2',
    title: 'Targeted Soft Launch',
    duration: 'Weeks 3–4',
    color: '#8B7355',
    description: 'Selective digital marketing to pre-qualified audiences before the full public launch. Creates urgency and positions your property ahead of competition.',
    tactics: ['Private client email campaigns', 'Targeted social media to HNWI audiences', 'Agent network alerts', 'International buyer outreach'],
  },
  {
    phase: 'Phase 3',
    title: 'Full Market Exposure',
    duration: 'Weeks 5+',
    color: '#4A3F32',
    description: 'Maximum visibility across every premium channel — print, digital and international. Supported by our full marketing suite.',
    tactics: ['Premium portal listings (Rightmove, Zoopla)', 'Print advertising in FT, Country Life, Tatler', 'International press & syndication', 'Open house events by invitation'],
  },
];

const TOOLKIT = [
  { icon: Camera, title: 'Professional Photography', body: 'Award-winning architectural photographers capturing your home in its best light — day and dusk shoots included.' },
  { icon: Video, title: 'Cinematic Video Tour', body: 'Drone and interior film produced to broadcast standard, hosted on our platform and YouTube.' },
  { icon: Globe, title: 'International Reach', body: 'Listed across 120 countries via our global partner network — reaching buyers in the US, Middle East, Asia and Europe.' },
  { icon: BarChart2, title: 'Market Positioning', body: 'Data-driven pricing strategy based on live comparable evidence, ensuring you achieve the optimum market price.' },
  { icon: Users, title: 'Dedicated Agent', body: 'A single point of contact who knows your property intimately — available 7 days a week throughout the campaign.' },
  { icon: Star, title: 'Premium Presentation', body: 'Professional floor plans, 3D virtual tours, and bespoke printed brochures for every property at our premium tier.' },
];

const TIMELINE = [
  { step: 1, title: 'Instruction & Valuation', desc: 'We visit your property, discuss your goals and agree a bespoke marketing strategy.' },
  { step: 2, title: 'Preparation', desc: 'Photography, videography, floor plans and brochure production — typically 5–7 working days.' },
  { step: 3, title: 'Private Launch', desc: 'Soft launch to our private buyer network. Viewings arranged within days.' },
  { step: 4, title: 'Market Launch', desc: 'Full portal and press launch with maximum digital and print exposure.' },
  { step: 5, title: 'Viewings & Feedback', desc: 'We conduct every viewing personally and report back with structured feedback after each appointment.' },
  { step: 6, title: 'Offer & Negotiation', desc: 'We manage all negotiations to secure the highest achievable price with the most qualified buyer.' },
  { step: 7, title: 'Sale Agreed', desc: 'We coordinate solicitors, surveyors and all parties to keep the transaction on track to exchange.' },
  { step: 8, title: 'Completion', desc: 'Keys handed over. We remain available to assist with any post-completion matters.' },
];

const STATS = [
  { value: '98.6%', label: 'Of asking price achieved', sub: 'average, last 24 months' },
  { value: '14 days', label: 'Average time to sale agreed', sub: 'prime London properties' },
  { value: '£2.1bn+', label: 'Total sales transacted', sub: 'since founding' },
  { value: '340+', label: 'Completions last 12 months', sub: 'across all markets' },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] overflow-hidden">
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-5">Selling With Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F4EFE8] mb-6 leading-tight">
            Exceptional Results.<br />Every Time.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto mb-10">
            Selling a luxury home demands more than a portal listing. Our three-phase marketing strategy, combined with unrivalled private buyer access, consistently achieves above-market results.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/valuation" className="lux-button px-8 py-3">Book a Free Valuation</Link>
            <Link href="/contact" className="lux-button-outline px-8 py-3">Speak to an Agent</Link>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/80 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-[#1C1A17]/55 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Phase Strategy */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Approach</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">A Three-Phase Marketing Strategy</h2>
          <p className="text-[#7A6E60] max-w-2xl mx-auto">Our phased approach gives your property the best chance at every stage — beginning with our private network before moving to full market exposure.</p>
        </div>
        <div className="space-y-8">
          {PHASES.map((p, i) => (
            <motion.div key={p.phase} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="lux-card p-8 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3" style={{ background: p.color + '22', color: p.color }}>
                  {p.phase}
                </div>
                <h3 className="font-serif text-2xl text-[#1C1A17] mb-2">{p.title}</h3>
                <p className="text-sm text-[#C9A96A]">{p.duration}</p>
              </div>
              <div className="md:w-2/3">
                <p className="text-[#5F5448] mb-5">{p.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {p.tactics.map(t => (
                    <div key={t} className="flex items-start gap-2 text-sm text-[#5F5448]">
                      <CheckCircle className="w-4 h-4 text-[#C9A96A] shrink-0 mt-0.5" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Toolkit */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Marketing Toolkit</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Everything Your Property Deserves</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLKIT.map(t => (
              <div key={t.title} className="bg-[#252220] rounded-xl p-6">
                <t.icon className="w-7 h-7 text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#F4EFE8] mb-2">{t.title}</h3>
                <p className="text-sm text-[#9A8B7A] leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">The Process</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">From Instruction to Completion</h2>
        </div>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E8DFD0] hidden md:block" />
          <div className="space-y-8">
            {TIMELINE.map(s => (
              <div key={s.step} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C9A96A] text-[#1C1A17] flex items-center justify-center font-serif font-bold text-lg z-10">
                  {s.step}
                </div>
                <div className="lux-card flex-1 p-5">
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{s.title}</h3>
                  <p className="text-sm text-[#7A6E60]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-[#F0EAE0] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A96A] text-2xl font-serif italic mb-4">"We achieved 4% above our original asking price, and the whole process took just six weeks from instruction to completion. The private network approach was exceptional."</p>
          <p className="font-semibold text-[#1C1A17]">Sir James H.</p>
          <p className="text-sm text-[#7A6E60]">Vendor, Belgravia SW1W — Sale: £16.4m</p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Ready to Sell?</h2>
        <p className="text-[#7A6E60] mb-8 max-w-xl mx-auto">Book a complimentary valuation and meet your dedicated agent. No obligation, complete discretion.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/valuation" className="lux-button px-8 py-3">Book a Valuation</Link>
          <a href="tel:+442012345678" className="lux-button-outline px-8 py-3 flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4" /> Call Us Now
          </a>
        </div>
        <p className="text-[#9A8B7A] text-sm mt-6">Or explore our <Link href="/coming-soon" className="text-[#C9A96A] hover:underline">pre-market listings</Link> to understand the off-market advantage.</p>
      </div>
    </div>
  );
}
