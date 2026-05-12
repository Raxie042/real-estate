'use client';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const STATS = [
  { value: '£2B+', label: 'Transacted' },
  { value: '1,400+', label: 'Properties Sold' },
  { value: '35', label: 'Countries Served' },
  { value: '180+', label: 'Expert Agents' },
];

export default function SocialProof() {
  return (
    <section className="bg-[#1C1A17] py-16">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-10">By the Numbers</p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-light text-white lux-heading mb-2">{s.value}</p>
                <p className="text-xs uppercase tracking-widest text-[#9A8B7A]">{s.label}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
