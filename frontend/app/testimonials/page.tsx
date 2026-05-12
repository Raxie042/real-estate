'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const STORIES = [
  {
    id: 1,
    name: 'Lord & Lady Ashbourne',
    location: 'Mayfair, London',
    property: 'Off-Market Townhouse, £18.5m',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: 'Acquisition',
    quote: 'We had been searching privately for three years before Raxie Zenith introduced us to this property. It had never been on the open market. The process from introduction to completion took just 6 weeks — a testament to their relationships and efficiency.',
    rating: 5,
    detail: 'The family required a freehold townhouse in Mayfair with a south-facing garden and a minimum of six principal bedrooms. Within 10 days of briefing the private client team, a suitable property was identified through their off-market network.',
  },
  {
    id: 2,
    name: 'Ahmed Al-Farsi',
    location: 'Palm Jumeirah, Dubai',
    property: 'Signature Villa, AED 68m',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    category: 'Purchase',
    quote: 'The level of service extended far beyond the transaction. Their concierge team had the villa fully staffed, stocked, and ready for our family before we even landed in Dubai. Extraordinary.',
    rating: 5,
    detail: 'Representing a GCC family office, the brief was to identify and acquire a signature Palm Jumeirah villa with private beach access within 60 days. The team identified three suitable properties and negotiated a 7% reduction on the list price.',
  },
  {
    id: 3,
    name: 'Dr. Sophie Richter',
    location: 'Knightsbridge, London',
    property: 'Lateral Apartment, £6.2m',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    category: 'Purchase',
    quote: 'As a first-time buyer at this level, I was apprehensive. The team guided me through every step, from shortlisting to legal completion, with patience and expertise I simply didn\'t expect.',
    rating: 5,
    detail: 'Dr. Richter required a lateral apartment with a 24-hour concierge building, within walking distance of the hospital. The team identified the perfect property, coordinated the survey, and introduced a specialist conveyancer who completed in 10 weeks.',
  },
  {
    id: 4,
    name: 'The Lindqvist Family',
    location: 'Edinburgh, Scotland',
    property: 'Georgian Townhouse, £3.8m',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
    category: 'Relocation',
    quote: 'Relocating from Stockholm with three children, we needed more than a property — we needed a new life. The relocation team found us a home, enrolled the children in schools, and set up everything before we arrived.',
    rating: 5,
    detail: 'A Swedish executive family relocating to Edinburgh for a 3-year posting required turnkey service. The relocation division handled property search, school applications, domestic staffing, and utility setup across a 6-week programme.',
  },
  {
    id: 5,
    name: 'Marco Ferretti',
    location: 'Monaco',
    property: 'Principality Apartment, €12m',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    category: 'Investment',
    quote: 'The investment analysis provided before purchase was more thorough than anything my asset manager produced. The yield projections and capital growth modelling made the decision straightforward.',
    rating: 5,
    detail: 'An Italian entrepreneur seeking Monaco residency required comprehensive fiscal structuring advice alongside the property search. The team coordinated with Monaco-based lawyers and achieved completion in 8 weeks.',
  },
  {
    id: 6,
    name: 'Sarah & Tom Whitfield',
    location: 'Notting Hill, London',
    property: 'Sold: Stucco Villa, £7.4m',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    category: 'Sale',
    quote: 'They sold our home in 12 days and achieved 4% above asking price — without a single viewing day. The discreet process meant we never had strangers traipsing through.',
    rating: 5,
    detail: 'The Whitfields required a confidential sale without marketing or open days. The private client team matched the property to a pre-qualified buyer from their client database within 72 hours and exchanged contracts in 12 days.',
  },
];

const CATEGORIES = ['All', 'Acquisition', 'Purchase', 'Relocation', 'Investment', 'Sale'];

const HEADLINE_STATS = [
  { value: '4.9/5', label: 'Average Client Rating', sub: 'from 847 reviews' },
  { value: '97%', label: 'Would Recommend', sub: 'independently verified' },
  { value: '12 days', label: 'Avg. Time to Resolution', sub: 'any client matter' },
  { value: '340+', label: 'Stories Featured', sub: 'since 2018' },
];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = activeCategory === 'All' ? STORIES : STORIES.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Client Stories</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Success Stories</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Every transaction tells a story. Here are some of the journeys we have had the privilege of guiding.</motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {HEADLINE_STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/80 text-xs uppercase tracking-wider font-medium">{s.label}</p>
              <p className="text-[#1C1A17]/60 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + stories */}
      <div className="max-w-6xl mx-auto px-4 py-14">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((story, i) => (
              <motion.div key={story.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                <div className="lux-card p-7 h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow" onClick={() => setExpanded(expanded === story.id ? null : story.id)}>
                  <Quote size={20} className="text-[#C9A96A] mb-4 shrink-0" />
                  <p className="text-[#5F5448] leading-relaxed italic mb-5 flex-1">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <AnimatePresence>
                    {expanded === story.id && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-[#7A6E60] leading-relaxed mb-4 border-t border-[#E8E1D7] pt-4">
                        {story.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E8E1D7]">
                    <img src={story.image} alt={story.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1A17] truncate">{story.name}</p>
                      <p className="text-xs text-[#9A8B7A] flex items-center gap-1"><MapPin size={10} />{story.location}</p>
                    </div>
                    <div>
                      <div className="flex">
                        {[...Array(story.rating)].map((_, i) => <Star key={i} size={11} className="text-[#C9A96A] fill-[#C9A96A]" />)}
                      </div>
                      <p className="text-[10px] text-[#9A8B7A] text-right">{story.property}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#C9A96A] mt-3 text-right">{expanded === story.id ? 'Show less ▲' : 'Read full story ▼'}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Submit CTA */}
        <ScrollReveal delay={0.2} className="mt-16 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Share Your Experience</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Have a Story to Tell?</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">We would be honoured to feature your experience. Please contact your account manager or reach out directly.</p>
          <Link href="/contact" className="lux-button">Get in Touch</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
