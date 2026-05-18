'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';
import { Play, Headphones, Clock, ChevronRight, Mic, Rss } from 'lucide-react';

const EPISODES = [
  {
    id: 'ep42',
    number: 'EP. 42',
    title: 'Prime Central London: Is the Cycle Turning?',
    guest: 'Head of PCL Residential, Raxie Zenith Estate',
    duration: '38 min',
    category: 'Market Outlook',
    date: 'May 2026',
    desc: 'We examine transaction volumes, pricing trends, and buyer nationality data across Mayfair, Belgravia, Knightsbridge, and Chelsea — and ask whether the post-pandemic correction has fully unwound.',
    featured: true,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    id: 'ep41',
    number: 'EP. 41',
    title: 'Dubai 2026: Supply Surge or Demand Resilience?',
    guest: 'Managing Director, Raxie Gulf',
    duration: '42 min',
    category: 'International Markets',
    date: 'Apr 2026',
    desc: 'With 85,000 units completing in the next 18 months, we debate whether Dubai\'s luxury market can absorb supply while HNWI demand from Europe and Asia continues to accelerate.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80',
  },
  {
    id: 'ep40',
    number: 'EP. 40',
    title: 'How Family Offices Buy Property',
    guest: 'Partner, Global Family Office Advisory',
    duration: '51 min',
    category: 'Investment',
    date: 'Apr 2026',
    desc: 'Inside the decision-making process of a $500m family office deploying capital into European residential real estate — structures, timelines, due diligence, and relationship management.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80',
  },
  {
    id: 'ep39',
    number: 'EP. 39',
    title: 'The Architecture of the Extraordinary Home',
    guest: 'Principal, Award-Winning Residential Practice',
    duration: '44 min',
    category: 'Design & Architecture',
    date: 'Mar 2026',
    desc: 'A conversation with one of the UK\'s leading residential architects on what makes a truly exceptional home — and why so many new-builds fail to achieve it.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80',
  },
  {
    id: 'ep38',
    number: 'EP. 38',
    title: 'Navigating UK Stamp Duty After the March 2026 Changes',
    guest: 'Head of Residential Tax, Leading Law Firm',
    duration: '29 min',
    category: 'Finance & Tax',
    date: 'Mar 2026',
    desc: 'The technical implications of the 2026 Budget changes to SDLT — with practical guidance for domestic buyers, overseas investors, and corporate structures.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=700&q=80',
  },
  {
    id: 'ep37',
    number: 'EP. 37',
    title: 'Heritage Property: Buying, Owning, and Selling Listed Buildings',
    guest: 'Director, Raxie Heritage Division',
    duration: '36 min',
    category: 'Specialist Sectors',
    date: 'Feb 2026',
    desc: 'A deep dive into the rewards and responsibilities of listed building ownership — from consent requirements to insurance, maintenance costs, and eventual resale strategy.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  },
  {
    id: 'ep36',
    number: 'EP. 36',
    title: 'Monaco: The World\'s Most Competitive Property Market',
    guest: 'Head of International, Raxie Monaco',
    duration: '33 min',
    category: 'International Markets',
    date: 'Feb 2026',
    desc: 'Only 2km² of land, 40,000 residents, and a waiting list for everything. We examine what drives Monaco real estate and how buyers actually secure a property in the principality.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=700&q=80',
  },
  {
    id: 'ep35',
    number: 'EP. 35',
    title: 'Golden Visa 2026: Portugal, Greece, UAE — Where Should You Invest?',
    guest: 'International Mobility Partner, Law Firm',
    duration: '47 min',
    category: 'Investment',
    date: 'Jan 2026',
    desc: 'A comparative analysis of the three most popular Golden Visa routes for property investors — investment thresholds, processing times, residency rights, and tax implications.',
    featured: false,
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=700&q=80',
  },
];

const CATEGORIES = ['All', 'Market Outlook', 'International Markets', 'Investment', 'Design & Architecture', 'Finance & Tax', 'Specialist Sectors'];

const PLATFORMS = [
  { name: 'Spotify', icon: '🎵', href: '#' },
  { name: 'Apple Podcasts', icon: '🎙', href: '#' },
  { name: 'Google Podcasts', icon: '🎧', href: '#' },
  { name: 'Amazon Music', icon: '🎶', href: '#' },
  { name: 'RSS Feed', icon: '📡', href: '#' },
];

export default function PodcastPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? EPISODES : EPISODES.filter(e => e.category === activeCategory);
  const featured = EPISODES.find(e => e.featured);
  const rest = filtered.filter(e => !e.featured || activeCategory !== 'All');

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div className="w-16 h-16 rounded-full bg-[#C9A96A]/20 border border-[#C9A96A]/40 flex items-center justify-center mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Mic size={24} className="text-[#C9A96A]" />
          </motion.div>
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            The Raxie Zenith Podcast
          </motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
            The Property<br />Intelligence Podcast
          </motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-2xl mx-auto leading-relaxed text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
            Deep-dive conversations with the leading minds in residential, commercial, and international real estate.
            Market intelligence. No noise.
          </motion.p>

          {/* Platform links */}
          <motion.div className="flex flex-wrap gap-3 justify-center mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
            {PLATFORMS.map(p => (
              <Link key={p.name} href={p.href}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#C9A96A]/20 border border-white/20 hover:border-[#C9A96A]/50 rounded-full text-sm text-white transition-colors">
                <span>{p.icon}</span>{p.name}
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-4xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['42', 'Episodes'], ['163k+', 'Subscribers'], ['Top 5%', 'Property Podcasts Globally'], ['40 min', 'Avg. Episode Length']].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-xl font-semibold text-[#1C1A17]">{v}</p>
              <p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-14">

        {/* Featured episode */}
        {activeCategory === 'All' && featured && (
          <ScrollReveal className="mb-12">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5">Latest Episode</p>
            <div className="lux-card overflow-hidden grid md:grid-cols-2 gap-0 hover:shadow-xl transition-shadow">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button onClick={() => setPlaying(featured.id)}
                  className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-14 h-14 rounded-full bg-[#C9A96A] flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                    <Play size={20} className="text-[#1C1A17] ml-0.5" fill="currentColor" />
                  </div>
                </button>
                <span className="absolute top-3 left-3 text-xs bg-[#C9A96A] text-[#1C1A17] font-bold px-2.5 py-0.5 rounded-full">{featured.number}</span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest text-[#C9A96A] mb-2">{featured.category}</span>
                <h2 className="font-serif text-2xl text-[#1C1A17] mb-3 leading-tight">{featured.title}</h2>
                <p className="text-sm text-[#5F5448] leading-relaxed mb-4">{featured.desc}</p>
                <p className="text-xs text-[#9A8B7A] mb-4">With {featured.guest}</p>
                <div className="flex items-center gap-4 text-sm text-[#7A6E60]">
                  <span className="flex items-center gap-1.5"><Clock size={13} />{featured.duration}</span>
                  <span>{featured.date}</span>
                </div>
                <button onClick={() => setPlaying(featured.id)}
                  className="mt-5 lux-button flex items-center gap-2 self-start">
                  <Play size={14} fill="currentColor" />Listen Now
                </button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${activeCategory === cat ? 'bg-[#1C1A17] text-white' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:bg-[#F0EBE3]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Episode list */}
        <div className="space-y-4">
          {(activeCategory === 'All' ? EPISODES.slice(1) : filtered).map((ep, i) => (
            <ScrollReveal key={ep.id} delay={i * 0.05}>
              <div className="lux-card hover:shadow-lg transition-shadow">
                <div className="p-5 flex gap-5 items-start">
                  <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                    <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                    <button onClick={() => setPlaying(ep.id)}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center hover:bg-[#C9A96A]/60 transition-colors">
                      <Play size={16} className="text-white" fill="white" />
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-bold text-[#C9A96A] uppercase tracking-wider">{ep.number}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-[#F0EBE3] text-[#7A6E60] rounded-full">{ep.category}</span>
                    </div>
                    <h3 className="font-semibold text-[#1C1A17] leading-snug mb-1">{ep.title}</h3>
                    <p className="text-xs text-[#9A8B7A] mb-2">With {ep.guest}</p>
                    <p className="text-sm text-[#5F5448] leading-relaxed line-clamp-2">{ep.desc}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#9A8B7A]">
                      <Clock size={12} />{ep.duration}
                    </div>
                    <span className="text-xs text-[#B9AA98]">{ep.date}</span>
                    <button onClick={() => setPlaying(ep.id)}
                      className="mt-1 w-8 h-8 rounded-full bg-[#C9A96A]/15 hover:bg-[#C9A96A] flex items-center justify-center transition-colors group">
                      <Play size={12} className="text-[#C9A96A] group-hover:text-[#1C1A17]" fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Player modal */}
      {playing && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-end md:items-center justify-center p-4"
          onClick={() => setPlaying(null)}>
          <div className="bg-[#1C1A17] rounded-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            {(() => {
              const ep = EPISODES.find(e => e.id === playing);
              if (!ep) return null;
              return (
                <>
                  <div className="flex items-center gap-4 mb-5">
                    <img src={ep.image} alt={ep.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <p className="text-xs text-[#C9A96A] mb-0.5">{ep.number} · {ep.category}</p>
                      <h3 className="font-semibold text-white text-sm leading-snug">{ep.title}</h3>
                      <p className="text-xs text-[#9A8B7A] mt-0.5">With {ep.guest}</p>
                    </div>
                  </div>
                  <div className="bg-[#252220] rounded-xl p-4 mb-4 flex items-center justify-center gap-4">
                    <Headphones size={20} className="text-[#C9A96A]" />
                    <div className="flex-1 bg-[#3A3530] rounded-full h-1.5">
                      <div className="bg-[#C9A96A] h-1.5 rounded-full w-1/3" />
                    </div>
                    <span className="text-xs text-[#9A8B7A]">{ep.duration}</span>
                  </div>
                  <p className="text-xs text-[#9A8B7A] text-center mb-4">Listen on your preferred platform</p>
                  <div className="grid grid-cols-3 gap-2">
                    {PLATFORMS.slice(0, 3).map(p => (
                      <Link key={p.name} href={p.href}
                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-[#C9A96A]/20 border border-white/10 text-xs text-[#B9AA98] hover:text-[#C9A96A] transition-colors">
                        <span className="text-lg">{p.icon}</span>{p.name}
                      </Link>
                    ))}
                  </div>
                  <button onClick={() => setPlaying(null)} className="mt-4 text-xs text-[#9A8B7A] hover:text-white w-full text-center transition-colors">
                    Close ✕
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Subscribe CTA */}
      <div className="bg-[#1C1A17] py-16 px-6 text-center">
        <ScrollReveal>
          <Rss size={28} className="text-[#C9A96A] mx-auto mb-5" />
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Never Miss an Episode</p>
          <h2 className="font-serif text-4xl text-white lux-heading mb-5">Subscribe to the Podcast</h2>
          <p className="text-[#9A8B7A] max-w-xl mx-auto mb-8">New episodes every fortnight. Leading voices in property, investment, and wealth.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {PLATFORMS.map(p => (
              <Link key={p.name} href={p.href}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-[#C9A96A] border border-white/20 hover:border-[#C9A96A] rounded-full text-sm text-white hover:text-[#1C1A17] font-medium transition-all">
                <span>{p.icon}</span>{p.name}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
