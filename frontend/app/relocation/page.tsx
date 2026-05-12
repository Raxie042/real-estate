'use client';

import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Home, Users, CheckCircle, ArrowRight, Building2, Plane, ShoppingBag, GraduationCap, Car, Heart } from 'lucide-react';

const SERVICES = [
  {
    icon: <Home size={24} className="text-[#C9A96A]" />,
    title: 'Property Search & Acquisition',
    desc: 'Our agents shortlist and preview properties on your behalf before you travel, saving weeks of search time.',
  },
  {
    icon: <Globe size={24} className="text-[#C9A96A]" />,
    title: 'Visa & Residency Guidance',
    desc: 'We connect you with immigration lawyers for Investor Visas, Golden Visas (UAE/Portugal), and Tier 1 routes.',
  },
  {
    icon: <Building2 size={24} className="text-[#C9A96A]" />,
    title: 'School Placement',
    desc: 'Access to our network of independent school advisors for placement at top international schools.',
  },
  {
    icon: <Car size={24} className="text-[#C9A96A]" />,
    title: 'Area Orientation Tours',
    desc: 'Private chauffeur-guided tours of your target neighbourhood, schools, amenities and transport links.',
  },
  {
    icon: <ShoppingBag size={24} className="text-[#C9A96A]" />,
    title: 'Home Setup & Furnishing',
    desc: 'Interior design partners and white-glove move-in services including utility connections and smart home setup.',
  },
  {
    icon: <Heart size={24} className="text-[#C9A96A]" />,
    title: 'Lifestyle Concierge',
    desc: 'GP registration, private club introductions, restaurant reservations, staff placement, and more.',
  },
];

const DESTINATIONS = [
  { city: 'London', flag: '\u{1F1EC}\u{1F1E7}', desc: 'Prime central London & home counties', popular: true },
  { city: 'Dubai', flag: '\u{1F1E6}\u{1F1EA}', desc: 'DIFC, Palm Jumeirah, Downtown', popular: true },
  { city: 'Monaco', flag: '\u{1F1F2}\u{1F1E8}', desc: 'Principality & French Riviera', popular: false },
  { city: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}', desc: 'Orchard Road, Sentosa & CBD', popular: true },
  { city: 'New York', flag: '\u{1F1FA}\u{1F1F8}', desc: 'Manhattan & The Hamptons', popular: false },
  { city: 'Paris', flag: '\u{1F1EB}\u{1F1F7}', desc: '7\u00e8me, 8\u00e8me & 16\u00e8me arrondissements', popular: false },
  { city: 'Hong Kong', flag: '\u{1F1ED}\u{1F1F0}', desc: 'Peak, Repulse Bay & Midlevels', popular: false },
  { city: 'Geneva', flag: '\u{1F1E8}\u{1F1ED}', desc: 'Cologny, Bellevue & Canton Vaud', popular: false },
];

const PROCESS = [
  { step: '01', title: 'Initial Consultation', desc: 'A private 60-minute call with your dedicated relocation advisor to understand your requirements, timeline and priorities.' },
  { step: '02', title: 'Destination Briefing', desc: 'Curated area guides, school rankings, tax summaries and cost-of-living comparisons for your target destination.' },
  { step: '03', title: 'Property Previews', desc: 'Our local agents preview shortlisted properties and report back with video walkthroughs before your visit.' },
  { step: '04', title: 'Accompanied Viewing Trip', desc: 'We coordinate a 2–4 day trip: viewings, school tours, area orientation, and introductions to local advisors.' },
  { step: '05', title: 'Acquisition & Legal', desc: 'Full transaction support — offer, negotiation, conveyancing, and exchange — in your destination jurisdiction.' },
  { step: '06', title: 'Settling In', desc: 'Home setup, utility connections, lifestyle introductions, and ongoing concierge for your first 90 days.' },
];

export default function RelocationPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <section className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Plane size={18} className="text-[#C9A96A]" />
              <span className="text-[#C9A96A] text-sm font-semibold tracking-widest uppercase">Relocation Services</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 font-serif">
              Move Anywhere.<br />
              <span className="text-[#C9A96A]">We Handle Everything.</span>
            </h1>
            <p className="text-[#BBAD98] text-lg max-w-2xl mx-auto mb-8">
              Whether you&apos;re moving your family from London to Dubai, or relocating a corporate team from New York to Singapore — our relocation team delivers end-to-end support from property search to your first dinner reservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="lux-button">Speak with a Relocation Advisor</Link>
              <Link href="/properties" className="lux-button-outline border-[#4A4540] text-[#E8E1D7] hover:bg-[#2E2B26]">Browse Properties</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#C9A96A] py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: '1,200+', label: 'Relocations completed' },
            { value: '28', label: 'Countries covered' },
            { value: '96%', label: 'Client satisfaction' },
            { value: '48h', label: 'Average response time' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[#1C1A17] font-serif">{s.value}</p>
              <p className="text-sm text-[#5F4A1C]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-[#1C1A17] mb-2 font-serif text-center">Our Services</h2>
            <p className="text-[#7A6E60] text-center mb-10 max-w-xl mx-auto">Everything you need to relocate without friction — from first search to fully settled.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 60}>
                <div className="lux-card p-6 h-full">
                  <div className="mb-4">{s.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1C1A17] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#5F5448] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-4 bg-white border-y border-[#E8E1D7]">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-[#1C1A17] mb-2 font-serif text-center">Popular Destinations</h2>
            <p className="text-[#7A6E60] text-center mb-10">We have dedicated advisors and local partnerships in all key markets.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {DESTINATIONS.map((d, i) => (
              <ScrollReveal key={d.city} delay={i * 50}>
                <div className="lux-card p-5 text-center hover:border-[#C9A96A] transition-colors cursor-pointer">
                  <span className="text-3xl block mb-2">{d.flag}</span>
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{d.city}</h3>
                  <p className="text-xs text-[#7A6E60]">{d.desc}</p>
                  {d.popular && <span className="inline-block mt-2 text-[10px] bg-[#C9A96A]/15 text-[#8B6A2A] px-2 py-0.5 rounded-full font-medium">Popular</span>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-[#1C1A17] mb-2 font-serif text-center">How It Works</h2>
            <p className="text-[#7A6E60] text-center mb-10">Our six-step relocation journey from first call to first home.</p>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-[#E8E1D7]" />
            <div className="space-y-8">
              {PROCESS.map((p, i) => (
                <ScrollReveal key={p.step} delay={i * 80}>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#C9A96A] text-[#1C1A17] flex items-center justify-center font-bold text-sm flex-shrink-0 z-10">
                      {p.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-semibold text-[#1C1A17] mb-1">{p.title}</h3>
                      <p className="text-sm text-[#5F5448] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#1C1A17]">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-white mb-4 font-serif">Ready to Relocate?</h2>
            <p className="text-[#BBAD98] mb-8">Speak with a dedicated advisor within 24 hours. No commitment required.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="lux-button">Book a Free Consultation</Link>
              <a href="tel:+442071234567" className="lux-button-outline border-[#4A4540] text-[#E8E1D7] hover:bg-[#2E2B26]">+44 (0)20 7123 4567</a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
