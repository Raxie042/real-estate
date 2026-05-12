'use client';
import ScrollReveal from '@/components/ScrollReveal';

const PUBLICATIONS = ['FT', 'Bloomberg', 'The Times', 'WSJ', 'Forbes', 'Vogue', 'Evening Standard'];

export default function PressLogos() {
  return (
    <section className="bg-white border-y border-[#E8E1D7] py-10">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal>
          <p className="text-center text-xs uppercase tracking-[0.5em] text-[#9A8B7A] mb-6">As Featured In</p>
          <div className="flex flex-wrap items-center justify-center gap-10">
            {PUBLICATIONS.map(p => (
              <span key={p} className="text-lg font-bold text-[#C8BAA4] hover:text-[#1C1A17] transition-colors tracking-tight cursor-default select-none">{p}</span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
