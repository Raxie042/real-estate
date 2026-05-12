'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { ChevronRight, MapPin, Bed, Bath, Maximize } from 'lucide-react';

const COLLECTIONS = [
  {
    slug: 'coastal-retreats',
    label: 'Coastal Retreats',
    tagline: 'Where land meets the sea',
    hero: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&q=80',
    description: 'A curated selection of the finest coastal and waterfront homes — from cliff-top escapes to private beach estates.',
    count: 18,
    properties: [
      { id: '1', title: 'Cornish Cliff House', location: 'Cornwall, UK', bedrooms: 5, bathrooms: 4, sqft: 4800, image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80' },
      { id: '2', title: 'Sandbanks Waterfront', location: 'Dorset, UK', bedrooms: 4, bathrooms: 3, sqft: 3600, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80' },
      { id: '3', title: 'Isle of Wight Retreat', location: 'Isle of Wight, UK', bedrooms: 6, bathrooms: 5, sqft: 5200, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
    ],
  },
  {
    slug: 'country-estates',
    label: 'Country Estates',
    tagline: 'Timeless English countryside',
    hero: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    description: 'Grade-listed manor houses, Georgian farmhouses and rolling estate land — the very best of rural England.',
    count: 12,
    properties: [
      { id: '4', title: 'Cotswolds Manor', location: 'Oxfordshire, UK', bedrooms: 8, bathrooms: 7, sqft: 12000, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80' },
      { id: '5', title: 'Hampshire Farmhouse', location: 'Hampshire, UK', bedrooms: 6, bathrooms: 5, sqft: 7200, image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80' },
      { id: '6', title: 'Suffolk Estate', location: 'Suffolk, UK', bedrooms: 10, bathrooms: 9, sqft: 18000, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
    ],
  },
  {
    slug: 'city-penthouses',
    label: 'City Penthouses',
    tagline: 'The apex of urban living',
    hero: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    description: 'Crown-floor residences commanding the most spectacular skylines — London, Edinburgh, Manchester and beyond.',
    count: 24,
    properties: [
      { id: '7', title: 'One Hyde Park', location: 'Knightsbridge, London', bedrooms: 4, bathrooms: 4, sqft: 5800, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
      { id: '8', title: 'Neo Bankside Penthouse', location: 'Southbank, London', bedrooms: 3, bathrooms: 3, sqft: 3900, image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80' },
      { id: '9', title: 'St Andrews Square', location: 'Edinburgh, UK', bedrooms: 3, bathrooms: 3, sqft: 3400, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
    ],
  },
  {
    slug: 'new-developments',
    label: 'New Developments',
    tagline: 'Designed for the future',
    hero: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    description: 'Architect-designed new-build residences from the most celebrated developers — available off-plan and ready to move.',
    count: 31,
    properties: [
      { id: '10', title: 'Holland Park Villas', location: 'Holland Park, London', bedrooms: 4, bathrooms: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
      { id: '11', title: 'The Lanterns, Chelsea', location: 'Chelsea, London', bedrooms: 2, bathrooms: 2, sqft: 2100, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80' },
      { id: '12', title: 'Canary Wharf Tower', location: 'Canary Wharf, London', bedrooms: 3, bathrooms: 2, sqft: 2800, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    ],
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">

      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-25"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/40 to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-5"
            initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
          >
            Curated by Our Editors
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-light text-white lux-heading mb-5"
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.85, delay:0.1 }}
          >
            Property Collections
          </motion.h1>
          <motion.div className="w-16 h-px bg-[#C9A96A] mx-auto mb-7"
            initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.7, delay:0.3 }} />
          <motion.p
            className="text-lg text-white/50 font-light max-w-2xl mx-auto"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}
          >
            Thoughtfully assembled series of exceptional properties united by character, setting or spirit — from city penthouses to coastal escapes.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {COLLECTIONS.map((col, ci) => (
          <ScrollReveal key={col.slug} delay={ci * 0.05}>
            <section>
              {/* Collection header */}
              <div className="flex items-end justify-between mb-7">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-1">{col.count} properties</p>
                  <h2 className="text-4xl font-light text-[#1C1A17] lux-heading mb-2">{col.label}</h2>
                  <p className="text-[#9A8B7A] italic font-light">{col.tagline}</p>
                </div>
                <Link href={`/search?collection=${col.slug}`} className="lux-button-outline flex items-center gap-2 text-sm shrink-0 mb-1">
                  View all <ChevronRight size={15} />
                </Link>
              </div>

              {/* Hero banner */}
              <div className="relative h-52 md:h-64 rounded-2xl overflow-hidden mb-6 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={col.hero}
                  alt={col.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-7">
                  <p className="text-white/80 font-light max-w-md text-sm leading-relaxed">{col.description}</p>
                </div>
              </div>

              {/* Property cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {col.properties.map((p, pi) => (
                  <ScrollReveal key={p.id} delay={pi * 0.07}>
                    <Link href={`/properties/${p.id}`} className="lux-card overflow-hidden group block">
                      <div className="relative h-44 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="p-4">
                        <p className="text-[#C9A96A] font-semibold lux-heading mb-0.5 price-poa text-sm">Price on Application</p>
                        <h3 className="font-medium text-[#1C1A17] mb-1 truncate">{p.title}</h3>
                        <p className="text-xs text-[#9A8B7A] flex items-center gap-1 mb-3">
                          <MapPin size={11} /> {p.location}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-[#9A8B7A] border-t border-[#F0EAE0] pt-3">
                          <span className="flex items-center gap-1"><Bed size={12} /> {p.bedrooms}</span>
                          <span className="flex items-center gap-1"><Bath size={12} /> {p.bathrooms}</span>
                          <span className="flex items-center gap-1"><Maximize size={12} /> {p.sqft.toLocaleString()} ft²</span>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
