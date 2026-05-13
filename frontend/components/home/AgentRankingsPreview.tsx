'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { TrendingUp, Star, Award, ChevronRight, Trophy } from 'lucide-react';

const TOP_AGENTS = [
  {
    rank: 2,
    name: 'James Al-Rashid',
    city: 'Dubai',
    speciality: 'Palm & Downtown Dubai',
    volume: 'AED 520m',
    sold: 61,
    rating: 4.95,
    badge: 'Most Sales 2025',
  },
  {
    rank: 1,
    name: 'Harriet Wyndham',
    city: 'London',
    speciality: 'Prime Central London',
    volume: '£142m',
    sold: 34,
    rating: 4.97,
    badge: 'Top Performer 2025',
    isFirst: true,
  },
  {
    rank: 3,
    name: 'Catriona Sutherland',
    city: 'Edinburgh',
    speciality: 'Edinburgh New Town',
    volume: '£88m',
    sold: 29,
    rating: 4.93,
    badge: undefined,
  },
];

const RANK_COLOURS = ['text-[#C0A86A]', 'text-[#C9A96A]', 'text-[#A07040]'];
const PODIUM_HEIGHTS = ['h-24', 'h-36', 'h-16'];

export default function AgentRankingsPreview() {
  return (
    <section className="bg-[#F6F2EC] py-20 border-b border-[#E8E1D7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-2 flex items-center gap-2">
                <TrendingUp size={12} /> Quarterly Rankings
              </p>
              <h2 className="text-4xl font-light text-[#1C1A17] lux-heading">Agent Performance</h2>
              <p className="text-[#7A6E60] font-light mt-2 max-w-md">
                Transparent rankings by volume, sales and verified client rating — updated every quarter.
              </p>
            </div>
            <Link
              href="/agent-rankings"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-[#C9A96A] hover:text-[#B78F4A] transition-colors"
            >
              Full leaderboard <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-10">
          {TOP_AGENTS.map((agent, i) => (
            <ScrollReveal key={agent.name} delay={i * 0.1} className="flex-1 max-w-[220px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                {/* Trophy icon for #1 */}
                {agent.isFirst && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className="mb-2"
                  >
                    <Trophy size={28} className="text-[#C9A96A]" />
                  </motion.div>
                )}

                {/* Card */}
                <div className={`w-full lux-card p-4 text-center mb-0 ${agent.isFirst ? 'ring-2 ring-[#C9A96A]/40 shadow-xl' : ''}`}>
                  {/* Rank badge */}
                  <div className={`text-3xl font-light lux-heading mb-1 ${RANK_COLOURS[i]}`}>
                    #{agent.rank}
                  </div>
                  <div className="flex items-center justify-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className={j < Math.round(agent.rating) ? 'fill-[#C9A96A] text-[#C9A96A]' : 'text-[#D4C5B0]'} />
                    ))}
                    <span className="text-[10px] text-[#9A8B7A] ml-1">{agent.rating}</span>
                  </div>
                  <p className="font-semibold text-[#1C1A17] text-sm lux-heading leading-tight mb-0.5">{agent.name}</p>
                  <p className="text-[10px] text-[#9A8B7A] mb-2">{agent.city}</p>
                  {agent.badge && (
                    <span className="inline-block text-[9px] bg-[#C9A96A]/15 text-[#C9A96A] rounded-full px-2 py-0.5 mb-2 uppercase tracking-wider">
                      {agent.badge}
                    </span>
                  )}
                  <div className="border-t border-[#E8E1D7] pt-2 mt-1 grid grid-cols-2 gap-1 text-center">
                    <div>
                      <p className="text-sm font-light text-[#1C1A17] lux-heading">{agent.volume}</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#9A8B7A]">Volume</p>
                    </div>
                    <div>
                      <p className="text-sm font-light text-[#1C1A17] lux-heading">{agent.sold}</p>
                      <p className="text-[9px] uppercase tracking-wider text-[#9A8B7A]">Sales</p>
                    </div>
                  </div>
                </div>

                {/* Podium base */}
                <div className={`w-full ${PODIUM_HEIGHTS[i]} mt-0 rounded-b-lg ${agent.isFirst ? 'bg-[#C9A96A]' : 'bg-[#D4C5B0]'} flex items-center justify-center`}>
                  <Award size={20} className={agent.isFirst ? 'text-[#1C1A17]' : 'text-white/60'} />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA strip */}
        <ScrollReveal delay={0.2}>
          <div className="text-center">
            <Link
              href="/agent-rankings"
              className="inline-flex items-center gap-2 lux-button"
            >
              <TrendingUp size={16} />
              View Full Rankings — All 10 Agents
            </Link>
            <p className="text-xs text-[#9A8B7A] mt-3">Rankings updated quarterly · All data independently verified</p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
