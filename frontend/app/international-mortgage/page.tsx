'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Globe, TrendingDown, Calculator } from 'lucide-react';

const COUNTRY_RATES: Record<string, { rate: number; maxLTV: number; term: number; currency: string; symbol: string; locale: string; notes: string }> = {
  'UK': { rate: 4.75, maxLTV: 85, term: 25, currency: 'GBP', symbol: '£', locale: 'en-GB', notes: 'Bank of England base rate 5.25%. Residential rates from 4.5%. Foreign nationals: up to 75% LTV.' },
  'UAE': { rate: 4.5, maxLTV: 80, term: 25, currency: 'AED', symbol: 'AED ', locale: 'en-AE', notes: 'UAE Central Bank cap: 80% for residents, 75% for non-residents. Rates variable — pegged to SOFR + margin.' },
  'France': { rate: 3.2, maxLTV: 80, term: 20, currency: 'EUR', symbol: '€', locale: 'fr-FR', notes: 'Fixed-rate mortgages common. Non-residents typically 70–80% LTV. French bank insurance (assurance décès) required.' },
  'Portugal': { rate: 3.8, maxLTV: 80, term: 30, currency: 'EUR', symbol: '€', locale: 'pt-PT', notes: 'Euribor-linked variable or fixed. Non-residents: 70% LTV. NHR (Non-Habitual Resident) tax advantages available.' },
  'Spain': { rate: 3.5, maxLTV: 70, term: 30, currency: 'EUR', symbol: '€', locale: 'es-ES', notes: 'Non-residents: up to 70% LTV. Euribor-linked. Property purchase tax 6–10% depending on region.' },
  'Singapore': { rate: 3.0, maxLTV: 75, term: 30, currency: 'SGD', symbol: 'S$', locale: 'en-SG', notes: 'MAS regulations: 75% LTV for first property. Total Debt Servicing Ratio (TDSR) cap of 55% applies.' },
  'Greece': { rate: 4.0, maxLTV: 75, term: 25, currency: 'EUR', symbol: '€', locale: 'el-GR', notes: 'Non-residents: 70–75% LTV. Golden Visa route available for purchases ≥ €250k. New Golden Visa threshold €800k in Athens.' },
  'Italy': { rate: 3.6, maxLTV: 80, term: 25, currency: 'EUR', symbol: '€', locale: 'it-IT', notes: 'Non-residents: 60–70% LTV typically. Imposta di registro (stamp duty) 9% for non-primary residences.' },
  'Malta': { rate: 3.4, maxLTV: 90, term: 40, currency: 'EUR', symbol: '€', locale: 'en-MT', notes: 'Residents up to 90% LTV. Permanent Residence Programme and citizenship-by-investment scheme available.' },
  'Monaco': { rate: 2.5, maxLTV: 50, term: 15, currency: 'EUR', symbol: '€', locale: 'fr-MC', notes: 'Private banking lenders only. LTV varies by relationship. No standard mortgage market — arranged via private banks.' },
};

const COUNTRIES = Object.keys(COUNTRY_RATES);

