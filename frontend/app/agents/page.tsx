'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Star, MapPin, Phone, Mail, Award, ChevronRight } from 'lucide-react';
import { AGENTS } from '@/lib/agents-data';

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          >
            Our Team
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white lux-heading mb-6"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
          >
            Find an Agent
          </motion.h1>
          <motion.div
            className="w-16 h-px bg-[#C9A96A] mx-auto mb-7"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
          />
          <motion.p
            className="text-lg text-white/60 font-light max-w-2xl mx-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            Our specialists combine deep local knowledge with an uncompromising commitment to finding the perfect property for every client.
          </motion.p>
        </div>
      </div>

      {/* Featured agents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">Recommended</p>
              <h2 className="text-4xl font-light text-[#1C1A17] lux-heading">Featured Specialists</h2>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured 2-up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {AGENTS.filter(a => a.featured).map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.1}>
              <Link href={`/agents/${agent.id}`} className="group lux-card overflow-hidden flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-48 h-56 md:h-auto shrink-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.image}
                    alt={agent.name}
                    onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1C1A17&color=C9A96A&size=400`; }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Award size={10} /> Featured
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={12} className={j < Math.round(agent.rating) ? 'fill-[#C9A96A] text-[#C9A96A]' : 'text-[#D4C5B0]'} />
                    ))}
                    <span className="text-xs text-[#7A6E60] ml-1">{agent.rating} ({agent.reviews})</span>
                  </div>
                  <h3 className="text-xl font-medium text-[#1C1A17] lux-heading mb-0.5">{agent.name}</h3>
                  <p className="text-sm text-[#C9A96A] mb-3">{agent.title}</p>
                  <p className="flex items-center gap-1 text-xs text-[#9A8B7A] mb-4">
                    <MapPin size={11} /> {agent.location}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {agent.specialties.map(s => (
                      <span key={s} className="lux-badge text-[10px]">{s}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between text-sm text-[#5F5448] border-t border-[#E8E1D7] pt-4">
                    <span>{agent.deals} sales</span>
                    <span>{agent.years} yrs exp.</span>
                    <span className="text-[#C9A96A] font-medium flex items-center gap-1">
                      View Profile <ChevronRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* All agents grid */}
        <ScrollReveal>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">Our Team</p>
            <h2 className="text-4xl font-light text-[#1C1A17] lux-heading">All Agents</h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENTS.map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.06}>
              <Link href={`/agents/${agent.id}`} className="group lux-card overflow-hidden flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.image}
                    alt={agent.name}
                    onError={e => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1C1A17&color=C9A96A&size=400`; }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  {agent.featured && (
                    <div className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Award size={10} /> Featured
                    </div>
                  )}
                  <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className={j < Math.round(agent.rating) ? 'fill-[#C9A96A] text-[#C9A96A]' : 'text-white/40'} />
                    ))}
                    <span className="text-white/70 text-[11px] ml-1">{agent.rating}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-medium text-[#1C1A17] lux-heading mb-0.5">{agent.name}</h3>
                  <p className="text-sm text-[#C9A96A] mb-1">{agent.title}</p>
                  <p className="flex items-center gap-1 text-xs text-[#9A8B7A] mb-3">
                    <MapPin size={11} /> {agent.location}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {agent.specialties.slice(0, 2).map(s => (
                      <span key={s} className="lux-badge text-[10px]">{s}</span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-3 pt-4 border-t border-[#E8E1D7]">
                    <button
                      onClick={e => { e.preventDefault(); e.stopPropagation(); window.location.href = `mailto:${agent.email}`; }}
                      className="flex items-center gap-1.5 text-xs text-[#5F5448] hover:text-[#C9A96A] transition"
                    >
                      <Mail size={13} /> Email
                    </button>
                    <button
                      onClick={e => { e.preventDefault(); e.stopPropagation(); window.location.href = `tel:${agent.phone}`; }}
                      className="flex items-center gap-1.5 text-xs text-[#5F5448] hover:text-[#C9A96A] transition"
                    >
                      <Phone size={13} /> Call
                    </button>
                    <span className="ml-auto text-xs text-[#C9A96A] font-medium flex items-center gap-1">
                      Profile <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Join CTA */}
        <ScrollReveal delay={0.1}>
          <div className="mt-16 bg-[#1C1A17] rounded-2xl p-10 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Join Our Team</p>
            <h3 className="text-3xl font-light text-white lux-heading mb-4">Are you a luxury property specialist?</h3>
            <p className="text-white/50 font-light mb-7 max-w-xl mx-auto">We partner with the finest agents and agencies. If you meet our standards of excellence, we&apos;d love to hear from you.</p>
            <Link href="/founding-partner" className="lux-button inline-flex items-center gap-2">
              Apply to Join <ChevronRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
