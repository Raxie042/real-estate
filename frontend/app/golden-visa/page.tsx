'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Globe, CheckCircle, Clock, DollarSign, Home, Users, Shield, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

interface VisaRoute {
  id: string;
  country: string;
  flag: string;
  programName: string;
  minInvestment: string;
  processingTime: string;
  residency: string;
  citizenship: string;
  propertyRoute: boolean;
  active: boolean;
  benefits: string[];
  requirements: string[];
  propertyDetails: string;
  taxHighlight: string;
  note?: string;
}

const VISA_ROUTES: VisaRoute[] = [
  {
    id: 'uae',
    country: 'UAE',
    flag: '🇦🇪',
    programName: 'Golden Visa (Property Route)',
    minInvestment: 'AED 2,000,000 (~£430k)',
    processingTime: '30–90 days',
    residency: '10-year renewable',
    citizenship: 'Not available via this route',
    propertyRoute: true,
    active: true,
    benefits: ['10-year renewable residency', '0% income tax, 0% CGT', 'Sponsor family members', 'Open UAE bank accounts', 'Business in free zones', 'No minimum stay requirement'],
    requirements: ['Property value ≥ AED 2m (title deed)', 'Property must be completed (not off-plan)', 'Valid passport', 'Health insurance in UAE', 'Medical fitness certificate'],
    propertyDetails: 'Freehold property in designated areas. Can be mortgaged provided equity ≥ AED 2m. Multiple properties may be combined to reach threshold.',
    taxHighlight: 'No personal income tax, no capital gains tax, no inheritance tax in UAE.',
  },
  {
    id: 'portugal',
    country: 'Portugal',
    flag: '🇵🇹',
    programName: 'Golden Visa (ARI)',
    minInvestment: '€500,000 (non-residential) / €350k (low-density)',
    processingTime: '12–18 months',
    residency: '5 years (minimum 7 days/year stay)',
    citizenship: 'After 5 years residency',
    propertyRoute: true,
    active: true,
    benefits: ['EU Schengen travel rights', 'Path to EU citizenship in 5 years', 'NHR tax regime (10% flat rate for 10 years)', 'Sponsor family members', 'Work and live in Portugal'],
    requirements: ['Investment in eligible property categories', 'Clean criminal record', 'Tax compliance in home country', 'Minimum 7 days physical presence/year', 'Health insurance'],
    propertyDetails: 'Residential property in Lisbon and Porto no longer eligible. Commercial, rehabilitation, or low-density areas only. Hotel units and regulated funds are alternative routes.',
    taxHighlight: 'Non-Habitual Resident (NHR) regime: 10% flat tax on foreign income for 10 years. Pension income from abroad taxed at 10%.',
    note: 'Portugal Golden Visa rules changed in 2023. Residential property in Lisbon, Porto and Algarve no longer qualifies. Verify current eligible categories with a licensed lawyer.',
  },
  {
    id: 'greece',
    country: 'Greece',
    flag: '🇬🇷',
    programName: 'Golden Visa',
    minInvestment: '€800,000 (Athens/Thessaloniki/Mykonos/Santorini) / €400k (other areas)',
    processingTime: '3–6 months',
    residency: '5-year renewable',
    citizenship: 'After 7 years continuous residency',
    propertyRoute: true,
    active: true,
    benefits: ['Schengen travel rights', 'No minimum stay requirement', 'Sponsor family members', 'Path to citizenship after 7 years', 'One of Europe\'s cheapest golden visas'],
    requirements: ['Property purchase at threshold value', 'Health insurance', 'Clean criminal record', 'Tax registration in Greece (AFM number)', 'Greek bank account'],
    propertyDetails: 'Residential or commercial property. Popular areas: Athens Riviera, Mykonos, Thessaloniki. New thresholds of €800k apply to prime areas from 2024.',
    taxHighlight: 'Alternative tax regime: €100,000 flat annual tax regardless of global income for 15 years (for those relocating).',
  },
  {
    id: 'malta',
    country: 'Malta',
    flag: '🇲🇹',
    programName: 'Malta Permanent Residence Programme (MPRP)',
    minInvestment: '€300,000 purchase or €10,000/year rental + contribution',
    processingTime: '4–6 months',
    residency: 'Permanent (indefinite)',
    citizenship: 'Via separate MEIN programme (€600k–750k)',
    propertyRoute: true,
    active: true,
    benefits: ['Permanent EU residency', 'Schengen travel rights', 'Sponsor family members', 'No minimum stay requirement', 'English-speaking EU member state', 'EU banking access'],
    requirements: ['Property purchase ≥ €300k (south/Gozo) or €350k (other)', 'Government contribution of €28k', 'NGO donation €2k', 'Health insurance', 'Clean criminal record'],
    propertyDetails: 'Purchase must be held for 5 years. South Malta or Gozo threshold: €300k. All other areas: €350k. Can switch to rental route (min €10k/year).',
    taxHighlight: '15% flat tax on foreign-source income remitted to Malta. Capital gains on overseas property not taxed in Malta.',
  },
  {
    id: 'spain',
    country: 'Spain',
    flag: '🇪🇸',
    programName: 'Golden Visa',
    minInvestment: '€500,000',
    processingTime: '3–6 months',
    residency: '5-year renewable',
    citizenship: 'After 10 years',
    propertyRoute: true,
    active: false,
    benefits: ['Schengen travel rights', 'Sponsor family', 'No minimum stay', 'Work in Spain', 'Path to citizenship after 10 years'],
    requirements: ['€500k property investment (unencumbered)', 'Health insurance', 'Clean criminal record'],
    propertyDetails: 'Spanish government announced plans to abolish the property route Golden Visa in 2024. Verify current status before proceeding.',
    taxHighlight: 'Beckham Law: 24% flat tax for 6 years for qualifying new residents.',
    note: '⚠️ Spain announced plans to end the property-based Golden Visa. Please verify current programme status with a Spanish immigration lawyer before proceeding.',
  },
];

