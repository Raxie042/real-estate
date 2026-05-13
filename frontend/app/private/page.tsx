'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import dynamic from 'next/dynamic';
import { Lock, Eye, EyeOff, ChevronRight, MapPin, Bed, Bath, Maximize, Shield, Globe, TrendingUp, Users, Briefcase, Key, CheckCircle, FileText } from 'lucide-react';

const ESignatureModal = dynamic(() => import('@/components/ESignatureModal'), { ssr: false });
const WealthReferralSection = dynamic(() => import('@/components/WealthReferralSection'), { ssr: false });

const WEALTH_SERVICES = [
  { icon: Key, title: 'Private Acquisition', desc: 'Exclusive buy-side representation with access to properties never advertised publicly. We act solely in your interest.' },
  { icon: TrendingUp, title: 'Portfolio Strategy', desc: 'Holistic real estate portfolio structuring across multiple geographies, asset classes and holding vehicles.' },
  { icon: Globe, title: 'International Structuring', desc: 'Cross-border tax-efficient ownership structures in conjunction with leading international tax counsel.' },
  { icon: Briefcase, title: 'Family Office', desc: 'Dedicated relationship management for family offices and institutional investors. Single point of contact, 24/7.' },
  { icon: Shield, title: 'Discreet Sales', desc: 'Confidential disposal programme for vendors who wish to transact without public exposure or press speculation.' },
  { icon: Users, title: 'Introductions', desc: 'Curated introductions to private banks, finance houses, conveyancers and wealth managers aligned with your profile.' },
];

const COLLECTIONS = [
  {
    id: 'mayfair-penthouse',
    title: 'Mayfair Penthouse',
    location: 'Mayfair, London',
    bedrooms: 5,
    bathrooms: 5,
    sqft: 6200,
    price: null,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tag: 'Off-Market',
    brief: 'A crown-floor residence spanning the entirety of the top two floors, with private terrace and uninterrupted views over Hyde Park.',
  },
  {
    id: 'knightsbridge-townhouse',
    title: 'Knightsbridge Townhouse',
    location: 'Knightsbridge, London',
    bedrooms: 6,
    bathrooms: 6,
    sqft: 8100,
    price: null,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    tag: 'Discreet Sale',
    brief: 'A late-Victorian freehold townhouse, fully restored to the highest specification whilst retaining every original architectural detail.',
  },
  {
    id: 'chelsea-garden-house',
    title: 'Chelsea Garden Residence',
    location: 'Chelsea, London',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4800,
    price: null,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    tag: 'Off-Market',
    brief: 'An impeccably renovated garden house on one of Chelsea\'s most coveted private roads, with 80ft south-facing landscaped garden.',
  },
  {
    id: 'belgravia-apartment',
    title: 'Belgravia Grand Apartment',
    location: 'Belgravia, London',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    price: null,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    tag: 'Discreet Sale',
    brief: 'First-floor lateral apartment within a celebrated stucco-fronted mansion block, offering over 3,000 sq ft of sublime lateral living.',
  },
  {
    id: 'hampstead-estate',
    title: 'Hampstead Heath Estate',
    location: 'Hampstead, London',
    bedrooms: 7,
    bathrooms: 7,
    sqft: 12500,
    price: null,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    tag: 'Off-Market',
    brief: 'A landmark detached villa set within 1.5 acres on the Heath\'s most prestigious private road, available for the first time in 30 years.',
  },
  {
    id: 'notting-hill-house',
    title: 'Notting Hill Stucco Villa',
    location: 'Notting Hill, London',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 5400,
    price: null,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    tag: 'Discreet Sale',
    brief: 'A magnificent stucco-fronted villa on a prime garden square, combining grand Victorian proportions with a contemporary interior by a RIBA award-winning studio.',
  },
];

const NDA_TEXT = (
  <div className="space-y-3 text-sm text-[#5F5448] leading-relaxed">
    <p className="font-semibold text-[#1C1A17]">Private Collection — Confidentiality Agreement</p>
    <p>
      Access to Raxie Zenith Estate's Private Collection is extended exclusively to clients who have completed our vetting process and agreed to the following terms:
    </p>
    <ol className="list-decimal list-inside space-y-2 pl-2">
      <li>All property details, addresses, ownership information, and pricing disclosed within the Private Collection are strictly confidential.</li>
      <li>You will not share, reproduce, or discuss any information with any third party without express written consent.</li>
      <li>Enquiries are made in good faith for personal acquisition or portfolio purposes only.</li>
      <li>You acknowledge that properties in this collection are not publicly marketed and that their owners have a legitimate expectation of complete privacy.</li>
      <li>Breach of this agreement may result in legal action and permanent exclusion from our platform.</li>
      <li>This agreement is governed by English law and subject to the jurisdiction of the English courts.</li>
    </ol>
    <p className="text-xs text-[#9A8B7A]">
      Raxie Zenith Estate Ltd · Registered in England No. 12345678 · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
    </p>
  </div>
);

