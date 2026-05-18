'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Play, Eye, Maximize2, RotateCcw, MapPin, Bed, Bath, ChevronLeft, ChevronRight, Monitor, Smartphone, Headphones } from 'lucide-react';
import { useState } from 'react';

const TOURS = [
  { id: 1, title: 'The Chester Square Townhouse', address: 'Belgravia, London SW1W', beds: 6, baths: 5, sqft: 7400, price: '£16,500,000', type: '3D Matterport', thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', views: 2847, new: true },
  { id: 2, title: 'Mayfair Duplex Penthouse', address: 'Park Lane, London W1K', beds: 4, baths: 4, sqft: 5100, price: '£22,000,000', type: 'Video Walkthrough', thumbnail: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', views: 4210, new: false },
  { id: 3, title: 'Chelsea Riverside Apartment', address: 'Cheyne Walk, London SW3', beds: 3, baths: 3, sqft: 2900, price: '£8,750,000', type: '3D Matterport', thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', views: 1932, new: true },
  { id: 4, title: 'Palm Jumeirah Signature Villa', address: 'Frond G, Dubai', beds: 7, baths: 8, sqft: 14000, price: 'AED 32,000,000', type: 'Drone & Interior', thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', views: 6104, new: false },
  { id: 5, title: 'Glensheil Estate', address: 'Perthshire, Scotland', beds: 12, baths: 9, sqft: 26000, price: '£8,900,000', type: 'Aerial Tour', thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80', views: 3287, new: false },
  { id: 6, title: 'Knightsbridge Penthouse', address: 'One Hyde Park, London SW1X', beds: 5, baths: 5, sqft: 6200, price: '£38,000,000', type: '3D Matterport', thumbnail: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80', views: 9841, new: true },
];

const FEATURES = [
  { icon: Monitor, title: '3D Matterport Tours', desc: 'Step inside any room from anywhere in the world. Our 360° Matterport scans capture every detail in stunning photorealistic 3D with dollhouse and floorplan views.' },
  { icon: Play, title: 'Cinematic Walkthroughs', desc: 'Professional film-quality video tours directed by our in-house media team, with ambient sound, golden-hour lighting and drone aerial footage.' },
  { icon: Headphones, title: 'Guided Audio Tours', desc: 'Expert commentary from the listing agent as you explore — highlighting key features, materials, views and the neighbourhood context.' },
  { icon: Smartphone, title: 'Mobile & VR Ready', desc: 'All tours are optimised for smartphone viewing and compatible with Meta Quest VR headsets for a truly immersive experience.' },
  { icon: Maximize2, title: 'Interactive Floorplans', desc: 'Click any room on the interactive floorplan to jump directly to that space in the 3D tour, making large homes intuitive to navigate.' },
  { icon: RotateCcw, title: 'Live Virtual Viewings', desc: 'Book a live-guided video viewing with an agent who will walk you through the property in real time, answer questions and focus on your priorities.' },
];

const STATS = [
  { value: '320+', label: 'Properties in 3D', sub: 'available to tour right now' },
  { value: '94%', label: 'Enquiry Conversion', sub: 'buyers who toured, then viewed' },
  { value: '62%', label: 'International Buyers', sub: 'purchased based on virtual tour alone' },
  { value: '4K', label: 'Ultra HD Quality', sub: 'on all Matterport scans' },
];

export default function VirtualToursPage() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const prev = () => setActive(a => (a - 1 + TOURS.length) % TOURS.length);
  const next = () => setActive(a => (a + 1) % TOURS.length);
  const current = TOURS[active];

  return (
    <div className="min-h-screen bg-[#1C1A17]">
      {/* Hero */}
      <div className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&q=80" alt="Virtual tours" fill className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Immersive Property Tours</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
            Experience Every<br />Room. From Anywhere.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#B9AA98] text-xl mb-10 max-w-2xl mx-auto">
            Our 3D Matterport tours, cinematic walkthroughs and live guided viewings let you explore our finest properties in breathtaking detail — wherever you are in the world.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors flex items-center gap-2">
              <Play size={16} fill="currentColor" /> Start Exploring
            </button>
            <Link href="/contact?dept=media" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors">
              Book a Live Viewing
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/80 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-[#1C1A17]/60 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured tour carousel */}
      <section id="tours" className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Featured Tours</p>
          <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Now Touring</h2>
          <p className="text-[#B9AA98] max-w-xl mx-auto">Our most-viewed properties, available to explore in full 3D right now.</p>
        </ScrollReveal>

        {/* Main tour view */}
        <div className="relative mb-6">
          <AnimatePresence mode="wait">
            <motion.div key={current.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden bg-[#252220] border border-[#3A3530]">
              <div className="relative h-[480px]">
                <Image src={current.thumbnail} alt={current.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-transparent to-transparent" />

                {/* Play overlay */}
                <button onClick={() => setPlaying(!playing)}
                  className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 rounded-full bg-[#C9A96A]/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                    <Play size={28} className="text-[#1C1A17] ml-1" fill="#1C1A17" />
                  </div>
                </button>

                {/* Tags */}
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="bg-[#1C1A17]/90 text-[#C9A96A] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">{current.type}</span>
                  {current.new && <span className="bg-[#C9A96A] text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">New</span>}
                </div>

                <div className="absolute top-5 right-5 flex items-center gap-1 bg-[#1C1A17]/80 text-[#B9AA98] text-xs px-3 py-1.5 rounded-full">
                  <Eye size={12} />{current.views.toLocaleString()} views
                </div>

                {/* Info overlay */}
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-serif text-2xl text-[#F6F2EC] mb-1">{current.title}</p>
                  <div className="flex items-center gap-1 text-[#B9AA98] text-sm mb-2">
                    <MapPin size={12} />{current.address}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-[#9A8B7A] text-sm">
                      <span className="flex items-center gap-1"><Bed size={12} />{current.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={12} />{current.baths}</span>
                      <span>{current.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <span className="font-serif text-xl text-[#C9A96A]">{current.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <button onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1C1A17]/80 text-[#F6F2EC] flex items-center justify-center hover:bg-[#C9A96A] hover:text-[#1C1A17] transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1C1A17]/80 text-[#F6F2EC] flex items-center justify-center hover:bg-[#C9A96A] hover:text-[#1C1A17] transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="grid grid-cols-6 gap-3">
          {TOURS.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)}
              className={`relative rounded-lg overflow-hidden h-20 border-2 transition-colors ${i === active ? 'border-[#C9A96A]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <Image src={t.thumbnail} alt={t.title} fill className="object-cover" />
            </button>
          ))}
        </div>

        <ScrollReveal className="text-center mt-10">
          <Link href="/search?features=virtual-tour" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors inline-block">
            Browse All Virtual Tours
          </Link>
        </ScrollReveal>
      </section>

      {/* Features */}
      <section className="border-t border-[#252220] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Our Technology</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Industry-Leading Presentation</h2>
            <p className="text-[#B9AA98] max-w-xl mx-auto">We invest heavily in digital presentation because the finest properties deserve the finest showcase — especially for buyers who cannot be physically present.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.07}>
                <div className="bg-[#252220] border border-[#3A3530] rounded-xl p-8 hover:border-[#C9A96A]/40 transition-colors">
                  <f.icon size={28} className="text-[#C9A96A] mb-4" />
                  <h3 className="text-[#F4EFE8] font-semibold text-lg mb-3">{f.title}</h3>
                  <p className="text-[#9A8B7A] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Book live viewing CTA */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Live Guided Viewings</p>
          <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Can't Be There in Person?</h2>
          <p className="text-[#B9AA98] mb-8 max-w-lg mx-auto">Book a live guided virtual viewing with your dedicated agent. We'll walk you through the property in real time via FaceTime, WhatsApp Video, or Zoom — at a time that suits your timezone.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact?dept=viewings" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold hover:bg-[#B8935A] transition-colors">
              Book a Live Viewing
            </Link>
            <Link href="/property-finder" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold hover:bg-[#C9A96A]/10 transition-colors">
              Property Finder Service
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
