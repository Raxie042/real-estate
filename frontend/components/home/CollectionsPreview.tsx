'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { ChevronRight } from 'lucide-react';

const TEASERS = [
  {
    slug: 'coastal-retreats',
    label: 'Coastal Retreats',
    tagline: 'Where land meets the sea',
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
  },
  {
    slug: 'country-estates',
    label: 'Country Estates',
    tagline: 'Timeless English countryside',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  },
  {
    slug: 'city-penthouses',
    label: 'City Penthouses',
    tagline: 'The apex of urban living',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
  {
    slug: 'new-developments',
    label: 'New Developments',
    tagline: 'Designed for the future',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
  },
];

export default function CollectionsPreview() {
  return (
    <section className="lux-section bg-[#F6F2EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[#C9A96A] mb-2">Curated by Our Editors</p>
              <h2 className="text-4xl md:text-5xl font-light text-[#1C1A17] lux-heading">Property Collections</h2>
            </div>
            <Link href="/collections" className="lux-button-outline flex items-center gap-2 text-sm shrink-0 mb-1 hidden md:flex">
              Browse all <ChevronRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEASERS.map((t, i) => (
            <ScrollReveal key={t.slug} delay={i * 0.08}>
              <Link href={`/collections#${t.slug}`} className="group block lux-card overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5">
                    <div>
                      <p className="text-white font-medium text-lg lux-heading leading-tight">{t.label}</p>
                      <p className="text-white/60 text-xs mt-0.5 italic">{t.tagline}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.1}>
          <div className="mt-6 flex md:hidden">
            <Link href="/collections" className="lux-button-outline flex items-center gap-2 text-sm">
              Browse all collections <ChevronRight size={15} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
