'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { Leaf, Zap, Users, BarChart2, TreePine, Sun, Wind, Droplets, Building2, Globe } from 'lucide-react';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Environment',
    goal: 'Net Zero by 2030',
    items: [
      { metric: '45%', label: 'Carbon reduction since 2020', progress: 45 },
      { metric: '100%', label: 'Renewable office energy', progress: 100 },
      { metric: '18,400', label: 'Trees planted to date', progress: 73 },
      { metric: '0', label: 'Landfill waste target by 2027', progress: 62 },
    ],
  },
  {
    icon: Users,
    title: 'Social',
    goal: 'Communities First',
    items: [
      { metric: '£622k', label: 'Charitable giving since 2018', progress: 62 },
      { metric: '4,200+', label: 'Employee volunteer hours', progress: 84 },
      { metric: '5', label: 'School partnerships active', progress: 100 },
      { metric: '94%', label: 'Living Wage employer target', progress: 94 },
    ],
  },
  {
    icon: BarChart2,
    title: 'Governance',
    goal: 'Transparent & Accountable',
    items: [
      { metric: '40%', label: 'Women in senior leadership', progress: 40 },
      { metric: '100%', label: 'Ethical supplier audited', progress: 88 },
      { metric: '0', label: 'Regulatory violations (5yr)', progress: 100 },
      { metric: 'A+', label: 'RICS ethics compliance rating', progress: 95 },
    ],
  },
];

const INITIATIVES = [
  { icon: Sun, title: 'Solar-Powered Offices', desc: 'All four of our global offices run on 100% renewable energy. Our London HQ has installed 240 solar panels generating 76kWh daily.', year: '2023' },
  { icon: TreePine, title: 'The Raxie Tree Programme', desc: 'For every property sold, we plant 10 native trees in partnership with Trees for Cities and the Woodland Trust. 18,400 planted to date.', year: '2021' },
  { icon: Building2, title: 'Green Building Standards', desc: 'We exclusively partner with developers who meet minimum BREEAM "Very Good" or EPC B ratings for new build listings.', year: '2022' },
  { icon: Wind, title: 'Zero-Emission Fleet', desc: 'Our client-facing vehicle fleet is 100% electric. We operate 14 Tesla and Polestar vehicles across London and Dubai.', year: '2024' },
  { icon: Droplets, title: 'Water Stewardship', desc: 'Greywater recycling and rainwater harvesting installed in London HQ, saving 240,000 litres per year.', year: '2024' },
  { icon: Globe, title: 'Supply Chain Ethics', desc: 'Raxie Supplier Charter launched — all partners assessed for modern slavery, living wage and carbon commitments annually.', year: '2023' },
  { icon: Zap, title: 'Carbon Offsetting', desc: 'Residual emissions offset through verified Gold Standard projects in reforestation, solar cookstoves and clean water access.', year: '2022' },
  { icon: Users, title: 'Inclusive Hiring', desc: 'Blind recruitment process, neurodiversity awareness training, and gender pay reporting since 2022. 94% staff retention rate.', year: '2022' },
];

const REPORTS = [
  { year: '2025', title: 'ESG Report 2025', desc: 'Net Zero Pathway — full scope 1, 2 & 3 emissions, social KPIs and governance disclosures.', pages: 48 },
  { year: '2024', title: 'ESG Report 2024', desc: 'Baseline year report covering our first full carbon inventory and social impact measurement.', pages: 42 },
  { year: '2023', title: 'Sustainability Summary 2023', desc: 'Our inaugural sustainability summary — outlining commitments and 2025 targets.', pages: 24 },
];

