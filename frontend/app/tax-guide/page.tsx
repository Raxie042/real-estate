'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { Globe, ChevronDown, ChevronUp, ExternalLink, Info, Calculator } from 'lucide-react';

interface TaxGuide {
  country: string;
  flag: string;
  currency: string;
  taxes: {
    name: string;
    rate: string;
    notes: string;
    example?: string;
  }[];
  keyFacts: string[];
  lastUpdated: string;
}

const GUIDES: TaxGuide[] = [
  {
    country: 'United Kingdom',
    flag: '\u{1F1EC}\u{1F1E7}',
    currency: 'GBP £',
    taxes: [
      { name: 'Stamp Duty Land Tax (SDLT)', rate: '0–12% (residential)', notes: 'Tiered on purchase price. Additional 3% surcharge for second homes. 2% non-resident surcharge.', example: 'On a £2m property: approx. £153,750' },
      { name: 'Capital Gains Tax', rate: '18% / 24%', notes: '18% basic-rate taxpayers, 24% higher-rate on residential property gains.', example: 'Gain of £500k → CGT of £120,000 at higher rate' },
      { name: 'Inheritance Tax', rate: '40%', notes: 'On estates above £325,000 (£650k for couples). Main residence allowance adds up to £175k per person.', example: '' },
      { name: 'Annual Tax on Enveloped Dwellings (ATED)', rate: '£4,150 – £269,450/yr', notes: 'Applies to residential properties held in companies worth over £500k.', example: '' },
    ],
    keyFacts: [
      'No annual property tax (council tax is operational only)',
      'Non-UK residents pay an extra 2% SDLT surcharge',
      'Primary residences typically exempt from CGT via Private Residence Relief',
      'Furnished Holiday Let rules changed from April 2025',
    ],
    lastUpdated: 'April 2025',
  },
  {
    country: 'United Arab Emirates',
    flag: '\u{1F1E6}\u{1F1EA}',
    currency: 'AED',
    taxes: [
      { name: 'Transfer Fee (DLD)', rate: '4% of purchase price', notes: 'Dubai Land Department fee. Typically split 2% buyer / 2% seller, though buyers often pay all 4%.', example: 'On AED 5m property: AED 200,000' },
      { name: 'Capital Gains Tax', rate: '0%', notes: 'No CGT on property sales in the UAE.', example: '' },
      { name: 'Annual Property Tax', rate: '0%', notes: 'No annual property tax. Service charges / maintenance fees apply (RERA regulated).', example: '' },
      { name: 'VAT on Commercial Property', rate: '5%', notes: 'Residential property is typically VAT-exempt. Commercial property subject to 5% VAT.', example: '' },
      { name: 'Registration Fee (Dubai)', rate: '2% + admin', notes: 'Charged by DLD at registration. Admin fee AED 4,000 for properties >AED 500,000.', example: '' },
    ],
    keyFacts: [
      'No income tax, CGT, or inheritance tax in the UAE',
      'Golden Visa available for property investments of AED 2m+',
      'RERA regulates all service charges',
      'Off-plan transfers incur same DLD fees plus NOC charges',
    ],
    lastUpdated: 'April 2025',
  },
  {
    country: 'Singapore',
    flag: '\u{1F1F8}\u{1F1EC}',
    currency: 'SGD S$',
    taxes: [
      { name: 'Buyer\'s Stamp Duty (BSD)', rate: '1–6% (tiered)', notes: '1% on first S$180k, 2% on next S$180k, 3% on next S$640k, 4% on next S$500k, 5% on next S$1.5m, 6% above S$3m.', example: 'On S$5m property: approx. S$219,600' },
      { name: 'Additional Buyer\'s Stamp Duty (ABSD)', rate: '20–60%', notes: 'Singapore Citizens: 0% first, 20% second, 30% third. PRs: 5% first, 30% second. Foreigners: 60%.', example: 'Foreign buyer S$5m: S$3m ABSD + BSD' },
      { name: 'Seller\'s Stamp Duty (SSD)', rate: '4–12%', notes: 'Payable if sold within 3 years of purchase (12% year 1, 8% year 2, 4% year 3).', example: '' },
      { name: 'Property Tax', rate: '4–32% of AV', notes: 'Annual value (AV) assessed by IRAS. Owner-occupiers get lower rates; investors pay higher progressive rates.', example: '' },
    ],
    keyFacts: [
      'ABSD at 60% significantly limits foreign direct residential purchases',
      'No CGT in Singapore',
      'Industrial and commercial properties have different stamp duty rules',
      'Some exemptions under US-Singapore Free Trade Agreement',
    ],
    lastUpdated: 'April 2025',
  },
  {
    country: 'France',
    flag: '\u{1F1EB}\u{1F1F7}',
    currency: 'EUR €',
    taxes: [
      { name: 'Registration Tax (Droits de mutation)', rate: '~5.8% on existing properties', notes: 'Comprises departmental tax (~4.5%), commune tax (~1.2%) and state fee (~0.1%). New builds attract VAT at 20% instead.', example: 'On €2m property: approx. €116,000' },
      { name: 'Capital Gains Tax', rate: '36.2% (reducing with time)', notes: 'Total 36.2% (19% IR + 17.2% social charges). Full exemption after 22 years (IR) / 30 years (social).', example: 'Gain of €500k at 10 years: approx. €153,000' },
      { name: 'Taxe Foncière', rate: 'Varies by location', notes: 'Annual property tax paid by owner. Based on cadastral rental value × local rate.', example: 'Typically €1,500–€8,000/yr in Paris' },
      { name: 'Wealth Tax (IFI)', rate: '0.5–1.5%', notes: 'Impôt sur la Fortune Immobilière on net French real estate assets above €1.3m.', example: '' },
      { name: 'Inheritance Tax', rate: '5–45%', notes: 'Between spouses: 0%. Children: 5–45% above €100,106. Non-relatives up to 60%.', example: '' },
    ],
    keyFacts: [
      'Non-EU residents must appoint a French tax representative for rental income',
      'Leaseback (Loueur Meublé) scheme can offer VAT reclaim on new-build purchases',
      'CGT exemption for primary residence',
      'Double tax treaties in place with UK, US, UAE and most OECD countries',
    ],
    lastUpdated: 'April 2025',
  },
  {
    country: 'United States',
    flag: '\u{1F1FA}\u{1F1F8}',
    currency: 'USD $',
    taxes: [
      { name: 'Transfer Tax', rate: '0.01–4%+ (varies by state)', notes: 'No federal transfer tax. State and county rates vary widely. NYC imposes 1–1.425% city + 0.4% state.', example: 'NYC $5m property: ~$71,250 combined' },
      { name: 'Capital Gains Tax (Federal)', rate: '0%, 15%, or 20%', notes: 'Long-term CGT (held >1yr). Non-US persons subject to FIRPTA withholding of 15% on gross proceeds.', example: '' },
      { name: 'Property Tax', rate: '0.3–2.5%+ of assessed value', notes: 'Annual, assessed and collected at county level. NYC ~0.8–1.9% of assessed value annually.', example: '$5m property in NYC: ~$40,000–$95,000/yr' },
      { name: 'Mansion Tax (NY)', rate: '1–3.9%', notes: 'New York City progressive surcharge on purchases of $1m+. Buyer pays.', example: '$5m property: 1.25% = $62,500' },
      { name: 'Estate Tax', rate: 'Federal: 40% above $13.6m', notes: 'Non-US persons exempt from higher federal threshold — only $60,000 exemption for US situs assets.', example: '' },
    ],
    keyFacts: [
      'FIRPTA requires foreign sellers to withhold 15% of gross sales price unless below $300,000',
      'Section 1031 exchange allows deferral of CGT when reinvesting in like-kind property',
      'EB-5 Investor Visa program available for investments from $800,000',
      'State income tax on rental income varies by state',
    ],
    lastUpdated: 'April 2025',
  },
  {
    country: 'Hong Kong',
    flag: '\u{1F1ED}\u{1F1F0}',
    currency: 'HKD',
    taxes: [
      { name: 'Ad Valorem Stamp Duty (AVSD)', rate: '1.5–8.5%', notes: 'For non-first-time-buyers, Hong Kong permanent residents pay 1.5–8.5% on a sliding scale.', example: '' },
      { name: 'Buyer\'s Stamp Duty (BSD)', rate: '15%', notes: 'Payable by non-HKPR buyers (foreigners and corporations) in addition to AVSD.', example: 'Foreign buyer HKD 50m: BSD HKD 7.5m' },
      { name: 'Special Stamp Duty (SSD)', rate: '10–20%', notes: 'On sales within 24 months of purchase. Reduced in Feb 2023 to 0 for HKPR first-home buyers.', example: '' },
      { name: 'Property Tax', rate: '15% of assessable value', notes: 'Annual tax on rental income at flat rate of 15% of net assessable value (after 20% allowance).', example: '' },
      { name: 'Capital Gains Tax', rate: '0%', notes: 'No CGT in Hong Kong.', example: '' },
    ],
    keyFacts: [
      'February 2023: Hong Kong removed extra stamp duties for HKPR buyers to stimulate market',
      'No annual rates for owner-occupiers (government rates exempted up to certain value)',
      'Stamp duty rebates available under certain conditions for HKPR first-timers',
    ],
    lastUpdated: 'April 2025',
  },
];

