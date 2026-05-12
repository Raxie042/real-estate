'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const TIMELINE = [
  { year: '2018', title: 'Founded in Mayfair', desc: 'Raxie Zenith Estate opens its first office on Berkeley Square, London, with a mandate to redefine prime residential brokerage.' },
  { year: '2019', title: 'Dubai Expansion', desc: 'DIFC office opens — our first international presence, serving GCC buyers and global investors targeting UAE real estate.' },
  { year: '2021', title: 'Digital Platform Launch', desc: 'Proprietary technology platform launched, combining AI-powered valuation, virtual tours and concierge booking in a single product.' },
  { year: '2022', title: 'Asia-Pacific Entry', desc: 'Singapore regional hub established to service cross-border mandates across Singapore, Hong Kong and Sydney.' },
  { year: '2024', title: '£2bn in Transactions', desc: 'Cumulative transaction volume crosses £2 billion — 1,400+ properties sold or let across 35 countries.' },
  { year: '2026', title: 'Full Platform Launch', desc: "Public launch of Raxie Zenith Estate's full marketplace: 25,000+ listings, 180 verified agents, white-label enterprise offering." },
];

const TEAM = [
  { name: 'Felix Attah', role: 'Chief Executive Officer', bio: 'Founder and CEO of Raxie Zenith Estate. Visionary leader transforming luxury real estate through technology, discretion and world-class client service across prime global markets.', image: '/images/felix-attah.png' },
  { name: 'Sophia Reyes', role: 'Chief Operating Officer', bio: 'Ex-McKinsey. Led luxury platform growth at Emaar Properties from $200m to $2bn in digital revenue.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Alexander Petrov', role: 'Head of Technology', bio: 'Built AI valuation infrastructure at Zoopla. MSc Computer Science, Imperial College London.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
  { name: 'Isabelle du Pont', role: 'Head of International Markets', bio: 'Specialises in cross-border transactions, tax-efficient structuring and international estate planning.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
  { name: 'Marcus Adeyemi', role: 'Head of Investor Relations', bio: 'Previously at Goldman Sachs Real Estate Finance. Advises ultra-high-net-worth clients on property portfolio construction.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Claire Nakamura', role: 'Director of Client Experience', bio: 'Former luxury hospitality director at Four Seasons. Leads concierge services and client lifecycle strategy.', image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80' },
];

const OFFICES = [
  { city: 'London', address: '23 Berkeley Square, Mayfair, W1J 6HE', phone: '+44 20 7123 4567', flag: '\u{1F1EC}\u{1F1E7}' },
  { city: 'Dubai', address: 'Gate Building, DIFC, Dubai, UAE', phone: '+971 4 456 7890', flag: '\u{1F1E6}\u{1F1EA}' },
  { city: 'New York', address: '432 Park Avenue, Midtown, NY 10022', phone: '+1 212 555 0190', flag: '\u{1F1FA}\u{1F1F8}' },
  { city: 'Singapore', address: 'One Raffles Quay, North Tower, 048583', phone: '+65 6221 8888', flag: '\u{1F1F8}\u{1F1EC}' },
  { city: 'Monaco', address: 'Le Panorama, 57 Rue Grimaldi, 98000', phone: '+377 97 98 99 00', flag: '\u{1F1F2}\u{1F1E8}' },
  { city: 'Hong Kong', address: 'ICC Tower, 1 Austin Road West, Kowloon', phone: '+852 2110 9999', flag: '\u{1F1ED}\u{1F1F0}' },
];

const PRESS = [
  { name: 'Financial Times', logo: 'FT' },
  { name: 'Bloomberg', logo: 'Bloomberg' },
  { name: 'The Times', logo: 'The Times' },
  { name: 'Wall Street Journal', logo: 'WSJ' },
  { name: 'Forbes', logo: 'Forbes' },
  { name: 'Vogue Living', logo: 'Vogue' },
];

const AWARDS = [
  { year: '2025', title: 'Best Luxury Property Platform', body: 'RESI Awards' },
  { year: '2025', title: 'PropTech Innovation of the Year', body: 'EG Awards' },
  { year: '2024', title: 'Best International Agent', body: 'Overseas Property Professional' },
  { year: '2024', title: 'Top Luxury Brokerage — London', body: 'Sunday Times Property' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Est. 2018 &mdash; Mayfair, London
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white lux-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            The Standard for Luxury<br />Real Estate
          </motion.h1>
          <motion.p
            className="text-lg text-[#D9CBB7] max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            Raxie Zenith Estate was founded with a singular conviction: that exceptional homes deserve exceptional
            representation. We operate at the intersection of heritage brokerage and modern technology.
          </motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['£2B+', 'Transactions Completed'],
            ['35', 'Countries'],
            ['1,400+', 'Properties Sold'],
            ['180+', 'Verified Agents'],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-semibold text-[#1C1A17]">{val}</p>
              <p className="text-xs uppercase tracking-widest text-[#1C1A17]/70 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">Our Mission</p>
          <h2 className="text-4xl font-light text-[#1C1A17] lux-heading mb-6">Redefining What&apos;s Possible</h2>
          <p className="text-lg text-[#5F5448] leading-relaxed max-w-3xl mx-auto">
            We believe that buying or selling a prime property should feel as refined as the home itself.
            From the first conversation to completion, every touchpoint is curated &mdash; combining the
            discretion of a private bank with the intelligence of a world-class technology platform.
          </p>
        </ScrollReveal>
      </div>

      {/* Timeline */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">Our Story</p>
            <h2 className="text-4xl font-light text-white lux-heading text-center mb-16">A Brief History</h2>
          </ScrollReveal>
          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={item.year}>
                <div className={`md:flex items-start gap-12 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    <span className="text-[#C9A96A] text-5xl font-light lux-heading">{item.year}</span>
                    <h3 className="text-xl font-semibold text-white mt-2 mb-3">{item.title}</h3>
                    <p className="text-[#9A8B7A] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">Leadership</p>
          <h2 className="text-4xl font-light text-[#1C1A17] lux-heading text-center mb-16">Our Team</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <ScrollReveal key={member.name}>
              <div className="lux-card overflow-hidden group">
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={e => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1C1A17&color=C9A96A&size=400`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#1C1A17]">{member.name}</h3>
                  <p className="text-[#C9A96A] text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-[#5F5448] text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="bg-[#F0EBE3] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">Recognition</p>
            <h2 className="text-3xl font-light text-[#1C1A17] lux-heading text-center mb-10">Awards</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AWARDS.map(a => (
              <ScrollReveal key={a.title}>
                <div className="lux-card p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96A]/10 flex items-center justify-center shrink-0 text-xl">
                    🏆
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1A17] text-sm">{a.title}</p>
                    <p className="text-xs text-[#7A6E60]">{a.body} · {a.year}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Press */}
      <div className="bg-white py-12 border-y border-[#E8E1D7]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-center text-xs uppercase tracking-[0.5em] text-[#9A8B7A] mb-6">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {PRESS.map(p => (
              <span
                key={p.name}
                className="text-xl font-bold text-[#BBAD98] hover:text-[#1C1A17] transition-colors tracking-tight cursor-default"
              >
                {p.logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Offices */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">Where We Are</p>
          <h2 className="text-3xl font-light text-[#1C1A17] lux-heading text-center mb-10">Our Offices</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {OFFICES.map(o => (
            <ScrollReveal key={o.city}>
              <div className="lux-card p-4 text-center">
                <span className="text-3xl block mb-2">{o.flag}</span>
                <p className="font-semibold text-[#1C1A17] text-sm">{o.city}</p>
                <p className="text-xs text-[#9A8B7A] mt-1">{o.address}</p>
                <p className="text-xs text-[#C9A96A] mt-1">{o.phone}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-light text-white lux-heading mb-4">Let&apos;s Talk</h2>
            <p className="text-[#9A8B7A] mb-8 max-w-xl mx-auto">
              Whether you&apos;re buying, selling or investing &mdash; our team is available for a confidential conversation.
            </p>
            <Link href="/contact" className="lux-button">Get in Touch</Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
