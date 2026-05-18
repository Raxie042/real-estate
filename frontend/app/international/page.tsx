'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Globe, MapPin, TrendingUp, Plane, Shield, Users, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const MARKETS = [
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', listings: 312, avgPrice: '£4.2m', growth: '+6.8%', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80', desc: 'Prime and super-prime across Mayfair, Belgravia, Chelsea, Knightsbridge and beyond.' },
  { city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', listings: 184, avgPrice: 'AED 12.4m', growth: '+14.2%', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', desc: 'Palm Jumeirah, Downtown, Emirates Hills and DIFC ultra-luxury residences.' },
  { city: 'New York', country: 'United States', flag: '🇺🇸', listings: 97, avgPrice: '$6.8m', growth: '+3.4%', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80', desc: 'Central Park West, Tribeca, Upper East Side and iconic penthouse residences.' },
  { city: 'Monaco', country: 'Principality of Monaco', flag: '🇲🇨', listings: 34, avgPrice: '€8.9m', growth: '+9.1%', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80', desc: 'Monte-Carlo, Fontvieille and Le Carré d\'Or — the world\'s most valuable real estate per sq/m.' },
  { city: 'Paris', country: 'France', flag: '🇫🇷', listings: 78, avgPrice: '€3.1m', growth: '+4.7%', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80', desc: '7th, 8th and 16th arrondissements — Haussmann apartments and private hôtels particuliers.' },
  { city: 'Singapore', country: 'Singapore', flag: '🇸🇬', listings: 62, avgPrice: 'SGD 7.2m', growth: '+11.3%', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', desc: 'Sentosa Cove, Orchard Road and Marina Bay — the gateway to Southeast Asian luxury.' },
  { city: 'Geneva', country: 'Switzerland', flag: '🇨🇭', listings: 41, avgPrice: 'CHF 4.6m', growth: '+2.1%', image: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80', desc: 'Lakefront villas, chalet estates and private banking district apartments.' },
  { city: 'Marbella', country: 'Spain', flag: '🇪🇸', listings: 89, avgPrice: '€2.4m', growth: '+18.6%', image: 'https://images.unsplash.com/photo-1571406252241-db0280bd38db?w=600&q=80', desc: 'The Golden Mile, Sierra Blanca and La Zagaleta — Europe\'s premier golf and beach enclave.' },
];

const FEATURED = [
  { title: 'Villa Palmeraie', location: 'Marbella, Spain', price: '€4,850,000', beds: 6, sqft: 8500, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80', tag: 'New to Market' },
  { title: 'Penthouse du Carré d\'Or', location: 'Monaco', price: '€18,500,000', beds: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=700&q=80', tag: 'Rare Opportunity' },
  { title: 'Palm Jumeirah Signature Villa', location: 'Dubai, UAE', price: 'AED 28,000,000', beds: 7, sqft: 14000, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80', tag: 'Off-Market' },
  { title: 'Tribeca Loft', location: 'New York, USA', price: '$9,200,000', beds: 4, sqft: 5400, image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=700&q=80', tag: 'New to Market' },
  { title: 'Lac Léman Villa', location: 'Geneva, Switzerland', price: 'CHF 12,400,000', beds: 8, sqft: 11000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', tag: 'Exclusive' },
  { title: 'Sentosa Cove Waterfront', location: 'Singapore', price: 'SGD 15,800,000', beds: 6, sqft: 9200, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80', tag: 'Prime Waterfront' },
];

const SERVICES = [
  { icon: Globe, title: 'Global Search', desc: 'Search simultaneously across 40+ countries through our international affiliate network including Sotheby\'s, Christie\'s and Luxury Portfolio members.' },
  { icon: Shield, title: 'Legal & Tax Navigation', desc: 'We co-ordinate local legal counsel, tax advisors and notaries in every jurisdiction so cross-border transactions are seamless.' },
  { icon: TrendingUp, title: 'Market Intelligence', desc: 'Our international research team produces quarterly reports on prime markets worldwide, tracking yields, price growth and structural demand shifts.' },
  { icon: Plane, title: 'View & Fly Arrangements', desc: 'We arrange private jet transfers, hotel suites and chauffeured programmes for international viewing trips across multiple markets.' },
  { icon: Users, title: 'Relocation Services', desc: 'School search, visa advisory, cultural orientation, storage and moving logistics — for families relocating internationally.' },
  { icon: MapPin, title: 'Residency & Citizenship', desc: 'Expert guidance on investor visa programmes, golden visas and citizenship-by-investment routes linked to property purchase.' },
];

const STATS = [
  { value: '40+', label: 'Countries', sub: 'where we actively transact' },
  { value: '£4.8bn', label: 'International Volume', sub: 'transacted in 3 years' },
  { value: '8', label: 'Global Offices', sub: 'London, Dubai, New York + more' },
  { value: '380+', label: 'Affiliate Agents', sub: 'worldwide partner network' },
];

export default function InternationalPage() {
  const [activeMarket, setActiveMarket] = useState(MARKETS[0]);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#1C1A17]">
        <Image src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=80" alt="International luxury real estate" fill className="object-cover opacity-20" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-28">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Global Luxury Real Estate</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
            The World's Finest<br />Properties, Curated for You
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#B9AA98] text-xl mb-10 max-w-2xl mx-auto">
            From Monaco penthouses to Dubai waterfront villas — our international division connects you to extraordinary properties in the world's most coveted addresses.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="/search?scope=international" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors">
              Search International
            </Link>
            <Link href="/property-finder" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors">
              Property Finder Service
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

      {/* Market explorer */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Prime Markets</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Explore Our Key Markets</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Select a destination to explore available properties and live market intelligence.</p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Market list */}
          <div className="lg:w-72 flex-shrink-0 space-y-2">
            {MARKETS.map(m => (
              <button key={m.city} onClick={() => setActiveMarket(m)}
                className={`w-full text-left px-5 py-4 rounded-lg transition-all flex items-center justify-between group
                  ${activeMarket.city === m.city ? 'bg-[#1C1A17] text-[#F4EFE8]' : 'bg-white text-[#5F5448] hover:bg-[#F0EAE0]'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{m.flag}</span>
                  <div>
                    <p className="font-semibold text-sm">{m.city}</p>
                    <p className={`text-xs ${activeMarket.city === m.city ? 'text-[#B9AA98]' : 'text-[#9A8B7A]'}`}>{m.listings} listings</p>
                  </div>
                </div>
                <ChevronRight size={14} className={`${activeMarket.city === m.city ? 'text-[#C9A96A]' : 'text-[#9A8B7A]'} group-hover:translate-x-0.5 transition-transform`} />
              </button>
            ))}
          </div>

          {/* Market detail */}
          <div className="flex-1">
            <div className="lux-card overflow-hidden h-full">
              <div className="relative h-72 overflow-hidden">
                <Image src={activeMarket.image} alt={activeMarket.city} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-xs text-[#C9A96A] uppercase tracking-[0.4em] mb-1">{activeMarket.country} {activeMarket.flag}</p>
                  <h3 className="font-serif text-3xl text-[#F6F2EC]">{activeMarket.city}</h3>
                </div>
              </div>
              <div className="p-8">
                <p className="text-[#5F5448] mb-6 leading-relaxed">{activeMarket.desc}</p>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#F6F2EC] rounded-lg p-4 text-center">
                    <p className="font-serif text-xl text-[#1C1A17] font-semibold">{activeMarket.listings}</p>
                    <p className="text-xs text-[#7A6E60]">Active Listings</p>
                  </div>
                  <div className="bg-[#F6F2EC] rounded-lg p-4 text-center">
                    <p className="font-serif text-xl text-[#1C1A17] font-semibold">{activeMarket.avgPrice}</p>
                    <p className="text-xs text-[#7A6E60]">Average Price</p>
                  </div>
                  <div className="bg-[#F6F2EC] rounded-lg p-4 text-center">
                    <p className="font-serif text-xl text-emerald-600 font-semibold">{activeMarket.growth}</p>
                    <p className="text-xs text-[#7A6E60]">YoY Growth</p>
                  </div>
                </div>
                <Link href={`/search?location=${activeMarket.city.toLowerCase()}`}
                  className="lux-button block text-center">Explore {activeMarket.city} Properties</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured international */}
      <section className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">International Portfolio</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Featured International Properties</h2>
            <p className="text-[#B9AA98] max-w-xl mx-auto">A selection of the most exceptional homes currently available through our global network.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.07}>
                <div className="bg-[#252220] border border-[#3A3530] rounded-xl overflow-hidden group cursor-pointer hover:border-[#C9A96A]/50 transition-colors">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{p.tag}</span>
                    <span className="absolute bottom-3 left-3 font-serif text-xl text-white">{p.price}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#F4EFE8] mb-1">{p.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-[#9A8B7A] mb-3">
                      <MapPin size={12} /><span>{p.location}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#7A6E60]">
                      <span>{p.beds} bed</span>
                      <span>{p.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">International Services</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Everything You Need, Everywhere</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Buying internationally is complex. We make it effortless.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className="lux-card p-8">
                <s.icon size={28} className="text-[#C9A96A] mb-4" />
                <h3 className="text-[#1C1A17] font-semibold text-lg mb-3">{s.title}</h3>
                <p className="text-[#7A6E60] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <div className="mx-4 mb-16 max-w-5xl lg:mx-auto bg-[#1C1A17] rounded-2xl overflow-hidden">
          <div className="relative h-72 flex items-center justify-center">
            <Image src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80" alt="Global offices" fill className="object-cover opacity-20" />
            <div className="relative z-10 text-center px-8">
              <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Speak to our International Team</p>
              <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Ready to Invest Abroad?</h2>
              <p className="text-[#B9AA98] mb-8 max-w-lg mx-auto">Our international division operates across time zones. Wherever your search takes you, we'll be there.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact?dept=international" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold hover:bg-[#B8935A] transition-colors">
                  Contact International Team
                </Link>
                <Link href="/property-finder" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold hover:bg-[#C9A96A]/10 transition-colors">
                  Submit a Brief
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
