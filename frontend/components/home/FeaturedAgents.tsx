'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Star, MapPin, Phone, Mail, Award, ChevronRight, Handshake } from 'lucide-react';

const AGENTS = [
  {
    id: '0',
    name: 'Felix Attah',
    title: 'Chief Executive Officer & Founder',
    location: 'Mayfair, London',
    phone: '+44 20 7123 4567',
    email: 'felix@raxiezenithestate.com',
    rating: 5.0,
    reviews: 112,
    deals: 180,
    years: 10,
    specialties: ['Prime PCL', 'UHNW Clients', 'International'],
    image: '/images/felix-attah.png',
    isCEO: true,
  },
  {
    id: '1',
    name: 'Alexandra Pemberton',
    title: 'Senior Luxury Specialist',
    location: 'London, UK',
    phone: '+44 20 7123 4567',
    email: 'a.pemberton@raxieprime.com',
    rating: 4.9,
    reviews: 64,
    deals: 52,
    years: 14,
    specialties: ['Mayfair', 'Knightsbridge', 'Off-Market'],
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80',
    isCEO: false,
  },
  {
    id: '2',
    name: 'James Hartwell',
    title: 'Country Estates Director',
    location: 'Cotswolds, UK',
    phone: '+44 20 7123 4568',
    email: 'j.hartwell@raxieprime.com',
    rating: 4.8,
    reviews: 41,
    deals: 38,
    years: 11,
    specialties: ['Country Houses', 'Equestrian', 'New Developments'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    isCEO: false,
  },
  {
    id: '3',
    name: 'Sophia Carrington',
    title: 'Prime Central London',
    location: 'Chelsea, London',
    phone: '+44 20 7123 4569',
    email: 's.carrington@raxieprime.com',
    rating: 5.0,
    reviews: 27,
    deals: 29,
    years: 8,
    specialties: ['Chelsea', 'Belgravia', 'Luxury Penthouses'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    isCEO: false,
  },
];

export default function FeaturedAgents() {
  return (
    <section className="bg-[#F6F2EC] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Our Specialists</p>
            <h2 className="text-4xl md:text-5xl font-light text-[#1C1A17] lux-heading mb-4">Meet the Team</h2>
            <div className="w-16 h-px bg-[#C9A96A] mx-auto mb-5" />
            <p className="text-[#7A6E60] font-light max-w-xl mx-auto">
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
