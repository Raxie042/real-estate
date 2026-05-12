'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Scale, Search, MapPin, Phone, Mail, Star, CheckCircle, Clock, ArrowRight } from 'lucide-react';

const FIRMS = [
  { id: 1, name: 'Carter Hawkins LLP', speciality: 'Prime Central London Residential', location: 'Mayfair, London', rating: 4.9, reviews: 312, avgCompletion: '8 weeks', priceRange: '£1,500–£4,000', phone: '+44 20 7000 1001', email: 'property@carterhawkins.com', accreditations: ['Law Society', 'CLC Licensed', 'Resolution Member'], focus: ['High Value Residential', 'Leasehold', 'Off-Plan', 'International Buyers'] },
  { id: 2, name: 'Aldgate Property Law', speciality: 'New Developments & Off-Plan', location: 'City of London', rating: 4.8, reviews: 228, avgCompletion: '10 weeks', priceRange: '£800–£2,500', phone: '+44 20 7000 1002', email: 'conveyancing@aldgateproperty.com', accreditations: ['Law Society', 'Lexcel Accredited'], focus: ['New Builds', 'Developer Completions', 'Buy-to-Let', 'Shared Ownership'] },
  { id: 3, name: 'Kensington Legal Partners', speciality: 'International Clients & Cross-Border', location: 'Kensington, London', rating: 4.9, reviews: 189, avgCompletion: '9 weeks', priceRange: '£2,000–£6,000', phone: '+44 20 7000 1003', email: 'property@kensingtonlegal.com', accreditations: ['Law Society', 'SRA Regulated', 'French Notaire Network'], focus: ['International Buyers', 'Foreign Mortgages', 'Trust Ownership', 'Tax Planning'] },
  { id: 4, name: 'McAlister Property Solicitors', speciality: 'Scotland — Edinburgh & Glasgow', location: 'Edinburgh, Scotland', rating: 4.7, reviews: 156, avgCompletion: '7 weeks', priceRange: '£900–£2,200', phone: '+44 131 000 1004', email: 'residential@mcalister.co.uk', accreditations: ['Law Society of Scotland', 'Conveyancing Excellence Award 2024'], focus: ['Scottish Property', 'Sasine & Land Register', 'Rural Property', 'Listed Buildings'] },
  { id: 5, name: 'Northgate Commercial & Residential', speciality: 'North of England & Investment Property', location: 'Manchester', rating: 4.8, reviews: 204, avgCompletion: '9 weeks', priceRange: '£600–£1,800', phone: '+44 161 000 1005', email: 'conveyancing@northgatelaw.com', accreditations: ['Law Society', 'Lexcel Accredited', 'CLC Licensed'], focus: ['Buy-to-Let Portfolio', 'Commercial Conversion', 'HMO Licensing', 'Northern England'] },
  { id: 6, name: 'Vance & Partners', speciality: 'London Leasehold & Service Charges', location: 'Westminster, London', rating: 4.9, reviews: 278, avgCompletion: '8 weeks', priceRange: '£1,200–£3,500', phone: '+44 20 7000 1006', email: 'leasehold@vancelaw.com', accreditations: ['Law Society', 'ARLA Propertymark'], focus: ['Leasehold Reform', 'Service Charge Disputes', 'Enfranchisement', 'Lease Extension'] },
];

export default function ConveyancingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpeciality, setActiveSpeciality] = useState('All');

  const specialities = ['All', 'High Value Residential', 'New Builds', 'International Buyers', 'Scotland', 'Buy-to-Let', 'Leasehold'];

  const filtered = FIRMS.filter(f => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.location.toLowerCase().includes(q) || f.speciality.toLowerCase().includes(q);
    const matchesSpec = activeSpeciality === 'All' || f.focus.some(fo => fo.toLowerCase().includes(activeSpeciality.toLowerCase()));
    return matchesSearch && matchesSpec;
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Legal Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Find a Solicitor</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">We introduce buyers and sellers to specialist property solicitors and conveyancers. All firms are Law Society accredited and vetted by our team.</motion.p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Important:</strong> Raxie Zenith Estate does not provide legal advice. We introduce clients to independent solicitors only. Always verify a solicitor&apos;s registration at <a href="https://solicitors.lawsociety.org.uk" className="underline" target="_blank" rel="noopener noreferrer">solicitors.lawsociety.org.uk</a> before instructing.
        </div>
      </div>

      {/* Search + filter */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]" />
            <input type="text" placeholder="Search by name or location..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} className="lux-input pl-9 w-full" />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {specialities.map(s => (
            <button key={s} onClick={() => setActiveSpeciality(s)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${activeSpeciality === s ? 'bg-[#C9A96A] text-[#1C1A17]' : 'bg-white border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Firms */}
        <div className="space-y-5">
          {filtered.map((firm, i) => (
            <ScrollReveal key={firm.id} delay={i * 0.06}>
              <div className="lux-card p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-[#1C1A17]">{firm.name}</h3>
                    <p className="text-xs text-[#C9A96A] uppercase tracking-widest mt-0.5">{firm.speciality}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={13} className="text-[#C9A96A] fill-[#C9A96A]" />
                      <span className="font-semibold text-[#1C1A17]">{firm.rating}</span>
                      <span className="text-xs text-[#9A8B7A]">({firm.reviews} reviews)</span>
                    </div>
                    <p className="text-xs text-[#7A6E60] flex items-center gap-1 justify-end mt-0.5"><MapPin size={10} />{firm.location}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs text-[#5F5448] mb-4">
                  <div className="flex items-center gap-1.5"><Clock size={12} className="text-[#C9A96A]" />Avg {firm.avgCompletion}</div>
                  <div className="flex items-center gap-1.5"><Scale size={12} className="text-[#C9A96A]" />{firm.priceRange}</div>
                  <div className="flex items-center gap-1.5"><CheckCircle size={12} className="text-emerald-600" />{firm.accreditations[0]}</div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {firm.focus.map(f => (
                    <span key={f} className="text-[10px] bg-[#F6F2EC] border border-[#E8E1D7] rounded-full px-2.5 py-0.5 text-[#5F5448]">{f}</span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-[#E8E1D7]">
                  <a href={`tel:${firm.phone}`} className="flex items-center gap-1.5 text-sm text-[#5F5448] hover:text-[#C9A96A] transition">
                    <Phone size={13} />{firm.phone}
                  </a>
                  <a href={`mailto:${firm.email}`} className="flex items-center gap-1.5 text-sm text-[#5F5448] hover:text-[#C9A96A] transition">
                    <Mail size={13} />{firm.email}
                  </a>
                  <div className="flex-1 flex justify-end">
                    <Link href="/contact" className="lux-button text-sm flex items-center gap-1">Get Introduction <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-[#9A8B7A]">No firms match your search. Try adjusting your filters.</div>
          )}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Not Sure Who to Choose?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Let Us Match You</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Tell us about your transaction and we&apos;ll personally introduce you to the most suitable firm for your needs and budget.</p>
          <Link href="/contact" className="lux-button">Get a Personal Introduction</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
