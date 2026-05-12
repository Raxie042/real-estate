'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Phone, Clock, Globe, Home, Car, Plane, Wine, Sparkles, ArrowRight } from 'lucide-react';

const SERVICES = [
  { icon: Home, title: 'Property Preparation', desc: 'Interior styling, deep cleaning, maintenance coordination, and pre-move logistics managed end-to-end so you focus on what matters.' },
  { icon: Plane, title: 'International Arrivals', desc: 'Airport collection, hotel coordination, and immediate property access for international clients moving to a new city.' },
  { icon: Car, title: 'Transport & Lifestyle', desc: 'Private car hire, chauffeur introductions, vehicle delivery to your new address, and parking permits arranged.' },
  { icon: Globe, title: 'Utility & Services Setup', desc: 'Broadband, utilities, council tax registration, TV licensing, and insurance all set up before your first night.' },
  { icon: Wine, title: 'Domestic Staffing', desc: 'Vetted introductions to housekeepers, chefs, gardeners, and security personnel — all background-checked.' },
  { icon: Sparkles, title: 'Ongoing Management', desc: 'Property monitoring, key holding, contractor management, and 24-hour emergency response for 90 days after move-in.' },
];

const PACKAGES = [
  {
    name: 'Essentials',
    price: '£1,200',
    sub: 'one-time',
    items: ['Utility setup', 'Council tax registration', 'Broadband coordination', 'Welcome home pack', '1 week key holding'],
    highlight: false,
  },
  {
    name: 'Premier',
    price: '£3,500',
    sub: 'one-time',
    items: ['Everything in Essentials', 'Domestic staff introductions', 'Airport collection', 'Interior preparation', 'Vehicle logistics', '90 day property monitoring'],
    highlight: true,
  },
  {
    name: 'Grand',
    price: 'POA',
    sub: 'bespoke',
    items: ['Everything in Premier', 'Dedicated concierge for 6 months', 'Chef & security introductions', 'Full relocation management', 'International coordination', '24-hr emergency line'],
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: 'Khalid Al-Rashidi', location: 'Relocated: Dubai → London', quote: 'From airport arrival to our first dinner at home — everything was arranged. We never once had to worry about a single logistical detail.' },
  { name: 'Isabelle Fontaine', location: 'Relocated: Paris → London', quote: 'The domestic staff introductions alone were worth the service. Our housekeeper is exceptional and came with full references within 48 hours.' },
];

export default function ConciergePage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">White-Glove Service</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Concierge Services</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-xl mx-auto">We turn the complexity of moving into a seamless experience. From the moment you exchange contracts, we are at your service.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 justify-center mt-8">
            <Link href="/contact" className="lux-button">Enquire Now</Link>
            <Link href="#packages" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">View Packages</Link>
          </motion.div>
        </div>
      </div>

      {/* 24/7 banner */}
      <div className="bg-[#C9A96A] py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 text-[#1C1A17] text-sm font-medium">
          <span className="flex items-center gap-2"><Clock size={14} /> 24/7 emergency line</span>
          <span className="flex items-center gap-2"><Phone size={14} /> Dedicated account manager</span>
          <span className="flex items-center gap-2"><Globe size={14} /> Available in 12 cities worldwide</span>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">What We Do</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Every Detail, Handled</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className="lux-card p-6">
                <s.icon size={22} className="text-[#C9A96A] mb-3" />
                <h3 className="font-semibold text-[#1C1A17] mb-2">{s.title}</h3>
                <p className="text-sm text-[#5F5448] leading-relaxed">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div id="packages" className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Packages</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">Choose Your Level of Service</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.1}>
                <div className={`rounded-2xl p-7 h-full flex flex-col ${pkg.highlight ? 'bg-[#1C1A17] text-white' : 'bg-[#F6F2EC] border border-[#E8E1D7]'}`}>
                  {pkg.highlight && <span className="text-[10px] uppercase tracking-widest text-[#C9A96A] mb-2">Most Popular</span>}
                  <h3 className={`font-serif text-2xl mb-1 ${pkg.highlight ? 'text-[#F6F2EC]' : 'text-[#1C1A17]'}`}>{pkg.name}</h3>
                  <p className={`text-3xl font-semibold mb-1 ${pkg.highlight ? 'text-[#C9A96A]' : 'text-[#1C1A17]'}`}>{pkg.price}</p>
                  <p className={`text-xs mb-5 ${pkg.highlight ? 'text-[#B9AA98]' : 'text-[#9A8B7A]'}`}>{pkg.sub}</p>
                  <ul className="space-y-2 mb-8 flex-1">
                    {pkg.items.map(item => (
                      <li key={item} className={`flex items-start gap-2 text-sm ${pkg.highlight ? 'text-[#B9AA98]' : 'text-[#5F5448]'}`}>
                        <ArrowRight size={13} className={`mt-0.5 shrink-0 ${pkg.highlight ? 'text-[#C9A96A]' : 'text-[#C9A96A]'}`} />{item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact"
                    className={pkg.highlight ? 'lux-button text-center block' : 'lux-button-outline text-center block text-sm'}>
                    Get Started
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <ScrollReveal className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Client Stories</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Words From Our Clients</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="lux-card p-7">
                <p className="text-[#5F5448] leading-relaxed italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                <p className="font-semibold text-[#1C1A17] text-sm">{t.name}</p>
                <p className="text-xs text-[#9A8B7A]">{t.location}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-16 text-center px-4">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Ready to Begin?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Let Us Handle Everything</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Contact us today and a concierge manager will be in touch within 4 working hours to discuss your requirements.</p>
          <Link href="/contact" className="lux-button">Speak to a Concierge Manager</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
