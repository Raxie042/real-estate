'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { TrendingUp, Star, Clock, Award, ChevronUp, ChevronDown } from 'lucide-react';

type SortKey = 'volume' | 'sold' | 'dom' | 'rating';

interface Agent {
  rank: number;
  name: string;
  agency: string;
  city: string;
  speciality: string;
  volume: string;
  volumeNum: number;
  sold: number;
  dom: number;
  rating: number;
  reviews: number;
  badge?: string;
}

const AGENTS: Agent[] = [
  { rank: 1, name: 'Harriet Wyndham', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'Prime Central London', volume: '£142m', volumeNum: 142, sold: 34, dom: 18, rating: 4.97, reviews: 84, badge: 'Top Performer 2025' },
  { rank: 2, name: 'James Al-Rashid', agency: 'Raxie Zenith Estate', city: 'Dubai', speciality: 'Palm & Downtown Dubai', volume: 'AED 520m', volumeNum: 112, sold: 61, dom: 22, rating: 4.95, reviews: 128, badge: 'Most Sales 2025' },
  { rank: 3, name: 'Catriona Sutherland', agency: 'Raxie Zenith Estate', city: 'Edinburgh', speciality: 'Edinburgh New Town', volume: '£88m', volumeNum: 88, sold: 29, dom: 31, rating: 4.93, reviews: 61 },
  { rank: 4, name: 'Oliver Pemberton', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'Knightsbridge & Belgravia', volume: '£97m', volumeNum: 97, sold: 22, dom: 24, rating: 4.91, reviews: 48 },
  { rank: 5, name: 'Sophie Mercier', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'Notting Hill & Kensington', volume: '£76m', volumeNum: 76, sold: 31, dom: 19, rating: 4.90, reviews: 72 },
  { rank: 6, name: 'Tarquin Blackwood', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'Mayfair & St James\'s', volume: '£134m', volumeNum: 134, sold: 18, dom: 27, rating: 4.89, reviews: 37 },
  { rank: 7, name: 'Aisha Mensah', agency: 'Raxie Zenith Estate', city: 'Dubai', speciality: 'Jumeirah & Emirates Hills', volume: 'AED 380m', volumeNum: 82, sold: 44, dom: 29, rating: 4.88, reviews: 95 },
  { rank: 8, name: 'Rupert Carmichael', agency: 'Raxie Zenith Estate', city: 'Edinburgh', speciality: 'Country Estates & Perthshire', volume: '£62m', volumeNum: 62, sold: 16, dom: 58, rating: 4.86, reviews: 29, badge: 'Country Specialist' },
  { rank: 9, name: 'Natasha Kowalski', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'Fitzrovia & Marylebone', volume: '£54m', volumeNum: 54, sold: 26, dom: 22, rating: 4.85, reviews: 53 },
  { rank: 10, name: 'Marcus Delacroix', agency: 'Raxie Zenith Estate', city: 'London', speciality: 'South Kensington & Chelsea', volume: '£69m', volumeNum: 69, sold: 19, dom: 26, rating: 4.82, reviews: 44 },
];

const CITIES = ['All', 'London', 'Dubai', 'Edinburgh'];

