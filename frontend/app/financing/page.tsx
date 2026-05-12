'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Shield, TrendingUp, Globe, Phone, ArrowRight, Check, Lock } from 'lucide-react';

const SERVICES = [
  {
    icon: TrendingUp,
    title: 'Acquisition Finance',
    desc: 'Bespoke mortgage solutions for prime and super-prime residential properties. We work with private banks and specialist lenders to structure facilities that standard high-street products cannot match.',
    points: ['Loans from £500,000 to £50M+', 'Interest-only & capital-repayment', 'Multi-currency lending', 'Non-standard income accepted'],
  },
  {
    icon: Globe,
    title: 'International Finance',
    desc: 'Cross-border property finance for non-UK residents, expatriates and foreign nationals acquiring property in the UK, UAE, Portugal and Spain.',
    points: ['Expat mortgages from 70% LTV', 'Non-domicile structures', 'Foreign currency income', 'Simultaneous multi-jurisdiction'],
  },
  {
    icon: Shield,
    title: 'Private Banking Introductions',
    desc: 'We maintain relationships with the private banking arms of leading institutions. We make introductions on your behalf, with full discretion.',
    points: ['Coutts, Barclays Wealth, UBS', 'Julius Bär, Credit Suisse', 'Arbuthnot Latham', 'Personalised relationship managers'],
  },
  {
    icon: Lock,
    title: 'Structuring & Tax Planning',
    desc: 'Working alongside your advisors or our trusted network, we ensure your acquisition is structured optimally for both UK and international tax purposes.',
    points: ['SPV / Ltd company purchase', 'Trust & family office structures', 'SDLT planning', 'Inheritance tax mitigation'],
  },
];

const LENDERS = [
  { name: 'Coutts', logo: '🏦', type: 'Private Bank' },
  { name: 'Barclays Wealth', logo: '💼', type: 'Private Bank' },
  { name: 'Investec', logo: '📊', type: 'Specialist Lender' },
  { name: 'Arbuthnot Latham', logo: '🏛️', type: 'Private Bank' },
  { name: 'Metro Bank Private', logo: '🏢', type: 'Specialist Lender' },
  { name: 'Atom Bank', logo: '⚡', type: 'Specialist Lender' },
];

const FAQS = [
  {
    q: 'What is the minimum loan size you can arrange?',
    a: 'Our specialist finance team can arrange mortgages and bridging loans from £250,000. For sub-£250k requirements, we recommend speaking with a standard high-street IFA.',
  },
  {
    q: 'Can you help if I have complex income?',
    a: 'Absolutely. We specialise in clients with non-standard income: bonuses, commission, dividends, foreign income, contractor day rates and business owners. Our lender relationships extend well beyond automated underwriting.',
  },
  {
    q: 'How quickly can bridging finance be arranged?',
    a: 'In straightforward cases, a decision in principle can be issued within 24–48 hours, with funds available in as little as 5–7 working days. Complex transactions typically complete in 2–4 weeks.',
  },
  {
    q: 'Do you charge for the initial consultation?',
    a: 'No. Our initial consultation and indicative terms are entirely complimentary. Fees are only charged upon successful completion of a facility.',
  },
  {
    q: 'Can you assist with purchase through a limited company or SPV?',
    a: 'Yes. We routinely arrange finance for special purpose vehicles, limited companies and trust structures, including for portfolio landlords subject to PRA rules.',
  },
];

