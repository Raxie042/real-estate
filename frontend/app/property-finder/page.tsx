'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, User, MapPin, Home, Star, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const HOW_IT_WORKS = [
  { n: '01', icon: User, title: 'Tell Us Your Vision', desc: 'Complete our detailed brief — location, lifestyle, must-haves, budget, timeline. The more we know, the better we match.' },
  { n: '02', icon: Search, title: 'We Search Everywhere', desc: 'Your dedicated property finder accesses our full off-market network, agent relationships, private databases and developer pipeline.' },
  { n: '03', icon: Home, title: 'Curated Shortlist', desc: 'We present you with a personally curated shortlist of properties that meet your criteria — typically within 7 days.' },
  { n: '04', icon: Star, title: 'Private Viewings', desc: 'We arrange and accompany you to every viewing, providing expert commentary on value, condition and potential.' },
  { n: '05', icon: CheckCircle, title: 'Negotiation & Due Diligence', desc: 'We negotiate on your behalf, co-ordinate surveys, legal searches and financing to ensure a smooth transaction.' },
  { n: '06', icon: Clock, title: 'Completion & Beyond', desc: 'We stay with you through exchange and completion, then remain available for any post-purchase needs.' },
];

const TESTIMONIALS = [
  {
    quote: "We gave Raxie a brief in January and were in our perfect Mayfair home by April. We saw only four properties — every single one was genuinely right. That's extraordinary.",
    name: 'Lord & Lady Ashmore',
    sub: 'Mayfair townhouse, £14.5m',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    quote: "I was relocating from Singapore and couldn't be in London to view. Their finder service handled everything remotely. I flew in, saw two properties, and bought the first one.",
    name: 'David Koh',
    sub: 'Canary Wharf penthouse, £3.8m',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    quote: "The off-market access is real. The Belgravia house we bought had never been listed publicly. It was introduced to us three days after we registered.",
    name: 'Victoria P.',
    sub: 'Belgravia, £9.2m',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
];

const STATS = [
  { value: '73%', label: 'Off-Market Sourced', sub: 'of properties we find are never publicly listed' },
  { value: '7 days', label: 'Average to Shortlist', sub: 'from brief to curated selection' },
  { value: '94%', label: 'Client Satisfaction', sub: 'purchased within the shortlist' },
  { value: '4,800+', label: 'Private Contacts', sub: 'in our agent & developer network' },
];

const BRIEFS = [
  { label: 'Under £2m', value: 'under-2m' },
  { label: '£2m – £5m', value: '2m-5m' },
  { label: '£5m – £10m', value: '5m-10m' },
  { label: '£10m – £20m', value: '10m-20m' },
  { label: '£20m+', value: '20m-plus' },
];

export default function PropertyFinderPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', budget: '', locations: '', bedrooms: '', brief: '', submitted: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm(f => ({ ...f, submitted: true }));
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative min-h-[75vh] flex items-center overflow-hidden bg-[#1C1A17]">
        <Image src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" alt="Bespoke property finding" fill className="object-cover opacity-25" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Bespoke Property Finding</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
              We Find the<br />Properties Others<br />Can't
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="text-[#B9AA98] text-lg mb-8 leading-relaxed">
              Our dedicated property finders have access to an exclusive network of off-market homes, private sellers and developer releases that never appear on the open market. We work solely for you.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-3 flex-wrap">
              <Link href="#brief" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors">
                Submit Your Brief
              </Link>
              <Link href="tel:+442070000000" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors">
                Call Us Now
              </Link>
            </motion.div>
          </div>

          {/* Mini stats panel */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-[#252220]/80 backdrop-blur-sm border border-[#3A3530] rounded-2xl p-8 space-y-6">
            {STATS.map(s => (
              <div key={s.label} className="flex gap-4 items-start">
                <p className="font-serif text-3xl text-[#C9A96A] font-bold w-24 flex-shrink-0">{s.value}</p>
                <div>
                  <p className="text-[#F4EFE8] font-semibold">{s.label}</p>
                  <p className="text-[#9A8B7A] text-sm">{s.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">The Process</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">How Our Property Finder Works</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">A white-glove search service from first brief to handed keys. Every step is handled by a senior property professional — not a junior negotiator.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 0.07}>
              <div className="lux-card p-8 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="font-serif text-4xl text-[#C9A96A] font-bold leading-none">{step.n}</span>
                  <step.icon size={22} className="text-[#C9A96A] mt-2 flex-shrink-0" />
                </div>
                <h3 className="text-[#1C1A17] font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#7A6E60] text-sm leading-relaxed">{step.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Off-market access */}
      <section className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <ScrollReveal delay={0.1} className="flex-1">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" alt="Off-market access" fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-[#C9A96A] text-[#1C1A17] text-xs font-bold uppercase tracking-widest px-3 py-1.5">Off-Market Access</div>
            </div>
          </ScrollReveal>
          <ScrollReveal className="flex-1">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Exclusive Access</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] mb-6">The Market Behind the Market</h2>
            <p className="text-[#B9AA98] mb-6 leading-relaxed">The finest properties in London rarely appear publicly. Owners of prime real estate often prefer the privacy of a quiet transaction — no strangers visiting, no public price records, no negotiation theatre. Our relationships, built over decades, give us access to this hidden inventory.</p>
            <ul className="space-y-3 mb-8">
              {[
                'Direct seller relationships in Mayfair, Belgravia, Kensington and beyond',
                'Early access to new-build releases before public launch',
                'Developer partnerships for penthouse and lateral apartment reservations',
                'Agent-to-agent network covering over 380 prime London offices',
                'International off-market connections in Dubai, New York, Monaco, Geneva',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-[#B9AA98] text-sm">
                  <ChevronRight size={14} className="text-[#C9A96A] mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Client Stories</p>
          <h2 className="font-serif text-4xl text-[#1C1A17]">Found. Bought. Loved.</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="lux-card p-8 h-full flex flex-col">
                <p className="text-[#5F5448] italic text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <Image src={t.image} alt={t.name} width={44} height={44} className="rounded-full object-cover" />
                  <div>
                    <p className="text-[#1C1A17] font-semibold text-sm">{t.name}</p>
                    <p className="text-[#9A8B7A] text-xs">{t.sub}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Submit brief form */}
      <section id="brief" className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Start Your Search</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Submit Your Property Brief</h2>
            <p className="text-[#B9AA98]">Tell us about your ideal home. A senior property finder will respond within 24 hours.</p>
          </ScrollReveal>

          {form.submitted ? (
            <ScrollReveal className="text-center py-16 bg-[#252220] rounded-2xl border border-[#3A3530]">
              <div className="w-16 h-16 rounded-full bg-[#C9A96A]/20 border border-[#C9A96A] flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={30} className="text-[#C9A96A]" />
              </div>
              <h3 className="font-serif text-2xl text-[#F4EFE8] mb-3">Brief Received</h3>
              <p className="text-[#9A8B7A] max-w-sm mx-auto">Your dedicated property finder will contact you within 24 hours to discuss your requirements in detail.</p>
            </ScrollReveal>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 bg-[#252220] rounded-2xl border border-[#3A3530] p-10">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors" placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Phone Number</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors" placeholder="+44 ..." />
                </div>
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Budget Range *</label>
                  <select required value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors">
                    <option value="">Select budget</option>
                    {BRIEFS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Preferred Locations</label>
                  <input value={form.locations} onChange={e => setForm(f => ({ ...f, locations: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors" placeholder="e.g. Mayfair, Chelsea, Kensington" />
                </div>
                <div>
                  <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Minimum Bedrooms</label>
                  <select value={form.bedrooms} onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))}
                    className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors">
                    <option value="">Any</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}+ bedrooms</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[#B9AA98] text-xs uppercase tracking-wider mb-2">Tell Us More About Your Requirements</label>
                <textarea rows={5} value={form.brief} onChange={e => setForm(f => ({ ...f, brief: e.target.value }))}
                  className="w-full bg-[#1C1A17] border border-[#3A3530] text-[#F4EFE8] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96A] transition-colors resize-none"
                  placeholder="Describe your ideal home — style, must-haves, lifestyle requirements, timeline, any specific streets or buildings..." />
              </div>
              <button type="submit" className="w-full bg-[#C9A96A] text-[#1C1A17] py-4 font-semibold tracking-widest uppercase text-sm hover:bg-[#B8935A] transition-colors">
                Submit My Brief
              </button>
              <p className="text-[#9A8B7A] text-xs text-center">Your brief is handled in strict confidence. We never share client information.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
