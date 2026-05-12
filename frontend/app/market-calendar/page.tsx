'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';

type Level = 'high' | 'medium' | 'low';

interface MonthData {
  month: string;
  short: string;
  buyerDemand: Level;
  sellerActivity: Level;
  priceIndex: number; // 100 = average
  tip: string;
}

type CityKey = 'London' | 'Dubai' | 'Edinburgh';

const CALENDAR: Record<CityKey, MonthData[]> = {
  London: [
    { month: 'January', short: 'Jan', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 95, tip: 'Quiet market. Good time to negotiate as buyers and sellers are rare.' },
    { month: 'February', short: 'Feb', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 97, tip: 'Market starts to wake up. Early movers can find less competition.' },
    { month: 'March', short: 'Mar', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 101, tip: 'Spring market begins. Strong buyer activity — list now to capture early demand.' },
    { month: 'April', short: 'Apr', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 103, tip: 'Peak spring season. High competition but also the best prices for sellers.' },
    { month: 'May', short: 'May', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 104, tip: 'One of the strongest months for completions. Market at its most active.' },
    { month: 'June', short: 'Jun', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 103, tip: 'Pre-summer rush. Buyers want to complete before school holidays.' },
    { month: 'July', short: 'Jul', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 99, tip: 'School holidays slow things. Good time to search with less competition.' },
    { month: 'August', short: 'Aug', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 97, tip: 'Quietest month. Serious buyers can negotiate well.' },
    { month: 'September', short: 'Sep', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 102, tip: 'Autumn surge. Second-best time to list; schools back, buyers re-engage.' },
    { month: 'October', short: 'Oct', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 101, tip: 'Strong demand continues. Good balance of listings and buyers.' },
    { month: 'November', short: 'Nov', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 99, tip: 'Market slows ahead of Christmas. Pre-Christmas buyers are motivated.' },
    { month: 'December', short: 'Dec', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 96, tip: 'Market pauses. Useful time to prepare your property for January re-launch.' },
  ],
  Dubai: [
    { month: 'January', short: 'Jan', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 104, tip: 'Peak season. International buyers arrive; high transaction volumes.' },
    { month: 'February', short: 'Feb', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 105, tip: 'Strong market continues. MIPIM & real estate conferences drive activity.' },
    { month: 'March', short: 'Mar', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 103, tip: 'Very active. Good time for both sellers and motivated buyers.' },
    { month: 'April', short: 'Apr', buyerDemand: 'medium', sellerActivity: 'medium', priceIndex: 100, tip: 'Ramadan period may slow activity. Family-oriented decisions take priority.' },
    { month: 'May', short: 'May', buyerDemand: 'medium', sellerActivity: 'medium', priceIndex: 99, tip: 'Post-Ramadan. Market gradually picks back up with Eid bounce.' },
    { month: 'June', short: 'Jun', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 95, tip: 'Summer exodus begins. Many buyers and sellers are abroad.' },
    { month: 'July', short: 'Jul', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 94, tip: 'Quietest month. Extreme heat reduces activity significantly.' },
    { month: 'August', short: 'Aug', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 94, tip: 'Summer slump continues. Off-plan launches are the main activity.' },
    { month: 'September', short: 'Sep', buyerDemand: 'medium', sellerActivity: 'medium', priceIndex: 98, tip: 'Market restarts as residents return. Good time to prepare a listing.' },
    { month: 'October', short: 'Oct', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 102, tip: 'Autumn peak begins. International buyers return and Cityscape Dubai drives interest.' },
    { month: 'November', short: 'Nov', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 104, tip: 'One of the strongest months. Perfect weather and high international visitor numbers.' },
    { month: 'December', short: 'Dec', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 103, tip: 'Holiday season brings wealthy short-let guests who become buyers. Very active.' },
  ],
  Edinburgh: [
    { month: 'January', short: 'Jan', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 95, tip: 'Quiet. Scottish winter keeps activity low. Motivated buyers face little competition.' },
    { month: 'February', short: 'Feb', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 97, tip: 'Market wakes up. Early spring listings attract less competition.' },
    { month: 'March', short: 'Mar', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 101, tip: 'Strong spring start. New Town properties launch well in March light.' },
    { month: 'April', short: 'Apr', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 103, tip: 'Spring peak. Country estates and townhouses both attract strong interest.' },
    { month: 'May', short: 'May', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 104, tip: 'Best month to list. Long daylight hours and gardens in bloom.' },
    { month: 'June', short: 'Jun', buyerDemand: 'high', sellerActivity: 'medium', priceIndex: 103, tip: 'Pre-Festival buyers want to complete before August. High demand.' },
    { month: 'July', short: 'Jul', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 100, tip: 'Edinburgh Fringe Festival preparation. Seasonal rentals dominate.' },
    { month: 'August', short: 'Aug', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 100, tip: 'Festival month. Fewer listings but Festival visitors sometimes convert to buyers.' },
    { month: 'September', short: 'Sep', buyerDemand: 'high', sellerActivity: 'high', priceIndex: 102, tip: 'Post-Festival autumn surge. One of the most active months for estate sales.' },
    { month: 'October', short: 'Oct', buyerDemand: 'medium', sellerActivity: 'medium', priceIndex: 99, tip: 'Autumn half-term. Country property viewings peak as foliage is at its best.' },
    { month: 'November', short: 'Nov', buyerDemand: 'medium', sellerActivity: 'low', priceIndex: 97, tip: 'Market quietens. Good time for buyers to negotiate.' },
    { month: 'December', short: 'Dec', buyerDemand: 'low', sellerActivity: 'low', priceIndex: 95, tip: 'Festive season. Very quiet — use time to prepare for January launch.' },
  ],
};

