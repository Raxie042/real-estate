'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import { ArrowLeftRight, Info } from 'lucide-react';

// Indicative mid-market rates vs GBP — May 2026
const RATES: Record<string, number> = {
  GBP: 1,
  USD: 1.265,
  EUR: 1.175,
  AED: 4.644,
  SGD: 1.698,
  HKD: 9.876,
  CHF: 1.125,
  AUD: 1.935,
  JPY: 191.2,
  CAD: 1.718,
  QAR: 4.604,
  SAR: 4.744,
  NOK: 13.42,
  SEK: 13.88,
};

const CURRENCIES = [
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£', flag: '🇬🇧' },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'QR', flag: '🇶🇦' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR', flag: '🇸🇦' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
];

const PROPERTY_EXAMPLES = [
  { label: 'London Pied-à-Terre', gbp: 1_200_000 },
  { label: 'Mayfair Apartment', gbp: 2_500_000 },
  { label: 'DIFC Penthouse', gbp: 3_200_000 },
  { label: 'Country Estate', gbp: 5_000_000 },
  { label: 'Monaco Villa', gbp: 12_000_000 },
  { label: 'Scottish Castle', gbp: 8_500_000 },
];

function convertAmount(amount: number, from: string, to: string): number {
  const inGBP = amount / RATES[from];
  return inGBP * RATES[to];
}

function formatCurrency(amount: number, code: string): string {
  const cur = CURRENCIES.find(c => c.code === code);
  const sym = cur?.symbol ?? code;
  if (code === 'JPY') return `${sym}${Math.round(amount).toLocaleString('en-GB')}`;
  return `${sym}${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function CurrencyConverterPage() {
  const [rawAmount, setRawAmount] = useState('2500000');
  const [from, setFrom] = useState('GBP');
  const [to, setTo] = useState('USD');
  const [result, setResult] = useState(0);

  const numericAmount = parseFloat(rawAmount.replace(/,/g, '')) || 0;

  useEffect(() => {
    setResult(convertAmount(numericAmount, from, to));
  }, [rawAmount, from, to, numericAmount]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const rate = RATES[to] / RATES[from];

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-4">Tools</p>
          <h1 className="text-4xl md:text-5xl font-light text-white lux-heading mb-4">
            Currency Converter
          </h1>
          <p className="text-[#9A8B7A] font-light max-w-xl mx-auto">
            Indicative exchange rates for luxury property buyers and investors across global markets.
          </p>
        </div>
      </div>

      {/* Main Converter Card */}
      <div className="max-w-2xl mx-auto px-6 -mt-6">
        <ScrollReveal>
          <div className="lux-card p-8 shadow-xl">
            {/* Amount */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest text-[#9A8B7A] mb-2">Amount</label>
              <input
                type="text"
                value={rawAmount}
                onChange={e => setRawAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                className="lux-input text-2xl font-light w-full"
                placeholder="2,500,000"
              />
            </div>

            {/* From / Swap / To */}
            <div className="flex items-end gap-3 mb-6">
              <div className="flex-1">
                <label className="block text-xs uppercase tracking-widest text-[#9A8B7A] mb-2">From</label>
                <select
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                  className="lux-input w-full"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={swap}
                className="w-10 h-10 rounded-full border border-[#C9A96A] text-[#C9A96A] flex items-center justify-center hover:bg-[#C9A96A] hover:text-[#1C1A17] transition-colors shrink-0 mb-1"
                title="Swap currencies"
              >
                <ArrowLeftRight size={16} />
              </button>

              <div className="flex-1">
                <label className="block text-xs uppercase tracking-widest text-[#9A8B7A] mb-2">To</label>
                <select
                  value={to}
                  onChange={e => setTo(e.target.value)}
                  className="lux-input w-full"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Result */}
            <div className="bg-[#1C1A17] rounded-lg p-6 text-center mb-4">
              <p className="text-[#9A8B7A] text-sm mb-1">
                {formatCurrency(numericAmount, from)} equals
              </p>
              <p className="text-4xl md:text-5xl font-light text-white lux-heading">
                {formatCurrency(result, to)}
              </p>
              <p className="text-[#C9A96A] text-xs mt-3 tracking-wide">
                1 {from} = {rate.toLocaleString('en-GB', { minimumFractionDigits: 4, maximumFractionDigits: 4 })} {to}
              </p>
            </div>

            {/* Disclaimer */}
            <div className="flex gap-2 text-xs text-[#9A8B7A]">
              <Info size={14} className="shrink-0 mt-0.5 text-[#C9A96A]" />
              <p>
                Rates are indicative mid-market rates for guidance only and may differ from rates available for actual transactions.
                Contact our team for live transaction rates.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Property Price Reference Table */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <ScrollReveal>
          <h2 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">Property Price Reference</h2>
          <div className="lux-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1C1A17]">
                  <th className="text-left px-5 py-3 text-[#C9A96A] font-medium text-xs uppercase tracking-widest">Property</th>
                  <th className="text-right px-5 py-3 text-[#C9A96A] font-medium text-xs uppercase tracking-widest">{from}</th>
                  <th className="text-right px-5 py-3 text-[#C9A96A] font-medium text-xs uppercase tracking-widest">{to}</th>
                </tr>
              </thead>
              <tbody>
                {PROPERTY_EXAMPLES.map((ex, i) => {
                  const inFrom = convertAmount(ex.gbp, 'GBP', from);
                  const inTo = convertAmount(ex.gbp, 'GBP', to);
                  return (
                    <tr key={ex.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F6F2EC]'}>
                      <td className="px-5 py-3 text-[#1C1A17] font-medium">{ex.label}</td>
                      <td className="px-5 py-3 text-right text-[#5F5448]">{formatCurrency(inFrom, from)}</td>
                      <td className="px-5 py-3 text-right font-semibold text-[#1C1A17]">{formatCurrency(inTo, to)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>

      {/* All Rates Grid */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <ScrollReveal>
          <h2 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">
            All Rates vs {CURRENCIES.find(c => c.code === from)?.flag} {from}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CURRENCIES.filter(c => c.code !== from).map(c => {
              const r = RATES[c.code] / RATES[from];
              return (
                <div
                  key={c.code}
                  className="lux-card p-4 flex items-center justify-between cursor-pointer hover:border-[#C9A96A] transition-colors"
                  onClick={() => setTo(c.code)}
                  title={`Convert to ${c.name}`}
                >
                  <div>
                    <span className="text-lg mr-1">{c.flag}</span>
                    <span className="font-semibold text-[#1C1A17] text-sm">{c.code}</span>
                    <p className="text-xs text-[#9A8B7A] mt-0.5">{c.name}</p>
                  </div>
                  <p className="text-[#C9A96A] font-semibold text-sm tabular-nums">
                    {r.toLocaleString('en-GB', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
