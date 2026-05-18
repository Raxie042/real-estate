'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Home, Users, Leaf, ArrowRight } from 'lucide-react';

const CHARITIES = [
  {
    name: 'Shelter',
    role: 'Housing & Homelessness',
    description: "Shelter campaigns for everyone's right to a safe home. Through our partnership, 1% of every completion fee is donated directly to Shelter's emergency housing services.",
    logo: '🏠',
    raised: '£284,000',
    since: '2021',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80',
  },
  {
    name: 'Crisis',
    role: 'Ending Homelessness',
    description: 'Crisis works with people experiencing homelessness across the UK. We fund their Skills & Training programme which helps people rebuild their lives through employment.',
    logo: '🤝',
    raised: '£196,000',
    since: '2022',
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80',
  },
  {
    name: 'The Prince\'s Trust',
    role: 'Youth Employment',
    description: "We fund The Prince's Trust Enterprise Programme, helping young people aged 18–30 start businesses and build careers in the property industry.",
    logo: '⭐',
    raised: '£142,000',
    since: '2022',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  },
  {
    name: 'Trees for Cities',
    role: 'Urban Greening',
    description: 'For every property sale, we plant 20 trees through Trees for Cities — offsetting carbon and greening urban communities across London and beyond.',
    logo: '🌳',
    raised: '18,400 trees',
    since: '2023',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
  },
];

const PROGRAMMES = [
  {
    icon: Heart,
    title: 'Employee Volunteer Days',
    body: 'Every member of our team receives 3 paid volunteer days per year. Our people have contributed over 4,200 hours to community projects since 2021.',
  },
  {
    icon: Users,
    title: 'Property Careers Pathways',
    body: 'We partner with five London secondary schools in under-served communities to provide mentoring, work experience and property industry career guidance.',
  },
  {
    icon: Home,
    title: 'The Raxie Foundation',
    body: 'Our charitable foundation directs 2% of annual profits toward affordable housing advocacy, community land trusts and homelessness prevention initiatives.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Communities Fund',
    body: 'We invest in energy-efficiency retrofits for social housing, helping lower-income households reduce energy bills while cutting carbon emissions.',
  },
];

const IMPACT = [
  { value: '£622k+', label: 'Donated to charity', sub: 'since 2021' },
  { value: '18,400', label: 'Trees planted', sub: 'across the UK' },
  { value: '4,200+', label: 'Employee volunteer hours', sub: 'in our communities' },
  { value: '5', label: 'School partnerships', sub: 'supporting 600+ students' },
];

export default function PhilanthropyPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="relative bg-[#1C1A17] overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-5">Giving Back</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#F4EFE8] mb-6 leading-tight">
            Property Has the Power<br />to Change Lives
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] text-lg max-w-2xl mx-auto">
            We believe that those who benefit most from the property market have a responsibility to give back to those who have the least. Our philanthropy programme is core to who we are.
          </motion.p>
        </div>
      </div>

      {/* Impact stats */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {IMPACT.map(s => (
            <div key={s.label}>
              <p className="font-serif text-2xl font-semibold text-[#1C1A17]">{s.value}</p>
              <p className="text-[#1C1A17]/80 text-xs font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-[#1C1A17]/55 text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charity partners */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Partners</p>
          <h2 className="font-serif text-4xl text-[#1C1A17] mb-4">Charity Partnerships</h2>
          <p className="text-[#7A6E60] max-w-xl mx-auto">We direct a meaningful share of our revenue to organisations making real, measurable change in housing, youth opportunity and the environment.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CHARITIES.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="lux-card overflow-hidden">
              <div className="relative h-44">
                <Image src={c.image} alt={c.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-3xl mr-2">{c.logo}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-[#1C1A17]">{c.name}</h3>
                    <p className="text-sm text-[#C9A96A]">{c.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#1C1A17] text-sm">{c.raised}</p>
                    <p className="text-xs text-[#9A8B7A]">since {c.since}</p>
                  </div>
                </div>
                <p className="text-sm text-[#5F5448] leading-relaxed">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our programmes */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Our Programmes</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">How We Invest in Communities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROGRAMMES.map(p => (
              <div key={p.title} className="bg-[#252220] rounded-xl p-6 flex gap-5">
                <p.icon className="w-7 h-7 text-[#C9A96A] shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-[#F4EFE8] mb-2">{p.title}</h3>
                  <p className="text-sm text-[#9A8B7A] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Raxie Foundation */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="lux-card p-10 md:p-14 text-center">
          <div className="text-5xl mb-6">🏛️</div>
          <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">The Raxie Foundation</h2>
          <p className="text-[#5F5448] max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Established in 2023, The Raxie Foundation is our independent charitable trust. It channels 2% of annual profits into programmes focused on affordable housing advocacy, youth opportunity in property, and environmental sustainability. The Foundation is governed independently of our commercial operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: '🏠', label: 'Affordable Housing', desc: 'Advocacy and funding for community land trusts and affordable development' },
              { icon: '🎓', label: 'Youth in Property', desc: 'Scholarships, mentoring and apprenticeships for underrepresented communities' },
              { icon: '🌱', label: 'Environment', desc: 'Funding energy-efficiency retrofits and urban greening projects' },
            ].map(f => (
              <div key={f.label} className="bg-[#F8F5F0] rounded-xl p-5 text-left">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-semibold text-[#1C1A17] mb-1">{f.label}</h4>
                <p className="text-sm text-[#7A6E60]">{f.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="lux-button px-8 py-3">Partner with The Foundation</Link>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-[#F0EAE0] py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A96A] text-2xl font-serif italic mb-4">"Luxury and responsibility are not in opposition — they are inseparable. Our success is meaningful only when it creates positive change for those who need it most."</p>
          <p className="font-semibold text-[#1C1A17]">The Raxie Zenith Estate Leadership Team</p>
        </div>
      </div>

      {/* Get involved */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl text-[#1C1A17] mb-4">Get Involved</h2>
        <p className="text-[#7A6E60] mb-8 max-w-xl mx-auto">Whether you're a seller wanting to donate a share of your proceeds, a corporate partner or an individual donor, we'd love to hear from you.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="lux-button px-8 py-3">Contact The Foundation</Link>
          <Link href="/careers" className="lux-button-outline px-8 py-3">Join Our Team</Link>
        </div>
      </div>
    </div>
  );
}
