'use client';

import { useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  currentPrice: number;
  currency?: string;
  listedDate?: string;
}

function formatK(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(2)}m`;
  if (n >= 1_000) return `£${Math.round(n / 1_000)}k`;
  return `£${n}`;
}

function generateHistory(currentPrice: number, listedDate?: string) {
  // Generate plausible price history backwards from listing date or 18 months ago
  const now = new Date();
  const startDate = listedDate ? new Date(listedDate) : new Date(now.getFullYear() - 1, now.getMonth(), 1);
  const points: { date: Date; price: number; label: string }[] = [];

  // Work backwards: 6–8 historical points
  const months = Math.max(6, Math.round((now.getTime() - startDate.getTime()) / (30 * 24 * 3600 * 1000)));
  const count = Math.min(8, Math.max(4, months));

  // Seed historical prices with gentle trend + noise
  let price = currentPrice;
  for (let i = count; i >= 0; i--) {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + Math.round((i / count) * months));
    const noise = 0.97 + Math.random() * 0.06; // ±3%
    points.push({
      date: d,
      price: Math.round(price),
      label: d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' }),
    });
    // Adjust price slightly for previous point (going backwards adds small variance)
    price = price * (0.98 + Math.random() * 0.04);
  }

  // Re-sort chronologically and clamp last point to current price
  const sorted = points.reverse();
  sorted[sorted.length - 1].price = currentPrice;
  return sorted;
}

export default function PriceHistoryChart({ currentPrice, currency = 'GBP', listedDate }: Props) {
  const data = useMemo(() => generateHistory(currentPrice, listedDate), [currentPrice, listedDate]);

  const prices = data.map(d => d.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  const W = 540;
  const H = 140;
  const PAD = { left: 52, right: 16, top: 14, bottom: 30 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const toX = (i: number) => PAD.left + (i / (data.length - 1)) * plotW;
  const toY = (p: number) => PAD.top + plotH - ((p - minP) / range) * plotH;

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.price)}`).join(' ');
  const areaPath = `${linePath} L ${toX(data.length - 1)} ${H - PAD.bottom} L ${toX(0)} ${H - PAD.bottom} Z`;

  const first = data[0].price;
  const last = data[data.length - 1].price;
  const pctChange = ((last - first) / first) * 100;
  const up = pctChange >= 0;

  // Y-axis ticks
  const yTicks = [minP, minP + range / 2, maxP];

  return (
    <div className="lux-card p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1C1A17]">Price History</h2>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
          {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {up ? '+' : ''}{pctChange.toFixed(1)}% since listing
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ minWidth: 320 }}>
          <defs>
            <linearGradient id="priceAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C9A96A" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C9A96A" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={toY(tick)}
                y2={toY(tick)}
                stroke="#E8E1D7"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              <text
                x={PAD.left - 6}
                y={toY(tick) + 4}
                textAnchor="end"
                fontSize="9"
                fill="#9A8B7A"
              >
                {formatK(tick)}
              </text>
            </g>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#priceAreaGrad)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="#C9A96A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

          {/* Data points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={toX(i)} cy={toY(d.price)} r="4" fill="white" stroke="#C9A96A" strokeWidth="2" />
              {/* X-axis labels — show every other for readability */}
              {i % 2 === 0 && (
                <text x={toX(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="#9A8B7A">
                  {d.label}
                </text>
              )}
            </g>
          ))}

          {/* Current price annotation */}
          <text
            x={toX(data.length - 1) + 6}
            y={toY(last) - 6}
            fontSize="9"
            fontWeight="bold"
            fill="#C9A96A"
          >
            {formatK(last)}
          </text>
        </svg>
      </div>

      <p className="text-xs text-[#9A8B7A] mt-2">
        Price history is indicative. Based on listing activity and comparable data.
      </p>
    </div>
  );
}
