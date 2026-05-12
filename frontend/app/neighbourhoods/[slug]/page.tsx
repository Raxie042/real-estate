'use client';

import { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, TrendingUp, Train, GraduationCap, Coffee, ShoppingBag, ChevronRight, ArrowRight, Star } from 'lucide-react';

const NEIGHBOURHOOD_DATA: Record<string, any> = {
  mayfair: {
    name: 'Mayfair',
    city: 'London',
    country: 'UK',
    tagline: "London's most prestigious address",
    description: `Mayfair occupies a singular position in London's property landscape — and indeed the world's. Bounded by Hyde Park to the west, Oxford Street to the north, Regent Street to the east and Piccadilly to the south, this gilded square mile has been the address of choice for aristocracy, diplomats and international ultra-high-net-worth individuals for three centuries.\n\nThe architecture is almost uniformly exceptional: Queen Anne and Georgian terraces, Regency stucco mansions and sensitively converted embassy buildings line quiet, tree-shaded streets. At its heart, Berkeley Square's centuries-old plane trees preside over one of London's most refined public spaces.`,
    heroImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1600&q=80',
    stats: { avgPrice: '£8.2M', priceChange: '+4.2%', avgRent: '£12,500 pcm', daysOnMarket: 42, totalSales: 94 },
    lifestyle: [
      { icon: 'dining', label: 'Dining', desc: 'Scott\'s, Annabel\'s, The Connaught Bar and 14 Michelin stars within walking distance.' },
      { icon: 'shopping', label: 'Shopping', desc: 'Savile Row, Mount Street, Bond Street and Burlington Arcade — the greatest concentration of luxury retail on earth.' },
      { icon: 'arts', label: 'Arts & Culture', desc: 'The Royal Academy, Gagosian Gallery, and numerous private auction houses.' },
      { icon: 'green', label: 'Green Space', desc: 'Hyde Park (350 acres) and Green Park provide an extraordinary green lung on the doorstep.' },
    ],
    transport: [
      { line: 'Green Park', time: '2 min walk', icon: '🟡', connects: 'Jubilee, Victoria, Piccadilly' },
      { line: 'Bond Street', time: '5 min walk', icon: '🔵', connects: 'Central, Jubilee, Elizabeth' },
      { line: 'Oxford Circus', time: '8 min walk', icon: '🔴', connects: 'Bakerloo, Central, Victoria' },
    ],
    schools: [
      { name: 'Francis Holland School', type: 'Independent', rating: 'Outstanding', distance: '0.4 mi' },
      { name: 'Westminster School', type: 'Independent', rating: 'Outstanding', distance: '0.8 mi' },
      { name: 'St. George\'s School', type: 'State', rating: 'Outstanding', distance: '0.3 mi' },
    ],
    priceHistory: [
      { year: '2020', avg: '£6.8M' }, { year: '2021', avg: '£7.0M' }, { year: '2022', avg: '£7.4M' },
      { year: '2023', avg: '£7.7M' }, { year: '2024', avg: '£7.9M' }, { year: '2025', avg: '£8.2M' },
    ],
    proTips: [
      'The streets north of Grosvenor Square offer larger footprints at a slight discount to the absolute prime.',
      'Mews properties command a premium in Mayfair — they rarely come to open market.',
      'New-build stock in Mayfair is exceptionally scarce; lateral conversions of mansion blocks attract strong demand.',
    ],
    type: 'Ultra Prime',
    nearby: ['Knightsbridge', 'Belgravia', 'Chelsea'],
  },
  knightsbridge: {
    name: 'Knightsbridge',
    city: 'London',
    country: 'UK',
    tagline: "Harrods, Hyde Park & unrivalled elegance",
    description: `Knightsbridge is one of the world's most recognised luxury addresses, defined by the iconic green domes of Harrods and framed by the south-eastern edge of Hyde Park. The area's white stucco-fronted terraces and mansion blocks house some of London's largest and most valuable private residences.\n\nThe combination of Hyde Park access, international retail and five-star hospitality — The Mandarin Oriental, Bulgari and Harvey Nichols — makes Knightsbridge uniquely appealing to international buyers seeking a London base of the highest calibre.`,
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80',
    stats: { avgPrice: '£6.8M', priceChange: '+3.1%', avgRent: '£9,800 pcm', daysOnMarket: 51, totalSales: 112 },
    lifestyle: [
      { icon: 'dining', label: 'Dining', desc: 'Bar Boulud, Zuma, Dinner by Heston Blumenthal and the Mandarin Oriental\'s rooftop bar.' },
      { icon: 'shopping', label: 'Shopping', desc: 'Harrods, Harvey Nichols and Sloane Street\'s unbroken parade of designer flagships.' },
      { icon: 'arts', label: 'Culture', desc: 'The Victoria & Albert Museum, Natural History Museum and Science Museum, all within a 10-minute walk.' },
      { icon: 'green', label: 'Parks', desc: 'Direct access to Hyde Park and Kensington Gardens — over 600 acres of royal parkland.' },
    ],
    transport: [
      { line: 'Knightsbridge', time: '1 min walk', icon: '🔴', connects: 'Piccadilly' },
      { line: 'Hyde Park Corner', time: '7 min walk', icon: '🔴', connects: 'Piccadilly' },
    ],
    schools: [
      { name: 'Lycée Français Charles de Gaulle', type: 'Independent', rating: 'Outstanding', distance: '0.6 mi' },
      { name: 'Knightsbridge School', type: 'Independent', rating: 'Outstanding', distance: '0.2 mi' },
    ],
    priceHistory: [
      { year: '2020', avg: '£5.9M' }, { year: '2021', avg: '£6.1M' }, { year: '2022', avg: '£6.3M' },
      { year: '2023', avg: '£6.5M' }, { year: '2024', avg: '£6.6M' }, { year: '2025', avg: '£6.8M' },
    ],
    proTips: [
      'The Knightsbridge Estate offers a rare combination of lateral space and porter service.',
      'Properties overlooking Pont Street and Beauchamp Place command a premium for privacy.',
      'Ground-floor maisonettes with private gardens are exceptionally rare and command significant premiums.',
    ],
    type: 'Prime Central',
    nearby: ['Mayfair', 'Chelsea', 'Belgravia'],
  },
};

