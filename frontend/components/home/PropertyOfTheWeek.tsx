'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, ArrowRight, Star } from 'lucide-react';

// In production, fetch this from the API
const PROPERTY_OF_THE_WEEK = {
  id: 'potw-1',
  title: 'Eaton Square Penthouse',
  address: 'Belgravia, London SW1W',
  price: '£18,500,000',
  beds: 4,
  baths: 4,
  sqft: 4800,
  description: 'A magnificent penthouse occupying the entire top floor of a prestigious white stucco building on London\'s most exclusive garden square. Benefitting from an extraordinary 360° wrap-around terrace with panoramic views across the rooftops of Belgravia.',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  features: ['4,800 sq ft lateral living', '360° private roof terrace', 'Double-height reception', 'Off-street parking'],
  agentName: 'James Alderton',
  agentTitle: 'Head of Prime London',
};

export default function PropertyOfTheWeek() {
  const p = PROPERTY_OF_THE_WEEK;

  return (
    <section className="py-16 px-4 bg-[#1C1A17]">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="text-[#C9A96A] fill-[#C9A96A]" />
              <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em]">Editors&rsquo; Choice</p>
            </div>
            <h2 className="font-serif text-3xl text-[#F6F2EC]">Property of the Week</h2>
          </div>
          <Link href="/properties" className="hidden sm:flex items-center gap-1 text-sm text-[#9A8B7A] hover:text-[#C9A96A] transition">
            All Properties <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#3A3430]">
          {/* Image */}
          <div className="relative h-72 md:h-auto min-h-[320px]">
            <Image src={p.image} alt={p.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1C1A17]/60 hidden md:block" />
            <div className="absolute top-4 left-4">
              <span className="bg-[#C9A96A] text-[#1C1A17] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Property of the Week</span>
            </div>
          </div>

          {/* Details */}
          <div className="bg-[#231F1B] p-8 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-[#C9A96A] text-xs uppercase tracking-[0.3em] mb-2">{p.address}</p>
              <h3 className="font-serif text-3xl text-[#F6F2EC] mb-2">{p.title}</h3>
              <p className="font-serif text-2xl text-[#C9A96A] mb-4">{p.price}</p>

              <div className="flex gap-5 mb-5 text-sm text-[#9A8B7A]">
                <span className="flex items-center gap-1.5"><Bed size={14} className="text-[#C9A96A]" />{p.beds} Beds</span>
                <span className="flex items-center gap-1.5"><Bath size={14} className="text-[#C9A96A]" />{p.baths} Baths</span>
                <span className="flex items-center gap-1.5"><Maximize2 size={14} className="text-[#C9A96A]" />{p.sqft.toLocaleString()} sq ft</span>
              </div>

              <p className="text-[#B9AA98] text-sm leading-relaxed mb-5">{p.description}</p>

              <ul className="space-y-1.5 mb-6">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#9A8B7A]">
                    <span className="text-[#C9A96A] text-xs">✓</span>{f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#7A6E60]">Contact</p>
                  <p className="text-sm text-[#F6F2EC] font-medium">{p.agentName}</p>
                  <p className="text-xs text-[#9A8B7A]">{p.agentTitle}</p>
                </div>
                <Link href={`/properties/${p.id}`} className="lux-button flex items-center gap-1.5">
                  View Property <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
