'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Eye, Brush, Award, BookOpen, Gem, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Eye,
    title: 'Art Acquisition',
    body: 'We source and acquire significant works for your new home — from Old Masters to contemporary pieces — working with a curated network of galleries and auction houses.',
  },
  {
    icon: Brush,
    title: 'Interior Art Curation',
    body: 'Our advisors work alongside your interior designer to curate a coherent collection that enhances the architecture and personality of each space.',
  },
  {
    icon: Award,
    title: 'Collection Management',
    body: 'For collectors with existing holdings, we provide inventory management, condition reports, insurance valuations and storage recommendations.',
  },
  {
    icon: BookOpen,
    title: 'Art Investment Advisory',
    body: 'Insights on the art market as an alternative asset class — informed by data from Sotheby\'s, Christie\'s and Phillips and our network of market insiders.',
  },
  {
    icon: Gem,
    title: 'Provenance Research',
    body: 'Expert due diligence on works you are considering purchasing, including title checks, attribution research and condition assessment.',
  },
  {
    icon: Award,
    title: 'Artist Commissions',
    body: 'Commission bespoke works from our network of established and emerging artists — site-specific sculptures, paintings and installations tailored to your home.',
  },
];

const FEATURED_WORKS = [
  {
    title: 'Untitled Coastal Study',
    artist: 'William Holbrook, British b.1971',
    medium: 'Oil on linen',
    size: '120 × 160 cm',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=80',
    category: 'Painting',
  },
  {
    title: 'Bronze Figure No. 7',
    artist: 'Sofia Marchetti, Italian b.1984',
    medium: 'Cast bronze, ed. 3/5',
    size: '45 × 28 × 22 cm',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    category: 'Sculpture',
  },
  {
    title: 'Geometric Abstraction IV',
    artist: 'James Kovalev, American b.1967',
    medium: 'Acrylic on canvas',
    size: '200 × 150 cm',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80',
    category: 'Contemporary',
  },
  {
    title: 'Highland Landscape, Dusk',
    artist: 'Fiona McLeish, Scottish b.1979',
    medium: 'Watercolour on paper',
    size: '90 × 120 cm',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=80',
    category: 'Watercolour',
  },
  {
    title: 'Archive Series: London',
    artist: 'David Ohene, British-Ghanaian b.1990',
    medium: 'C-print on aluminium',
    size: '100 × 100 cm',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    category: 'Photography',
  },
  {
    title: 'Terracotta Vessel III',
    artist: 'Yuki Tanaka, Japanese-British b.1986',
    medium: 'Hand-thrown ceramic',
    size: '38 × 22 cm diameter',
    estimate: 'POA',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80',
    category: 'Ceramics',
  },
];

