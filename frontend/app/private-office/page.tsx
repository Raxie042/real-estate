'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Shield, Globe, TrendingUp, Users, Lock, CheckCircle, ArrowRight, Star } from 'lucide-react';

const SERVICES = [
  {
    icon: Shield,
    title: 'Wealth Structuring',
    desc: 'Holistic real estate wealth structuring across jurisdictions — SPVs, trusts, family offices, and estate planning integrated with your property strategy.',
  },
  {
    icon: Globe,
    title: 'Global Portfolio Advisory',
    desc: 'Multi-market property portfolio construction and management. We coordinate across London, Dubai, Monaco, Singapore, New York, and beyond.',
  },
  {
    icon: TrendingUp,
    title: 'Off-Market Acquisition',
    desc: 'Exclusive first access to off-market properties at every price point. Most transactions are never publicly listed — we find what others cannot.',
  },
  {
    icon: Lock,
    title: 'Discretionary Disposition',
    desc: 'Confidential sale of trophy assets with complete discretion. No public marketing. Direct buyer introductions from our UHNW network.',
  },
  {
    icon: Users,
    title: 'Dedicated Relationship Manager',
    desc: 'One senior relationship manager available 24 hours a day, seven days a week. One point of contact for every property matter, anywhere in the world.',
  },
  {
    icon: Star,
    title: 'Lifestyle Integration',
    desc: 'Coordinated introductions to our vetted network of interior architects, security consultants, family office advisors, and concierge operators.',
  },
];

const PILLARS = [
  { num: '01', title: 'Absolute Discretion', desc: 'All mandates are handled under strict non-disclosure. Your identity, portfolio, and intentions are never disclosed without your express consent.' },
  { num: '02', title: 'Principal-Level Access', desc: 'You deal with principals, not juniors. Your relationship manager has 15+ years of UHNW transactional experience.' },
  { num: '03', title: 'Global Network', desc: 'Direct relationships with the heads of residential at every major international agency, family office, and private bank.' },
  { num: '04', title: 'No Conflicts', desc: 'We act exclusively in your interest. We do not represent sellers or developers to clients under a Private Office mandate.' },
];

const THRESHOLDS = [
  { tier: 'Private Office', threshold: '£10m+', colour: '#C9A96A', items: ['Dedicated relationship manager', 'Off-market access', 'Portfolio review', 'Priority event invitations', 'Quarterly market briefing'] },
  { tier: 'Private Office — Grand', threshold: '£25m+', colour: '#F6F2EC', items: ['Everything in Private Office', 'Annual wealth structuring review', 'Global acquisition mandate', 'Discretionary disposition', 'Family office liaison', 'Lifestyle integration'] },
];

const TESTIMONIALS = [
  { name: 'A.K.', origin: 'Middle East — London portfolio', quote: 'Within six weeks of engaging the Private Office we had acquired three PCL assets that were never publicly available. The access is genuinely extraordinary.' },
  { name: 'M.T.', origin: 'Asia-Pacific — International portfolio', quote: 'They structured the entire acquisition through our family office with zero paperwork friction on our side. Complete professionalism from first call to completion.' },
  { name: 'J.F.', origin: 'Europe — UK & Monaco', quote: 'I have worked with every major name in London. Nobody comes close to the level of discretion and deal flow the Private Office provides.' },
];

