'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { useState } from 'react';

const SECTORS = [
  {
    icon: '🏢',
    title: 'Office',
    desc: 'Prime office space across Central London and major UK cities — from single suites to campus headquarters.',
    types: ['Grade A leasehold', 'Serviced & flex', 'Owner-occupier freehold', 'Pre-let development'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    icon: '🛍️',
    title: 'Retail & Leisure',
    desc: 'High street, retail parks, leisure and food & beverage units — from flagship stores to neighbourhood anchors.',
    types: ['High street retail', 'Shopping centre units', 'Restaurant & leisure', 'Drive-through & convenience'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
  {
    icon: '🏭',
    title: 'Industrial & Logistics',
    desc: 'Last-mile, big-box and multi-let industrial across key UK distribution corridors.',
    types: ['Distribution warehouses', 'Last-mile urban logistics', 'Multi-let industrial estates', 'Cold storage & specialist'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80',
  },
  {
    icon: '🏨',
    title: 'Hotels & Hospitality',
    desc: 'Investment and operational opportunities across limited-service, full-service and boutique hotel segments.',
    types: ['Hotel freehold investment', 'Ground lease structures', 'Development sites', 'Serviced apartments'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  },
  {
    icon: '🌿',
    title: 'Development Land',
    desc: 'Strategic land, mixed-use development sites and urban regeneration opportunities across the UK.',
    types: ['Residential-led mixed use', 'Urban regeneration', 'Build-to-rent sites', 'Commercial development'],
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
  },
  {
    icon: '💊',
    title: 'Alternatives',
    desc: 'Healthcare, student accommodation, data centres and other alternative asset classes with strong income profiles.',
    types: ['Healthcare & GP surgeries', 'Student accommodation', 'Data centres', 'Self-storage'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
  },
];

const FEATURES = [
  { icon: '🔍', title: 'Off-Market Access', desc: 'Exclusive access to off-market commercial transactions before they are publicly marketed.' },
  { icon: '💼', title: 'Investment Analysis', desc: 'Full financial modelling, NIY / GIY calculations, cashflow projections and covenant appraisals.' },
  { icon: '⚖️', title: 'Legal Coordination', desc: 'Introduction to specialist commercial property solicitors and management of legal due diligence timelines.' },
  { icon: '🌍', title: 'International Buyers', desc: 'Cross-border transaction management for overseas investors acquiring UK commercial real estate.' },
];

export default function CommercialPage() {
  const [activeSector, setActiveSector] = useState(0);
  const sector = SECTORS[activeSector];

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Commercial Real Estate</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Where Capital<br />Meets Opportunity</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Office, retail, industrial, hospitality and alternatives — expert advisory across every commercial asset class.</motion.p>
        </div>
      </div>

      {/* Sector explorer */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ScrollReveal><p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">Sectors</p><h2 className="text-4xl font-light text-[#1C1A17] lux-heading text-center mb-12">What We Cover</h2></ScrollReveal>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
          {SECTORS.map((s, i) => (
            <button key={s.title} onClick={() => setActiveSector(i)} className={`p-3 rounded-xl text-center transition-all ${activeSector === i ? 'bg-[#1C1A17] text-white' : 'bg-white text-[#5F5448] border border-[#E8E1D7] hover:bg-[#F0EBE3]'}`}>
              <span className="text-2xl block mb-1">{s.icon}</span>
              <span className="text-xs">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="lux-card overflow-hidden grid md:grid-cols-2 gap-0">
          <div className="h-64 md:h-auto overflow-hidden">
            <img src={sector.image} alt={sector.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8">
            <span className="text-4xl mb-3 block">{sector.icon}</span>
            <h3 className="text-2xl font-semibold text-[#1C1A17] mb-3">{sector.title}</h3>
            <p className="text-[#5F5448] mb-5 leading-relaxed">{sector.desc}</p>
            <ul className="space-y-2 mb-6">
              {sector.types.map(t => <li key={t} className="flex items-center gap-2 text-sm text-[#7A6E60]"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A96A]" />{t}</li>)}
            </ul>
            <Link href="/contact" className="lux-button">Enquire About {sector.title}</Link>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-[#1C1A17] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal><h2 className="text-3xl font-light text-white lux-heading mb-10 text-center">Our Advisory Services</h2></ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map(f => (
              <ScrollReveal key={f.title}>
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-3xl mb-3 block">{f.icon}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-[#9A8B7A] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-light text-[#1C1A17] lux-heading mb-4">Speak to Our Commercial Team</h2>
          <p className="text-[#5F5448] mb-8">Whether you&apos;re buying, selling, leasing or investing in commercial property — our team is available for a confidential consultation.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="lux-button">Get in Touch</Link>
            <Link href="/search?propertyType=COMMERCIAL" className="lux-button-outline">Browse Commercial</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
