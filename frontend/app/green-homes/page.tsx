'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Leaf, Zap, Droplets, Sun, ThermometerSun, Wind, ArrowRight, Star } from 'lucide-react';

const GREEN_PROPERTIES = [
  { id: 1, title: 'Kensington Passive House', address: 'Kensington, London', price: '£6,800,000', epc: 'A', breeam: 'Excellent', beds: 4, sqft: 3800, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80', features: ['Solar PV 12kWp', 'ASHP underfloor heating', 'Triple glazing', 'EV charging', 'Rainwater harvesting'], carbonSaving: '4.2 tonnes/year' },
  { id: 2, title: 'Battersea Net-Zero Apartment', address: 'Battersea Power Station, London', price: '£2,950,000', epc: 'A', breeam: 'Outstanding', beds: 3, sqft: 2200, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=80', features: ['District heat network', 'Smart energy management', 'EV charging', 'Green roof', 'Grey water recycling'], carbonSaving: '2.8 tonnes/year' },
  { id: 3, title: 'Surrey Hills Eco Estate', address: 'Haslemere, Surrey', price: '£4,500,000', epc: 'A', breeam: 'Excellent', beds: 6, sqft: 6200, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&q=80', features: ['Ground source heat pump', 'Solar thermal hot water', 'Battery storage 20kWh', 'Wildflower meadow', 'EV charging x4'], carbonSaving: '7.1 tonnes/year' },
  { id: 4, title: 'Dubai Sustainable Villa', address: 'Arabian Ranches III, Dubai', price: 'AED 12,500,000', epc: 'A', breeam: 'LEED Gold', beds: 5, sqft: 5400, image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80', features: ['Smart solar shading', 'Greywater recycling', 'Smart HVAC', 'EV charging', 'Native planting'], carbonSaving: '5.6 tonnes/year' },
  { id: 5, title: 'Edinburgh Georgian Retrofit', address: 'Morningside, Edinburgh', price: '£1,850,000', epc: 'B', breeam: 'Good', beds: 5, sqft: 3600, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80', features: ['Solid wall insulation', 'ASHP', 'Solar PV 6kWp', 'Smart meters', 'Secondary glazing'], carbonSaving: '3.4 tonnes/year' },
  { id: 6, title: 'Cornwall Coastal Eco House', address: 'Rock, Cornwall', price: '£3,200,000', epc: 'A', breeam: 'Excellent', beds: 4, sqft: 2900, image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=700&q=80', features: ['Timber frame construction', 'Sedum roof', 'Solar + battery', 'Rainwater harvesting', 'Log burner (Defra approved)'], carbonSaving: '4.9 tonnes/year' },
];

const BENEFITS = [
  { icon: Zap, title: 'Lower Energy Bills', desc: 'A-rated homes typically cost 60–80% less to run than a standard property of the same size.' },
  { icon: Leaf, title: 'Carbon Reduction', desc: 'Green homes certified at EPC A save an average of 4.1 tonnes of CO₂ per year versus EPC D.' },
  { icon: Star, title: 'Higher Resale Value', desc: 'Knight Frank research: EPC A/B homes command a 5–8% premium over equivalent EPC D properties in prime markets.' },
  { icon: ThermometerSun, title: 'Superior Comfort', desc: 'Advanced insulation and ventilation systems eliminate cold spots, damp, and draughts year-round.' },
  { icon: Sun, title: 'Future-Proofed', desc: 'With MEES regulations tightening to EPC C by 2028, A/B homes will have enhanced liquidity and rental value.' },
  { icon: Wind, title: 'Air Quality', desc: 'MVHR ventilation systems filter external pollutants, providing clean air and reducing allergens.' },
];

const EPC_COLORS: Record<string, string> = { A: 'bg-emerald-600', B: 'bg-lime-500' };

export default function GreenHomesPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C1A17]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-emerald-400 text-xs uppercase tracking-[0.4em] mb-4">Sustainability</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F6F2EC] mb-5">Green Homes</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto">Properties certified EPC A or B — built or retrofitted for sustainability, comfort, and long-term value.</motion.p>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-5xl mx-auto px-4 py-14">
        <ScrollReveal className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-emerald-600 mb-3">Why Green?</p>
          <h2 className="font-serif text-3xl text-[#1C1A17]">The Case for Sustainable Luxury</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.07}>
              <div className="lux-card p-5">
                <b.icon size={20} className="text-emerald-600 mb-3" />
                <h3 className="font-semibold text-[#1C1A17] mb-1">{b.title}</h3>
                <p className="text-sm text-[#5F5448] leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Listings */}
      <div className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-4">
          <ScrollReveal className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600 mb-3">Available Now</p>
            <h2 className="font-serif text-3xl text-[#1C1A17]">Certified Green Properties</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {GREEN_PROPERTIES.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.06}>
                <div className="lux-card overflow-hidden group">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded ${EPC_COLORS[p.epc]}`}>EPC {p.epc}</span>
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded">{p.breeam}</span>
                    </div>
                    <span className="absolute bottom-3 left-3 text-white font-serif text-lg">{p.price}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-lg text-[#1C1A17] mb-1">{p.title}</h3>
                    <p className="text-xs text-[#7A6E60] mb-3">{p.address}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.features.slice(0, 3).map(f => (
                        <span key={f} className="flex items-center gap-0.5 text-[10px] bg-emerald-50 text-emerald-700 rounded-full px-2 py-0.5">
                          <Leaf size={8} />{f}
                        </span>
                      ))}
                      {p.features.length > 3 && <span className="text-[10px] text-[#9A8B7A]">+{p.features.length - 3} more</span>}
                    </div>
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mb-4"><Leaf size={10} />Saves ~{p.carbonSaving} CO₂ vs avg</p>
                    <Link href="/contact" className="lux-button-outline text-sm text-center block w-full">Enquire</Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.2} className="text-center mt-8">
            <Link href="/search?epc=A,B" className="lux-button inline-flex items-center gap-2">
              Browse All Green Properties <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1C1A17] py-16 px-4 text-center">
        <ScrollReveal>
          <p className="text-emerald-400 text-xs uppercase tracking-[0.4em] mb-3">Green Retrofit Advisory</p>
          <h2 className="font-serif text-3xl text-[#F6F2EC] mb-4">Upgrading Your Property?</h2>
          <p className="text-[#B9AA98] mb-6 max-w-md mx-auto">Our sustainability advisers can assess your property's green potential and model the impact on value and running costs.</p>
          <Link href="/contact" className="lux-button">Request a Sustainability Assessment</Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
