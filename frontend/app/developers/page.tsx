'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Building2, Award, MapPin, Globe, ArrowRight } from 'lucide-react';

const DEVELOPERS = [
  {
    slug: 'raxie-capital-developments',
    name: 'Raxie Capital Developments',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'London, UK',
    founded: 1998,
    completedUnits: 2800,
    activeProjects: 4,
    speciality: 'Prime Central London Residential',
    description: 'Award-winning developer of landmark residential schemes in prime central London. Known for meticulous attention to heritage detail and contemporary interior design.',
    awards: ['RIBA Award 2024', 'WhatHouse? Gold 2023', 'Evening Standard Award 2022'],
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    activeIn: ['Mayfair', 'Belgravia', 'Chelsea'],
  },
  {
    slug: 'zenith-gulf-properties',
    name: 'Zenith Gulf Properties',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'Dubai, UAE',
    founded: 2005,
    completedUnits: 5400,
    activeProjects: 7,
    speciality: 'Ultra-Luxury Dubai Waterfront',
    description: 'Dubai\'s premier ultra-luxury developer with landmark waterfront projects on the Palm, Dubai Creek Harbour, and Downtown. RERA registered.',
    awards: ['Arabian Property Awards 2024', 'CNBC Arabia Developer of Year 2023'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    activeIn: ['Palm Jumeirah', 'Dubai Creek Harbour', 'Downtown Dubai'],
  },
  {
    slug: 'northbridge-residential',
    name: 'Northbridge Residential',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'Edinburgh, UK',
    founded: 2001,
    completedUnits: 1200,
    activeProjects: 3,
    speciality: 'Scottish Luxury & New Towns',
    description: 'Scotland\'s leading luxury housebuilder, specialising in sensitively designed schemes within Edinburgh\'s New Town conservation areas.',
    awards: ['LABC Award 2024', 'Scottish Property Awards 2023'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    activeIn: ['Edinburgh New Town', 'Stockbridge', 'Morningside'],
  },
  {
    slug: 'prestige-paris-habitat',
    name: 'Prestige Paris Habitat',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'Paris, France',
    founded: 1992,
    completedUnits: 3100,
    activeProjects: 5,
    speciality: 'Haussmann Renovation & Rooftop Extension',
    description: 'Renowned for extraordinary transformations of Haussmann-era buildings in the 7th and 8th arrondissements, creating world-class residences whilst preserving historic fabric.',
    awards: ['Palmarès Architecture 2024', 'MIPIM Award 2022'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
    activeIn: ['7th Arrondissement', '8th Arrondissement', 'Île de la Cité'],
  },
  {
    slug: 'meridian-singapore',
    name: 'Meridian Singapore',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'Singapore',
    founded: 2003,
    completedUnits: 4200,
    activeProjects: 6,
    speciality: 'GCB & District 9/10 Luxury',
    description: 'Singapore\'s foremost developer of Good Class Bungalows and condominium towers in Districts 9, 10 and 11 — the island\'s most sought-after residential addresses.',
    awards: ['BCI Asia Award 2024', 'EdgeProp Excellence Award 2023'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
    activeIn: ['Orchard', 'Tanglin', 'Nassim'],
  },
  {
    slug: 'atlas-monaco-living',
    name: 'Atlas Monaco Living',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&q=80',
    hq: 'Monte Carlo, Monaco',
    founded: 2010,
    completedUnits: 320,
    activeProjects: 2,
    speciality: 'Ultra-Rare Monaco New Build',
    description: 'Specialists in Monaco\'s extraordinarily scarce new-build pipeline. Each project is approved at governmental level and represents the pinnacle of Mediterranean luxury living.',
    awards: ['Monaco Property Award 2024', 'MIPIM Special Mention 2023'],
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&q=80',
    activeIn: ['Fontvieille', 'Monte Carlo', 'Larvotto'],
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">New Developments</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Developer Profiles</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">We partner exclusively with developers who share our commitment to quality, transparency, and long-term value creation.</motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-4 py-5 grid grid-cols-3 gap-6 text-center">
          {[['6', 'Partner Developers'], ['3,200+', 'Units in Pipeline'], ['12', 'Cities Covered']].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{v}</p>
              <p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Developer cards */}
      <div className="max-w-6xl mx-auto px-4 py-14 space-y-10">
        {DEVELOPERS.map((dev, i) => (
          <ScrollReveal key={dev.slug} delay={i * 0.06}>
            <div className="lux-card overflow-hidden md:flex">
              <div className="relative md:w-80 h-56 md:h-auto shrink-0 overflow-hidden">
                <Image src={dev.image} alt={dev.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 md:bg-gradient-to-l" />
              </div>
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="font-serif text-xl text-[#1C1A17]">{dev.name}</h2>
                      <p className="text-xs text-[#C9A96A] uppercase tracking-widest mt-0.5">{dev.speciality}</p>
                    </div>
                    <span className="shrink-0 text-xs bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-3 py-1 text-[#5F5448]">Est. {dev.founded}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#7A6E60] mb-3">
                    <span className="flex items-center gap-1"><MapPin size={11} />{dev.hq}</span>
                    <span className="flex items-center gap-1"><Building2 size={11} />{dev.completedUnits.toLocaleString()} units completed</span>
                    <span className="flex items-center gap-1"><Globe size={11} />{dev.activeProjects} active projects</span>
                  </div>
                  <p className="text-sm text-[#5F5448] leading-relaxed mb-4">{dev.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dev.activeIn.map(loc => (
                      <span key={loc} className="text-[11px] bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-2.5 py-0.5 text-[#5F5448]">{loc}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dev.awards.map(a => (
                      <span key={a} className="flex items-center gap-1 text-[10px] text-[#C9A96A] border border-[#C9A96A]/30 rounded-full px-2.5 py-0.5">
                        <Award size={9} />{a}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <Link href="/new-developments" className="lux-button text-sm flex items-center gap-1">View Developments <ArrowRight size={13} /></Link>
                  <Link href="/contact" className="lux-button-outline text-sm">Enquire</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 text-center px-4">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Developer Relations</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Are You a Developer?</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">We represent a select group of developers whose projects meet our quality and ethics criteria. Apply to join our partner programme.</p>
          <Link href="/contact" className="lux-button">Apply to Partner with Us</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