const ADVISORS = [
  {
    name: 'Eleanor Whitfield',
    role: 'Head of Art Advisory',
    background: 'Formerly Christie\'s Senior Specialist, Impressionist & Modern Art. 18 years market experience.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    name: 'Marcus de Silva',
    role: 'Contemporary Art Advisor',
    background: 'Previously at White Cube and Frieze. Specialist in emerging British and international contemporary artists.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Isabelle Fontaine',
    role: 'Architecture & Installation',
    background: 'Former curator at Tate Modern. Specialist in site-specific commissions and architectural art integration.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

export default function ArtPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-5">Art Advisory</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F4EFE8] mb-6 leading-tight">
            The Art of<br />Fine Living
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto mb-10">
            Art transforms a house into a home. Our advisory team — drawn from Christie's, Tate and the world's leading galleries — curates collections that are as much an investment as they are an expression of taste.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#advisors" className="lux-button px-8 py-3">Meet Our Advisors</a>
            <Link href="/contact" className="lux-button-outline px-8 py-3">Request a Consultation</Link>
          </motion.div>
        </div>
      </div>

      {/* Intro editorial */}
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-5">Our Philosophy</p>
        <p className="font-serif text-2xl text-[#1C1A17] leading-relaxed mb-6">
          "Art is not an afterthought. The finest homes in the world are defined as much by the works on their walls and in their gardens as by their architecture. We believe every client deserves access to the same art advisory expertise available to the world's great private collectors."
        </p>
        <p className="text-sm text-[#7A6E60]">Eleanor Whitfield, Head of Art Advisory</p>
      </div>

      {/* Services */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">What We Offer</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Art Advisory Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-[#252220] rounded-xl p-6">
                <s.icon className="w-7 h-7 text-[#C9A96A] mb-4" />
                <h3 className="font-semibold text-[#F4EFE8] mb-2">{s.title}</h3>
                <p className="text-sm text-[#9A8B7A] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured works */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Featured Works</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Available for Acquisition</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">A curated selection from our gallery partners and private collections. Enquire for pricing and provenance documentation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_WORKS.map((w, i) => (
            <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="lux-card overflow-hidden group">
              <div className="relative h-56 overflow-hidden bg-[#F0EAE0]">
                <Image src={w.image} alt={w.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-[#1C1A17]/80 text-[#C9A96A] text-xs px-2 py-1 rounded-full">{w.category}</div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-[#1C1A17] mb-1">{w.title}</h3>
                <p className="text-sm text-[#7A6E60] mb-1">{w.artist}</p>
                <p className="text-xs text-[#9A8B7A] mb-1">{w.medium}</p>
                <p className="text-xs text-[#9A8B7A] mb-3">{w.size}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A96A] font-semibold">{w.estimate}</span>
                  <button className="text-xs text-[#7A6E60] hover:text-[#C9A96A] flex items-center gap-1 transition-colors">
                    Enquire <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Art as investment */}
      <div className="bg-[#F0EAE0] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-4">Investment Perspective</p>
              <h2 className="font-serif text-3xl text-[#1C1A17] mb-5">Art as an Alternative Asset</h2>
              <p className="text-[#5F5448] mb-4 leading-relaxed">The global art market transacted over $67 billion in 2023. Ultra-high-net-worth individuals increasingly allocate 5–15% of their portfolio to art and collectibles, attracted by its low correlation with financial markets and its role as a store of value.</p>
              <p className="text-[#5F5448] mb-6 leading-relaxed">We provide access to the secondary market data, specialist market intelligence and relationship networks previously available only to the world's largest private collections.</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { value: '$67bn', label: 'Global art market 2023' },
                  { value: '8.3%', label: 'Avg annual return, blue-chip' },
                  { value: '2.7%', label: 'Average buyer\'s premium' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-4 text-center">
                    <p className="font-serif text-xl font-semibold text-[#1C1A17]">{s.value}</p>
                    <p className="text-xs text-[#7A6E60] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="lux-button px-8 py-3">Request Art Market Briefing</Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&q=80" alt="Art gallery" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Advisors */}
      <div id="advisors" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Team</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Meet the Advisors</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Former specialists from Christie's, Tate and the world's leading galleries — now working exclusively for our clients.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ADVISORS.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="lux-card p-6 text-center">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <Image src={a.image} alt={a.name} fill className="object-cover" />
              </div>
              <h3 className="font-serif text-xl text-[#1C1A17] mb-1">{a.name}</h3>
              <p className="text-sm text-[#C9A96A] mb-3">{a.role}</p>
              <p className="text-xs text-[#7A6E60] leading-relaxed">{a.background}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Christie's connection note */}
      <div className="bg-[#1C1A17] py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-4">Auction House Partnerships</p>
          <p className="text-[#B9AA98] text-lg leading-relaxed">Our advisory team maintains active relationships with specialist departments at Christie's, Sotheby's and Bonham's — giving our clients privileged access to private treaty sales, specialist valuations and unreleased auction estimates.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Commission a Collection</h2>
        <p className="text-[#7A6E60] mb-8 max-w-xl mx-auto">Whether you're furnishing a new home, building an investment collection or commissioning a bespoke artwork, our advisors are here to help.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="lux-button px-8 py-3">Request a Consultation</Link>
          <Link href="/interior-design" className="lux-button-outline px-8 py-3">Interior Design Services</Link>
        </div>
      </div>
    </div>
  );
}
