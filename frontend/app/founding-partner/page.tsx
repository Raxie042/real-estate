'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Globe, BarChart2, Megaphone, Users, Gem, CheckCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

const BENEFITS = [
  { icon: Star, title: 'Permanent Elite Status', body: 'Founding Partners are recognised forever on our platform. Your branding and ranking are preserved and promoted as we scale globally.' },
  { icon: Globe, title: 'International Reach', body: 'Your listings and profile are promoted across our international partner network from Dubai and Singapore to New York and Geneva.' },
  { icon: BarChart2, title: 'Premium Analytics', body: 'Founding Partners receive our full analytics suite at no additional charge including detailed buyer behaviour, campaign performance, and market benchmarking.' },
  { icon: Megaphone, title: 'Co-Marketing Investment', body: 'We invest in promoting Founding Partners directly in our national press, social campaigns and international roadshows.' },
  { icon: Users, title: 'Direct Product Input', body: 'A permanent seat at our quarterly Advisory Council. Your experience shapes the features, tools and direction of the platform.' },
  { icon: Gem, title: 'Preferred Commission Tier', body: 'Founding Partners are locked into our lowest commission rate, guaranteed for the lifetime of their partnership regardless of platform growth.' },
];

const TIERS = [
  {
    name: 'Platinum Founding Partner', isPlatinum: true,
    features: ['Top-of-platform billing in all search results', 'Exclusive Founding Partner badge', 'Dedicated account manager', 'Quarterly 1:1 strategy sessions with leadership', 'International syndication: 120 markets', 'Full analytics dashboard', 'Premium listing slots: 50/month', 'Priority off-market buyer mandate access', 'All press and client event invitations', 'Preferred commission rate, rate-locked for life'],
    slots: 5, remaining: 2,
  },
  {
    name: 'Gold Founding Partner', isPlatinum: false,
    features: ['Gold Founding Partner distinction', 'Priority placement in search results', 'Shared account management', 'Annual strategy review', 'International syndication: 40 markets', 'Standard analytics dashboard', 'Premium listing slots: 20/month', 'Buyer matching system access', 'Selected event access', 'Preferred commission rate'],
    slots: 12, remaining: 7,
  },
];

const CRITERIA = [
  'Minimum 3 years active in prime or super-prime residential sales',
  'Track record of GBP 10m or more in annual transaction volume',
  'No outstanding professional conduct investigations',
  'Strong client reviews and verifiable testimonials',
  'Commitment to our quality and discretion standards',
  'Membership of NAEA Propertymark, RICS or equivalent',
];

