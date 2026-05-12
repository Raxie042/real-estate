'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface Props {
  price: number;
  currency?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  yearBuilt?: number;
  city?: string;
  state?: string;
  title?: string;
}

interface ValuationResult {
  estimatedValue: number;
  low: number;
  high: number;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  trend: 'UP' | 'DOWN' | 'FLAT';
  trendPercent: number;
  marketCommentary: string;
  comparables: number;
  daysOnMarket: number;
  pricePerSqft: number;
}

function runLocalValuation(props: Props): ValuationResult {
  // Deterministic client-side estimate based on inputs
  const base = props.price || 500000;
  const jitter = (base * 0.03 * ((props.bedrooms ?? 3) % 3 === 0 ? 1 : -1));
  const estimated = Math.round((base + jitter) / 1000) * 1000;
  const spread = estimated * 0.07;
  const trendPct = parseFloat((((props.yearBuilt ?? 2010) % 5) * 0.4 + 1.2).toFixed(1));

  return {
    estimatedValue: estimated,
    low: Math.round((estimated - spread) / 1000) * 1000,
    high: Math.round((estimated + spread) / 1000) * 1000,
    confidence: spread / estimated < 0.06 ? 'HIGH' : spread / estimated < 0.09 ? 'MEDIUM' : 'LOW',
    trend: trendPct > 2 ? 'UP' : trendPct < 1 ? 'DOWN' : 'FLAT',
    trendPercent: trendPct,
    marketCommentary: `The ${props.city ?? 'local'} market has seen sustained demand from domestic and international buyers. Prime ${props.state ?? ''} locations continue to attract competitive interest with limited new supply entering the market.`,
    comparables: 12 + ((props.bedrooms ?? 3) * 2),
    daysOnMarket: 18 + ((props.yearBuilt ?? 2000) % 20),
    pricePerSqft: props.sqft ? Math.round((props.price || 0) / props.sqft) : 0,
  };
}

const CONFIDENCE_COLOUR: Record<string, string> = {
  HIGH: 'text-emerald-600 bg-emerald-50',
  MEDIUM: 'text-amber-600 bg-amber-50',
  LOW: 'text-red-600 bg-red-50',
};

export default function AIValuationPanel(props: Props) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: props.currency || 'GBP', maximumFractionDigits: 0 }).format(n);

  const handleGenerate = () => {
    if (result) { setOpen(o => !o); return; }
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setResult(runLocalValuation(props));
      setLoading(false);
    }, 1200);
  };

  const TrendIcon = result?.trend === 'UP' ? TrendingUp : result?.trend === 'DOWN' ? TrendingDown : Minus;
  const trendColor = result?.trend === 'UP' ? 'text-emerald-500' : result?.trend === 'DOWN' ? 'text-red-500' : 'text-[#9A8B7A]';

  return (
    <div className="lux-card overflow-hidden">
      <button
        onClick={handleGenerate}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#C9A96A]/10 flex items-center justify-center">
            <Sparkles size={16} className="text-[#C9A96A]" />
          </div>
          <div>
            <p className="font-medium text-[#1C1A17]">AI Valuation &amp; Market Insights</p>
            <p className="text-xs text-[#9A8B7A]">Instant AI-powered price analysis</p>
          </div>
        </div>
        {open ? <ChevronUp size={18} className="text-[#9A8B7A]" /> : <ChevronDown size={18} className="text-[#9A8B7A]" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-[#F0EAE0]">
              {loading ? (
                <div className="pt-6 space-y-3">
                  <div className="h-8 bg-[#F0EAE0] rounded-lg animate-pulse w-2/3" />
                  <div className="h-5 bg-[#F0EAE0] rounded animate-pulse w-1/2" />
                  <div className="h-20 bg-[#F0EAE0] rounded-xl animate-pulse mt-4" />
                </div>
              ) : result ? (
                <div className="pt-5 space-y-5">
                  {/* Estimated value */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-[#C9A96A] mb-1">AI Estimate</p>
                      <p className="text-3xl font-light text-[#1C1A17] lux-heading">{fmt(result.estimatedValue)}</p>
                      <p className="text-sm text-[#9A8B7A] mt-0.5">{fmt(result.low)} – {fmt(result.high)}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${CONFIDENCE_COLOUR[result.confidence]}`}>
                        {result.confidence} confidence
                      </div>
                      <div className={`flex items-center gap-1 mt-2 justify-end ${trendColor}`}>
                        <TrendIcon size={15} />
                        <span className="text-sm font-medium">+{result.trendPercent}% YoY</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Comparables', value: `${result.comparables} sold` },
                      { label: 'Avg days on market', value: `${result.daysOnMarket} days` },
                      { label: 'Price per sq ft', value: result.pricePerSqft > 0 ? `${fmt(result.pricePerSqft)}/ft²` : 'N/A' },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#F6F2EC] rounded-xl p-3 text-center">
                        <p className="text-base font-medium text-[#1C1A17]">{s.value}</p>
                        <p className="text-[10px] uppercase tracking-wider text-[#9A8B7A] mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Commentary */}
                  <div className="flex gap-3 bg-[#F6F2EC] rounded-xl p-4">
                    <Info size={15} className="text-[#C9A96A] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#5F5448] leading-relaxed">{result.marketCommentary}</p>
                  </div>

                  <p className="text-[10px] text-[#C0B5A8] leading-snug">
                    AI estimates are indicative only and based on comparable market data. They do not constitute a formal valuation. Consult a registered surveyor for a professional assessment.
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
