'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';

const SERVICES = [
  {
    icon: '🏠',
    title: 'Residential Lettings',
    desc: 'Full lettings management for prime residential properties — tenant sourcing, referencing, move-in, rent collection and deposit protection.',
    features: ['Tenant sourcing & vetting', 'Deposit & tenancy registration', 'Rent collection', 'Annual rent reviews'],
  },
  {
    icon: '🏢',
    title: 'Block Management',
    desc: 'End-to-end management of apartment buildings and mixed-use blocks — service charge accounting, maintenance scheduling and residents\' meetings.',
    features: ['Service charge budgeting', 'Planned maintenance programmes', 'Emergency call-out 24/7', 'Leaseholder communication'],
  },
  {
    icon: '📊',
    title: 'Portfolio Management',
    desc: 'Strategic oversight of multi-property portfolios for private landlords and family offices — yield optimisation, compliance and performance reporting.',
    features: ['Portfolio performance dashboards', 'Yield optimisation strategy', 'Regulatory compliance', 'Quarterly reporting packs'],
  },
  {
    icon: '🔧',
    title: 'Maintenance & Refurbishment',
    desc: 'Trusted network of contractors for reactive and planned maintenance, interior refurbishment and pre-letting improvements.',
    features: ['24/7 emergency response', 'Approved contractor network', 'Refurbishment project management', 'Cost-transparent invoicing'],
  },
  {
    icon: '📋',
    title: 'Legal & Compliance',
    desc: 'Full UK compliance management: EPC certificates, gas safety, electrical inspections, HMO licensing and Right-to-Rent checks.',
    features: ['EPC & certificate renewals', 'Gas Safety Record management', 'EICR electrical inspections', 'HMO licensing support'],
  },
  {
    icon: '💰',
    title: 'Rental Valuation',
    desc: 'Accurate rental valuations for new instructions and tenancy renewals — backed by live market data and comparable evidence.',
    features: ['Free rental valuation', 'Market comparable analysis', 'Renewal negotiation', 'Void period minimisation'],
  },
];

const YIELDS = [
  { area: 'Mayfair', avgYield: '2.8%', avgRent: '£12,000 pcm', type: 'Prime PCL' },
  { area: 'Knightsbridge', avgYield: '2.6%', avgRent: '£10,500 pcm', type: 'Prime PCL' },
  { area: 'Chelsea', avgYield: '3.1%', avgRent: '£7,200 pcm', type: 'Prime PCL' },
  { area: 'Notting Hill', avgYield: '3.4%', avgRent: '£5,800 pcm', type: 'Prime London' },
  { area: 'Islington', avgYield: '4.2%', avgRent: '£3,600 pcm', type: 'Inner London' },
  { area: 'Canary Wharf', avgYield: '4.8%', avgRent: '£3,200 pcm', type: 'Inner London' },
];

export default function PropertyManagementPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>For Landlords</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>Property Management<br />Done Properly</motion.h1>
          <motion.p className="text-lg text-[#D9CBB7] max-w-2xl mx-auto leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>From single lettings to portfolio oversight — we manage your property investment so you don&apos;t have to think about it.</motion.p>
          <motion.div className="flex gap-4 justify-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/contact" className="lux-button">Get a Free Valuation</Link>
            <a href="tel:+442071234567" className="lux-button-outline">Speak to Our Team</a>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['2,400+','Properties Managed'],['98%','Rent Collection Rate'],['12 Days','Avg. Void Period'],['4.9★','Landlord Satisfaction']].map(([val,label]) => (
            <div key={label}><p className="text-3xl font-semibold text-[#1C1A17]">{val}</p><p className="text-xs uppercase tracking-widest text-[#1C1A17]/70 mt-1">{label}</p></div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal><p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3 text-center">What We Do</p><h2 className="text-4xl font-light text-[#1C1A17] lux-heading text-center mb-12">Our Services</h2></ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(s => (
            <ScrollReveal key={s.title}>
              <div className="lux-card p-6 h-full">
                <span className="text-3xl mb-4 block">{s.icon}</span>
                <h3 className="text-lg font-semibold text-[#1C1A17] mb-2">{s.title}</h3>
                <p className="text-[#5F5448] text-sm mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-1">
                  {s.features.map(f => <li key={f} className="text-xs text-[#7A6E60] flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] shrink-0" />{f}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Rental yields table */}
      <div className="bg-[#1C1A17] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal><h2 className="text-3xl font-light text-white lux-heading mb-10">Indicative Rental Yields — London</h2></ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/10"><th className="text-left pb-3 text-[#C9A96A]">Area</th><th className="text-left pb-3 text-[#C9A96A]">Type</th><th className="text-right pb-3 text-[#C9A96A]">Avg. Rent</th><th className="text-right pb-3 text-[#C9A96A]">Gross Yield</th></tr></thead>
              <tbody>
                {YIELDS.map(y => (
                  <tr key={y.area} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 text-white font-medium">{y.area}</td>
                    <td className="py-3 text-[#9A8B7A]">{y.type}</td>
                    <td className="py-3 text-right text-white">{y.avgRent}</td>
                    <td className="py-3 text-right text-[#C9A96A] font-semibold">{y.avgYield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#5F5448] mt-4">Yields are indicative only, based on Q1 2026 market data. Actual yields will vary by property, condition and tenancy.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-light text-[#1C1A17] lux-heading mb-4">Ready to Hand Over the Keys?</h2>
          <p className="text-[#5F5448] mb-8">Speak to our lettings team for a free, no-obligation rental valuation and management proposal.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="lux-button">Book a Valuation</Link>
            <Link href="/search?listingType=RENT" className="lux-button-outline">Browse Rentals</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
