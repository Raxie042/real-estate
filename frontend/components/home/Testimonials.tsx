'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const TESTIMONIALS = [
  {
    quote: 'The team found us an off-market property in Mayfair before it was even listed publicly. The entire process — from first viewing to exchange — took just six weeks.',
    author: 'H. Al-Rasheed',
    role: 'Private Client',
    location: 'London',
    avatar: 'HA',
  },
  {
    quote: 'I\'ve bought property in seven countries. This is the only platform that gave me the confidence to commit to a purchase remotely. The data, the presentation, the concierge — outstanding.',
    author: 'M. Beaumont',
    role: 'International Investor',
    location: 'Singapore',
    avatar: 'MB',
  },
  {
    quote: 'We received three above-asking offers within 48 hours of listing. The AI valuation was spot-on, and the marketing reached exactly the right buyers.',
    author: 'C. & P. Ashworth',
    role: 'Property Vendors',
    location: 'Knightsbridge',
    avatar: 'CA',
  },
  {
    quote: 'Renting in London is notoriously difficult. The managed service took every headache away — viewings coordinated, references checked, tenancy sorted in under two weeks.',
    author: 'D. Chen',
    role: 'Tenant Client',
    location: 'Chelsea',
    avatar: 'DC',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  return (
    <section className="bg-[#F6F2EC] py-20">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Client Voices</p>
          <h2 className="text-4xl font-light text-[#1C1A17] lux-heading text-center mb-12">What Our Clients Say</h2>
        </ScrollReveal>
        <div className="lux-card p-10 md:p-14 text-center min-h-[240px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <svg className="w-10 h-10 text-[#C9A96A]/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/></svg>
              <blockquote className="text-xl font-light text-[#1C1A17] leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A96A] flex items-center justify-center text-sm font-semibold text-[#1C1A17]">{t.avatar}</div>
                <div className="text-left">
                  <p className="font-semibold text-[#1C1A17] text-sm">{t.author}</p>
                  <p className="text-xs text-[#7A6E60]">{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-2.5 h-2.5 rounded-full transition-colors ${active === i ? 'bg-[#C9A96A]' : 'bg-[#BBAD98]'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