// Fallback for slugs not fully built out
const DEFAULT_DATA = {
  chelsea: { name: 'Chelsea', city: 'London', heroImage: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1600&q=80', stats: { avgPrice: '£4.5M', priceChange: '+2.8%' } },
  belgravia: { name: 'Belgravia', city: 'London', heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80', stats: { avgPrice: '£7.1M', priceChange: '+3.7%' } },
  'notting-hill': { name: 'Notting Hill', city: 'London', heroImage: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80', stats: { avgPrice: '£3.2M', priceChange: '+5.1%' } },
  hampstead: { name: 'Hampstead', city: 'London', heroImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80', stats: { avgPrice: '£3.8M', priceChange: '+6.2%' } },
  cotswolds: { name: 'The Cotswolds', city: 'Gloucestershire', heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80', stats: { avgPrice: '£1.8M', priceChange: '+8.4%' } },
  'dubai-marina': { name: 'Dubai Marina', city: 'Dubai', heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80', stats: { avgPrice: 'AED 3.4M', priceChange: '+11.2%' } },
};

export default function NeighbourhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const n = NEIGHBOURHOOD_DATA[slug];

  // For neighbourhoods without full data, render a coming-soon style page
  if (!n) {
    const basic = DEFAULT_DATA[slug as keyof typeof DEFAULT_DATA];
    if (!basic) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F2EC]">
          <div className="text-center">
            <p className="text-[#9A8B7A] mb-4">Guide not found</p>
            <Link href="/neighbourhoods" className="text-[#C9A96A]">← Back to Guides</Link>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-[#F6F2EC]">
        <div className="relative h-80 overflow-hidden bg-[#1C1A17]">
          <img src={basic.heroImage} alt={basic.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1A17]" />
          <div className="relative px-6 pt-6 flex items-center gap-2 text-white/40 text-sm">
            <Link href="/neighbourhoods" className="hover:text-white/70 transition">Guides</Link>
            <ChevronRight size={14} />
            <span>{basic.name}</span>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">Coming Soon</p>
          <h1 className="text-5xl font-light text-[#1C1A17] lux-heading mb-4">{basic.name}</h1>
          <p className="text-[#7A6E60] mb-8">Our research team is finalising the in-depth guide for this area. Contact us for a private briefing in the meantime.</p>
          <Link href="/contact" className="lux-button inline-flex items-center gap-2">Request Private Briefing <ArrowRight size={16} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative h-[520px] overflow-hidden bg-[#1C1A17]">
        <img src={n.heroImage} alt={n.name} className="absolute inset-0 w-full h-full object-cover opacity-40 scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#1C1A17]" />
        {/* Breadcrumb */}
        <div className="relative px-6 pt-6 flex items-center gap-2 text-white/40 text-sm">
          <Link href="/" className="hover:text-white/70 transition">Home</Link>
          <ChevronRight size={14} />
          <Link href="/neighbourhoods" className="hover:text-white/70 transition">Area Guides</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">{n.name}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-10 md:p-16 max-w-5xl">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Area Guide
          </motion.p>
          <motion.h1 className="text-6xl md:text-7xl font-light text-white lux-heading mb-3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            {n.name}
          </motion.h1>
          <motion.p className="text-xl text-white/60 font-light mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {n.tagline}
          </motion.p>
          <motion.div className="flex flex-wrap items-center gap-5 text-sm text-white/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#C9A96A]" /> {n.city}, {n.country}</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-[#C9A96A]" /> Avg {n.stats.avgPrice}</span>
            <span className="text-green-400 font-medium">{n.stats.priceChange} YoY</span>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <ScrollReveal>
        <div className="bg-[#1C1A17] py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { label: 'Average Price', value: n.stats.avgPrice },
                { label: 'Price Growth (YoY)', value: n.stats.priceChange, green: true },
                { label: 'Avg Rental', value: n.stats.avgRent },
                { label: 'Avg Days on Market', value: `${n.stats.daysOnMarket} days` },
                { label: 'Annual Sales', value: `${n.stats.totalSales} transactions` },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-[#C9A96A] text-xl font-light lux-heading">{s.value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-12">

            {/* About */}
            <ScrollReveal>
              <div className="lux-card p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">Overview</p>
                <div className="space-y-4">
                  {n.description.split('\n\n').map((para: string, i: number) => (
                    <p key={i} className="text-[#3D3630] leading-relaxed text-lg font-light lux-prose">{para}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Lifestyle */}
            <ScrollReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Lifestyle</p>
                <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-6">Life in {n.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {n.lifestyle.map((l: any, i: number) => (
                    <ScrollReveal key={i} delay={i * 0.08}>
                      <div className="lux-card p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-full bg-[#FBF7F0] flex items-center justify-center">
                            {l.icon === 'dining' && <Coffee size={16} className="text-[#C9A96A]" />}
                            {l.icon === 'shopping' && <ShoppingBag size={16} className="text-[#C9A96A]" />}
                            {l.icon === 'arts' && <Star size={16} className="text-[#C9A96A]" />}
                            {l.icon === 'green' && <MapPin size={16} className="text-[#C9A96A]" />}
                          </div>
                          <p className="font-medium text-[#1C1A17]">{l.label}</p>
                        </div>
                        <p className="text-sm text-[#5F5448] leading-relaxed font-light">{l.desc}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Transport */}
            <ScrollReveal>
              <div className="lux-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Train size={18} className="text-[#C9A96A]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A]">Connectivity</p>
                    <h2 className="text-2xl font-light text-[#1C1A17] lux-heading">Transport Links</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {n.transport.map((t: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#F6F2EC] rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{t.icon}</span>
                        <div>
                          <p className="font-medium text-[#1C1A17] text-sm">{t.line}</p>
                          <p className="text-xs text-[#9A8B7A]">{t.connects}</p>
                        </div>
                      </div>
                      <span className="text-[#C9A96A] text-sm font-medium">{t.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Schools */}
            <ScrollReveal>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap size={18} className="text-[#C9A96A]" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A]">Education</p>
                    <h2 className="text-2xl font-light text-[#1C1A17] lux-heading">Schools & Colleges</h2>
                  </div>
                </div>
                <div className="space-y-3">
                  {n.schools.map((s: any, i: number) => (
                    <div key={i} className="lux-card p-5 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#1C1A17]">{s.name}</p>
                        <p className="text-xs text-[#9A8B7A] mt-0.5">{s.type} · {s.distance}</p>
                      </div>
                      <span className="lux-badge bg-green-50 border-green-200 text-green-700 text-[10px]">{s.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Price history */}
            <ScrollReveal>
              <div className="lux-card p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Market Data</p>
                <h2 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">Average Price History</h2>
                <div className="flex items-end gap-3 h-36">
                  {n.priceHistory.map((p: any, i: number) => {
                    const maxVal = Math.max(...n.priceHistory.map((x: any) => parseFloat(x.avg.replace(/[^0-9.]/g, ''))));
                    const val = parseFloat(p.avg.replace(/[^0-9.]/g, ''));
                    const pct = (val / maxVal) * 100;
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <p className="text-[10px] text-[#9A8B7A] text-center">{p.avg}</p>
                        <div className="w-full bg-[#C9A96A]/20 rounded-t-sm overflow-hidden" style={{ height: `${pct}%` }}>
                          <div className="w-full h-full bg-[#C9A96A] rounded-t-sm opacity-80" />
                        </div>
                        <p className="text-[10px] text-[#9A8B7A]">{p.year}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Expert tips */}
            <ScrollReveal>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Insider Knowledge</p>
                <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-6">Agent Pro Tips</h2>
                <div className="space-y-4">
                  {n.proTips.map((tip: string, i: number) => (
                    <div key={i} className="lux-card p-6 flex gap-4">
                      <span className="text-[#C9A96A] font-medium lux-heading text-2xl shrink-0 mt-0.5">0{i + 1}</span>
                      <p className="text-[#3D3630] font-light leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Speak to specialist */}
            <ScrollReveal direction="right">
              <div className="lux-card p-7 sticky top-24">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-1">Expert Guidance</p>
                <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-4">Speak to a {n.name} Specialist</h3>
                <p className="text-sm text-[#7A6E60] font-light mb-5">Our local experts have an unmatched knowledge of available stock, off-market opportunities and long-term value in this area.</p>
                <Link href="/agents" className="lux-button w-full text-center block mb-3">Find a Specialist</Link>
                <Link href="/contact" className="lux-button-outline w-full text-center block">Request Area Briefing</Link>
              </div>
            </ScrollReveal>

            {/* Nearby areas */}
            {n.nearby && (
              <ScrollReveal direction="right" delay={0.1}>
                <div className="lux-card p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">Explore Nearby</p>
                  <div className="space-y-2">
                    {n.nearby.map((area: string) => (
                      <Link
                        key={area}
                        href={`/neighbourhoods/${area.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F6F2EC] transition group"
                      >
                        <span className="text-[#1C1A17] font-medium text-sm">{area}</span>
                        <ChevronRight size={14} className="text-[#C9A96A] group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Properties CTA */}
            <ScrollReveal direction="right" delay={0.15}>
              <div className="bg-[#1C1A17] rounded-2xl p-6 text-center">
                <p className="text-[#C9A96A] text-xs uppercase tracking-[0.3em] mb-2">Available Now</p>
                <p className="text-white font-light mb-4">Browse properties currently available in {n.name}</p>
                <Link href={`/search?city=${n.name}`} className="lux-button w-full text-center block text-sm">
                  View Properties
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
