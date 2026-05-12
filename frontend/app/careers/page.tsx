'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';

const VALUES = [
  { icon: '✦', title: 'Excellence Without Compromise', desc: 'We hold every interaction, every detail and every outcome to the highest standard.' },
  { icon: '◎', title: 'Client-First Thinking', desc: 'Every decision is filtered through one question: what is best for our client?' },
  { icon: '◈', title: 'Intellectual Curiosity', desc: 'We invest in our people. Continuous learning is part of the job, not extra credit.' },
  { icon: '◇', title: 'Discretion & Trust', desc: 'Our clients trust us with life-changing decisions. We honour that with absolute integrity.' },
];

const POSITIONS = [
  { title: 'Senior Residential Agent — PCL', location: 'Mayfair, London', type: 'Full-time', dept: 'Sales', desc: 'Drive prime Central London residential transactions. 5+ years PCL brokerage experience required.' },
  { title: 'International Sales Consultant', location: 'Dubai, UAE', type: 'Full-time', dept: 'Sales', desc: 'Handle cross-border mandates for GCC and international UHNW buyers. Arabic or Mandarin a strong advantage.' },
  { title: 'Product Manager — Listings Platform', location: 'London / Remote', type: 'Full-time', dept: 'Technology', desc: 'Own the core listings product: search, discovery and listing management flows.' },
  { title: 'Full-Stack Engineer', location: 'London / Remote', type: 'Full-time', dept: 'Technology', desc: 'NestJS backend, Next.js frontend. Build the features that set us apart from every other real estate platform.' },
  { title: 'Client Experience Associate', location: 'Singapore', type: 'Full-time', dept: 'Client Services', desc: 'Serve as first point of contact for Asia-Pacific clients. Mandarin or Cantonese essential.' },
  { title: 'Investor Relations Manager', location: 'London', type: 'Full-time', dept: 'Finance', desc: 'Work with HNW and institutional investors on portfolio strategy and deal introductions.' },
  { title: 'Digital Marketing Manager', location: 'London', type: 'Full-time', dept: 'Marketing', desc: 'Own paid and organic channels. Drive brand awareness across EU and MENA markets.' },
];

const DEPTS = ['All', 'Sales', 'Technology', 'Client Services', 'Finance', 'Marketing'];

export default function CareersPage() {
  const [dept, setDept] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', role: '', message: '' });
  const [sent, setSent] = useState(false);
  const filtered = dept === 'All' ? POSITIONS : POSITIONS.filter(p => p.dept === dept);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>Join Our Team</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>Build the Future of<br />Luxury Real Estate</motion.h1>
          <motion.p className="text-lg text-[#D9CBB7] max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.3 }}>We are a team of the best brokers, engineers and operators — united by an obsession with doing things properly.</motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <ScrollReveal><h2 className="text-4xl font-light text-[#1C1A17] lux-heading text-center mb-12">Our Values</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VALUES.map(v => (
            <ScrollReveal key={v.title}><div className="lux-card p-7 flex gap-5"><span className="text-[#C9A96A] text-2xl mt-1">{v.icon}</span><div><h3 className="text-lg font-semibold text-[#1C1A17] mb-2">{v.title}</h3><p className="text-[#5F5448] leading-relaxed">{v.desc}</p></div></div></ScrollReveal>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex gap-2 flex-wrap mb-8">
          {DEPTS.map(d => (
            <button key={d} onClick={() => setDept(d)} className={`px-4 py-2 text-sm rounded-full transition-colors ${dept === d ? 'bg-[#1C1A17] text-white' : 'bg-[#F0EBE3] text-[#5F5448] hover:bg-[#E8E1D7]'}`}>{d}</button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map(pos => (
            <ScrollReveal key={pos.title}><div className="lux-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs bg-[#C9A96A]/15 text-[#9A7A3A] rounded-full">{pos.dept}</span>
                    <span className="px-2 py-0.5 text-xs bg-[#F0EBE3] text-[#7A6E60] rounded-full">{pos.type}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1C1A17] mb-1">{pos.title}</h3>
                  <p className="text-sm text-[#C9A96A] mb-2">📍 {pos.location}</p>
                  <p className="text-[#5F5448] text-sm">{pos.desc}</p>
                </div>
                <a href="#apply" className="lux-button-outline text-sm whitespace-nowrap">Apply Now</a>
              </div>
            </div></ScrollReveal>
          ))}
        </div>
      </div>

      <div id="apply" className="bg-[#1C1A17] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal><h2 className="text-3xl font-light text-white lux-heading text-center mb-10">Apply Now</h2></ScrollReveal>
          {sent ? (
            <div className="lux-card p-10 text-center"><p className="text-2xl font-light text-[#1C1A17] mb-3">Application Received</p><p className="text-[#5F5448]">Our team will be in touch within 5 business days.</p></div>
          ) : (
            <form onSubmit={handleSubmit} className="lux-card p-8 space-y-5">
              <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Full Name *</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="lux-input w-full" placeholder="Your full name" /></div>
              <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Email Address *</label><input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="lux-input w-full" placeholder="your@email.com" /></div>
              <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Position of Interest</label><select value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="lux-input w-full"><option value="">Select a role...</option>{POSITIONS.map(p => <option key={p.title} value={p.title}>{p.title}</option>)}</select></div>
              <div><label className="block text-sm font-semibold text-[#1C1A17] mb-1">Cover Note *</label><textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="lux-input w-full h-32 resize-none" placeholder="Tell us about yourself and why you want to join..." /></div>
              <button type="submit" className="lux-button w-full">Submit Application</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
