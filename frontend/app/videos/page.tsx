'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Play, Clock, Eye, Tag } from 'lucide-react';

const VIDEOS = [
  { id: 'v1', title: 'Belgravia Townhouse — A Masterclass in British Luxury', duration: '6:42', views: '12.4k', category: 'Property Tour', thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80', tag: 'Featured' },
  { id: 'v2', title: 'Dubai Marina Penthouse — Where Sky Meets Sea', duration: '8:15', views: '24.1k', category: 'Property Tour', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80', tag: null },
  { id: 'v3', title: 'London Market Update — Q2 2026', duration: '14:30', views: '8.9k', category: 'Market Briefing', thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', tag: 'New' },
  { id: 'v4', title: 'Hampstead Heath Estate — First Public Look', duration: '9:05', views: '31.2k', category: 'Property Tour', thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', tag: 'Exclusive' },
  { id: 'v5', title: 'How to Buy Property in Dubai as a Non-Resident', duration: '18:20', views: '47.8k', category: 'Guide', thumbnail: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80', tag: null },
  { id: 'v6', title: 'Notting Hill Stucco Villa — Garden Party Season', duration: '5:55', views: '6.3k', category: 'Property Tour', thumbnail: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=700&q=80', tag: null },
  { id: 'v7', title: 'Edinburgh New Town — History Meets Contemporary Living', duration: '11:10', views: '9.7k', category: 'Neighbourhood', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', tag: null },
  { id: 'v8', title: 'Stamp Duty Changes 2026 — What You Need to Know', duration: '16:45', views: '52.1k', category: 'Guide', thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80', tag: 'Popular' },
  { id: 'v9', title: 'Chelsea Garden Residence — An Interior Story', duration: '7:30', views: '14.6k', category: 'Property Tour', thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=80', tag: null },
];

const CATEGORIES = ['All', 'Property Tour', 'Market Briefing', 'Guide', 'Neighbourhood'];

const TAG_COLORS: Record<string, string> = {
  Featured: 'bg-[#C9A96A] text-[#1C1A17]',
  Exclusive: 'bg-[#1C1A17] text-[#C9A96A]',
  New: 'bg-emerald-600 text-white',
  Popular: 'bg-blue-600 text-white',
};

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? VIDEOS : VIDEOS.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Video Library</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Property Films &amp; Insights</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Cinematic property tours, market briefings, and expert guides — all in one place.</motion.p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured first */}
        {activeCategory === 'All' && (
          <ScrollReveal className="mb-10">
            <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setPlaying('v1')}>
              <img src={VIDEOS[0].thumbnail} alt={VIDEOS[0].title} className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#C9A96A] transition-colors">
                  <Play size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-5 left-6 right-6">
                <span className="text-[10px] uppercase tracking-widest text-[#C9A96A] mb-1 block">Featured Film</span>
                <h2 className="font-serif text-2xl text-white">{VIDEOS[0].title}</h2>
                <div className="flex items-center gap-4 mt-2 text-white/60 text-sm">
                  <span className="flex items-center gap-1"><Clock size={12} />{VIDEOS[0].duration}</span>
                  <span className="flex items-center gap-1"><Eye size={12} />{VIDEOS[0].views} views</span>
                  <span>{VIDEOS[0].category}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((v, i) => (
            <ScrollReveal key={v.id} delay={i * 0.05}>
              <div className="lux-card overflow-hidden group cursor-pointer" onClick={() => setPlaying(v.id)}>
                <div className="relative h-44 overflow-hidden">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#C9A96A] transition-colors">
                      <Play size={16} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                  {v.tag && (
                    <span className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${TAG_COLORS[v.tag]}`}>{v.tag}</span>
                  )}
                  <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white rounded px-1.5 py-0.5">{v.duration}</span>
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A96A] mb-1">{v.category}</p>
                  <h3 className="font-medium text-[#1C1A17] text-sm leading-snug mb-2">{v.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-[#9A8B7A]">
                    <span className="flex items-center gap-1"><Eye size={11} />{v.views}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Video modal placeholder */}
        {playing && (
          <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4" onClick={() => setPlaying(null)}>
            <div className="bg-[#1C1A17] rounded-2xl p-6 max-w-2xl w-full text-center" onClick={e => e.stopPropagation()}>
              <p className="text-[#C9A96A] text-xs uppercase tracking-widest mb-3">Video Player</p>
              <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center mb-4">
                <Play size={40} className="text-[#C9A96A]" />
                <p className="text-white/50 text-sm ml-3">Video player would load here in production</p>
              </div>
              <button onClick={() => setPlaying(null)} className="text-sm text-[#9A8B7A] hover:text-white transition">Close ✕</button>
            </div>
          </div>
        )}

        <ScrollReveal delay={0.2} className="mt-12 text-center bg-[#1C1A17] rounded-2xl p-10">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Subscribe</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Never Miss a Film</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">New property films and market briefings released every week. Subscribe for early access.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="lux-input flex-1 text-sm" />
            <button className="lux-button shrink-0">Subscribe</button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