export default function TaxGuidePage() {
  const [openCountry, setOpenCountry] = useState<string | null>('United Kingdom');

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <section className="bg-[#1C1A17] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe size={16} className="text-[#C9A96A]" />
              <span className="text-[#C9A96A] text-sm font-semibold tracking-widest uppercase">International Tax Guide</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-serif">Property Tax by Country</h1>
            <p className="text-[#BBAD98] text-base max-w-xl mx-auto mb-6">
              An at-a-glance guide to purchase taxes, capital gains, annual charges, and key rules for international buyers in six major markets.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#C9A96A]/15 border border-[#C9A96A]/30 rounded-xl px-4 py-2 text-[#C9A96A] text-sm">
              <Info size={14} />
              Rates reflect May 2026. Always take independent legal advice before transacting.
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quick nav */}
      <section className="bg-white border-b border-[#E8E1D7] sticky top-0 z-10 overflow-x-auto">
        <div className="max-w-4xl mx-auto px-4 py-3 flex gap-2">
          {GUIDES.map(g => (
            <button
              key={g.country}
              onClick={() => setOpenCountry(c => c === g.country ? null : g.country)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition ${
                openCountry === g.country
                  ? 'bg-[#C9A96A] text-[#1C1A17] font-semibold'
                  : 'bg-[#F6F2EC] text-[#5F5448] hover:bg-[#EDE7DC]'
              }`}
            >
              <span>{g.flag}</span>
              {g.country.split(' ')[0]}
            </button>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {GUIDES.map((guide) => {
            const isOpen = openCountry === guide.country;
            return (
              <ScrollReveal key={guide.country}>
                <div className="lux-card overflow-hidden">
                  {/* Country header */}
                  <button
                    onClick={() => setOpenCountry(c => c === guide.country ? null : guide.country)}
                    className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#FAFAF8] transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{guide.flag}</span>
                      <div className="text-left">
                        <h2 className="text-lg font-semibold text-[#1C1A17]">{guide.country}</h2>
                        <p className="text-sm text-[#7A6E60]">{guide.currency} · {guide.taxes.length} taxes summarised · Updated {guide.lastUpdated}</p>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp size={18} className="text-[#9A8B7A]" /> : <ChevronDown size={18} className="text-[#9A8B7A]" />}
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#E8E1D7] px-6 py-5">
                      {/* Tax table */}
                      <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-[#E8E1D7]">
                              <th className="text-left py-2 text-[#9A8B7A] font-medium pr-4">Tax / Duty</th>
                              <th className="text-left py-2 text-[#9A8B7A] font-medium pr-4">Rate</th>
                              <th className="text-left py-2 text-[#9A8B7A] font-medium">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            {guide.taxes.map(tax => (
                              <tr key={tax.name} className="border-b border-[#F0EBE3] last:border-0">
                                <td className="py-3 pr-4 font-medium text-[#1C1A17] align-top whitespace-nowrap">{tax.name}</td>
                                <td className="py-3 pr-4 font-semibold text-[#C9A96A] align-top whitespace-nowrap">{tax.rate}</td>
                                <td className="py-3 text-[#5F5448] align-top">
                                  {tax.notes}
                                  {tax.example && (
                                    <span className="block text-xs text-[#9A8B7A] mt-0.5 italic">{tax.example}</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Key facts */}
                      <div className="bg-[#F6F2EC] rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-[#1C1A17] mb-3">Key Facts</h3>
                        <ul className="space-y-1.5">
                          {guide.keyFacts.map((fact, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#5F5448]">
                              <span className="w-1.5 h-1.5 bg-[#C9A96A] rounded-full flex-shrink-0 mt-1.5" />
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-12 px-4 bg-white border-t border-[#E8E1D7]">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-left">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  This guide is for general information only and does not constitute tax or legal advice. Tax laws change frequently. We strongly recommend consulting a qualified tax advisor in the relevant jurisdiction before making any property purchase decision.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#1C1A17] mb-3 font-serif">Need Personalised Tax Advice?</h2>
            <p className="text-[#7A6E60] mb-6">Our network of international tax advisors can provide jurisdiction-specific guidance for your acquisition.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="lux-button">Request a Tax Consultation</Link>
              <Link href="/stamp-duty" className="lux-button-outline flex items-center gap-2">
                <Calculator size={16} />
                UK Stamp Duty Calculator
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
