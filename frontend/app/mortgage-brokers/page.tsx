'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Search, MapPin, Star, Phone, Mail, Clock, CheckCircle, Globe, ArrowRight } from 'lucide-react';

const BROKERS = [
  { id: 1, name: 'Corinthia Private Finance', speciality: 'Prime Central London & International', location: 'Mayfair, London', rating: 4.9, reviews: 284, avgTime: '48 hours', minLoan: '£500k', maxLTV: '85%', phone: '+44 20 7000 2001', email: 'mortgages@corinthia.finance', accreditations: ['FCA Regulated', 'Whole-of-Market', 'Private Banking Network'], focus: ['High Value UK', 'International Buyers', 'Foreign Currency Income', 'Portfolio Landlords'], international: true },
  { id: 2, name: 'Latitude Mortgage Advisory', speciality: 'Expat & International Mortgages', location: 'City of London', rating: 4.8, reviews: 196, avgTime: '72 hours', minLoan: '£250k', maxLTV: '80%', phone: '+44 20 7000 2002', email: 'advisory@latitudemortgage.com', accreditations: ['FCA Regulated', 'Whole-of-Market', 'AIPP Member'], focus: ['Expat Mortgages', 'UAE Property Finance', 'Portugal', 'Singapore Buyers'], international: true },
  { id: 3, name: 'Westminster Lending Partners', speciality: 'New Developments & Off-Plan Finance', location: 'Westminster, London', rating: 4.9, reviews: 312, avgTime: '24 hours', minLoan: '£300k', maxLTV: '90%', phone: '+44 20 7000 2003', email: 'lending@westminster-lp.com', accreditations: ['FCA Regulated', 'Chartered MCSI'], focus: ['New Builds', 'Off-Plan Finance', 'Help to Buy Successor', 'Buy-to-Let'], international: false },
  { id: 4, name: 'Strathmore Wealth Finance', speciality: 'Scotland & Rural Estates', location: 'Edinburgh', rating: 4.7, reviews: 148, avgTime: '48 hours', minLoan: '£200k', maxLTV: '80%', phone: '+44 131 000 2004', email: 'mortgages@strathmore-finance.co.uk', accreditations: ['FCA Regulated', 'Law Society of Scotland Network'], focus: ['Scottish Properties', 'Rural Estates', 'Listed Buildings', 'Agricultural'], international: false },
  { id: 5, name: 'Arc Bridging & Development Finance', speciality: 'Bridging, Development & Refurbishment', location: 'London & Manchester', rating: 4.8, reviews: 229, avgTime: '24 hours', minLoan: '£100k', maxLTV: '75%', phone: '+44 20 7000 2005', email: 'deals@arcfinance.co.uk', accreditations: ['FCA Regulated', 'NACFB Member'], focus: ['Bridging Finance', 'Development Finance', 'HMO Refurbishment', 'Auction Finance'], international: false },
  { id: 6, name: 'Meridian International Mortgages', speciality: 'UAE, Portugal, France & Singapore', location: 'London (International Desk)', rating: 4.9, reviews: 167, avgTime: '72 hours', minLoan: '£500k', maxLTV: '70%', phone: '+44 20 7000 2006', email: 'international@meridianmortgages.com', accreditations: ['FCA Regulated', 'Cross-Border Finance Specialist', 'AIPP Member'], focus: ['UAE Finance', 'Portugal NHR Tax', 'French Mortgages', 'Singapore PR Finance'], international: true },
];

export default function MortgageBrokersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [internationalOnly, setInternationalOnly] = useState(false);
  const [activeSpeciality, setActiveSpeciality] = useState('All');

  const specialities = ['All', 'High Value UK', 'International', 'Buy-to-Let', 'New Builds', 'Bridging', 'Scotland'];

  const filtered = BROKERS.filter(b => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || b.name.toLowerCase().includes(q) || b.location.toLowerCase().includes(q) || b.speciality.toLowerCase().includes(q);
    const matchIntl = !internationalOnly || b.international;
    const matchSpec = activeSpeciality === 'All' || b.focus.some(f => f.toLowerCase().includes(activeSpeciality.toLowerCase())) || (activeSpeciality === 'International' && b.international);
    return matchSearch && matchIntl && matchSpec;
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Mortgage Finance</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Find a Mortgage Broker</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Specialist whole-of-market brokers for high-value UK and international property purchases. FCA regulated and independently vetted.</motion.p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Important:</strong> Raxie Zenith Estate introduces clients to independent FCA-regulated mortgage brokers only. We do not provide financial advice. Your home may be repossessed if you do not keep up repayments on a mortgage.
        </div>
      </div>

      {/* Search + filter */}
      <div className="max-w-5xl mx-auto px-4 pb-5">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]" />
            <input type="text" placeholder="Search by name, location or speciality..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} className="lux-input pl-9 w-full" />
          </div>
          <label className="flex items-center gap-2 px-4 bg-white border border-[#E8E1D7] rounded-xl cursor-pointer hover:border-[#C9A96A] transition text-sm text-[#5F5448]">
            <input type="checkbox" checked={internationalOnly} onChange={e => setInternationalOnly(e.target.checked)} className="accent-[#C9A96A]" />
            International only
          </label>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {specialities.map(s => (
            <button key={s} onClick={() => setActiveSpeciality(s)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${activeSpeciality === s ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {filtered.map((b, i) => (
            <ScrollReveal key={b.id} delay={i * 0.06}>
              <div className="lux-card p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-xl text-[#1C1A17]">{b.name}</h3>
                      {b.international && <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-2 py-0.5 flex items-center gap-1"><Globe size={9} />International</span>}
                    </div>
                    <p className="text-xs text-[#C9A96A] uppercase tracking-widest mt-0.5">{b.speciality}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={13} className="text-[#C9A96A] fill-[#C9A96A]" />
                      <span className="font-semibold text-[#1C1A17]">{b.rating}</span>
                      <span className="text-xs text-[#9A8B7A]">({b.reviews})</span>
                    </div>
                    <p className="text-xs text-[#7A6E60] flex items-center gap-1 justify-end mt-0.5"><MapPin size={10} />{b.location}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs text-[#5F5448] mb-4">
                  <div className="flex items-center gap-1.5"><Clock size={12} className="text-[#C9A96A]" />DIP in {b.avgTime}</div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" />Min loan {b.minLoan}</div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" />Up to {b.maxLTV} LTV</div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {b.focus.map(f => <span key={f} className="text-[10px] bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-2.5 py-0.5 text-[#5F5448]">{f}</span>)}
                  {b.accreditations.map(a => <span key={a} className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-2.5 py-0.5">{a}</span>)}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E8E1D7]">
                  <a href={`tel:${b.phone}`} className="flex items-center gap-1.5 text-sm text-[#5F5448] hover:text-[#C9A96A] transition"><Phone size={13} />{b.phone}</a>
                  <a href={`mailto:${b.email}`} className="flex items-center gap-1.5 text-sm text-[#5F5448] hover:text-[#C9A96A] transition"><Mail size={13} />{b.email}</a>
                  <div className="flex-1 flex justify-end">
                    <Link href="/contact" className="lux-button text-sm flex items-center gap-1">Get Introduction <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          {filtered.length === 0 && <div className="text-center py-12 text-[#9A8B7A]">No brokers match your search.</div>}
        </div>

        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Not Sure?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Let Us Match You</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Tell us your purchase price, location, and income structure and we&apos;ll personally introduce you to the best-fit broker.</p>
          <Link href="/contact" className="lux-button">Get a Personal Introduction</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
