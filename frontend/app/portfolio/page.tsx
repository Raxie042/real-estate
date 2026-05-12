'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Plus, Trash2, Edit2, TrendingUp, TrendingDown, Home, DollarSign, CheckCircle } from 'lucide-react';

interface Property {
  id: string;
  address: string;
  purchasePrice: number;
  currentEstimate: number;
  mortgageBalance: number;
  annualRent: number;
  currency: string;
}

const EMPTY_FORM: Omit<Property, 'id'> = {
  address: '',
  purchasePrice: 0,
  currentEstimate: 0,
  mortgageBalance: 0,
  annualRent: 0,
  currency: 'GBP',
};

const CURRENCY_SYMBOLS: Record<string, string> = {
  GBP: '£', USD: '$', EUR: '€', AED: 'AED ',
};

function fmt(n: number, currency: string) {
  const sym = CURRENCY_SYMBOLS[currency] || currency + ' ';
  if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `${sym}${(n / 1_000).toFixed(0)}k`;
  return `${sym}${n.toLocaleString()}`;
}

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

const DEMO_PROPERTIES: Property[] = [
  { id: 'demo1', address: 'Flat 4, 14 Egerton Gardens, London SW3', purchasePrice: 1_450_000, currentEstimate: 1_680_000, mortgageBalance: 650_000, annualRent: 0, currency: 'GBP' },
  { id: 'demo2', address: 'Villa 7, Palm Jumeirah Fronds, Dubai', purchasePrice: 8_200_000, currentEstimate: 11_500_000, mortgageBalance: 0, annualRent: 380_000, currency: 'AED' },
];