const LEVEL_BG: Record<Level, string> = {
  high: 'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-50 text-amber-700',
  low: 'bg-[#F6F2EC] text-[#9A8B7A]',
};

const LEVEL_LABEL: Record<Level, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

function PriceBar({ index }: { index: number }) {
  const pct = Math.max(0, Math.min(100, ((index - 90) / 20) * 100));
  const color = index >= 103 ? 'bg-emerald-500' : index >= 99 ? 'bg-[#C9A96A]' : 'bg-[#B9AA98]';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-[#E8E1D7] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-[#5F5448] w-8 text-right">{index}</span>
    </div>
  );
}

export default function MarketCalendarPage() {
  const [city, setCity] = useState<CityKey>('London');
  const [selected, setSelected] = useState<number | null>(null);
  const data = CALENDAR[city];
  const now = new Date().getMonth(); // 0-indexed

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Research</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Seasonal Market Calendar</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Know when to list, when to buy, and when to wait. Month-by-month demand analysis for London, Dubai and Edinburgh.</motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* City selector */}
        <div className="flex gap-2 mb-8">
          {(['London', 'Dubai', 'Edinburgh'] as CityKey[]).map(c => (
            <button key={c} onClick={() => { setCity(c); setSelected(null); }}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition ${city === c ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]' : 'bg-white text-[#5F5448] border-[#E8E1D7] hover:border-[#C9A96A]'}`}>
              {c}
            </button>
          ))}
        </div>

        {/* Calendar grid */}
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
            {data.map((m, i) => (
              <button key={m.month} onClick={() => setSelected(selected === i ? null : i)}
                className={`lux-card p-4 text-left transition hover:ring-2 hover:ring-[#C9A96A] ${selected === i ? 'ring-2 ring-[#C9A96A]' : ''} ${i === now ? 'ring-1 ring-[#C9A96A]/50' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-[#1C1A17] text-sm">{m.short}</p>
                  {i === now && <span className="text-[9px] bg-[#C9A96A] text-[#1C1A17] rounded-full px-1.5">Now</span>}
                </div>
                <div className="space-y-1 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#9A8B7A]">Buyers</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${LEVEL_BG[m.buyerDemand]}`}>{LEVEL_LABEL[m.buyerDemand]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#9A8B7A]">Sellers</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${LEVEL_BG[m.sellerActivity]}`}>{LEVEL_LABEL[m.sellerActivity]}</span>
                  </div>
                </div>
                <PriceBar index={m.priceIndex} />
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Selected month detail */}
        {selected !== null && (
          <ScrollReveal>
            <div className="lux-card p-6 mb-8 border-l-4 border-[#C9A96A]">
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={16} className="text-[#C9A96A]" />
                <h3 className="font-serif text-xl text-[#1C1A17]">{data[selected].month} — {city}</h3>
              </div>
              <p className="text-sm text-[#5F5448] mb-4">{data[selected].tip}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-[#F6F2EC] rounded-xl p-3">
                  <p className="text-xs text-[#9A8B7A] mb-1">Buyer Demand</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${LEVEL_BG[data[selected].buyerDemand]}`}>{LEVEL_LABEL[data[selected].buyerDemand]}</span>
                </div>
                <div className="bg-[#F6F2EC] rounded-xl p-3">
                  <p className="text-xs text-[#9A8B7A] mb-1">Seller Activity</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${LEVEL_BG[data[selected].sellerActivity]}`}>{LEVEL_LABEL[data[selected].sellerActivity]}</span>
                </div>
                <div className="bg-[#F6F2EC] rounded-xl p-3">
                  <p className="text-xs text-[#9A8B7A] mb-1">Price Index</p>
                  <p className="font-bold text-[#1C1A17] text-lg">{data[selected].priceIndex}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Legend */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-4 text-xs text-[#5F5448] mb-10">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300" />High activity</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-50 border border-amber-200" />Medium activity</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-[#F6F2EC] border border-[#E8E1D7]" />Low activity</div>
            <div className="flex items-center gap-1.5"><span className="text-[#9A8B7A]">Price index: 100 = annual average. Above 100 = above average prices.</span></div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Time Your Move</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Talk to Our Research Team</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Need a bespoke market timing analysis for your property or purchase? Our research team can advise based on your specific situation.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact" className="lux-button">Speak to Research</Link>
            <Link href="/wealth-report" className="lux-button-outline border-[#C9A96A]/40 text-[#C9A96A] hover:bg-[#C9A96A]/10">Download Wealth Report</Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