const STATS = [
  { value: '45%', label: 'Carbon Reduced', sub: 'since 2020 baseline' },
  { value: 'Net Zero', label: '2030 Target', sub: 'committed and on track' },
  { value: '18,400', label: 'Trees Planted', sub: 'and counting' },
  { value: '100%', label: 'Renewable Energy', sub: 'across all offices' },
];

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative min-h-[75vh] flex items-center overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80" alt="Sustainability" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1A17]/60 to-[#1C1A17]" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Environmental, Social & Governance</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F6F2EC] leading-tight mb-6">
            Property That Protects<br />the World We Live In
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[#B9AA98] text-xl mb-10 max-w-2xl mx-auto">
            We believe that exceptional real estate and genuine sustainability are not in conflict — they are inseparable. Our commitment to ESG is embedded in every transaction, every decision and every building we occupy.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center">
            <Link href="#esg-report" className="bg-[#C9A96A] text-[#1C1A17] px-8 py-3 font-semibold tracking-wide hover:bg-[#B8935A] transition-colors">
              Download ESG Report 2025
            </Link>
            <Link href="/green-homes" className="border border-[#C9A96A] text-[#C9A96A] px-8 py-3 font-semibold tracking-wide hover:bg-[#C9A96A]/10 transition-colors">
              Browse Green Homes
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#2D5016]">
        <div className="max-w-5xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#8DC26F]">{s.value}</p>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-white/50 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commitment statement */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <ScrollReveal>
          <div className="w-16 h-0.5 bg-[#C9A96A] mx-auto mb-8" />
          <blockquote className="font-serif text-2xl text-[#1C1A17] leading-relaxed italic mb-6">
            "Climate change is the defining issue of our time. The built environment accounts for nearly 40% of global carbon emissions. As one of London's leading property firms, we have a responsibility — and an opportunity — to lead from the front."
          </blockquote>
          <p className="text-[#9A8B7A] text-sm uppercase tracking-widest">Oliver Raxie, Founder & CEO</p>
          <div className="w-16 h-0.5 bg-[#C9A96A] mx-auto mt-8" />
        </ScrollReveal>
      </section>

      {/* Three pillars */}
      <section className="bg-[#F0EAE0] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Our ESG Framework</p>
            <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Three Pillars, One Commitment</h2>
            <p className="text-[#7A6E60] max-w-xl mx-auto">Our sustainability strategy is built on a clear ESG framework with measurable targets, annual public reporting and third-party verification.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.1}>
                <div className="lux-card p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <pillar.icon size={24} className="text-[#2D5016]" />
                    <h3 className="font-serif text-2xl text-[#1C1A17]">{pillar.title}</h3>
                  </div>
                  <p className="text-[#C9A96A] text-xs font-semibold uppercase tracking-wider mb-6">{pillar.goal}</p>
                  <div className="space-y-4">
                    {pillar.items.map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="text-xs text-[#5F5448]">{item.label}</span>
                          <span className="font-semibold text-[#1C1A17] text-sm">{item.metric}</span>
                        </div>
                        <div className="h-1.5 bg-[#E8E1D7] rounded-full overflow-hidden">
                          <div className="h-full bg-[#2D5016] rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">What We've Done</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Our Sustainability Initiatives</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">Concrete actions, not just pledges.</p>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-6">
          {INITIATIVES.map((init, i) => (
            <ScrollReveal key={init.title} delay={i * 0.05}>
              <div className="lux-card p-7 flex gap-5">
                <init.icon size={28} className="text-[#2D5016] flex-shrink-0 mt-1" />
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="font-semibold text-[#1C1A17]">{init.title}</h3>
                    <span className="text-xs text-[#9A8B7A]">Since {init.year}</span>
                  </div>
                  <p className="text-[#5F5448] text-sm leading-relaxed">{init.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Net Zero roadmap */}
      <section className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Our Pathway</p>
            <h2 className="font-serif text-4xl text-[#F6F2EC] mb-4">Net Zero Roadmap</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#3A3530]" />
            {[
              { year: '2020', title: 'Baseline Measurement', desc: 'First full carbon audit conducted across all Scope 1, 2 and 3 emissions. Total: 847 tCO₂e.', done: true },
              { year: '2022', title: '25% Carbon Reduction', desc: 'Office energy switch to 100% renewable. Fleet electrification begun. Paper usage eliminated. 212 tCO₂e saved.', done: true },
              { year: '2023', title: '35% Carbon Reduction + ISO 14001', desc: 'International Organisation for Standardisation Environmental Management certification achieved.', done: true },
              { year: '2024', title: '45% Reduction — On Track', desc: 'Zero-emission vehicle fleet complete. All supplier contracts include ESG clauses. Solar panel installation complete.', done: true },
              { year: '2026', title: '60% Reduction Target', desc: 'Full supply chain decarbonisation. Science-Based Targets initiative (SBTi) validation expected.', done: false },
              { year: '2028', title: '80% Reduction Target', desc: 'All client-facing operations net zero. Remaining offset through verified Gold Standard projects.', done: false },
              { year: '2030', title: 'Net Zero', desc: 'Full net zero across all emission scopes. Third-party verified and publicly disclosed.', done: false },
            ].map((step, i) => (
              <ScrollReveal key={step.year} delay={i * 0.07}
                className="relative pl-16 pb-10">
                <div className={`absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${step.done ? 'bg-[#2D5016] border-[#4A7C2A]' : 'bg-[#252220] border-[#3A3530]'}`}>
                  {step.done && <div className="w-2 h-2 rounded-full bg-[#8DC26F]" />}
                </div>
                <div className="flex items-baseline gap-4 mb-1">
                  <span className={`font-serif text-xl font-bold ${step.done ? 'text-[#8DC26F]' : 'text-[#5F5448]'}`}>{step.year}</span>
                  {step.done && <span className="text-[#4A7C2A] text-xs font-semibold uppercase tracking-wider">Complete</span>}
                </div>
                <h4 className="text-[#F4EFE8] font-semibold mb-1">{step.title}</h4>
                <p className="text-[#9A8B7A] text-sm leading-relaxed">{step.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reports */}
      <section id="esg-report" className="max-w-5xl mx-auto px-4 py-20">
        <ScrollReveal className="text-center mb-14">
          <p className="text-[#C9A96A] text-xs uppercase tracking-[0.4em] mb-3">Annual Reporting</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">ESG Reports & Downloads</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">We publish full ESG reports annually, verified by an independent third party. Transparency is non-negotiable.</p>
        </ScrollReveal>
        <div className="space-y-4">
          {REPORTS.map((r, i) => (
            <ScrollReveal key={r.year} delay={i * 0.07}>
              <div className="lux-card p-6 flex items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-lg bg-[#2D5016] flex items-center justify-center flex-shrink-0">
                    <Leaf size={22} className="text-[#8DC26F]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#C9A96A] uppercase tracking-wider mb-1">{r.year}</p>
                    <h3 className="font-semibold text-[#1C1A17] mb-1">{r.title}</h3>
                    <p className="text-[#7A6E60] text-sm">{r.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="text-xs text-[#9A8B7A]">{r.pages} pages</span>
                  <button className="lux-button-outline text-xs px-5 py-2">Download PDF</button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal>
        <div className="bg-[#2D5016] py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#8DC26F] text-xs uppercase tracking-[0.4em] mb-4">Join the Conversation</p>
            <h2 className="font-serif text-4xl text-white mb-4">Sustainability Questions?</h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto">Our ESG team is happy to discuss our commitments, provide detailed data or explore how sustainability factors into your property search or sale.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?dept=esg" className="bg-white text-[#2D5016] px-8 py-3 font-semibold hover:bg-white/90 transition-colors">
                Contact ESG Team
              </Link>
              <Link href="/green-homes" className="border border-white/60 text-white px-8 py-3 font-semibold hover:bg-white/10 transition-colors">
                Browse Green Homes
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
