'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Download, Smartphone, Star, Bell, MapPin, Search, Heart } from 'lucide-react';

const FEATURES = [
  { icon: Search, title: 'Smart Search', desc: 'AI-powered search that learns your preferences and surfaces the right properties before you even search for them.' },
  { icon: Bell, title: 'Instant Alerts', desc: 'Push notifications the moment a matching property is listed, price-reduced, or sold. Never miss an opportunity.' },
  { icon: MapPin, title: 'Immersive Maps', desc: 'Full-screen property maps with transport overlays, school catchments, and neighbourhood heatmaps.' },
  { icon: Heart, title: 'Saved Collections', desc: 'Curate collections of favourite properties and share them with family or advisers in one tap.' },
  { icon: Smartphone, title: 'Virtual Tours', desc: 'Full-screen 360° virtual tours and video walkthroughs — view a property from anywhere in the world.' },
  { icon: Star, title: 'Concierge Chat', desc: 'Instant messaging with your dedicated agent and access to the 24/7 concierge team, all within the app.' },
];

const REVIEWS = [
  { name: 'Khalid A.', rating: 5, text: 'The best property app I\'ve used across 3 countries. The alert system is exceptional — I was notified before the property even appeared on Rightmove.' },
  { name: 'Sophie R.', rating: 5, text: 'The virtual tours are stunning. I purchased my London apartment having only viewed it virtually from Singapore. Flawless experience.' },
  { name: 'James W.', rating: 5, text: 'The concierge chat feature is a game-changer. My agent responds within minutes, even on evenings and weekends.' },
];

export default function AppPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-24 px-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #C9A96A 0%, transparent 60%)' }} />
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Mobile App</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-5xl text-[#F6F2EC] mb-5">Luxury Real Estate<br />In Your Pocket</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#B9AA98] mb-8 max-w-md">The Raxie Zenith Estate app brings the full power of our platform to iOS and Android — with instant alerts, virtual tours, and concierge access.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start">
              {/* App Store badge */}
              <a href="#coming-soon" className="flex items-center gap-2 bg-white text-[#1C1A17] px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#F6F2EC] transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </a>
              <a href="#coming-soon" className="flex items-center gap-2 bg-white text-[#1C1A17] px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#F6F2EC] transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="m12.954 11.616 2.957-2.957L6.36 3.291c-.633-.342-1.226-.39-1.746-.016l8.34 8.341zm3.461 3.462 3.074-1.729c.6-.336.929-.812.929-1.348 0-.536-.329-1.012-.929-1.348l-3.073-1.73-3.045 3.045 3.044 3.11zM4.014 4.138c-.234.391-.367.88-.367 1.425v12.874c0 .545.133 1.034.367 1.425l.049.049 7.21-7.21v-.171L4.063 4.089l-.049.049zm9.31 9.31-7.263 7.263c.52.373 1.113.325 1.745-.017l10.552-5.628-5.034-1.618z"/></svg>
                Google Play
              </a>
            </motion.div>
            <p id="coming-soon" className="text-xs text-[#9A8B7A] mt-3">Coming Q3 2026 — register your interest below</p>
          </div>
          {/* Mockup */}
          <div className="shrink-0">
            <div className="w-52 h-96 bg-[#2B2620] rounded-[2.5rem] border-4 border-[#3A3430] shadow-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-4 w-20 h-5 bg-[#3A3430] rounded-full" />
              <div className="text-center px-4">
                <div className="text-[#C9A96A] font-serif text-lg mb-2">RZE</div>
                <div className="text-white/40 text-xs">App Preview</div>
                <div className="grid grid-cols-2 gap-2 mt-6">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-[#3A3430] rounded-lg" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Features</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Everything You Need</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.07}>
              <div className="lux-card p-6">
                <f.icon size={20} className="text-[#C9A96A] mb-3" />
                <h3 className="font-semibold text-[#1C1A17] mb-2">{f.title}</h3>
                <p className="text-sm text-[#5F5448] leading-relaxed">{f.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-[#C9A96A] fill-[#C9A96A]" />)}</div>
            <p className="text-sm text-[#7A6E60]">4.9 out of 5 (Beta Testers)</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <ScrollReveal key={r.name} delay={i * 0.1}>
                <div className="lux-card p-5">
                  <div className="flex mb-2">{[...Array(r.rating)].map((_, i) => <Star key={i} size={12} className="text-[#C9A96A] fill-[#C9A96A]" />)}</div>
                  <p className="text-sm text-[#5F5448] italic mb-3">&ldquo;{r.text}&rdquo;</p>
                  <p className="text-xs font-semibold text-[#1C1A17]">{r.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Pre-registration */}
      <div className="bg-[#1C1A17] py-14 text-center px-4">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Early Access</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Be First to Download</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Register your interest and receive early access when we launch on iOS and Android in Q3 2026.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input type="email" placeholder="Your email address" className="lux-input flex-1 text-sm" />
            <button className="lux-button shrink-0 flex items-center gap-1.5"><Download size={14} /> Notify Me</button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
