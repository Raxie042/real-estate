'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';

const GUIDE_CATEGORIES = [
  {
    label: 'Buying',
    color: 'bg-[#C9A96A]',
    guides: [
      {
        title: 'The Ultimate Luxury Home Buying Guide',
        desc: 'From initial search to completion — an authoritative walkthrough of acquiring a high-value property in the UK and internationally.',
        readTime: '12 min',
        topics: ['Structuring your search', 'Due diligence & surveys', 'Negotiation strategy', 'Completion & stamp duty'],
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
        featured: true,
      },
      {
        title: "First-Time Buyer's Complete Guide",
        desc: 'Everything you need — from mortgage in principle to receiving the keys.',
        readTime: '9 min',
        topics: ['Help to Buy schemes', 'Mortgage pre-approval', 'Making an offer', 'Exchange & completion'],
        image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&q=80',
      },
      {
        title: 'Buying Off-Plan: Risks & Rewards',
        desc: 'New developments command premiums — but off-plan purchases carry unique considerations.',
        readTime: '7 min',
        topics: ['Developer due diligence', 'Reservation deposits', 'Completion risk', 'Reservation agreements'],
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
      },
    ],
  },
  {
    label: 'Selling',
    color: 'bg-[#1C1A17]',
    guides: [
      {
        title: 'Presenting Your Property for Maximum Value',
        desc: 'Staging, photography and pricing strategy — the three pillars that determine how quickly (and profitably) your property sells.',
        readTime: '8 min',
        topics: ['Professional staging', 'Architectural photography', 'Pricing benchmarks', 'Launch strategy'],
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
      },
      {
        title: 'Capital Gains Tax: What Sellers Need to Know',
        desc: 'A plain-English guide to CGT liability, principal residence relief and strategies to minimise exposure.',
        readTime: '6 min',
        topics: ['CGT rates for 2025/26', 'Principal residence relief', 'Lettings relief', 'Reporting deadlines'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      },
    ],
  },
  {
    label: 'Investing',
    color: 'bg-[#7A6E60]',
    guides: [
      {
        title: 'Building a Prime Property Portfolio',
        desc: 'Institutional-grade investment principles applied to residential and commercial property for private investors.',
        readTime: '14 min',
        topics: ['Yield vs. capital growth', 'Portfolio diversification', 'Leverage & finance', 'Exit strategies'],
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80',
        featured: true,
      },
      {
        title: 'Buy-to-Let in 2025: Is It Still Worth It?',
        desc: 'Section 24 changes, EPC regulations and rising rates have reshaped the BTL market. Our analysis.',
        readTime: '10 min',
        topics: ['Net yield calculations', 'Section 24 impact', 'EPC C requirement', 'Limited company structures'],
        image: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=600&q=80',
      },
      {
        title: 'International Property Investment Guide',
        desc: 'Navigating currency risk, foreign ownership restrictions and tax treaties when investing abroad.',
        readTime: '11 min',
        topics: ['Dubai, Portugal & Spain', 'Currency hedging', 'Foreign ownership rules', 'Double-tax treaties'],
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
      },
    ],
  },
  {
    label: 'Relocation',
    color: 'bg-[#1B5E9B]',
    guides: [
      {
        title: 'Relocating to London: The Insider\'s Handbook',
        desc: 'Area-by-area intelligence, schooling, tax residency and the practical realities of moving to the capital.',
        readTime: '16 min',
        topics: ['Choosing the right area', 'International schools', 'Tax residency', 'Banking & finance'],
        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
      },
      {
        title: 'Expat Guide to Buying Property in the UK',
        desc: 'Non-residents face additional SDLT surcharges and mortgage restrictions. Here\'s what you need to know.',
        readTime: '8 min',
        topics: ['Non-resident SDLT surcharge', 'Expat mortgages', 'Currency considerations', 'Legal requirements'],
        image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
      },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Knowledge Centre
          </motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
            Guides & Advice
          </motion.h1>
          <motion.div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.35 }} />
          <motion.p className="text-lg text-white/60 font-light max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Expert insight across every stage of the property journey — whether buying, selling, investing or relocating.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {GUIDE_CATEGORIES.map((cat, ci) => (
          <div key={cat.label}>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-[10px] font-semibold uppercase tracking-[0.4em] px-3 py-1.5 rounded-full text-white ${cat.color}`}>{cat.label}</span>
                <div className="flex-1 h-px bg-[#E8E1D7]" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.guides.map((guide, gi) => (
                <ScrollReveal key={gi} delay={gi * 0.07}>
                  <div className={`group lux-card overflow-hidden flex flex-col h-full ${guide.featured ? 'ring-1 ring-[#C9A96A]/40' : ''}`}>
                    <div className="relative h-44 overflow-hidden">
                      <img src={guide.image} alt={guide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      {guide.featured && (
                        <span className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                          <BookOpen size={9} /> Essential
                        </span>
                      )}
                      <span className="absolute bottom-3 right-3 flex items-center gap-1 text-white/70 text-xs">
                        <Clock size={11} /> {guide.readTime} read
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-medium text-[#1C1A17] lux-heading mb-2 leading-snug">{guide.title}</h3>
                      <p className="text-sm text-[#7A6E60] font-light leading-relaxed mb-4 flex-1">{guide.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {guide.topics.map(t => (
                          <span key={t} className="lux-badge text-[10px]">{t}</span>
                        ))}
                      </div>
                      <button className="lux-button-outline w-full text-sm flex items-center justify-center gap-2 group-hover:bg-[#C9A96A] group-hover:text-[#1C1A17] group-hover:border-[#C9A96A] transition-all">
                        Read Guide <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ))}

        {/* Neighbourhood guides CTA */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/neighbourhoods" className="group relative overflow-hidden rounded-2xl h-48 block">
              <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80" alt="Neighbourhoods" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A17]/90 to-[#1C1A17]/40" />
              <div className="absolute inset-0 flex items-center p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Area Guides</p>
                  <h3 className="text-2xl font-light text-white lux-heading mb-3">Neighbourhood Guides</h3>
                  <span className="text-[#C9A96A] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">Explore areas <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
            <Link href="/resources" className="group relative overflow-hidden rounded-2xl h-48 block">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" alt="Market Reports" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A17]/90 to-[#1C1A17]/40" />
              <div className="absolute inset-0 flex items-center p-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Research</p>
                  <h3 className="text-2xl font-light text-white lux-heading mb-3">Market Reports</h3>
                  <span className="text-[#C9A96A] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">Download reports <ArrowRight size={14} /></span>
                </div>
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
