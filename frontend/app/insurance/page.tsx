'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Shield, Phone, Mail, ChevronRight, Home, Gem, Globe, Car } from 'lucide-react';

const COVERS = [
  { icon: Home, title: 'Buildings & Contents', desc: 'Full reinstatement cover for your home\'s structure and contents at agreed value, with no depreciation penalties.' },
  { icon: Gem, title: 'Jewellery & Valuables', desc: 'Worldwide cover for jewellery, watches, and high-value personal items — with agreed value settlement and no depreciation.' },
  { icon: Car, title: 'Classic & Prestige Vehicles', desc: 'Agreed value motor cover for supercars, classic vehicles, and motorcycles, including track day use.' },
  { icon: Globe, title: 'International Cover', desc: 'Coordinated cover for clients with properties in multiple countries, through a single relationship manager.' },
  { icon: Shield, title: 'Liability Protection', desc: 'Comprehensive personal liability and employer\'s liability for domestic staff, covering claims up to £10m.' },
  { icon: Gem, title: 'Flood & Specialist Risks', desc: 'Cover for properties in flood risk areas, listed buildings, thatched properties, and unique architectures.' },
];

const PARTNERS = [
  { name: 'Chubb', logo: 'Chubb', desc: 'The world\'s largest publicly traded property & casualty insurer. Specialist high-net-worth division.' },
  { name: 'Hiscox', logo: 'Hiscox', desc: 'Specialist UK insurer with dedicated high-value home cover and market-leading art insurance.' },
  { name: 'AIG Private Client', logo: 'AIG', desc: 'Global specialist in high-net-worth personal lines, including multi-property and international portfolios.' },
  { name: 'NFU Mutual', logo: 'NFU', desc: 'Preferred by UK country estate owners. Exceptional service and claims handling reputation.' },
];

export default function InsurancePage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Property Insurance</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">High-Value Property Insurance</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Your exceptional home deserves exceptional protection. We introduce clients to the UK&apos;s leading specialist high-net-worth insurers.</motion.p>
        </div>
      </div>

      {/* Important notice */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Please note:</strong> Raxie Zenith Estate is not a regulated insurance intermediary. We provide introductions to specialist insurers and brokers only. All insurance advice and contracts are provided directly by our regulated partners.
        </div>
      </div>

      {/* Covers */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <ScrollReveal className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Coverage Areas</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Comprehensive Protection</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COVERS.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.07}>
              <div className="lux-card p-6">
                <c.icon size={20} className="text-[#C9A96A] mb-3" />
                <h3 className="font-semibold text-[#1C1A17] mb-2">{c.title}</h3>
                <p className="text-sm text-[#5F5448] leading-relaxed">{c.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Partner insurers */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Introductions</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">Specialist Insurance Partners</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5">
            {PARTNERS.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1}>
                <div className="lux-card p-6 flex gap-4">
                  <div className="w-14 h-14 bg-[#F6F2EC] rounded-xl flex items-center justify-center shrink-0 font-bold text-[#C9A96A] text-lg font-serif">{p.logo.slice(0, 3)}</div>
                  <div>
                    <h3 className="font-semibold text-[#1C1A17] mb-1">{p.name}</h3>
                    <p className="text-sm text-[#5F5448] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 text-center px-4">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Get a Quote</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Request an Introduction</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Tell us about your property and we'll introduce you to the most appropriate specialist insurer within 24 hours.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="lux-button">Request Introduction</Link>
            <a href="tel:+442070000000" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10 flex items-center gap-2">
              <Phone size={14} /> +44 20 7000 0000
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
