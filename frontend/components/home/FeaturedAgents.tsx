'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Star, MapPin, Phone, Mail, Award, ChevronRight, Handshake } from 'lucide-react';
import { AGENTS as ALL_AGENTS } from '@/lib/agents-data';

// Show only the first 4 agents on the home page
const AGENTS = ALL_AGENTS.slice(0, 4);

export default function FeaturedAgents() {
  return (
    <section className="bg-[#1C1A17] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Our Specialists</p>
            <h2 className="text-4xl md:text-5xl font-light text-white lux-heading mb-4">Meet the Team</h2>
            <div className="w-16 h-px bg-[#C9A96A] mx-auto mb-5" />
            <p className="text-white/50 font-light max-w-xl mx-auto">
              World-class specialists combining deep local expertise with a relentless commitment to exceptional results.
            </p>
          </div>
        </ScrollReveal>

        {/* Agent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {AGENTS.map((agent, i) => (
            <ScrollReveal key={agent.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="lux-card overflow-hidden flex flex-col h-full group"
              >
                {/* Photo */}
                <div className="relative h-60 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={agent.image}
                    alt={agent.name}
                    onError={e => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(agent.name)}&background=1C1A17&color=C9A96A&size=400`;
                    }}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A17]/70 via-transparent to-transparent" />

                  {/* CEO badge */}
                  {agent.isCEO && (
                    <div className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Award size={10} /> CEO & Founder
                    </div>
                  )}

                  {/* Star rating overlay */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className={j < Math.round(agent.rating) ? 'fill-[#C9A96A] text-[#C9A96A]' : 'text-white/30'} />
                    ))}
                    <span className="text-white/70 text-[11px] ml-1">{agent.rating} ({agent.reviews})</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-[#1C1A17] lux-heading text-base mb-0.5">{agent.name}</h3>
                  <p className="text-sm text-[#C9A96A] mb-1">{agent.title}</p>
                  <p className="flex items-center gap-1 text-xs text-[#9A8B7A] mb-3">
                    <MapPin size={11} /> {agent.location}
                  </p>

                  {/* Stats row */}
                  <div className="flex gap-4 mb-4 text-center">
                    <div className="flex-1 bg-[#F6F2EC] rounded-lg py-2 px-1">
                      <p className="text-lg font-light text-[#1C1A17] lux-heading leading-none">{agent.deals}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9A8B7A] mt-0.5">Deals</p>
                    </div>
                    <div className="flex-1 bg-[#F6F2EC] rounded-lg py-2 px-1">
                      <p className="text-lg font-light text-[#1C1A17] lux-heading leading-none">{agent.years}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9A8B7A] mt-0.5">Yrs Exp.</p>
                    </div>
                    <div className="flex-1 bg-[#F6F2EC] rounded-lg py-2 px-1">
                      <p className="text-lg font-light text-[#1C1A17] lux-heading leading-none">{agent.reviews}</p>
                      <p className="text-[10px] uppercase tracking-wider text-[#9A8B7A] mt-0.5">Reviews</p>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {agent.specialties.slice(0, 2).map(s => (
                      <span key={s} className="lux-badge text-[10px]">{s}</span>
                    ))}
                  </div>

                  {/* Contact + Profile */}
                  <div className="mt-auto pt-4 border-t border-[#E8E1D7] space-y-2">
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center gap-2 text-xs text-[#5F5448] hover:text-[#C9A96A] transition-colors"
                    >
                      <Phone size={13} className="shrink-0" />
                      <span>{agent.phone}</span>
                    </a>
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center gap-2 text-xs text-[#5F5448] hover:text-[#C9A96A] transition-colors truncate"
                    >
                      <Mail size={13} className="shrink-0" />
                      <span className="truncate">{agent.email}</span>
                    </a>
                    <Link
                      href={`/agents/${agent.id}`}
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#C9A96A] hover:text-[#B78F4A] transition-colors pt-1"
                    >
                      View Full Profile <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* View all CTA */}
        <ScrollReveal>
          <div className="text-center">
            <Link
              href="/agents"
              className="inline-flex items-center gap-2 lux-button"
            >
              <Handshake size={16} />
              Meet All Our Agents
            </Link>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