function VisaCard({ route }: { route: VisaRoute }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`lux-card overflow-hidden ${!route.active ? 'opacity-75' : ''}`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{route.flag}</span>
              <h3 className="font-serif text-xl text-[#1C1A17]">{route.country}</h3>
              {!route.active && <span className="text-[10px] bg-red-50 border border-red-200 text-red-600 rounded-full px-2 py-0.5">Under Review</span>}
              {route.active && <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full px-2 py-0.5">Active</span>}
            </div>
            <p className="text-xs text-[#C9A96A] uppercase tracking-widest">{route.programName}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="bg-[#F6F2EC] rounded-lg p-2.5">
            <p className="text-[#9A8B7A] mb-0.5">Min. Investment</p>
            <p className="font-semibold text-[#1C1A17]">{route.minInvestment}</p>
          </div>
          <div className="bg-[#F6F2EC] rounded-lg p-2.5">
            <p className="text-[#9A8B7A] mb-0.5">Processing</p>
            <p className="font-semibold text-[#1C1A17]">{route.processingTime}</p>
          </div>
          <div className="bg-[#F6F2EC] rounded-lg p-2.5">
            <p className="text-[#9A8B7A] mb-0.5">Residency</p>
            <p className="font-semibold text-[#1C1A17]">{route.residency}</p>
          </div>
          <div className="bg-[#F6F2EC] rounded-lg p-2.5">
            <p className="text-[#9A8B7A] mb-0.5">Citizenship Path</p>
            <p className="font-semibold text-[#1C1A17] text-[10px] leading-tight">{route.citizenship}</p>
          </div>
        </div>

        <p className="text-xs text-[#5F5448] bg-[#F0EBE3] rounded-lg px-3 py-2 mb-3">{route.taxHighlight}</p>

        {route.note && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800 mb-3">{route.note}</div>
        )}

        <button onClick={() => setExpanded(v => !v)} className="w-full flex items-center justify-center gap-1.5 text-xs text-[#C9A96A] hover:text-[#B78F4A] transition py-1">
          {expanded ? <><ChevronUp size={13} />Less detail</> : <><ChevronDown size={13} />Full requirements & property details</>}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }} className="overflow-hidden border-t border-[#E8E1D7]">
            <div className="p-6 grid md:grid-cols-2 gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96A] mb-2">Key Benefits</p>
                <ul className="space-y-1.5">
                  {route.benefits.map(b => <li key={b} className="flex items-start gap-1.5 text-xs text-[#5F5448]"><CheckCircle size={11} className="text-emerald-600 mt-0.5 shrink-0" />{b}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96A] mb-2">Requirements</p>
                <ul className="space-y-1.5">
                  {route.requirements.map(r => <li key={r} className="flex items-start gap-1.5 text-xs text-[#5F5448]"><ArrowRight size={11} className="text-[#C9A96A] mt-0.5 shrink-0" />{r}</li>)}
                </ul>
              </div>
              <div className="md:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96A] mb-2">Property Details</p>
                <p className="text-xs text-[#5F5448] leading-relaxed">{route.propertyDetails}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GoldenVisaPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Global Mobility</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Golden Visa &amp; Residency Guide</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Gain residency or a path to citizenship by investing in property. Comprehensive guides to the UAE, Portugal, Greece, Malta and more.</motion.p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Important:</strong> Residency-by-investment rules change frequently. This guide reflects our best knowledge as of May 2026 but is for informational purposes only — not legal advice. Always consult a licensed immigration lawyer before proceeding.
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['5', 'Active Programmes'], ['€300k–€800k', 'Investment Range'], ['10 years', 'UAE Residency'], ['5 years', 'EU Citizenship (PT)']].map(([v, l]) => (
            <div key={l}><p className="font-serif text-xl font-semibold text-[#1C1A17]">{v}</p><p className="text-xs text-[#1C1A17]/70 uppercase tracking-wider">{l}</p></div>
          ))}
        </div>
      </div>

      {/* Programmes */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <ScrollReveal className="mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Programmes</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">Property-Based Residency Routes</h2>
        </ScrollReveal>

        <div className="space-y-5">
          {VISA_ROUTES.map((r, i) => (
            <ScrollReveal key={r.id} delay={i * 0.07}>
              <VisaCard route={r} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Expert Guidance</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Speak to Our International Team</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">We work with licensed immigration lawyers in the UAE, Portugal, Greece and Malta. Let us introduce you to the right specialist.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="lux-button">Book a Consultation</Link>
            <Link href="/wealth-report" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Download Residency Guide PDF</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