export default function FinancingPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            Private Finance
          </motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}>
            Property Finance & Wealth
          </motion.h1>
          <motion.div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.35 }} />
          <motion.p className="text-lg text-white/60 font-light max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Bespoke finance solutions for prime property acquisitions — from private bank introductions to complex cross-border structures.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4 mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <Link href="/contact" className="lux-button inline-flex items-center gap-2">Speak to an Advisor <ArrowRight size={16} /></Link>
            <a href="tel:+442071234567" className="lux-button-outline border-white/20 text-white hover:bg-white/10 inline-flex items-center gap-2">
              <Phone size={16} /> +44 20 7123 4567
            </a>
          </motion.div>
        </div>
      </div>

      {/* Services grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-3">Our Services</p>
            <h2 className="text-4xl font-light text-[#1C1A17] lux-heading">Financing Solutions</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="lux-card p-8 h-full">
                <div className="w-12 h-12 bg-[#FBF7F0] rounded-full flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-[#C9A96A]" />
                </div>
                <h3 className="text-xl font-medium text-[#1C1A17] lux-heading mb-3">{s.title}</h3>
                <p className="text-[#7A6E60] font-light leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#5F5448]">
                      <Check size={13} className="text-[#C9A96A] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lender panel */}
        <ScrollReveal>
          <div className="bg-[#1C1A17] rounded-2xl p-10 mb-20">
            <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2 text-center">Our Panel</p>
            <h2 className="text-3xl font-light text-white lux-heading mb-10 text-center">Lender Relationships</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {LENDERS.map((l, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-5 text-center hover:bg-white/10 transition">
                  <div className="text-3xl mb-2">{l.logo}</div>
                  <p className="text-white font-medium text-sm">{l.name}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">{l.type}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Calculator / Enquiry split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Indicative rates */}
          <ScrollReveal>
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">Indicative Rates</p>
              <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-6">Current Finance Terms</h2>
              <div className="space-y-4">
                {[
                  { type: 'Prime Residential', ltv: 'Up to 80% LTV', rate: 'From 3.89%', term: '5-year fix' },
                  { type: 'Super-Prime (£5M+)', ltv: 'Up to 70% LTV', rate: 'From 3.65%', term: 'Tracker / bespoke' },
                  { type: 'Buy-to-Let', ltv: 'Up to 75% LTV', rate: 'From 4.15%', term: '2-year fix' },
                  { type: 'Bridging Finance', ltv: 'Up to 75% LTV', rate: 'From 0.55% pm', term: '1–24 months' },
                  { type: 'International Buyer', ltv: 'Up to 70% LTV', rate: 'From 4.40%', term: '2 or 5-year fix' },
                ].map((r, i) => (
                  <div key={i} className="lux-card p-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-[#1C1A17] text-sm">{r.type}</p>
                      <p className="text-xs text-[#9A8B7A] mt-0.5">{r.ltv} · {r.term}</p>
                    </div>
                    <p className="text-[#C9A96A] font-medium lux-heading text-lg shrink-0">{r.rate}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#9A8B7A] mt-4">* Rates are indicative only and subject to individual circumstances and lender criteria. Your home may be repossessed if you do not keep up repayments on a mortgage.</p>
            </div>
          </ScrollReveal>

          {/* Enquiry form */}
          <ScrollReveal delay={0.1}>
            <div className="lux-card p-8">
              <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-1">Get in Touch</p>
              <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">Request a Finance Consultation</h3>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">First Name</label>
                    <input className="lux-input" placeholder="First name" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Last Name</label>
                    <input className="lux-input" placeholder="Last name" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Email</label>
                  <input className="lux-input" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Phone</label>
                  <input className="lux-input" type="tel" placeholder="+44..." />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Loan Amount Required</label>
                  <select className="lux-input">
                    <option value="">Select range</option>
                    <option>£250,000 – £500,000</option>
                    <option>£500,000 – £1,000,000</option>
                    <option>£1M – £5M</option>
                    <option>£5M – £20M</option>
                    <option>£20M+</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Finance Type</label>
                  <select className="lux-input">
                    <option value="">Select type</option>
                    <option>Residential Mortgage</option>
                    <option>Buy-to-Let</option>
                    <option>Bridging Finance</option>
                    <option>International Purchase</option>
                    <option>SPV / Company Purchase</option>
                  </select>
                </div>
                <button type="submit" className="w-full lux-button flex items-center justify-center gap-2">
                  Request Consultation <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQs */}
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">FAQ</p>
          <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-8">Frequently Asked Questions</h2>
        </ScrollReveal>
        <div className="space-y-4 mb-16">
          {FAQS.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <details className="lux-card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-medium text-[#1C1A17]">{faq.q}</span>
                  <span className="text-[#C9A96A] text-xl font-light group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-4 text-[#5F5448] font-light leading-relaxed text-sm">{faq.a}</p>
              </details>
            </ScrollReveal>
          ))}
        </div>

        {/* Regulatory footer */}
        <ScrollReveal>
          <div className="bg-[#EFE8DD] rounded-2xl p-6 text-center">
            <p className="text-xs text-[#9A8B7A] leading-relaxed max-w-3xl mx-auto">
              Raxie Prime Finance is an appointed representative of an FCA-authorised firm. Your home may be repossessed if you do not keep up repayments on a mortgage. The Financial Conduct Authority does not regulate some forms of buy-to-let and commercial mortgages. Finance availability is subject to status and individual circumstances. Rates shown are indicative only.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