function fmt(amount: number, symbol: string): string {
  if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toFixed(2)}m`;
  if (amount >= 1_000) return `${symbol}${Math.round(amount).toLocaleString()}`;
  return `${symbol}${Math.round(amount)}`;
}

export default function InternationalMortgagePage() {
  const [country, setCountry] = useState('UK');
  const [purchasePrice, setPurchasePrice] = useState(2_000_000);
  const [ltv, setLtv] = useState(75);
  const [rate, setRate] = useState(4.75);
  const [term, setTerm] = useState(25);

  const c = COUNTRY_RATES[country];

  // sync defaults when country changes
  useEffect(() => {
    setRate(c.rate);
    setTerm(c.term);
    setLtv(Math.min(ltv, c.maxLTV));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const loanAmount = purchasePrice * (ltv / 100);
  const deposit = purchasePrice - loanAmount;
  const monthlyRate = rate / 100 / 12;
  const n = term * 12;
  const monthlyPayment = loanAmount > 0 && monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : 0;
  const totalRepayable = monthlyPayment * n;
  const totalInterest = totalRepayable - loanAmount;

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Finance Tools</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">International Mortgage Calculator</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Estimate your mortgage repayments across 10 countries, with country-specific interest rates, LTV limits, and local market notes.</motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-8">
          <strong>For illustrative purposes only.</strong> Rates shown are indicative market averages as of 2026 and may not reflect current lender offerings. Always obtain a Decision in Principle from a regulated broker.
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="lux-card p-7 space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-2">Country</label>
              <div className="grid grid-cols-2 gap-2">
                {COUNTRIES.map(co => (
                  <button key={co} onClick={() => setCountry(co)}
                    className={`py-2 px-3 rounded-lg text-sm transition text-left flex items-center gap-1.5 ${country === co ? 'bg-[#C9A96A] text-[#1C1A17] font-semibold' : 'bg-[#F6F2EC] border border-[#E8E1D7] text-[#5F5448] hover:border-[#C9A96A]'}`}>
                    <Globe size={11} />{co}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.3em] text-[#9A8B7A] mb-2">Purchase Price</label>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))}
                className="lux-input w-full" step={50000} />
              <div className="flex gap-2 mt-2">
                {[500_000, 1_000_000, 2_000_000, 5_000_000].map(v => (
                  <button key={v} onClick={() => setPurchasePrice(v)}
                    className="text-xs px-2 py-1 rounded-full border border-[#E8E1D7] hover:border-[#C9A96A] transition text-[#5F5448]">
                    {fmt(v, c.symbol)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A]">Loan-to-Value</label>
                <span className="text-sm font-semibold text-[#1C1A17]">{ltv}% <span className="text-xs text-[#9A8B7A]">(max {c.maxLTV}%)</span></span>
              </div>
              <input type="range" min={10} max={c.maxLTV} value={ltv} onChange={e => setLtv(Number(e.target.value))}
                className="w-full accent-[#C9A96A]" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A]">Interest Rate</label>
                <span className="text-sm font-semibold text-[#1C1A17]">{rate.toFixed(2)}%</span>
              </div>
              <input type="range" min={1} max={10} step={0.05} value={rate} onChange={e => setRate(Number(e.target.value))}
                className="w-full accent-[#C9A96A]" />
              <p className="text-xs text-[#9A8B7A] mt-1">Market average for {country}: <strong>{c.rate}%</strong></p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs uppercase tracking-[0.3em] text-[#9A8B7A]">Mortgage Term</label>
                <span className="text-sm font-semibold text-[#1C1A17]">{term} years</span>
              </div>
              <input type="range" min={5} max={35} value={term} onChange={e => setTerm(Number(e.target.value))}
                className="w-full accent-[#C9A96A]" />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="bg-[#1C1A17] rounded-2xl p-7">
              <p className="text-[#9A8B7A] text-xs uppercase tracking-[0.3em] mb-1">Monthly Repayment</p>
              <p className="font-serif text-4xl text-[#C9A96A]">{fmt(monthlyPayment, c.symbol)}</p>
              <p className="text-[#9A8B7A] text-xs mt-1">{country} — {rate.toFixed(2)}% over {term} years</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                ['Loan Amount', fmt(loanAmount, c.symbol)],
                ['Deposit Required', fmt(deposit, c.symbol)],
                ['Total Repayable', fmt(totalRepayable, c.symbol)],
                ['Total Interest', fmt(totalInterest, c.symbol)],
              ].map(([label, value]) => (
                <div key={label} className="lux-card p-4">
                  <p className="text-xs text-[#9A8B7A] mb-1">{label}</p>
                  <p className="font-semibold text-[#1C1A17]">{value}</p>
                </div>
              ))}
            </div>

            <div className="lux-card p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#C9A96A] mb-2">{country} Market Notes</p>
              <p className="text-sm text-[#5F5448] leading-relaxed">{c.notes}</p>
            </div>

            <Link href="/mortgage-brokers" className="w-full lux-button flex items-center justify-center gap-2">
              <TrendingDown size={15} /> Find a Specialist Broker
            </Link>
          </div>
        </div>

        {/* Country rate table */}
        <ScrollReveal className="mt-12">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Rate Comparison</p>
          <h2 className="font-serif text-2xl text-[#1C1A17] mb-5">Indicative Rates by Country (2026)</h2>
          <div className="lux-card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#F6F2EC] border-b border-[#E8E1D7]">
                <tr>
                  {['Country', 'Indicative Rate', 'Max LTV', 'Typical Term', 'Currency'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs uppercase tracking-wider text-[#9A8B7A] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COUNTRIES.map((co, i) => {
                  const d = COUNTRY_RATES[co];
                  return (
                    <tr key={co} className={`border-b border-[#F0EBE3] last:border-0 ${co === country ? 'bg-[#C9A96A]/10' : ''}`}>
                      <td className="px-4 py-3 font-medium text-[#1C1A17]">{co}</td>
                      <td className="px-4 py-3 text-[#C9A96A] font-semibold">{d.rate}%</td>
                      <td className="px-4 py-3 text-[#5F5448]">{d.maxLTV}%</td>
                      <td className="px-4 py-3 text-[#5F5448]">{d.term} years</td>
                      <td className="px-4 py-3 text-[#5F5448]">{d.currency}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
