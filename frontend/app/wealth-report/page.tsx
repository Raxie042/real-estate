'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Download, BookOpen, FileText, TrendingUp, Globe, Lock } from 'lucide-react';

const REPORTS = [
  {
    id: 'wealth-report-2026',
    title: 'The Raxie Zenith Wealth Report 2026',
    subtitle: 'Annual Global Prime Property Outlook',
    description: 'Our flagship annual publication analysing prime residential markets across 40 cities. Includes price forecasts, investment hotspots, demand-supply analysis, and the ultra-high-net-worth buyer sentiment survey.',
    pages: 64,
    published: 'January 2026',
    category: 'Annual Report',
    featured: true,
    gated: true,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=600&q=80',
    topics: ['Global Market Forecast', 'UHNW Buyer Trends', 'Top 10 Investment Cities', 'Price Performance 2025', 'Currency Impact Analysis'],
  },
  {
    id: 'prime-london-q1-2026',
    title: 'Prime London Residential Q1 2026',
    subtitle: 'Quarterly Market Intelligence',
    description: 'Comprehensive analysis of prime and super-prime London residential transactions. PCL price movements, transaction volumes, buyer profile analysis, and 12-month outlook.',
    pages: 28,
    published: 'April 2026',
    category: 'Quarterly',
    featured: false,
    gated: true,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    topics: ['PCL Price Index', 'Transaction Volumes', 'International Buyer Profile', 'New Supply Pipeline'],
  },
  {
    id: 'dubai-market-2026',
    title: 'Dubai Prime Property Report 2026',
    subtitle: 'UAE Market Outlook & Investment Guide',
    description: 'An in-depth review of Dubai\'s prime and ultra-prime residential sector. Off-plan pipeline, Golden Visa impact, international buyer composition, and investment yield analysis.',
    pages: 36,
    published: 'March 2026',
    category: 'Market Report',
    featured: false,
    gated: true,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    topics: ['Off-Plan Pipeline', 'Golden Visa Impact', 'Rental Yield Analysis', 'Developer Rankings'],
  },
  {
    id: 'investment-guide-2026',
    title: 'International Property Investment Guide',
    subtitle: 'Practical Guide for Cross-Border Buyers',
    description: 'A practical guide for buyers acquiring property across multiple jurisdictions. Covers ownership structures, tax implications, mortgage access, and due diligence requirements in 12 countries.',
    pages: 52,
    published: 'February 2026',
    category: 'Guide',
    featured: false,
    gated: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    topics: ['Ownership Structures', 'Tax by Jurisdiction', 'Cross-Border Mortgages', 'Legal Due Diligence'],
  },
  {
    id: 'scotland-market-2026',
    title: 'Scotland Prime Property 2026',
    subtitle: 'Edinburgh & Rural Estates Outlook',
    description: 'Review of Scotland\'s prime residential market including Edinburgh New Town, Perthshire country estates, and the Highland market. Scottish-specific legal framework and tax implications.',
    pages: 24,
    published: 'March 2026',
    category: 'Market Report',
    featured: false,
    gated: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    topics: ['Edinburgh Market', 'Rural Estates', 'LBTT vs SDLT', 'Scottish Legal Process'],
  },
  {
    id: 'sustainability-report-2026',
    title: 'Sustainable Luxury Report 2026',
    subtitle: 'EPC, Net Zero & Property Values',
    description: 'How sustainability credentials are reshaping the luxury market. EPC A/B premium analysis, BREEAM vs LEED ratings, Net Zero regulations roadmap, and green retrofit ROI study.',
    pages: 32,
    published: 'February 2026',
    category: 'Thematic Report',
    featured: false,
    gated: false,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    topics: ['EPC Value Premium', 'Net Zero Regulations', 'Green Retrofit ROI', 'BREEAM Rankings'],
  },
];

const CATEGORIES = ['All', 'Annual Report', 'Quarterly', 'Market Report', 'Guide', 'Thematic Report'];

