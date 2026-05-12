'use client';
import { useState, useCallback } from 'react';

type PropertyType = 'residential' | 'additional';

interface Band { limit: number; rate: number; addRate: number; }

const BANDS: Band[] = [
  { limit: 250000,   rate: 0,    addRate: 0.03 },
  { limit: 925000,   rate: 0.05, addRate: 0.08 },
  { limit: 1500000,  rate: 0.10, addRate: 0.13 },
  { limit: Infinity, rate: 0.12, addRate: 0.15 },
];

function calcSDLT(price: number, type: PropertyType): { tax: number; effective: number; bands: { label: string; tax: number }[] } {
  let tax = 0;
  let prev = 0;
  const breakdown: { label: string; tax: number }[] = [];

  for (const band of BANDS) {
    const top = Math.min(price, band.limit);
    if (top <= prev) break;
    const taxable = top - prev;
    const rate = type === 'additional' ? band.addRate : band.rate;
    const bandTax = taxable * rate;
    if (bandTax > 0) {
      breakdown.push({ label: `${(rate * 100).toFixed(0)}% on £${prev.toLocaleString()} – £${top.toLocaleString()}`, tax: bandTax });
    }
    tax += bandTax;
    prev = band.limit;
  }
  return { tax, effective: price > 0 ? (tax / price) * 100 : 0, bands: breakdown };
}

export default function StampDutyCalculator() {
  const [price, setPrice] = useState('');
  const [type, setType] = useState<PropertyType>('residential');
  const [result, setResult] = useState<ReturnType<typeof calcSDLT> | null>(null);

  const calculate = useCallback(() => {
    const p = parseFloat(price.replace(/,/g, ''));
    if (!p || p < 0) return;
    setResult(calcSDLT(p, type));
  }, [price, type]);

  const fmt = (n: number) => `£${Math.round(n).toLocaleString()}`;

  return (
    <div className="lux-card p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">Stamp Duty Calculator</h2>

      <div className="space-y-5 mb-7">
        <div>
          <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Property Price (£)</label>
          <input
            type="text"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="lux-input w-full"
            placeholder="e.g. 850,000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#1C1A17] mb-2">Property Type</label>
          <div className="flex gap-3">
            {(['residential', 'additional'] as const).map(t => (
              <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-lg border text-sm transition-colors ${type === t ? 'bg-[#1C1A17] text-white border-[#1C1A17]' : 'bg-white text-[#5F5448] border-[#E8E1D7] hover:bg-[#F0EBE3]'}`}>
                {t === 'residential' ? 'Main Residence' : 'Additional / Buy-to-Let'}
              </button>
            ))}
          </div>
        </div>
        <button onClick={calculate} className="lux-button w-full">Calculate SDLT</button>
      </div>

      {result && (
        <div className="border-t border-[#E8E1D7] pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5F5448]">Total Stamp Duty</span>
            <span className="text-3xl font-semibold text-[#1C1A17]">{fmt(result.tax)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-[#5F5448]">Effective Rate</span>
            <span className="text-lg font-semibold text-[#C9A96A]">{result.effective.toFixed(2)}%</span>
          </div>
          {result.bands.length > 0 && (
            <div className="bg-[#F6F2EC] rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-[#7A6E60] uppercase tracking-widest mb-3">Breakdown</p>
              {result.bands.map(b => (
                <div key={b.label} className="flex justify-between text-sm">
                  <span className="text-[#5F5448]">{b.label}</span>
                  <span className="font-medium text-[#1C1A17]">{fmt(b.tax)}</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-[#9A8B7A]">Based on England & Northern Ireland SDLT rates effective from October 2024. Scotland and Wales have different systems (LBTT / LTT). This tool provides an estimate only — confirm rates with your solicitor.</p>
        </div>
      )}
    </div>
  );
}