export default function FoundingPartnerPage() {
  const [form, setForm] = useState({ name: '', agency: '', email: '', phone: '', volume: '', tier: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#15120D] overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 border border-[#C9A96A]/40 text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-6 rounded-full">
            Invitation Only
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F4EFE8] mb-6 leading-tight">
            Founding Partner<br />Opportunity
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto mb-10">
            We are inviting a select group of the finest property professionals to help define the future of luxury real estate. Fewer than 17 positions remain.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#apply" className="lux-button px-8 py-3">Request Invitation</a>
            <a href="#tiers" className="lux-button-outline px-8 py-3">View Partnership Tiers</a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="font-serif text-2xl text-[#1C1A17] leading-relaxed mb-5">"We are not building another portal. We are building the private client platform that the prime market has always deserved."</p>
        <p className="text-sm text-[#7A6E60]">Raxie Zenith Estate, Founding Team</p>
      </div>

      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Exclusive Advantages</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">The Founding Partner Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map(b => (
              <div key={b.title} className="bg-[#252220] rounded-xl p-6">
                <b.icon className="w-7 h-7 text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#F4EFE8] mb-2">{b.title}</h3>
                <p className="text-sm text-[#9A8B7A] leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="tiers" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Partnership Levels</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Choose Your Tier</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Both tiers carry lifetime Founding Partner status. Once allocated, positions are closed permanently.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TIERS.map(t => (
            <div key={t.name} className="lux-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#C9A96A] text-[#1C1A17] flex items-center justify-center font-bold">{t.isPlatinum ? 'P' : 'G'}</div>
                <div>
                  <h3 className="font-serif text-xl text-[#1C1A17]">{t.name}</h3>
                  <p className="text-sm text-[#C9A96A]">{t.remaining} of {t.slots} remaining</p>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {t.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-[#5F5448]">
                    <CheckCircle className="w-4 h-4 text-[#C9A96A] shrink-0 mt-0.5" />{f}
                  </li>
                ))}
              </ul>
              <a href="#apply" className={`block w-full text-center py-3 rounded-lg font-medium text-sm transition-all ${
                t.isPlatinum ? 'bg-[#C9A96A] text-[#1C1A17] hover:bg-[#B89059]' : 'border border-[#C9A96A] text-[#C9A96A] hover:bg-[#C9A96A]/10'
              }`}>Apply for {t.isPlatinum ? 'Platinum' : 'Gold'} Tier</a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#F0EAE0] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Eligibility</p>
            <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Partner Criteria</h2>
          </div>
          <div className="space-y-3">
            {CRITERIA.map(c => (
              <div key={c} className="flex items-start gap-3 bg-white rounded-xl px-5 py-4">
                <CheckCircle className="w-5 h-5 text-[#C9A96A] shrink-0 mt-0.5" />
                <p className="text-[#1C1A17] text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#1C1A17] py-16 px-6 text-center">
        <p className="text-[#C9A96A] text-2xl font-serif italic mb-4 max-w-3xl mx-auto">"Joining as a Founding Partner has transformed how I reach international buyers. The platform intelligence and off-market access alone have been worth ten times the commitment."</p>
        <p className="font-semibold text-[#F4EFE8]">Victoria Harrington, MRICS</p>
        <p className="text-sm text-[#9A8B7A]">Platinum Founding Partner</p>
      </div>

      <div id="apply" className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Application</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Request an Invitation</h2>
          <p className="text-[#7A6E60]">All applications are reviewed in confidence. Our Partner Review Panel responds within 5 working days.</p>
        </div>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="lux-card p-8 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Full Name *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="lux-input w-full" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Agency / Company *</label>
                <input required value={form.agency} onChange={e => setForm({ ...form, agency: e.target.value })} className="lux-input w-full" placeholder="Your agency name" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Email Address *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="lux-input w-full" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="lux-input w-full" placeholder="+44 ..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Annual Transaction Volume</label>
              <select value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} className="lux-input w-full">
                <option value="">Please select</option>
                <option>GBP 10m to 25m</option>
                <option>GBP 25m to 50m</option>
                <option>GBP 50m to 100m</option>
                <option>GBP 100m+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Partnership Tier of Interest</label>
              <select value={form.tier} onChange={e => setForm({ ...form, tier: e.target.value })} className="lux-input w-full">
                <option value="">Please select</option>
                <option>Platinum Founding Partner</option>
                <option>Gold Founding Partner</option>
              </select>
            </div>
            <button type="submit" className="lux-button w-full py-3">Submit Application</button>
            <p className="text-xs text-[#7A6E60] text-center">Strictly confidential. Your information is never shared outside our Partner Review Panel.</p>
          </form>
        ) : (
          <div className="lux-card p-12 text-center">
            <div className="text-5xl mb-4">✦</div>
            <h3 className="font-serif text-2xl text-[#C9A96A] mb-3">Application Received</h3>
            <p className="text-[#5F5448] mb-6">Our Partner Review Panel will be in touch within 5 working days to discuss your application in complete confidence.</p>
            <Link href="/" className="lux-button px-8 py-3">Return Home</Link>
          </div>
        )}
      </div>

      <div className="bg-[#1C1A17] py-10 text-center">
        <p className="text-[#9A8B7A] mb-4">For a confidential conversation, contact our Partnership Director:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+442070000001" className="text-[#C9A96A] flex items-center justify-center gap-2 hover:opacity-80"><Phone className="w-4 h-4" /> +44 20 7000 0001</a>
          <a href="mailto:founders@raxiezenithestate.com" className="text-[#C9A96A] flex items-center justify-center gap-2 hover:opacity-80"><Mail className="w-4 h-4" /> founders@raxiezenithestate.com</a>
        </div>
      </div>
    </div>
  );
}
