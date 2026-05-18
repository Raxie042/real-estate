'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';
import { FileText, Home, TrendingUp, Building, Trees, ArrowRight, CheckCircle, Users } from 'lucide-react';

const SERVICES = [
  {
    icon: Home,
    title: 'Residential Planning',
    desc: 'Securing consent for extensions, conversions, new-build homes and alterations to listed buildings. Pre-application advice, planning statements, and appeal representation.',
    tags: ['Extensions & Conversions', 'New-Build Consent', 'Listed Building Consent', 'Certificate of Lawfulness'],
  },
  {
    icon: Building,
    title: 'Development Appraisal',
    desc: 'Viability assessments, permitted development analysis, and planning risk evaluation for residential and mixed-use development sites prior to acquisition.',
    tags: ['Viability Assessment', 'Permitted Development', 'Planning Risk', 'Pre-Acquisition Advice'],
  },
  {
    icon: Trees,
    title: 'Rural & Heritage',
    desc: 'Agricultural land use change, diversification, conversion of barns and agricultural buildings, and consents for works to Grade I and Grade II* listed structures.',
    tags: ['Agricultural Change of Use', 'Barn Conversion', 'Conservation Area Consent', 'AONB Applications'],
  },
  {
    icon: TrendingUp,
    title: 'Strategic Land',
    desc: 'Promotion of land through the local plan process, allocation negotiations, and masterplan preparation for sites capable of delivering 50 to 5,000+ homes.',
    tags: ['Local Plan Promotion', 'Land Allocation', 'Masterplanning', 'Housing Delivery'],
  },
  {
    icon: FileText,
    title: 'Planning Appeals',
    desc: 'Expert representation at Inspectorate hearings, inquiries and written representations. Strong track record overturning LPA refusals on complex residential sites.',
    tags: ['Written Representations', 'Hearings', 'Public Inquiries', 'Costs Applications'],
  },
  {
    icon: Users,
    title: 'Community Engagement',
    desc: 'Pre-application community consultation, stakeholder engagement, and public exhibition management to build support and reduce third-party objection risk.',
    tags: ['Public Consultation', 'Stakeholder Engagement', 'Statement of Community Involvement', 'Exhibition Management'],
  },
];

const PROCESS = [
  { num: '01', title: 'Site Appraisal', desc: 'We review planning history, local policy, site constraints, and comparable decisions to give you a realistic assessment of prospects before any cost is committed.' },
  { num: '02', title: 'Pre-Application', desc: 'Where appropriate, we engage informally with the LPA to identify officer concerns and refine the scheme before a formal application is submitted.' },
  { num: '03', title: 'Application & Negotiation', desc: 'Preparation and submission of the full planning application, including all supporting documentation. Ongoing negotiation with officers to resolve any emerging issues.' },
  { num: '04', title: 'Decision & Appeal', desc: 'Managing the decision process, responding to conditions, and — where necessary — advising on and prosecuting a planning appeal with the best prospects of success.' },
];

const CASE_STUDIES = [
  {
    title: 'Grade II* Manor House — Full Refurbishment',
    location: 'Oxfordshire, UK',
    type: 'Listed Building Consent',
    outcome: 'Full consent granted in 12 weeks',
    desc: 'Secured listed building consent for a complete internal and external refurbishment of a Grade II* manor house, including new kitchen and orangery extension. Officers initially raised concern over the orangery — resolved through design revision and heritage officer negotiation.',
    image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=700&q=80',
  },
  {
    title: '180-Unit Residential Scheme',
    location: 'Surrey, UK',
    type: 'Full Planning Permission',
    outcome: 'Consent granted on appeal — costs awarded',
    desc: 'Following LPA refusal, we pursued a public inquiry and secured planning permission for 180 homes on a brownfield site. Costs were partially awarded against the LPA for unreasonable behaviour in the refusal.',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80',
  },
  {
    title: 'Barn Complex — Residential Conversion',
    location: 'Wiltshire, UK',
    type: 'Change of Use Consent',
    outcome: 'Prior approval for 6 dwellings',
    desc: 'Secured prior approval under Class Q permitted development for conversion of a redundant agricultural barn complex into six residential units, avoiding the need for a full planning application in an AONB setting.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=700&q=80',
  },
];

const TABS = ['All', 'Residential', 'Development', 'Rural & Heritage', 'Strategic Land'];

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/50 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Planning & Development</motion.p>
          <motion.h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-5"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            Unlock the Full<br />Potential of Your Land
          </motion.h1>
          <motion.p className="text-[#D9CBB7] max-w-2xl mx-auto leading-relaxed text-lg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Expert planning consultancy for residential, rural, heritage, and strategic land — from single-dwelling consents to major mixed-use allocations.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4 justify-center mt-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Link href="/contact" className="lux-button">Speak to a Planner</Link>
            <Link href="#services" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Our Services</Link>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['94%', 'Application success rate'],
            ['350+', 'Consents secured'],
            ['12,000+', 'Homes facilitated'],
            ['20 years', 'Planning expertise'],
          ].map(([v, l]) => (
            <div key={l}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{v}</p>
              <p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div id="services" className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">What We Do</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] lux-heading">Planning Services</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.07}>
              <div className="lux-card p-7 h-full flex flex-col hover:shadow-xl transition-shadow">
                <s.icon size={22} className="text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#1C1A17] text-lg mb-3">{s.title}</h3>
                <p className="text-[#5F5448] text-sm leading-relaxed mb-4 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {s.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 bg-[#F0EBE3] text-[#7A6E60] rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Process */}
      <div className="bg-[#1C1A17] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">How We Work</p>
            <h2 className="font-serif text-4xl text-white lux-heading">Our Process</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.num} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#C9A96A] flex items-center justify-center font-bold text-[#1C1A17] mx-auto mb-4">{p.num}</div>
                  <h3 className="font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-[#9A8B7A] leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <ScrollReveal className="mb-10">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Proven Results</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] lux-heading">Case Studies</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <div className="lux-card overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={c.image} alt={c.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs bg-[#C9A96A] text-[#1C1A17] font-semibold px-2.5 py-0.5 rounded-full">{c.type}</span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-semibold text-[#1C1A17] mb-1">{c.title}</h3>
                  <p className="text-xs text-[#C9A96A] mb-3">📍 {c.location}</p>
                  <p className="text-sm text-[#5F5448] leading-relaxed flex-1 mb-4">{c.desc}</p>
                  <div className="pt-3 border-t border-[#E8E1D7] flex items-start gap-2">
                    <CheckCircle size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <p className="text-xs font-medium text-emerald-700">{c.outcome}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-20 px-6 text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Free Initial Consultation</p>
          <h2 className="font-serif text-4xl text-white lux-heading mb-5">Start with a Site Appraisal</h2>
          <p className="text-[#9A8B7A] max-w-xl mx-auto mb-8 leading-relaxed">
            Tell us about your site or property. Our planning team will review the history, policy context, and realistic prospects — at no charge.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact" className="lux-button">Request a Free Appraisal</Link>
            <Link href="/land" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">
              View Land & Plots
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
