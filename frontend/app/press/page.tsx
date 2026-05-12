'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

const AWARDS = [
  { year: '2025', title: 'Best Luxury Property Platform', body: 'RESI Awards', icon: '🏆' },
  { year: '2025', title: 'PropTech Innovation of the Year', body: 'EG Awards', icon: '🏆' },
  { year: '2025', title: 'Best Use of Technology in Property', body: 'Property Week', icon: '🥈' },
  { year: '2024', title: 'Best International Agent', body: 'Overseas Property Professional', icon: '🏆' },
  { year: '2024', title: 'Top Luxury Brokerage — London', body: 'Sunday Times Property', icon: '🏆' },
  { year: '2024', title: 'Rising Platform Award', body: 'LonRes', icon: '🥈' },
];

const COVERAGE = [
  {
    pub: 'Financial Times',
    date: 'March 2026',
    headline: 'The Platform Reinventing How London\'s Wealthiest Buy Property',
    excerpt: 'Raxie Zenith Estate is quietly becoming the default choice for UHNW buyers who demand discretion, data and world-class service in a single platform.',
    logo: 'FT',
    href: '#',
  },
  {
    pub: 'Bloomberg',
    date: 'January 2026',
    headline: 'AI-Powered Valuation Is Reshaping Prime London\'s Property Market',
    excerpt: 'A new generation of technology-led brokerages is challenging incumbents by combining machine learning with genuine market expertise.',
    logo: 'Bloomberg',
    href: '#',
  },
  {
    pub: 'The Times',
    date: 'November 2025',
    headline: '10 Property Platforms That Are Actually Worth Bookmarking',
    excerpt: 'Among the standouts: Raxie Zenith Estate, whose editorial curation and AI valuation tools feel genuinely different from the aggregator pack.',
    logo: 'The Times',
    href: '#',
  },
  {
    pub: 'Forbes',
    date: 'October 2025',
    headline: 'The Disruptors Transforming Global Luxury Real Estate',
    excerpt: 'From off-market origination to cross-border deal structuring, a handful of new platforms are eating into the dominance of legacy luxury brokerages.',
    logo: 'Forbes',
    href: '#',
  },
  {
    pub: 'Vogue Living',
    date: 'September 2025',
    headline: 'The New Rules of Buying a Beautiful Home',
    excerpt: 'Private finance, neighbourhood intelligence and lifestyle matching — the smartest buyers now use platforms that do far more than simply list properties.',
    logo: 'Vogue',
    href: '#',
  },
  {
    pub: 'Wall Street Journal',
    date: 'June 2025',
    headline: 'London Property Technology: Who Is Winning the Platform Wars?',
    excerpt: 'Several well-capitalised startups are taking direct aim at Knight Frank and Savills\' digital ambitions. Raxie Zenith is among the most credible.',
    logo: 'WSJ',
    href: '#',
  },
];

const PRESS_PACK = [
  { title: 'Company Overview & Fact Sheet', size: '1.2 MB', type: 'PDF' },
  { title: 'Brand Assets & Logos', size: '8.4 MB', type: 'ZIP' },
  { title: 'Executive Headshots', size: '12 MB', type: 'ZIP' },
  { title: 'Platform Screenshots', size: '6.8 MB', type: 'ZIP' },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Newsroom</motion.p>
          <motion.h1 className="text-5xl font-light text-white lux-heading mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Press & Media</motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Awards, media coverage and resources for journalists and media professionals.</motion.p>
        </div>
      </div>

      {/* Press logos */}
      <div className="bg-white py-10 border-b border-[#E8E1D7]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.5em] text-[#9A8B7A] mb-6">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {['FT', 'Bloomberg', 'The Times', 'WSJ', 'Forbes', 'Vogue'].map(p => (
              <span key={p} className="text-xl font-bold text-[#BBAD98] hover:text-[#1C1A17] transition-colors tracking-tight cursor-default">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <ScrollReveal><p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Recognition</p><h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-10">Awards & Accolades</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AWARDS.map(a => (
            <ScrollReveal key={a.title}>
              <div className="lux-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A96A]/10 flex items-center justify-center shrink-0 text-xl">{a.icon}</div>
                <div>
                  <p className="font-semibold text-[#1C1A17] text-sm">{a.title}</p>
                  <p className="text-xs text-[#7A6E60]">{a.body} · {a.year}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Media coverage */}
      <div className="bg-[#F0EBE3] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal><p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Coverage</p><h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-10">In the Media</h2></ScrollReveal>
          <div className="space-y-6">
            {COVERAGE.map(item => (
              <ScrollReveal key={item.headline}>
                <div className="lux-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-5">
                    <div className="w-16 shrink-0 text-center">
                      <span className="text-sm font-bold text-[#9A8B7A]">{item.logo}</span>
                      <p className="text-xs text-[#BBAD98] mt-1">{item.date}</p>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#1C1A17] font-semibold mb-2 leading-snug">{item.headline}</h3>
                      <p className="text-[#5F5448] text-sm leading-relaxed">&ldquo;{item.excerpt}&rdquo;</p>
                    </div>
                    <a href={item.href} className="shrink-0 text-[#C9A96A] text-sm hover:underline">Read →</a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Press pack */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <ScrollReveal><h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-10">Press Pack</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {PRESS_PACK.map(item => (
            <ScrollReveal key={item.title}>
              <div className="lux-card p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C1A17] flex items-center justify-center text-xs text-[#C9A96A] font-bold shrink-0">{item.type}</div>
                  <div><p className="font-semibold text-[#1C1A17] text-sm">{item.title}</p><p className="text-xs text-[#7A6E60]">{item.size}</p></div>
                </div>
                <button className="lux-button-outline text-xs">Download</button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Press contact */}
        <div className="lux-card p-8 bg-[#1C1A17] text-white">
          <h3 className="text-2xl font-light lux-heading mb-3">Press Enquiries</h3>
          <p className="text-[#9A8B7A] mb-4">For media enquiries, interview requests or additional brand assets, please contact our communications team.</p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:press@raxiezenithestate.com" className="lux-button">Email Press Team</a>
            <a href="tel:+442071234567" className="lux-button-outline">+44 20 7123 4567</a>
          </div>
        </div>
      </div>
    </div>
  );
}
