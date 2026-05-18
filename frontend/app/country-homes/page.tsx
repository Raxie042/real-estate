'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Maximize, ArrowRight, TreePine } from 'lucide-react';

const REGIONS = [
  {
    name: 'The Cotswolds',
    description: 'England\'s most celebrated rural destination. Honey-stone villages, rolling meadows and grand manor houses within 90 minutes of central London.',
    image: 'https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=700&q=80',
    properties: 47,
    avgPrice: '£3.2m',
  },
  {
    name: 'Surrey Hills',
    description: 'An Area of Outstanding Natural Beauty minutes from the M25. Grand houses, country pubs and outstanding schools in a commuter-friendly setting.',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=700&q=80',
    properties: 63,
    avgPrice: '£2.1m',
  },
  {
    name: 'Scottish Highlands',
    description: 'Dramatic castles, shooting estates and lochside retreats. A unique combination of natural splendour and architectural grandeur.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    properties: 28,
    avgPrice: '£1.8m',
  },
  {
    name: 'Yorkshire Dales',
    description: 'Vast estate farms, Georgian farmhouses and stonebuilt manor houses set against the dramatic moor landscapes of God\'s Own Country.',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80',
    properties: 34,
    avgPrice: '£1.4m',
  },
  {
    name: 'Devon & Cornwall',
    description: 'From cliff-top country houses with sea views to working farms and equestrian estates — the South West offers unrivalled variety and lifestyle.',
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=700&q=80',
    properties: 55,
    avgPrice: '£2.4m',
  },
  {
    name: 'Norfolk & Suffolk',
    description: 'The wide skies and big landscapes of East Anglia. Grand country houses, listed rectories and converted barns near heritage coastline.',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=700&q=80',
    properties: 41,
    avgPrice: '£1.9m',
  },
];

const PROPERTY_TYPES = [
  { icon: '🏰', title: 'Manor Houses', desc: 'Grade I & II listed manor homes with formal gardens, outbuildings and historic provenance.' },
  { icon: '🌾', title: 'Farmhouses & Barns', desc: 'Working farms, converted barns and agricultural estates with planning potential.' },
  { icon: '🐴', title: 'Equestrian Properties', desc: 'Stud farms, stables, arena facilities and paddocks across the UK\'s finest equestrian counties.' },
  { icon: '🏡', title: 'Country Houses', desc: 'Substantial family homes set within private land, woods and formal grounds.' },
  { icon: '🌲', title: 'Shooting Estates', desc: 'Managed shoots, fishing beats, grouse moors and sporting estates in Scotland and the North.' },
  { icon: '🏘️', title: 'Rural Retreats', desc: 'Charming stone cottages, thatched homes and listed buildings in sought-after villages.' },
];

const FEATURED = [
  {
    id: 1,
    title: 'Stonebridge Manor',
    area: 'Bourton-on-the-Water, Cotswolds',
    price: '£9,750,000',
    beds: 10, baths: 9, acres: 42,
    type: 'Manor House',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80',
  },
  {
    id: 2,
    title: 'Glensheil Estate',
    area: 'Perthshire, Scottish Highlands',
    price: '£7,400,000',
    beds: 14, baths: 10, acres: 1800,
    type: 'Shooting Estate',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=700&q=80',
  },
  {
    id: 3,
    title: 'Hawksmoor Farm',
    area: 'Chipping Norton, Oxfordshire',
    price: '£4,200,000',
    beds: 7, baths: 6, acres: 120,
    type: 'Farmhouse & Stables',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80',
  },
  {
    id: 4,
    title: 'Combe House',
    area: 'Gittisham, Devon',
    price: '£5,600,000',
    beds: 8, baths: 7, acres: 65,
    type: 'Country House',
    image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=700&q=80',
  },
  {
    id: 5,
    title: 'Rudge Farm',
    area: 'Lavenham, Suffolk',
    price: '£3,100,000',
    beds: 6, baths: 5, acres: 28,
    type: 'Equestrian Property',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80',
  },
  {
    id: 6,
    title: 'Derwent Hall',
    area: 'Harrogate, North Yorkshire',
    price: '£6,800,000',
    beds: 12, baths: 10, acres: 240,
    type: 'Manor House',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
  },
];

