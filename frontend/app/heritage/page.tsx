'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { MapPin, Bed, Bath, Calendar, Award, Shield, Search } from 'lucide-react';
import { useState } from 'react';

const PROPERTIES = [
  { id: 1, title: 'Stokesay Court', address: 'Shropshire', grade: 'Grade I Listed', date: 'c.1889', beds: 14, baths: 10, sqft: 28000, price: '£3,250,000', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80', desc: 'A remarkable late-Victorian mansion of exceptional architectural importance, subject of major restoration.' },
  { id: 2, title: 'Brampton Manor', address: 'Northamptonshire', grade: 'Grade II* Listed', date: 'c.1720', beds: 11, baths: 8, sqft: 21000, price: '£5,900,000', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', desc: 'Queen Anne country house with formal gardens, lake and 160-acre parkland designed in the Capability Brown tradition.' },
  { id: 3, title: 'Herriard Park House', address: 'Hampshire', grade: 'Grade II Listed', date: 'c.1818', beds: 9, baths: 7, sqft: 18500, price: '£4,200,000', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=700&q=80', desc: 'Regency-period house with exceptional reception rooms, private chapel and outstanding rural views.' },
  { id: 4, title: 'Thornbury Castle', address: 'South Gloucestershire', grade: 'Grade I Listed', date: 'c.1511', beds: 6, baths: 5, sqft: 12000, price: '£8,750,000', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=700&q=80', desc: 'One of England\'s most significant Tudor castles. The only castle-palace built in England since the Norman Conquest.' },
  { id: 5, title: 'Marfield House', address: 'County Wexford, Ireland', grade: 'Protected Structure', date: 'c.1850', beds: 10, baths: 8, sqft: 16000, price: '€3,800,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80', desc: 'Mid-Victorian Italianate mansion with original plasterwork ceilings, walled garden and parkland grounds.' },
  { id: 6, title: 'Westwick Hall', address: 'Norfolk', grade: 'Grade II* Listed', date: 'c.1704', beds: 12, baths: 9, sqft: 24000, price: '£6,500,000', image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=700&q=80', desc: 'Early Georgian hall set within a rare, largely unchanged 18th-century designed landscape of national importance.' },
];

const TYPES = [
  { label: 'All', value: 'all' },
  { label: 'Grade I Listed', value: 'grade-i' },
  { label: 'Grade II* Listed', value: 'grade-ii-star' },
  { label: 'Grade II Listed', value: 'grade-ii' },
  { label: 'Castles & Towers', value: 'castle' },
  { label: 'Manor Houses', value: 'manor' },
];

const EXPERTISE = [
  { icon: Shield, title: 'Listed Building Consent', desc: 'We guide buyers through the consents, restrictions and permitted work categories for all grades of listed building.' },
  { icon: Award, title: 'Heritage Valuations', desc: 'Our RICS-qualified heritage specialists provide valuations reflecting both market value and historic significance.' },
  { icon: Search, title: 'Research & Provenance', desc: 'Full historic research: previous owners, original architect, building history, inventories, and estate records.' },
  { icon: Calendar, title: 'Repair & Restoration Advice', desc: 'We connect buyers with heritage architects, specialist craftspeople and approved contractors experienced in period properties.' },
  { icon: MapPin, title: 'Grant Funding Navigation', desc: 'Historic England, the National Heritage Memorial Fund and local authority grants — we identify funding routes for buyers.' },
  { icon: Bed, title: 'Planning & Change of Use', desc: 'Expert guidance on residential conversion of listed commercial buildings, barns and scheduled monuments.' },
];

const STATS = [
  { value: '180+', label: 'Heritage Listings', sub: 'Grade I, II* and II' },
  { value: '65%', label: 'Off-Market', sub: 'sold without public listing' },
  { value: '28 yrs', label: 'Combined Expertise', sub: 'in heritage transactions' },
  { value: '£1.2bn', label: 'Heritage Transacted', sub: 'since founding' },
];

export default function HeritagePage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative min-h-[80vh] flex items-end overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1600&q=80" alt="Heritage properties" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17] via-[#1C1A17]/30 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20 w-full">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Historic & Listed Properties</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
            Properties That<br />Carry History Within<br />Their Walls
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#B9AA98] text-xl max-w-2xl mb-10 leading-relaxed">
            From Tudor castles to Georgian estates — our heritage specialists handle some of the most architecturally and historically significant private homes in the British Isles.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4 flex-wrap">
            <Link href="#properties" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors">
              View Heritage Properties
            </Link>
            <Link href="/contact?dept=heritage" className="border border-[#F6F2EC]/60 text-[#F6F2EC] px-8 py-3 font-semibold tracking-wide hover:bg-white/10 transition-colors">
              Speak to a Specialist
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

      {/* About heritage section */}
      <section className="max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-16 items-center">
        <ScrollReveal className="flex-1">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Why Heritage?</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-5">A Special Kind of Ownership</h2>
          <p className="text-[#5F5448] mb-4 leading-relaxed">
            To own a listed building is to become its custodian — the latest in a long line of guardians who have preserved something irreplaceable for future generations. It is a responsibility, but also a profound privilege.
          </p>
          <p className="text-[#5F5448] mb-6 leading-relaxed">
            England alone has over 400,000 listed buildings. Fewer than 6,000 are Grade I — of exceptional interest. The scarcity of these properties, combined with their architectural and cultural significance, makes them among the most resilient and sought-after assets in the luxury property market.
          </p>
          <div className="space-y-3">
            {[
              'Grade I: Exceptional national importance — 2% of all listed buildings',
              'Grade II*: More than special interest — 5.5% of listed buildings',
              'Grade II: Nationally important — 92% of all listed buildings',
              'Scheduled Monuments: Nationally important archaeological sites',
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] mt-2 flex-shrink-0" />
                <p className="text-sm text-[#5F5448]">{item}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2} className="flex-1">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" alt="Listed building interior" fill className="object-cover" />
          </div>
        </ScrollReveal>
      </section>

      {/* Properties */}
      <section id="properties" className="bg-[#F0EAE0] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-10">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Current Heritage Listings</p>
            <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Historic Homes for Sale</h2>
          </ScrollReveal>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {TYPES.map(t => (
              <button key={t.value} onClick={() => setFilter(t.value)}
                className={`px-5 py-2 text-sm font-medium transition-colors rounded-full ${filter === t.value ? 'bg-[#1C1A17] text-[#F6F2EC]' : 'bg-white text-[#5F5448] hover:bg-[#E8E1D7]'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROPERTIES.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.07}>
                <div className="lux-card overflow-hidden group cursor-pointer">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#1C1A17]/90 text-[#C9A96A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1">{p.grade}</span>
                    <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-1">{p.date}</span>
                    <span className="absolute bottom-3 left-3 font-serif text-xl text-white">{p.price}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-[#1C1A17] mb-1">{p.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-[#7A6E60] mb-3">
                      <MapPin size={13} /><span>{p.address}</span>
                    </div>
                    <p className="text-sm text-[#5F5448] leading-relaxed mb-4">{p.desc}</p>
                    <div className="flex items-center gap-4 text-sm text-[#7A6E60] pt-3 border-t border-[#E8E1D7]">
                      <span className="flex items-center gap-1"><Bed size={13} />{p.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={13} />{p.baths}</span>
                      <span>{p.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Link href="/search?type=heritage" className="lux-button-outline">View All Heritage Properties</Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Expert services */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Heritage Expertise</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Specialists in Historic Property</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Buying a listed building requires specialist advice at every stage. Our heritage team navigates the complexities so you can focus on finding the right home.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className="lux-card p-8">
                <s.icon size={28} className="text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#1C1A17] text-lg mb-2">{s.title}</h3>
                <p className="text-[#7A6E60] text-sm leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Quote */}
      <ScrollReveal>
        <div className="bg-[#1C1A17] py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-[#C9A96A] text-5xl font-serif mb-6">"</div>
            <p className="font-serif text-2xl text-[#F4EFE8] leading-relaxed mb-8 italic">
              The finest listed buildings are not just homes. They are living documents of British history — the embodiment of an era's ambition, craft and culture. We consider it a privilege to play any part in their continued stewardship.
            </p>
            <p className="text-[#9A8B7A] text-sm uppercase tracking-widest">James Whitmore MRICS, Head of Heritage Sales</p>
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Heritage Property Register</p>
          <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Register for Heritage Property Alerts</h2>
          <p className="text-[#7A6E60] mb-8 max-w-lg mx-auto">The finest listed homes rarely reach the open market. Register to receive priority notification when relevant heritage properties become available.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact?dept=heritage" className="lux-button">Speak to a Heritage Specialist</Link>
            <Link href="/country-homes" className="lux-button-outline">Explore Country Homes</Link>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