export default function WealthReportPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [downloadForm, setDownloadForm] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [submitted, setSubmitted] = useState<Set<string>>(new Set());

  const filtered = REPORTS.filter(r => activeCategory === 'All' || r.category === activeCategory);

  const handleDownload = (id: string, gated: boolean) => {
    if (!gated) {
      setSubmitted(prev => new Set([...prev, id]));
      return;
    }
    setDownloadForm(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (downloadForm) {
      setSubmitted(prev => new Set([...prev, downloadForm]));
      setDownloadForm(null);
      setEmail('');
      setFirstName('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Research & Intelligence</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Wealth Reports</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">In-depth market research, investment guides, and annual outlooks from our global research team. Downloadable PDF editions available.</motion.p>
        </div>
      </div>

      {/* Download form modal */}
      {downloadForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-2 mb-1">
              <Lock size={14} className="text-[#C9A96A]" />
              <p className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A]">Gated Report</p>
            </div>
            <h3 className="font-serif text-2xl text-[#1C1A17] mb-2">Download Report</h3>
            <p className="text-sm text-[#5F5448] mb-5">Enter your details to receive instant access to the full PDF.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="lux-input w-full" />
              <input required type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="lux-input w-full" />
              <p className="text-[10px] text-[#9A8B7A]">By downloading you agree to receive our research updates. Unsubscribe at any time.</p>
              <div className="flex gap-3">
                <button type="submit" className="lux-button flex-1 flex items-center justify-center gap-1.5"><Download size={13} />Get Report</button>
                <button type="button" onClick={() => setDownloadForm(null)} className="px-4 py-2.5 rounded-xl border border-[#E8E1D7] text-sm text-[#5F5448] hover:border-[#C9A96A] transition">Cancel</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${activeCategory === c ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured report */}
        {activeCategory === 'All' && (
          <ScrollReveal className="mb-8">
            {(() => {
              const f = REPORTS.find(r => r.featured)!;
              const done = submitted.has(f.id);
              return (
                <div className="lux-card overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-72 h-48 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${f.image})` }} />
                  <div className="flex-1 p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-[#C9A96A] text-[#1C1A17] font-bold rounded-full px-3 py-0.5 uppercase tracking-wider">Flagship Report</span>
                      <span className="text-[10px] text-[#9A8B7A]">{f.published} · {f.pages} pages</span>
                    </div>
                    <h2 className="font-serif text-3xl text-[#1C1A17] mb-1">{f.title}</h2>
                    <p className="text-[#C9A96A] text-xs uppercase tracking-widest mb-3">{f.subtitle}</p>
                    <p className="text-sm text-[#5F5448] leading-relaxed mb-4">{f.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {f.topics.map(t => <span key={t} className="text-[10px] bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-2.5 py-0.5 text-[#5F5448]">{t}</span>)}
                    </div>
                    {done
                      ? <p className="text-emerald-600 font-semibold text-sm">✓ Report link sent to your email</p>
                      : <button onClick={() => handleDownload(f.id, f.gated)} className="lux-button flex items-center gap-1.5"><Download size={14} /> Download Free PDF</button>
                    }
                  </div>
                </div>
              );
            })()}
          </ScrollReveal>
        )}

        {/* Reports grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.filter(r => !r.featured || activeCategory !== 'All').map((r, i) => {
            const done = submitted.has(r.id);
            return (
              <ScrollReveal key={r.id} delay={i * 0.07}>
                <div className="lux-card overflow-hidden flex flex-col h-full">
                  <div className="h-36 bg-cover bg-center relative" style={{ backgroundImage: `url(${r.image})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-2 left-3 flex gap-1.5">
                      <span className="text-[10px] bg-white/90 text-[#1C1A17] rounded-full px-2 py-0.5 font-medium">{r.category}</span>
                      {r.gated && <span className="text-[10px] bg-[#C9A96A]/90 text-[#1C1A17] rounded-full px-2 py-0.5 flex items-center gap-0.5"><Lock size={8} />Gated</span>}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-[#9A8B7A] mb-1">{r.published} · {r.pages} pages</p>
                    <h3 className="font-semibold text-[#1C1A17] mb-1">{r.title}</h3>
                    <p className="text-xs text-[#C9A96A] uppercase tracking-widest mb-2">{r.subtitle}</p>
                    <p className="text-xs text-[#5F5448] leading-relaxed mb-4 flex-1">{r.description.slice(0, 120)}...</p>
                    {done
                      ? <p className="text-emerald-600 text-xs font-semibold">✓ Sent to your email</p>
                      : <button onClick={() => handleDownload(r.id, r.gated)} className="lux-button-outline text-sm flex items-center gap-1.5 w-full justify-center">
                          {r.gated ? <Lock size={12} /> : <Download size={12} />}
                          {r.gated ? 'Download (Free)' : 'Download PDF'}
                        </button>
                    }
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 px-4 text-center">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Stay Informed</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Receive Our Research</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Join 12,000+ subscribers who receive our quarterly market intelligence directly by email.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="lux-input flex-1 text-sm" />
            <button className="lux-button shrink-0">Subscribe</button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
