'use client';

import { use, useState } from 'react';
import { Star, MapPin, Mail, Phone, Award, TrendingUp, Home, ChevronRight, Briefcase } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { AGENTS } from '@/lib/agents-data';



const AWARDS = [
  { year: '2025', title: 'Top Producer Award', body: 'National Association of Realtors' },
  { year: '2024', title: 'Luxury Specialist', body: 'Institute for Luxury Home Marketing' },
  { year: '2023', title: 'Five Star Professional', body: '5-Star Real Estate Awards' },
];

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const agentId = resolvedParams.id;
  const [msgName, setMsgName] = useState('');
  const [msgEmail, setMsgEmail] = useState('');
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const staticAgent = AGENTS.find(a => a.id === agentId);

  const agent = staticAgent ? {
    id: staticAgent.id,
    firstName: staticAgent.firstName,
    lastName: staticAgent.lastName,
    email: staticAgent.email,
    phone: staticAgent.phone,
    bio: staticAgent.bio,
    licenseNumber: undefined as string | undefined,
    yearsExperience: staticAgent.years,
    specialties: staticAgent.specialties,
    avatar: staticAgent.image,
    agency: undefined as { id: string; name: string; logo?: string } | undefined,
    listings: [] as Array<{ id: string; title: string; price: number; isPoa?: boolean; images: string[]; city: string; state: string; status: string }>,
    stats: {
      totalListings: staticAgent.deals,
      activeListing: Math.round(staticAgent.deals * 0.1),
      totalSales: staticAgent.deals,
      averageRating: staticAgent.rating,
      reviewCount: staticAgent.reviews,
    },
  } : null;

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F2EC]">
        <div className="text-[#7A6E60]">Agent not found</div>
      </div>
    );
  }

  const fullName = `${agent.firstName} ${agent.lastName}`;
  const initials = `${agent.firstName[0]}${agent.lastName[0]}`;
  const rating = agent.stats?.averageRating || 4.9;
  const reviews = agent.stats?.reviewCount || 0;

  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* ── Cinematic hero banner ──────────────────────────── */}
      <div className="relative h-80 md:h-96 overflow-hidden bg-[#1C1A17]">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#1C1A17]" />

        {/* Breadcrumb */}
        <div className="relative px-6 pt-6 flex items-center gap-2 text-white/40 text-sm">
          <Link href="/" className="hover:text-white/70 transition">Home</Link>
          <ChevronRight size={14} />
          <Link href="/agents" className="hover:text-white/70 transition">Agents</Link>
          <ChevronRight size={14} />
          <span className="text-white/70">{fullName}</span>
        </div>

        {/* Avatar overlapping hero */}
        <div className="absolute -bottom-16 left-8 md:left-16">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
            className="w-32 h-32 rounded-full border-4 border-[#F6F2EC] overflow-hidden shadow-2xl bg-[#C9A96A] flex items-center justify-center"
          >
            {agent.avatar ? (
              <Image src={agent.avatar} alt={fullName} fill className="object-cover" />
            ) : (
              <span className="text-white text-4xl font-light lux-heading">{initials}</span>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Profile header ─────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}>
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-1">Luxury Property Specialist</p>
            <h1 className="text-4xl md:text-5xl font-light text-[#1C1A17] lux-heading mb-2">{fullName}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#7A6E60]">
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_,i) => (
                  <Star key={i} size={14} className={i < Math.round(rating) ? 'fill-[#C9A96A] text-[#C9A96A]' : 'text-[#D4C5B0]'} />
                ))}
                <span className="ml-1 font-medium text-[#1C1A17]">{rating.toFixed(1)}</span>
                <span>({reviews} reviews)</span>
              </span>
              {agent.agency && (
                <Link href={`/agencies/${agent.agency.id}`} className="flex items-center gap-1 hover:text-[#C9A96A] transition">
                  <Briefcase size={14} />
                  {agent.agency.name}
                </Link>
              )}
              {agent.yearsExperience && (
                <span className="flex items-center gap-1">
                  <Award size={14} />
                  {agent.yearsExperience} years experience
                </span>
              )}
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }} className="flex gap-3">
            <a href={`mailto:${agent.email}`} className="lux-button-outline flex items-center gap-2">
              <Mail size={16} /> Email
            </a>
            {agent.phone && (
              <a href={`tel:${agent.phone}`} className="lux-button flex items-center gap-2">
                <Phone size={16} /> Call
              </a>
            )}
          </motion.div>
        </div>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Home, value: agent.stats?.totalListings || 12, label: 'Total Listings' },
              { icon: TrendingUp, value: agent.stats?.activeListing || 8, label: 'Active Now' },
              { icon: Award, value: agent.stats?.totalSales || 45, label: 'Properties Sold' },
              { icon: Star, value: `${rating.toFixed(1)} ★`, label: `${reviews} Reviews` },
            ].map((s, i) => (
              <div key={i} className="lux-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F2EC] flex items-center justify-center shrink-0">
                  <s.icon size={18} className="text-[#C9A96A]" />
                </div>
                <div>
                  <div className="text-2xl font-light text-[#1C1A17] lux-heading">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-[#9A8B7A]">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          {/* ── Main column ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Bio */}
            <ScrollReveal>
              <div className="lux-card p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">About</p>
                <p className="text-[#3D3630] leading-relaxed text-lg font-light lux-prose">
                  {agent.bio || `${fullName} is an award-winning luxury real estate specialist with an exceptional track record of matching discerning clients with extraordinary properties worldwide. Known for an unparalleled commitment to discretion, expertise, and personalised service.`}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(agent.specialties || ['Residential', 'Luxury Homes', 'First-Time Buyers', 'Investment Properties', 'Off-Market']).map((s, i) => (
                    <span key={i} className="lux-badge">{s}</span>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Awards */}
            <ScrollReveal delay={0.1}>
              <div className="lux-card p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-6">Awards &amp; Recognition</p>
                <div className="space-y-5">
                  {AWARDS.map((a, i) => (
                    <div key={i} className="flex items-start gap-4 border-b border-[#F0EAE0] pb-5 last:border-0 last:pb-0">
                      <div className="text-sm font-semibold text-[#C9A96A] w-10 shrink-0 lux-heading">{a.year}</div>
                      <div>
                        <div className="font-medium text-[#1C1A17]">{a.title}</div>
                        <div className="text-sm text-[#9A8B7A]">{a.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Current Listings */}
            {(agent.listings?.length ?? 0) > 0 && (
              <ScrollReveal delay={0.15}>
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Portfolio</p>
                  <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-6">Current Listings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {agent.listings.slice(0, 6).map((listing, i) => (
                      <ScrollReveal key={listing.id} delay={i * 0.08}>
                        <Link href={`/properties/${listing.id}`} className="lux-card overflow-hidden group block">
                          <div className="relative h-44 overflow-hidden">
                            <Image
                              src={listing.images[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80'}
                              alt={listing.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-3 right-3 lux-badge bg-black/50 text-white border-white/20 text-[10px]">
                              {listing.status}
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="font-medium text-[#1C1A17] mb-1 truncate">{listing.title}</div>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-[#7A6E60] flex items-center gap-1">
                                <MapPin size={12} />{listing.city}, {listing.state}
                              </p>
                              <span className="text-[#C9A96A] font-semibold text-sm lux-heading">
                                {listing.isPoa ? 'POA' : `$${listing.price.toLocaleString()}`}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Reviews */}
            <ScrollReveal delay={0.2}>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-2">Testimonials</p>
                <h2 className="text-3xl font-light text-[#1C1A17] lux-heading mb-6">Client Reviews</h2>
                <div className="space-y-5">
                  {[
                    { rating:5, comment:`${fullName} made the entire process seamless. An extraordinary professional who goes above and beyond for every client.`, author:'James & Sarah M.', date:'2 months ago' },
                    { rating:5, comment:'The level of market knowledge and access to off-market properties is unmatched. Highly recommended for anyone seeking a truly exceptional experience.', author:'Robert T.', date:'4 months ago' },
                    { rating:5, comment:'Impeccable service from start to close. The attention to detail and personalised guidance exceeded our every expectation.', author:'Catherine L.', date:'6 months ago' },
                  ].map((r, i) => (
                    <div key={i} className="lux-card p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(r.rating)].map((_,j) => (
                          <Star key={j} size={14} className="fill-[#C9A96A] text-[#C9A96A]" />
                        ))}
                      </div>
                      <p className="text-[#3D3630] leading-relaxed mb-4 font-light lux-prose text-base">"{r.comment}"</p>
                      <div className="flex items-center justify-between text-sm text-[#9A8B7A]">
                        <span className="font-medium text-[#5F5448]">— {r.author}</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ── Sidebar ───────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Contact form */}
            <ScrollReveal direction="right">
              <div className="lux-card p-7 sticky top-24">
                <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-1">Enquire</p>
                <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-6">Contact {agent.firstName}</h3>

                {msgSent ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-[#5F5448] font-light">Message sent. {agent.firstName} will be in touch shortly.</p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setMsgSent(true); }}>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Your Name</label>
                      <input className="lux-input" placeholder="Full name" value={msgName} onChange={e => setMsgName(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Email</label>
                      <input className="lux-input" type="email" placeholder="your@email.com" value={msgEmail} onChange={e => setMsgEmail(e.target.value)} required />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#9A8B7A] mb-1 block">Message</label>
                      <textarea
                        rows={4}
                        className="lux-input resize-none"
                        placeholder="I'm interested in discussing a property..."
                        value={msgText}
                        onChange={e => setMsgText(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="w-full lux-button">Send Enquiry</button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-[#E8E1D7] space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#5F5448]">
                    <Phone size={15} className="text-[#C9A96A] shrink-0" />
                    <span>{agent.phone || '+1 (555) 000-0000'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#5F5448]">
                    <Mail size={15} className="text-[#C9A96A] shrink-0" />
                    <span>{agent.email}</span>
                  </div>
                  {agent.licenseNumber && (
                    <div className="flex items-center gap-3 text-sm text-[#5F5448]">
                      <Award size={15} className="text-[#C9A96A] shrink-0" />
                      <span>License #{agent.licenseNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

