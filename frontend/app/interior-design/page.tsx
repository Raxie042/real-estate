'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, CheckCircle, TrendingUp, Home, Users } from 'lucide-react';

const STUDIOS = [
  { name: 'Cassian & Bell Interiors', location: 'London & International', spec: 'Contemporary Luxury', desc: 'Award-winning London studio specialising in prime residential interiors. Known for restrained palettes, bespoke joinery and architect-quality detailing.', projects: ['Kensington townhouse', 'Chelsea river apartment', 'Mayfair pied-à-terre'], contact: 'Introductions via Raxie Zenith Estate' },
  { name: 'Sutherland Kerr Design', location: 'Edinburgh & London', spec: 'Classic British & Scottish Heritage', desc: 'Masters of the classic Scottish country aesthetic — tartan done tastefully, stone fireplaces, hand-painted cabinetry and the finest Scottish fabrics.', projects: ['Perthshire estate renovation', 'New Town Georgian townhouse', 'Chelsea Scottish retreat'], contact: 'Introductions via Raxie Zenith Estate' },
  { name: 'Form & Foliage', location: 'London & Dubai', spec: 'Biophilic Design', desc: 'Biophilic specialists — living walls, natural materials, indoor water features and WELL Building Standard principles applied to residential interiors.', projects: ['Primrose Hill eco-residence', 'Palm Jumeirah villa', 'Dubai Hills family home'], contact: 'Introductions via Raxie Zenith Estate' },
  { name: 'Al Noor Atelier', location: 'Dubai & London', spec: 'Contemporary Middle Eastern', desc: 'Blending mashrabiya-inspired screens, calligraphy motifs and premium materials from the region with a thoroughly modern spatial sensibility.', projects: ['Emirates Hills mansion', 'DIFC penthouse', 'London investment apartment'], contact: 'Introductions via Raxie Zenith Estate' },
  { name: 'Möller Studio', location: 'London & Stockholm', spec: 'Scandinavian Minimalism', desc: 'Acclaimed for serene interiors defined by proportion, natural light and flawless craftsmanship. Residential and hospitality projects across Europe.', projects: ['Notting Hill conversion', 'Stockholm waterfront villa', 'Marylebone apartment'], contact: 'Introductions via Raxie Zenith Estate' },
  { name: 'Langford & Ashby', location: 'London', spec: 'Maximalist & Eclectic', desc: 'Fearless maximalists celebrated for rich colour, layered texture and extraordinary material combinations. Regularly featured in World of Interiors.', projects: ['Belgravia mansion flat', 'Cotswolds manor', 'Fitzrovia townhouse'], contact: 'Introductions via Raxie Zenith Estate' },
];

const PROCESS = [
  { num: '01', title: 'Tell Us Your Vision', desc: 'Share your style references, budget, and timeline. We match you with the most suitable studio from our vetted network.' },
  { num: '02', title: 'Introduction & Brief', desc: 'We introduce you directly to the design principal. The studio prepares an initial concept brief at no charge.' },
  { num: '03', title: 'Proposal & Engagement', desc: 'Review the proposal and engage the studio directly. All fees and contracts are between you and the designer.' },
  { num: '04', title: 'Project Delivery', desc: 'From concept through to installation, your chosen studio manages the full process. We remain available if you need us.' },
];

export default function InteriorDesignPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Partner Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Interior Design Partners</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">We work with a curated group of award-winning interior designers. Whether you&apos;re moving in, renovating or preparing to sell — we can make the right introduction.</motion.p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          These studios are independent partners, not employees of Raxie Zenith Estate. We make introductions; all design contracts, fees and agreements are directly between you and the chosen studio.
        </div>
      </div>

      {/* Studios */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ScrollReveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Partners</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Vetted Design Studios</h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {STUDIOS.map((s, i) => (
            <ScrollReveal key={s.name} delay={i * 0.08}>
              <div className="lux-card p-6 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-[#1C1A17] mb-0.5">{s.name}</h3>
                    <p className="text-xs text-[#C9A96A] uppercase tracking-wider">{s.spec}</p>
                    <p className="text-xs text-[#9A8B7A] mt-0.5">{s.location}</p>
                  </div>
                </div>
                <p className="text-sm text-[#5F5448] mb-4 leading-relaxed">{s.desc}</p>
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-2">Recent Projects</p>
                  <ul className="space-y-1">
                    {s.projects.map(p => <li key={p} className="text-xs text-[#5F5448] flex items-center gap-1.5"><span className="w-1 h-1 bg-[#C9A96A] rounded-full shrink-0" />{p}</li>)}
                  </ul>
                </div>
                <div className="mt-auto">
                  <Link href="/contact" className="lux-button-outline text-sm flex items-center gap-1.5 justify-center">
                    Request Introduction <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">How It Works</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">The Introduction Process</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A96A] flex items-center justify-center text-[#1C1A17] font-bold text-sm mx-auto mb-3">{p.num}</div>
                  <h3 className="font-semibold text-[#1C1A17] mb-1.5 text-sm">{p.title}</h3>
                  <p className="text-xs text-[#5F5448] leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 px-4 text-center">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Start Your Project</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Tell Us About Your Property</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Share your vision, property type and budget range. We&apos;ll suggest the most suitable studio and arrange an introductory call within 48 hours.</p>
          <Link href="/contact" className="lux-button">Request an Introduction</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
