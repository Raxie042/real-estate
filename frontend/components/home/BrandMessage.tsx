"use client";

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { useTranslations } from 'next-intl';

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // ease out
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
}

export default function BrandMessage() {
  const t = useTranslations('Home');

  return (
    <div className="bg-[#1C1A17] py-24 md:py-36 overflow-hidden relative">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C9A96A 0, #C9A96A 1px, transparent 0, transparent 50%)' , backgroundSize: '12px 12px' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal delay={0}>
          <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-6">Our Heritage</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight lux-heading">
            {t('brandTitle')}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="w-16 h-px bg-[#C9A96A] mx-auto mb-10" />
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-4 font-light lux-prose max-w-2xl mx-auto">
            {t('brandSubtitle')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.45}>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light lux-prose max-w-2xl mx-auto">
            {t('brandBody')}
          </p>
        </ScrollReveal>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 md:gap-16">
          {[
            { target: 1000, suffix: '+', label: t('statsOffices') },
            { target: 81, suffix: '', label: t('statsCountries') },
            { target: 26000, suffix: '+', label: t('statsAssociates') },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={0.5 + i * 0.12} direction="up">
              <div className="border border-white/10 rounded-2xl py-8 px-4 hover:border-[#C9A96A]/40 transition-colors duration-500">
                <div className="text-4xl md:text-5xl font-light text-[#C9A96A] mb-3 lux-heading">
                  <AnimatedNumber target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/40">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
