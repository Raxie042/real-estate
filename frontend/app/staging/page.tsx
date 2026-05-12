'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Camera, Home, Star, Clock, ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';

const PACKAGES = [
  {
    name: 'Essential',
    price: '£450',
    tagline: 'First impressions matter',
    features: ['Professional photography (24 images)', 'Wide-angle & natural light editing', '48-hour turnaround', 'Online gallery & download link', 'Drone exterior shot (1 image)'],
    cta: 'Book Essential',
    popular: false,
  },
  {
    name: 'Premier',
    price: '£950',
    tagline: 'Maximum buyer impact',
    features: ['Professional photography (50+ images)', 'Twilight & lifestyle shoots', 'Drone aerial video (60 seconds)', 'Virtual staging for vacant rooms (3 rooms)', 'Floor plan diagram (2D)', '24-hour turnaround', 'Social media format cuts'],
    cta: 'Book Premier',
    popular: true,
  },
  {
    name: 'Grand',
    price: 'POA',
    tagline: 'For exceptional properties',
    features: ['Full editorial photography (unlimited)', 'Lifestyle & model shoot (4 hours)', '4K drone video with music', 'Virtual staging (all rooms)', 'Measured floor plans (2D + 3D)', '360° virtual tour', 'Press-ready image library', 'Dedicated creative director'],
    cta: 'Enquire',
    popular: false,
  },
];

const STAGING_SERVICES = [
  { icon: Home, title: 'Virtual Staging', desc: 'Digitally furnish vacant or poorly furnished rooms with luxury interior concepts. Delivered in 24 hours per image.' },
  { icon: Star, title: 'Physical Staging Consultation', desc: 'A certified home stager visits your property and provides a written action plan with furniture, decluttering and styling recommendations.' },
  { icon: Camera, title: 'Full Physical Staging', desc: 'We source, deliver and install premium furniture and décor to transform your home for the photoshoot and viewings. Hire period included.' },
  { icon: CheckCircle, title: 'Pre-Sale Deep Clean', desc: 'Professional deep clean prior to photography and viewings. Includes windows, kitchen, bathrooms and all surfaces.' },
];

const PARTNERS = [
  { name: 'Archer & Bell Photography', spec: 'Prime London Residential', turnaround: '24h', rating: 4.9 },
  { name: 'Viewpoint Aerial', spec: 'Drone & Aerial Video', turnaround: '48h', rating: 4.8 },
  { name: 'Spaces Styled', spec: 'Physical & Virtual Staging', turnaround: '72h', rating: 4.9 },
  { name: 'Blueprint Floor Plans', spec: 'Floor Plans & 3D Renders', turnaround: '48h', rating: 4.8 },
];

export default function StagingPage() {
  const [formType, setFormType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Seller Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Photography &amp; Staging</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Professional property photography, drone video, virtual staging and physical staging services — all coordinated through one team.</motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[#C9A96A] text-sm mt-4">Properties with professional photography sell for an average of 3.7% more and 50% faster.</motion.p>
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Packages</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Photography &amp; Staging Packages</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.1}>
              <div className={`lux-card p-6 flex flex-col h-full relative ${p.popular ? 'ring-2 ring-[#C9A96A]' : ''}`}>
                {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</span>}
                <p className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-1">{p.tagline}</p>
                <h3 className="font-serif text-2xl text-[#1C1A17] mb-1">{p.name}</h3>
                <p className="font-serif text-3xl text-[#C9A96A] mb-4">{p.price}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map(f => <li key={f} className="flex items-start gap-2 text-sm text-[#5F5448]"><CheckCircle size={13} className="text-emerald-600 mt-0.5 shrink-0" />{f}</li>)}
                </ul>
                <Link href="/contact" className={`w-full text-center py-2.5 rounded-xl text-sm font-semibold transition ${p.popular ? 'lux-button' : 'lux-button-outline'}`}>
                  {p.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Staging services */}
      <div className="bg-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <ScrollReveal className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Services</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">Staging &amp; Preparation Services</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STAGING_SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="lux-card p-5">
                  <s.icon size={18} className="text-[#C9A96A] mb-3" />
                  <h3 className="font-semibold text-[#1C1A17] mb-1.5">{s.title}</h3>
                  <p className="text-xs text-[#5F5448] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Partners</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Vetted Creative Partners</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {PARTNERS.map((p, i) => (
            <ScrollReveal key={p.name} delay={i * 0.08}>
              <div className="lux-card p-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-[#1C1A17] mb-0.5">{p.name}</h3>
                  <p className="text-xs text-[#C9A96A]">{p.spec}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <Star size={11} className="text-[#C9A96A] fill-[#C9A96A]" />
                    <span className="text-sm font-semibold">{p.rating}</span>
                  </div>
                  <p className="text-xs text-[#9A8B7A] flex items-center gap-0.5 justify-end"><Clock size={9} />{p.turnaround}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-14 px-4 text-center">
        <ScrollReveal>
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Ready to List?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Book Your Shoot</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our team will coordinate everything from scheduling to delivery. Most shoots can be arranged within 3 working days.</p>
          <Link href="/contact" className="lux-button">Book Now</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