export default function AgentRankingsPage() {
  const [city, setCity] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(false); }
  };

  const displayed = [...AGENTS]
    .filter(a => city === 'All' || a.city === city)
    .sort((a, b) => {
      const mul = sortAsc ? 1 : -1;
      if (sortKey === 'volume') return mul * (a.volumeNum - b.volumeNum);
      if (sortKey === 'sold') return mul * (a.sold - b.sold);
      if (sortKey === 'dom') return mul * (a.dom - b.dom);
      if (sortKey === 'rating') return mul * (a.rating - b.rating);
      return 0;
    });

  const SortIcon = ({ k }: { k: SortKey }) => sortKey === k
    ? (sortAsc ? <ChevronUp size={12} /> : <ChevronDown size={12} />)
    : <span className="opacity-30"><ChevronDown size={12} /></span>;

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Transparency</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Agent Performance Rankings</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Transparent rankings by transaction volume, properties sold, average days on market and verified client rating. Updated quarterly.</motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-7 items-center justify-between">
          <div className="flex gap-1.5">
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition ${city === c ? 'bg-[#C9A96A] text-[#1C1A17] border-[#C9A96A]' : 'bg-white text-[#5F5448] border-[#E8E1D7] hover:border-[#C9A96A]'}`}>
                {c}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#9A8B7A]">Showing {displayed.length} agents</p>
        </div>

        {/* Table */}
        <ScrollReveal>
          <div className="lux-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#F6F2EC] border-b border-[#E8E1D7]">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs text-[#9A8B7A] font-medium">#</th>
                    <th className="text-left px-4 py-3 text-xs text-[#9A8B7A] font-medium">Agent</th>
                    <th className="text-left px-4 py-3 text-xs text-[#9A8B7A] font-medium">City</th>
                    <th className="text-left px-4 py-3 text-xs text-[#9A8B7A] font-medium">Speciality</th>
                    <th className="text-right px-4 py-3 text-xs text-[#9A8B7A] font-medium cursor-pointer hover:text-[#C9A96A]" onClick={() => handleSort('volume')}>
                      <span className="flex items-center justify-end gap-0.5">Volume <SortIcon k="volume" /></span>
                    </th>
                    <th className="text-right px-4 py-3 text-xs text-[#9A8B7A] font-medium cursor-pointer hover:text-[#C9A96A]" onClick={() => handleSort('sold')}>
                      <span className="flex items-center justify-end gap-0.5">Sales <SortIcon k="sold" /></span>
                    </th>
                    <th className="text-right px-4 py-3 text-xs text-[#9A8B7A] font-medium cursor-pointer hover:text-[#C9A96A]" onClick={() => handleSort('dom')}>
                      <span className="flex items-center justify-end gap-0.5">Avg DOM <SortIcon k="dom" /></span>
                    </th>
                    <th className="text-right px-4 py-3 text-xs text-[#9A8B7A] font-medium cursor-pointer hover:text-[#C9A96A]" onClick={() => handleSort('rating')}>
                      <span className="flex items-center justify-end gap-0.5">Rating <SortIcon k="rating" /></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayed.map((a, i) => (
                    <tr key={a.name} className={`border-b border-[#E8E1D7] hover:bg-[#F6F2EC] transition ${i === 0 ? 'bg-[#FFFDF9]' : ''}`}>
                      <td className="px-4 py-3.5">
                        <span className={`font-bold text-sm ${a.rank <= 3 ? 'text-[#C9A96A]' : 'text-[#9A8B7A]'}`}>#{a.rank}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="font-medium text-[#1C1A17]">{a.name}</p>
                          {a.badge && <span className="text-[10px] bg-[#C9A96A]/15 text-[#C9A96A] rounded-full px-2 py-0.5">{a.badge}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#5F5448]">{a.city}</td>
                      <td className="px-4 py-3.5 text-xs text-[#5F5448]">{a.speciality}</td>
                      <td className="px-4 py-3.5 text-right font-semibold text-[#1C1A17]">{a.volume}</td>
                      <td className="px-4 py-3.5 text-right text-[#5F5448]">{a.sold}</td>
                      <td className="px-4 py-3.5 text-right text-[#5F5448]">{a.dom}d</td>
                      <td className="px-4 py-3.5 text-right">
                        <span className="flex items-center justify-end gap-0.5 font-semibold text-[#1C1A17]">
                          <Star size={11} className="text-[#C9A96A] fill-[#C9A96A]" />{a.rating}
                          <span className="text-[#9A8B7A] font-normal text-xs">({a.reviews})</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        <p className="text-xs text-[#9A8B7A] mt-4">Rankings based on completed transactions in the previous 12 months. DOM = average days from listing to completion. All data self-reported and independently verified.</p>

        {/* CTA */}
        <ScrollReveal delay={0.2} className="mt-10 bg-[#1C1A17] rounded-2xl p-10 text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Work With the Best</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Find Your Agent</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Browse agent profiles, read client reviews, and request an introduction to the specialist who fits your property and area.</p>
          <Link href="/agents" className="lux-button">Browse All Agents</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
