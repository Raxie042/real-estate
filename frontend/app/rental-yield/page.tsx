'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { TrendingUp, PoundSterling, Percent, Home, Calculator, Info } from 'lucide-react';

function fmt(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}m`;
  return `£${n.toLocaleString('en-GB')}`;
}

const BENCHMARKS = [
  { city: 'London – Prime Central', gross: '2.5–3.5%', net: '1.8–2.8%', cap: '3–4%' },
  { city: 'London – Zone 2–3', gross: '3.5–5%', net: '2.8–4%', cap: '4–5%' },
  { city: 'Dubai – Downtown', gross: '5–7%', net: '4–6%', cap: '5–7%' },
  { city: 'Dubai – JBR/Marina', gross: '6–8%', net: '5–7%', cap: '5.5–7.5%' },
  { city: 'Edinburgh – City Centre', gross: '4–6%', net: '3.5–5%', cap: '4.5–6%' },
  { city: 'Manchester – City Centre', gross: '5–7%', net: '4–6%', cap: '5–7%' },
  { city: 'Singapore – District 9', gross: '2.5–3.5%', net: '1.8–2.8%', cap: '2.5–3.5%' },
  { city: 'Paris – 8th Arr.', gross: '2–3%', net: '1.5–2.5%', cap: '2.5–3.5%' },
];

export default function RentalYieldPage() {
  const [purchasePrice, setPurchasePrice] = useState('1500000');
  const [monthlyRent, setMonthlyRent] = useState('4500');
  const [annualCosts, setAnnualCosts] = useState('8000');
  const [mortgageRate, setMortgageRate] = useState('4.5');
  const [ltv, setLtv] = useState('70');
  const [mortgageTerm, setMortgageTerm] = useState('25');

  const price = parseFloat(purchasePrice.replace(/,/g, '')) || 0;
  const rent = parseFloat(monthlyRent.replace(/,/g, '')) || 0;
  const costs = parseFloat(annualCosts.replace(/,/g, '')) || 0;
  const rate = parseFloat(mortgageRate) || 0;
  const ltvPct = parseFloat(ltv) / 100;
  const termYrs = parseFloat(mortgageTerm) || 25;

  const annualRent = rent * 12;
  const grossYield = price > 0 ? (annualRent / price) * 100 : 0;
  const netYield = price > 0 ? ((annualRent - costs) / price) * 100 : 0;
  const loanAmount = price * ltvPct;
  const deposit = price - loanAmount;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = termYrs * 12;
  const monthlyMortgage = monthlyRate > 0
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1)
    : loanAmount / totalPayments;
  const annualMortgage = monthlyMortgage * 12;
  const annualCashflow = annualRent - costs - annualMortgage;
  const cashOnCash = deposit > 0 ? (annualCashflow / deposit) * 100 : 0;

  const yieldColor = (y: number) => y >= 5 ? 'text-emerald-600' : y >= 3.5 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4"
          >Investor Tools</motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-[#F6F2EC] mb-4"
          >Rental Yield &amp; ROI Calculator</motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto"
          >Calculate gross yield, net yield and cash-on-cash return for any property investment. Benchmark against prime markets worldwide.</motion.p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <ScrollReveal>
            <div className="lux-card p-6 space-y-5">
              <h2 className="font-serif text-xl text-[#1C1A17] mb-2">Property Details</h2>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">Purchase Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]">£</span>
                  <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)}
                    className="lux-input pl-7 w-full" placeholder="1,500,000" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">Monthly Rental Income</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]">£</span>
                  <input type="number" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)}
                    className="lux-input pl-7 w-full" placeholder="4,500" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">
                  Annual Running Costs
                  <span className="normal-case tracking-normal ml-1 text-[#9A8B7A]">(service charge, mgmt, insurance)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7A]">£</span>
                  <input type="number" value={annualCosts} onChange={e => setAnnualCosts(e.target.value)}
                    className="lux-input pl-7 w-full" placeholder="8,000" />
                </div>
              </div>

              <hr className="border-[#E8E1D7]" />
              <h2 className="font-serif text-xl text-[#1C1A17]">Mortgage (Optional)</h2>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">Rate %</label>
                  <input type="number" step="0.1" value={mortgageRate} onChange={e => setMortgageRate(e.target.value)}
                    className="lux-input w-full" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">LTV %</label>
                  <input type="number" value={ltv} onChange={e => setLtv(e.target.value)}
                    className="lux-input w-full" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#7A6E60] mb-1.5">Term (yrs)</label>
                  <input type="number" value={mortgageTerm} onChange={e => setMortgageTerm(e.target.value)}
                    className="lux-input w-full" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Results */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-4">
              {/* Yield cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="lux-card p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-2">Gross Yield</p>
                  <p className={`font-serif text-4xl font-semibold ${yieldColor(grossYield)}`}>{grossYield.toFixed(2)}%</p>
                </div>
                <div className="lux-card p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-2">Net Yield</p>
                  <p className={`font-serif text-4xl font-semibold ${yieldColor(netYield)}`}>{netYield.toFixed(2)}%</p>
                </div>
              </div>

              <div className="lux-card p-5">
                <h3 className="font-serif text-lg text-[#1C1A17] mb-4">Annual Breakdown</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Annual Rental Income', fmt(annualRent), false],
                    ['Annual Running Costs', `– ${fmt(costs)}`, false],
                    ['Annual Mortgage', `– ${fmt(annualMortgage)}`, false],
                    ['Net Annual Cashflow', fmt(annualCashflow), true],
                  ].map(([label, value, bold]) => (
                    <div key={label as string} className={`flex justify-between py-1.5 border-b border-[#E8E1D7] last:border-0 ${bold ? 'font-semibold text-[#1C1A17]' : 'text-[#5F5448]'}`}>
                      <span>{label}</span>
                      <span className={annualCashflow < 0 && bold ? 'text-red-600' : bold ? 'text-emerald-700' : ''}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="lux-card p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-2">Cash-on-Cash Return</p>
                  <p className={`font-serif text-3xl font-semibold ${yieldColor(cashOnCash)}`}>{cashOnCash.toFixed(2)}%</p>
                  <p className="text-xs text-[#9A8B7A] mt-1">on {fmt(deposit)} deposit</p>
                </div>
                <div className="lux-card p-5 text-center">
                  <p className="text-xs uppercase tracking-widest text-[#7A6E60] mb-2">Monthly Mortgage</p>
                  <p className="font-serif text-3xl font-semibold text-[#1C1A17]">{fmt(monthlyMortgage)}</p>
                  <p className="text-xs text-[#9A8B7A] mt-1">repayment basis</p>
                </div>
              </div>

              <div className="lux-card p-4 bg-[#1C1A17]/5 flex gap-2 text-sm text-[#5F5448]">
                <Info size={14} className="text-[#C9A96A] mt-0.5 shrink-0" />
                <span>Calculations are indicative only. Consult a tax adviser for stamp duty, income tax, and allowable expenses.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Market Benchmarks */}
        <ScrollReveal delay={0.2} className="mt-12">
          <h2 className="font-serif text-2xl text-[#1C1A17] mb-6">Prime Market Yield Benchmarks — 2026</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#C9A96A]">
                  <th className="text-left py-3 pr-6 text-xs uppercase tracking-widest text-[#7A6E60]">Market</th>
                  <th className="text-center py-3 px-4 text-xs uppercase tracking-widest text-[#7A6E60]">Gross Yield</th>
                  <th className="text-center py-3 px-4 text-xs uppercase tracking-widest text-[#7A6E60]">Net Yield</th>
                  <th className="text-center py-3 px-4 text-xs uppercase tracking-widest text-[#7A6E60]">Cap Rate</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((b, i) => (
                  <tr key={b.city} className={`border-b border-[#E8E1D7] ${i % 2 === 0 ? 'bg-white/50' : ''}`}>
                    <td className="py-3 pr-6 font-medium text-[#1C1A17]">{b.city}</td>
                    <td className="py-3 px-4 text-center text-emerald-700 font-mono">{b.gross}</td>
                    <td className="py-3 px-4 text-center text-amber-700 font-mono">{b.net}</td>
                    <td className="py-3 px-4 text-center text-[#5F5448] font-mono">{b.cap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3} className="mt-12 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Ready to Invest?</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Speak with Our Investment Team</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our advisers can model multiple scenarios, introduce you to off-market opportunities, and structure your portfolio for maximum after-tax return.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="lux-button">Book a Consultation</Link>
            <Link href="/investor-intelligence" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Investor Intelligence</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