type AccessStep = 'form' | 'nda' | 'done';

function AccessGate({ onUnlock }: { onUnlock: () => void }) {
  const [step, setStep] = useState<AccessStep>('form');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    netWorth: '',
    budget: '',
    hearAbout: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('nda');
  };

  const handleSigned = () => {
    setStep('done');
    setTimeout(onUnlock, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-4 mb-10 text-xs">
        <div className={`flex items-center gap-1.5 ${step === 'form' ? 'text-[#1C1A17] font-semibold' : 'text-[#C9A96A]'}`}>
          {step !== 'form' ? <CheckCircle size={14} className="text-[#C9A96A]" /> : <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center text-[10px] font-bold">1</span>}
          Application
        </div>
        <div className="w-8 h-px bg-[#E8E1D7]" />
        <div className={`flex items-center gap-1.5 ${step === 'nda' ? 'text-[#1C1A17] font-semibold' : step === 'done' ? 'text-[#C9A96A]' : 'text-[#BBAD98]'}`}>
          {step === 'done' ? <CheckCircle size={14} className="text-[#C9A96A]" /> : <FileText size={14} />}
          Sign NDA
        </div>
        <div className="w-8 h-px bg-[#E8E1D7]" />
        <div className={`flex items-center gap-1.5 ${step === 'done' ? 'text-[#C9A96A] font-semibold' : 'text-[#BBAD98]'}`}>
          <Lock size={14} />
          Access Granted
        </div>
      </div>

      {step === 'form' && (
        <div className="lux-card p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C9A96A]/10 flex items-center justify-center mx-auto mb-4">
              <Lock size={22} className="text-[#C9A96A]" />
            </div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-2">Private Collection</p>
            <h2 className="text-2xl font-light text-[#1C1A17] lux-heading">Apply for Private Access</h2>
            <p className="text-[#7A6E60] text-sm mt-2 max-w-md mx-auto leading-relaxed">
              Complete your private client application. All information is treated with absolute discretion.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Full Legal Name *</label>
                <input required className="w-full lux-input" value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Email Address *</label>
                <input required type="email" className="w-full lux-input" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Phone Number</label>
                <input type="tel" className="w-full lux-input" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Nationality / Residence</label>
                <input className="w-full lux-input" placeholder="e.g. British, UAE Resident"
                  value={form.nationality} onChange={e => setForm(f => ({ ...f, nationality: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Approximate Net Worth *</label>
                <select required className="w-full lux-input" value={form.netWorth}
                  onChange={e => setForm(f => ({ ...f, netWorth: e.target.value }))}>
                  <option value="">Select range</option>
                  <option value="5m-10m">£5m – £10m</option>
                  <option value="10m-25m">£10m – £25m</option>
                  <option value="25m-50m">£25m – £50m</option>
                  <option value="50m-100m">£50m – £100m</option>
                  <option value="100m+">£100m+</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Property Budget *</label>
                <select required className="w-full lux-input" value={form.budget}
                  onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}>
                  <option value="">Select range</option>
                  <option value="2m-5m">£2m – £5m</option>
                  <option value="5m-10m">£5m – £10m</option>
                  <option value="10m-20m">£10m – £20m</option>
                  <option value="20m-50m">£20m – £50m</option>
                  <option value="50m+">£50m+</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-[#7A6E60] mb-1 block">How did you hear about us?</label>
              <select className="w-full lux-input" value={form.hearAbout}
                onChange={e => setForm(f => ({ ...f, hearAbout: e.target.value }))}>
                <option value="">Please select</option>
                <option value="referral">Client Referral</option>
                <option value="private-bank">Private Bank Introduction</option>
                <option value="family-office">Family Office</option>
                <option value="press">Press / Editorial</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="bg-[#F6F2EC] border border-[#E8E1D7] rounded-xl p-4 text-xs text-[#7A6E60] leading-relaxed">
              <Lock size={11} className="inline mr-1.5 text-[#C9A96A]" />
              Your application is reviewed by our Private Client team within one business day. All information is held under strict confidentiality.
            </div>

            <button type="submit" className="w-full lux-button flex items-center justify-center gap-2">
              Proceed to NDA <ChevronRight size={15} />
            </button>
          </form>
        </div>
      )}

      {step === 'done' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lux-card p-12 text-center"
        >
          <CheckCircle size={48} className="text-[#C9A96A] mx-auto mb-4" />
          <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-2">Access Granted</h3>
          <p className="text-[#7A6E60] text-sm">Your NDA has been signed. Unlocking the Private Collection…</p>
        </motion.div>
      )}

      {/* NDA modal */}
      <AnimatePresence>
        {step === 'nda' && (
          <ESignatureModal
            title="Private Collection NDA"
            agreementText={NDA_TEXT}
            onSign={handleSigned}
            onClose={() => setStep('form')}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PrivatePage() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/30 to-[#1C1A17]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 border border-[#C9A96A]/30 rounded-full px-4 py-1.5 mb-7">
              <Lock size={12} className="text-[#C9A96A]" />
              <span className="text-xs uppercase tracking-[0.4em] text-[#C9A96A]">Private &amp; Off-Market</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-5">The Private Collection</h1>
            <div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7" />
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
              Extraordinary properties whose owners value discretion as much as the right buyer.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Wealth Advisory Services — always visible */}
        <ScrollReveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] text-center mb-3">Private Client Services</p>
          <h2 className="font-serif text-3xl text-[#1C1A17] text-center mb-2">Beyond the Transaction</h2>
          <p className="text-[#7A6E60] text-center max-w-xl mx-auto mb-10">We act as a trusted adviser across every dimension of your property wealth — from first acquisition to multi-generational estate planning.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEALTH_SERVICES.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.07}>
                <div className="lux-card p-6 group hover:border-[#C9A96A]/50 transition-colors">
                  <s.icon size={22} className="text-[#C9A96A] mb-3" />
                  <h3 className="font-semibold text-[#1C1A17] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#5F5448] leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/contact" className="lux-button">Speak to a Private Client Adviser</Link>
          </div>
        </ScrollReveal>

        <hr className="border-[#E8E1D7] mb-14" />
        <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] text-center mb-8">Off-Market Collection</p>

        {!unlocked ? (
          <AccessGate onUnlock={() => setUnlocked(true)} />
        ) : (
          <>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <EyeOff size={16} className="text-[#C9A96A]" />
                <p className="text-sm text-[#9A8B7A]">{COLLECTIONS.length} properties — visible to authorised clients only</p>
                <div className="flex-1 h-px bg-[#E8E1D7]" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
              {COLLECTIONS.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.07}>
                  <div className="lux-card overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-3 left-3">
                        <span className="lux-badge bg-black/60 text-white border-white/20 flex items-center gap-1.5">
                          <Lock size={10} /> {p.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-[#C9A96A] font-semibold lux-heading text-lg mb-1 price-poa">Price on Application</p>
                      <h3 className="font-medium text-[#1C1A17] text-lg mb-1">{p.title}</h3>
                      <p className="text-sm text-[#9A8B7A] flex items-center gap-1 mb-3">
                        <MapPin size={12} /> {p.location}
                      </p>
                      <p className="text-sm text-[#5F5448] leading-relaxed mb-4">{p.brief}</p>
                      <div className="flex items-center gap-4 text-xs text-[#9A8B7A] border-t border-[#F0EAE0] pt-4 mb-4">
                        <span className="flex items-center gap-1"><Bed size={13} /> {p.bedrooms} bed</span>
                        <span className="flex items-center gap-1"><Bath size={13} /> {p.bathrooms} bath</span>
                        <span className="flex items-center gap-1"><Maximize size={13} /> {p.sqft.toLocaleString()} sq ft</span>
                      </div>
                      <Link href="/contact" className="lux-button-outline w-full text-center block text-sm">
                        Request Details
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.1}>
              <div className="mt-14 bg-[#1C1A17] rounded-2xl p-10 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Bespoke Search</p>
                <h3 className="text-3xl font-light text-white lux-heading mb-4">Can't find what you're looking for?</h3>
                <p className="text-white/50 font-light mb-7 max-w-xl mx-auto">
                  Our acquisition team maintains relationships with owners across all of London's prime postcodes. Tell us your brief and we'll source off-market opportunities on your behalf.
                </p>
                <Link href="/contact" className="lux-button inline-flex items-center gap-2">
                  Submit Your Brief <ChevronRight size={16} />
                </Link>
              </div>
            </ScrollReveal>
          </>
        )}
      </div>

      {/* Wealth Management Referral */}
      <WealthReferralSection
        title="Finance Your Acquisition"
        subtitle="We work with London's most prestigious private banks to structure financing for clients acquiring property of this calibre."
      />
    </div>
  );
}
