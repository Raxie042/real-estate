'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Award, Star, Calendar, Globe } from 'lucide-react';

const AWARDS = [
  { year: '2026', title: 'Best Luxury Property Platform — UK', org: 'PropertyWeek Awards', category: 'Technology', gold: true },
  { year: '2026', title: 'Outstanding Client Service — Global', org: 'International Property Awards', category: 'Service', gold: true },
  { year: '2025', title: 'Innovation in PropTech', org: 'RESI Awards', category: 'Technology', gold: true },
  { year: '2025', title: 'Best Online Luxury Agent', org: 'ESTAS Awards', category: 'Digital', gold: true },
  { year: '2025', title: 'Top Rated Platform — Trustpilot', org: 'Trustpilot', category: 'Client Review', gold: false },
  { year: '2024', title: 'Best Use of AI in Real Estate', org: 'PropTech Innovation Awards', category: 'Technology', gold: true },
  { year: '2024', title: 'Dubai Luxury Property Platform of the Year', org: 'Arabian Property Awards', category: 'International', gold: true },
  { year: '2024', title: 'Best Client Experience — Luxury Sector', org: 'Luxury Briefing Awards', category: 'Experience', gold: false },
  { year: '2023', title: 'Highly Commended — Digital Innovation', org: 'RESI Awards', category: 'Technology', gold: false },
  { year: '2023', title: 'Best New Platform — UK & Ireland', org: 'International Property Awards', category: 'Launch', gold: true },
];

const PRESS = [
  { outlet: 'Financial Times', quote: 'Setting a new standard for digital luxury property marketing in Europe.', logo: 'FT' },
  { outlet: 'The Times', quote: 'The first platform to genuinely challenge the dominance of the traditional estate agency model in prime central London.', logo: 'The Times' },
  { outlet: 'Forbes', quote: 'Among the most sophisticated proptech platforms available to high-net-worth buyers anywhere in the world.', logo: 'Forbes' },
  { outlet: 'Wallpaper*', quote: 'Raxie Zenith Estate brings the aesthetic sensibility of a luxury fashion house to property search.', logo: 'Wallpaper' },
];

const STATS = [
  { value: '£2.1bn+', label: 'Properties Transacted' },
  { value: '4.9/5', label: 'Trustpilot Rating' },
  { value: '12+', label: 'Industry Awards' },
  { value: '47', label: 'Countries Reached' },
];

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Recognition</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Awards &amp; Recognition</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">A record of industry recognition reflecting our commitment to excellence in client service, technology, and market knowledge.</motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awards timeline */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        <ScrollReveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Award History</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Industry Awards 2023–2026</h2>
        </ScrollReveal>

        <div className="space-y-4">
          {AWARDS.map((a, i) => (
            <ScrollReveal key={`${a.year}-${a.title}`} delay={i * 0.05}>
              <div className="lux-card p-5 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${a.gold ? 'bg-[#C9A96A]' : 'bg-[#F6F2EC] border border-[#E8E1D7]'}`}>
                  <Award size={18} className={a.gold ? 'text-[#1C1A17]' : 'text-[#9A8B7A]'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <h3 className="font-semibold text-[#1C1A17] text-sm">{a.title}</h3>
                    {a.gold && <span className="text-[10px] bg-[#C9A96A]/20 text-[#9A6B20] rounded-full px-2 py-0.5 font-medium">Winner</span>}
                    {!a.gold && <span className="text-[10px] bg-[#F6F2EC] border border-[#E8E1D7] text-[#9A8B7A] rounded-full px-2 py-0.5">Highly Commended</span>}
                  </div>
                  <p className="text-xs text-[#7A6E60]">{a.org}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-2.5 py-0.5 text-[#5F5448]">{a.year}</span>
                  <p className="text-[10px] text-[#9A8B7A] mt-1">{a.category}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Press */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Press</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">What the Media Says</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {PRESS.map((p, i) => (
              <ScrollReveal key={p.outlet} delay={i * 0.1}>
                <div className="lux-card p-6">
                  <p className="text-xs font-bold text-[#1C1A17] mb-2 uppercase tracking-wider">{p.outlet}</p>
                  <p className="text-[#5F5448] italic text-sm leading-relaxed">&ldquo;{p.quote}&rdquo;</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 text-center px-4">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Experience Excellence</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">See Why We Win Awards</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Browse our collection of exceptional properties and discover why thousands of buyers and sellers trust Raxie Zenith Estate.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/properties" className="lux-button">Browse Properties</Link>
            <Link href="/testimonials" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Read Client Stories</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