export default function PrivateOfficePage() {
  return (
    <div className="min-h-screen bg-[#1C1A17]">

      {/* Hero */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1C1A17]/80 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-20 h-px bg-[#C9A96A] mx-auto mb-8" />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.6em] mb-5">By Invitation or Referral</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}
            className="font-serif text-6xl md:text-7xl text-[#F6F2EC] leading-tight mb-6 lux-heading">
            The Private<br />Office
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            An exclusive bespoke service for clients with significant property interests — typically £10 million or above.
            One relationship manager. Total discretion. Access the others simply cannot provide.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="lux-button">Request an Introduction</Link>
            <Link href="#services" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-y border-[#3A3530]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['£2.1bn+', 'Transacted 2023–2026'],
            ['47', 'Countries covered'],
            ['100%', 'Off-market mandates fulfilled'],
            ['24/7', 'Relationship manager access'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-3xl text-[#C9A96A] mb-1">{v}</p>
              <p className="text-xs text-[#9A8B7A] uppercase tracking-wider">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div id="services" className="max-w-5xl mx-auto px-6 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">What We Offer</p>
          <h2 className="font-serif text-4xl text-[#F6F2EC] lux-heading">Private Office Services</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className="p-7 rounded-2xl bg-[#252220] border border-[#3A3530] hover:border-[#C9A96A]/40 transition-colors">
                <s.icon size={22} className="text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#F6F2EC] mb-2">{s.title}</h3>
                <p className="text-sm text-[#9A8B7A] leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="border-y border-[#3A3530] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Our Principles</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] lux-heading">How We Work</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.1}>
                <div className="text-center">
                  <p className="text-5xl font-serif text-[#C9A96A]/30 mb-3">{p.num}</p>
                  <h3 className="font-semibold text-[#F6F2EC] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#9A8B7A] leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Membership</p>
          <h2 className="font-serif text-4xl text-[#F6F2EC] lux-heading">Private Office Tiers</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {THRESHOLDS.map((t, i) => (
            <ScrollReveal key={t.tier} delay={i * 0.1}>
              <div className={`rounded-2xl p-8 h-full flex flex-col border ${i === 1 ? 'bg-[#C9A96A] border-[#C9A96A]' : 'bg-[#252220] border-[#3A3530]'}`}>
                <p className={`text-xs uppercase tracking-[0.4em] mb-2 ${i === 1 ? 'text-[#1C1A17]/70' : 'text-[#C9A96A]'}`}>From</p>
                <p className={`font-serif text-4xl mb-1 ${i === 1 ? 'text-[#1C1A17]' : 'text-[#F6F2EC]'}`}>{t.threshold}</p>
                <p className={`font-semibold mb-6 ${i === 1 ? 'text-[#1C1A17]' : 'text-[#C9A96A]'}`}>{t.tier}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {t.items.map(item => (
                    <li key={item} className={`flex items-start gap-2.5 text-sm ${i === 1 ? 'text-[#1C1A17]' : 'text-[#B9AA98]'}`}>
                      <CheckCircle size={14} className={`mt-0.5 shrink-0 ${i === 1 ? 'text-[#1C1A17]' : 'text-[#C9A96A]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact"
                  className={`text-center py-3 px-6 rounded-full text-sm font-semibold transition-colors ${i === 1 ? 'bg-[#1C1A17] text-[#C9A96A] hover:bg-[#252220]' : 'border border-[#C9A96A]/50 text-[#C9A96A] hover:bg-[#C9A96A]/10'}`}>
                  Request Introduction
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="border-t border-[#3A3530] py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Client Voices</p>
            <h2 className="font-serif text-3xl text-[#F6F2EC] lux-heading">In Their Words</h2>
          </ScrollReveal>
          <div className="space-y-5">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="p-7 rounded-2xl bg-[#252220] border border-[#3A3530]">
                  <p className="text-[#B9AA98] leading-relaxed italic mb-5 text-lg">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C9A96A]/20 flex items-center justify-center">
                      <Lock size={12} className="text-[#C9A96A]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#F6F2EC] text-sm">{t.name}</p>
                      <p className="text-xs text-[#9A8B7A]">{t.origin} — Identity withheld by request</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 text-center px-6 border-t border-[#3A3530]">
        <ScrollReveal>
          <div className="w-16 h-px bg-[#C9A96A] mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Begin the Conversation</p>
          <h2 className="font-serif text-4xl text-[#F6F2EC] lux-heading mb-5">Access the Private Office</h2>
          <p className="text-[#9A8B7A] max-w-xl mx-auto mb-8 leading-relaxed">
            Membership is by introduction or referral only. To enquire, contact our Private Office directly.
            All communications are treated with absolute confidence.
          </p>
          <Link href="/contact" className="lux-button">
            Request an Introduction <ArrowRight size={14} className="inline ml-1.5" />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