export default function PortfolioPage() {
  const [properties, setProperties] = useState<Property[]>(DEMO_PROPERTIES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Property, 'id'>>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Use GBP for totals (AED ≈ 0.22 GBP for display purposes)
  const AED_RATE = 0.22;
  const toGBP = (p: Property) => {
    const rate = p.currency === 'AED' ? AED_RATE : p.currency === 'EUR' ? 0.86 : p.currency === 'USD' ? 0.79 : 1;
    return { value: p.currentEstimate * rate, equity: (p.currentEstimate - p.mortgageBalance) * rate, gain: (p.currentEstimate - p.purchasePrice) * rate, rent: p.annualRent * rate };
  };

  const totals = properties.reduce((acc, p) => {
    const g = toGBP(p);
    return { value: acc.value + g.value, equity: acc.equity + g.equity, gain: acc.gain + g.gain, rent: acc.rent + g.rent };
  }, { value: 0, equity: 0, gain: 0, rent: 0 });

  const totalYield = totals.value > 0 ? ((totals.rent / totals.value) * 100).toFixed(2) : '0.00';

  const handleSave = () => {
    if (!form.address || form.currentEstimate <= 0) {
      setError('Address and current estimate are required.');
      return;
    }
    if (editId) {
      setProperties(prev => prev.map(p => p.id === editId ? { ...form, id: editId } : p));
      setEditId(null);
    } else {
      setProperties(prev => [...prev, { ...form, id: genId() }]);
    }
    setForm(EMPTY_FORM);
    setShowForm(false);
    setError('');
  };

  const handleEdit = (p: Property) => {
    const { id, ...rest } = p;
    setForm(rest);
    setEditId(id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const handleChange = (field: string, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Private Client</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Portfolio Wealth Tracker</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Track all your properties in one place. Monitor total portfolio value, equity, yield and unrealised gains. All data is stored locally in your browser.</motion.p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Note:</strong> This tracker stores data in your browser only — no data is sent to any server. Estimates are for planning purposes only. Currency conversions to GBP use approximate rates. Not financial advice.
        </div>
      </div>

      {/* Summary cards */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Portfolio Value', value: `£${(totals.value / 1_000_000).toFixed(2)}m`, icon: Home, pos: true },
            { label: 'Total Equity', value: `£${(totals.equity / 1_000_000).toFixed(2)}m`, icon: DollarSign, pos: true },
            { label: 'Unrealised Gain', value: `${totals.gain >= 0 ? '+' : ''}£${(totals.gain / 1_000_000).toFixed(2)}m`, icon: totals.gain >= 0 ? TrendingUp : TrendingDown, pos: totals.gain >= 0 },
            { label: 'Portfolio Yield', value: `${totalYield}%`, icon: CheckCircle, pos: true },
          ].map(({ label, value, icon: Icon, pos }) => (
            <ScrollReveal key={label}>
              <div className="lux-card p-5 text-center">
                <Icon size={18} className={`mx-auto mb-2 ${pos ? 'text-[#C9A96A]' : 'text-red-400'}`} />
                <p className="text-xs text-[#9A8B7A] mb-1">{label}</p>
                <p className={`font-serif text-xl font-semibold ${pos ? 'text-[#1C1A17]' : 'text-red-500'}`}>{value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Property list */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl text-[#1C1A17]">Your Properties</h2>
          <button onClick={() => { setShowForm(v => !v); setEditId(null); setForm(EMPTY_FORM); }}
            className="lux-button flex items-center gap-1.5 text-sm"><Plus size={14} />Add Property</button>
        </div>

        {/* Add/Edit form */}
        {showForm && (
          <ScrollReveal>
            <div className="lux-card p-6 mb-6">
              <h3 className="font-serif text-xl text-[#1C1A17] mb-4">{editId ? 'Edit Property' : 'Add Property'}</h3>
              {error && <p className="text-red-600 text-xs mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Property Address *</label>
                  <input value={form.address} onChange={e => handleChange('address', e.target.value)} className="lux-input w-full" placeholder="e.g. Flat 2, 10 Park Lane, London W1" />
                </div>
                <div>
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Currency</label>
                  <select value={form.currency} onChange={e => handleChange('currency', e.target.value)} className="lux-input w-full">
                    {Object.entries(CURRENCY_SYMBOLS).map(([k, v]) => <option key={k} value={k}>{k} ({v.trim()})</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Purchase Price</label>
                  <input type="number" value={form.purchasePrice || ''} onChange={e => handleChange('purchasePrice', parseFloat(e.target.value) || 0)} className="lux-input w-full" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Current Estimate *</label>
                  <input type="number" value={form.currentEstimate || ''} onChange={e => handleChange('currentEstimate', parseFloat(e.target.value) || 0)} className="lux-input w-full" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Mortgage Balance (0 if none)</label>
                  <input type="number" value={form.mortgageBalance || ''} onChange={e => handleChange('mortgageBalance', parseFloat(e.target.value) || 0)} className="lux-input w-full" placeholder="0" />
                </div>
                <div>
                  <label className="text-xs text-[#9A8B7A] mb-1 block">Annual Rental Income (0 if owner-occupied)</label>
                  <input type="number" value={form.annualRent || ''} onChange={e => handleChange('annualRent', parseFloat(e.target.value) || 0)} className="lux-input w-full" placeholder="0" />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleSave} className="lux-button">{editId ? 'Save Changes' : 'Add to Portfolio'}</button>
                <button onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); setError(''); }} className="px-4 py-2.5 rounded-xl border border-[#E8E1D7] text-sm text-[#5F5448] hover:border-[#C9A96A] transition">Cancel</button>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Properties table */}
        {properties.length === 0 ? (
          <div className="lux-card p-10 text-center">
            <Home size={32} className="text-[#C9A96A] mx-auto mb-3" />
            <p className="text-[#5F5448]">No properties added yet. Click &ldquo;Add Property&rdquo; to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {properties.map((p, i) => {
              const sym = CURRENCY_SYMBOLS[p.currency] || p.currency + ' ';
              const equity = p.currentEstimate - p.mortgageBalance;
              const gain = p.currentEstimate - p.purchasePrice;
              const gainPct = p.purchasePrice > 0 ? ((gain / p.purchasePrice) * 100).toFixed(1) : '—';
              const yld = p.currentEstimate > 0 && p.annualRent > 0 ? ((p.annualRent / p.currentEstimate) * 100).toFixed(2) : null;
              return (
                <ScrollReveal key={p.id} delay={i * 0.05}>
                  <div className="lux-card p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-medium text-[#1C1A17] text-sm">{p.address}</h3>
                        <p className="text-xs text-[#9A8B7A]">{p.currency}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A] transition text-[#9A8B7A] hover:text-[#C9A96A]"><Edit2 size={13} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg border border-[#E8E1D7] hover:border-red-300 transition text-[#9A8B7A] hover:text-red-500"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <div className="bg-[#F6F2EC] rounded-lg p-2.5">
                        <p className="text-[#9A8B7A] mb-0.5">Current Value</p>
                        <p className="font-semibold text-[#1C1A17]">{fmt(p.currentEstimate, p.currency)}</p>
                      </div>
                      <div className="bg-[#F6F2EC] rounded-lg p-2.5">
                        <p className="text-[#9A8B7A] mb-0.5">Equity</p>
                        <p className="font-semibold text-[#1C1A17]">{fmt(equity, p.currency)}</p>
                      </div>
                      <div className="bg-[#F6F2EC] rounded-lg p-2.5">
                        <p className="text-[#9A8B7A] mb-0.5">Gain / Loss</p>
                        <p className={`font-semibold ${gain >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{gain >= 0 ? '+' : ''}{fmt(gain, p.currency)} ({gainPct}%)</p>
                      </div>
                      <div className="bg-[#F6F2EC] rounded-lg p-2.5">
                        <p className="text-[#9A8B7A] mb-0.5">Gross Yield</p>
                        <p className="font-semibold text-[#1C1A17]">{yld ? `${yld}%` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <ScrollReveal delay={0.2} className="mt-10 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Private Client Services</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Professional Portfolio Review</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our private client team can provide a formal portfolio valuation report, yield analysis and acquisition strategy tailored to your circumstances.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="lux-button">Request a Review</Link>
            <Link href="/wealth-report" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Download Wealth Report</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