export default function CountryHomesPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ minHeight: 520 }}>
        <Image src="https://images.unsplash.com/photo-1534951009808-766178b47a4f?w=1600&q=70" alt="Country homes" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="relative max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-5">Rural & Country</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-white mb-6 leading-tight">
            Country Homes &<br />Rural Estates
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            From Cotswolds manor houses to Highland sporting estates — the UK's finest rural properties, available through our dedicated country homes specialists.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/search?type=country" className="lux-button px-8 py-3">Browse Country Homes</Link>
            <Link href="/contact" className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors">Speak to a Specialist</Link>
          </motion.div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '268', label: 'Country properties' },
            { value: '6', label: 'Regional specialists' },
            { value: '1,800+', label: 'Acres sold last year' },
            { value: '£1.4m–£28m', label: 'Price range' },
          ].map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/75 text-xs uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Property types */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Property Types</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Every Kind of Country Home</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {PROPERTY_TYPES.map(t => (
            <div key={t.title} className="lux-card p-5 flex gap-4 items-start">
              <div className="text-3xl">{t.icon}</div>
              <div>
                <h3 className="font-semibold text-[#1C1A17] text-sm mb-1">{t.title}</h3>
                <p className="text-xs text-[#7A6E60] leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured properties */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Featured Listings</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Country Properties</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-[#252220] rounded-xl overflow-hidden group cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-[#C9A96A] text-[#1C1A17] text-xs font-medium px-3 py-1 rounded-full">{p.type}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#F4EFE8] mb-1">{p.title}</h3>
                  <p className="text-[#9A8B7A] text-sm flex items-center gap-1 mb-3">
                    <MapPin className="w-3 h-3" />{p.area}
                  </p>
                  <div className="flex items-center gap-4 text-[#9A8B7A] text-sm mb-4">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{p.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{p.baths}</span>
                    <span className="flex items-center gap-1"><TreePine className="w-4 h-4" />{p.acres} acres</span>
                  </div>
                  <p className="text-[#C9A96A] font-semibold text-lg">{p.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/search?type=country" className="lux-button px-10 py-3">View All Country Properties</Link>
          </div>
        </div>
      </div>

      {/* Regions */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Search by Region</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Explore the Countryside</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS.map((r, i) => (
            <motion.div key={r.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="lux-card overflow-hidden group cursor-pointer">
              <div className="relative h-40 overflow-hidden">
                <Image src={r.image} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <h3 className="font-serif text-lg text-white">{r.name}</h3>
                  <span className="text-[#C9A96A] text-xs bg-black/60 px-2 py-1 rounded">{r.properties} properties</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[#5F5448] mb-3">{r.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A96A] font-semibold text-sm">Avg {r.avgPrice}</span>
                  <Link href={`/search?region=${r.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs text-[#7A6E60] hover:text-[#C9A96A] flex items-center gap-1">
                    View homes <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expert section */}
      <div className="bg-[#F0EAE0] py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Country Homes Team</p>
            <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Specialists in Rural Property</h2>
            <p className="text-[#5F5448] mb-6 leading-relaxed">Our dedicated country homes team are deeply embedded in rural markets across the UK. Many live and work in the very communities they serve — bringing local knowledge, landowning relationships and specialist expertise that no generalist agent can match.</p>
            <p className="text-[#5F5448] mb-6">Services include: farm sales and acquisitions, estate management introductions, planning appraisals, sporting property valuations and rural investment advice.</p>
            <Link href="/agents?speciality=country" className="lux-button px-8 py-3">Meet Our Country Team</Link>
          </div>
          <div className="md:w-1/3 relative h-64 rounded-xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" alt="Country landscape" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Looking for a Country Property?</h2>
        <p className="text-[#7A6E60] mb-8 max-w-xl mx-auto">Register your requirements and our country homes team will match you with suitable properties, including those not publicly listed.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/search?type=country" className="lux-button px-8 py-3">Search Country Homes</Link>
          <Link href="/coming-soon" className="lux-button-outline px-8 py-3">Pre-Market Properties</Link>
        </div>
      </div>
    </div>
  );
}
