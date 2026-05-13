'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import {
  Building2, Plane, Scale, Home, Briefcase, GraduationCap,
  Globe, Diamond, X, ChevronRight, Mail, Phone, ExternalLink,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Private Banking',
  'Legal & Conveyancing',
  'Architecture & Design',
  'Private Aviation',
  'Interior Design',
  'Relocation',
  'Education',
  'Fine Art & Collectibles',
];

interface Partner {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  services: string[];
  contact: { email: string; phone: string; web: string };
  logo: string; // initials for monogram
  tier: 'Platinum' | 'Gold';
}

const PARTNERS: Partner[] = [
  // Private Banking
  {
    id: 'coutts',
    category: 'Private Banking',
    name: 'Coutts & Co',
    tagline: 'Private banking for exceptional individuals',
    description:
      "Founded in 1692, Coutts is one of the world's oldest and most respected private banks. Their property finance team specialises in bespoke mortgage solutions for UHNW clients purchasing prime and super-prime residential property across the UK and internationally.",
    services: ['Bespoke mortgage structuring', 'Bridging finance', 'Portfolio lending', 'Wealth planning'],
    contact: { email: 'privatebanking@coutts.com', phone: '+44 20 7753 1000', web: 'coutts.com' },
    logo: 'C&Co',
    tier: 'Platinum',
  },
  {
    id: 'julius-baer',
    category: 'Private Banking',
    name: 'Julius Baer',
    tagline: 'Swiss private banking heritage since 1890',
    description:
      'Julius Baer provides sophisticated wealth management and real estate financing solutions to ultra-high-net-worth individuals. Their London and Zurich teams have particular expertise in cross-border property acquisitions and complex structuring for non-domiciled buyers.',
    services: ['Real estate financing', 'Asset management', 'Tax structuring', 'Estate planning'],
    contact: { email: 'london@juliusbaer.com', phone: '+44 20 3430 6500', web: 'juliusbaer.com' },
    logo: 'JB',
    tier: 'Platinum',
  },
  {
    id: 'ubs',
    category: 'Private Banking',
    name: 'UBS Wealth Management',
    tagline: 'Global private banking with local expertise',
    description:
      "UBS's Private Banking division manages over $4 trillion in invested assets globally. Their property advisory team works alongside wealth managers to provide integrated financing, structuring and advisory services for clients acquiring residential property in major world cities.",
    services: ['Property finance', 'Family office services', 'Impact investing', 'Art banking'],
    contact: { email: 'wealth@ubs.com', phone: '+44 20 7567 8000', web: 'ubs.com' },
    logo: 'UBS',
    tier: 'Platinum',
  },
  {
    id: 'rothschild',
    category: 'Private Banking',
    name: 'Rothschild & Co',
    tagline: 'Wealth Management since 1838',
    description:
      "Rothschild & Co's Wealth Management division brings 200 years of experience to the management of private capital. Their advisory team can introduce mortgage and bridging finance solutions tailored to the specific needs of buyers in the £5M–£100M+ bracket.",
    services: ['Wealth preservation', 'Succession planning', 'Property finance advisory', 'Global diversification'],
    contact: { email: 'wealthmanagement@rothschild.com', phone: '+44 20 7280 5000', web: 'rothschild.com' },
    logo: 'R&Co',
    tier: 'Gold',
  },
  // Legal
  {
    id: 'mishcon',
    category: 'Legal & Conveyancing',
    name: 'Mishcon de Reya',
    tagline: 'Leading real estate law for complex transactions',
    description:
      "Mishcon de Reya's real estate team is widely regarded as one of London's finest for prime and super-prime residential transactions. They act for buyers, sellers, developers and investors across residential, commercial and mixed-use assets.",
    services: ['Conveyancing', 'Cross-border acquisition', 'Lease negotiation', 'Dispute resolution'],
    contact: { email: 'property@mishcon.com', phone: '+44 20 3321 7000', web: 'mishcon.com' },
    logo: 'MdR',
    tier: 'Platinum',
  },
  {
    id: 'farrer',
    category: 'Legal & Conveyancing',
    name: 'Farrer & Co',
    tagline: 'Discreet legal counsel for distinguished clients',
    description:
      "Farrer & Co is the pre-eminent private client law firm in England. Long-established relationships with landed estates, UHNW families and private trusts give them an unparalleled understanding of complex property ownership structures.",
    services: ['Prime residential conveyancing', 'Trust and estate work', 'Listed property matters', 'Country estates'],
    contact: { email: 'enquiries@farrer.co.uk', phone: '+44 20 3375 7000', web: 'farrer.co.uk' },
    logo: 'F&Co',
    tier: 'Gold',
  },
  // Architecture & Design
  {
    id: 'foster',
    category: 'Architecture & Design',
    name: 'Foster + Partners',
    tagline: 'Award-winning architecture at every scale',
    description:
      "Foster + Partners has designed some of the world's most admired buildings — from the Gherkin to Apple Park. Their residential studio specialises in landmark private homes, estate masterplans and refurbishments of significant heritage properties for discerning private clients.",
    services: ['New-build design', 'Heritage refurbishment', 'Estate masterplanning', 'Interior architecture'],
    contact: { email: 'enquiries@fosterandpartners.com', phone: '+44 20 7738 0455', web: 'fosterandpartners.com' },
    logo: 'F+P',
    tier: 'Platinum',
  },
  {
    id: 'finchatton',
    category: 'Architecture & Design',
    name: 'Finchatton',
    tagline: 'Ultra-prime residential development and design',
    description:
      'Finchatton is one of London\'s leading super-prime residential developers and designers, responsible for landmark projects in Mayfair, Knightsbridge and Chelsea. Their design team offers a complete turnkey service for buyers who wish to create a bespoke interior.',
    services: ['Turnkey design', 'Development advisory', 'Prime refurbishment', 'Project management'],
    contact: { email: 'info@finchatton.com', phone: '+44 20 7495 8899', web: 'finchatton.com' },
    logo: 'FTN',
    tier: 'Gold',
  },
  // Private Aviation
  {
    id: 'netjets',
    category: 'Private Aviation',
    name: 'NetJets Europe',
    tagline: 'The world\'s largest private aviation company',
    description:
      "NetJets offers fractional aircraft ownership and jet card programmes that provide flexible, reliable access to a fleet of over 700 aircraft worldwide. For clients viewing international properties, NetJets can arrange access within four hours' notice.",
    services: ['Fractional ownership', 'Jet cards', 'Charter', 'Fleet management'],
    contact: { email: 'owners@netjetseurope.com', phone: '+800 4000 4000', web: 'netjets.com' },
    logo: 'NJE',
    tier: 'Platinum',
  },
  {
    id: 'vistajet',
    category: 'Private Aviation',
    name: 'VistaJet',
    tagline: 'Global reach, guaranteed',
    description:
      "VistaJet's Programme provides guaranteed access to a fleet of over 360 aircraft in 96 countries. With a dedicated Fleet Director and 24/7 ground support, VistaJet is the preferred aviation partner for clients requiring seamless international property viewings.",
    services: ['Global charter', 'Dedicated aircraft programme', 'Concierge services', 'Group travel'],
    contact: { email: 'programme@vistajet.com', phone: '+44 20 3859 7900', web: 'vistajet.com' },
    logo: 'VJT',
    tier: 'Platinum',
  },
  // Interior Design
  {
    id: 'rchq',
    category: 'Interior Design',
    name: 'Robert Couturier & Associates',
    tagline: 'Timeless interiors for discerning collectors',
    description:
      "Robert Couturier's studio creates interiors of lasting elegance for private residences across Europe, the US and the Middle East. Known for combining rare antiques with contemporary commissions, the firm offers a full design and project management service.",
    services: ['Full-service interior design', 'Furniture procurement', 'Antiques sourcing', 'Art curation'],
    contact: { email: 'studio@robertcouturier.com', phone: '+44 20 7235 8765', web: 'robertcouturier.com' },
    logo: 'RC&A',
    tier: 'Gold',
  },
  {
    id: 'staffan-tollgard',
    category: 'Interior Design',
    name: 'Staffan Tollgård Design Group',
    tagline: 'Luxury Scandinavian design with London presence',
    description:
      "Tollgård Design Group is widely considered one of the most influential luxury interior design firms in London. Their portfolio spans Mayfair townhouses, ski chalets and superyachts — always with a signature balance of restraint and warmth.",
    services: ['Interior design', 'Art advisory', 'Furniture design', 'Show home staging'],
    contact: { email: 'studio@tollgard.com', phone: '+44 20 3397 7196', web: 'tollgard.com' },
    logo: 'STD',
    tier: 'Gold',
  },
  // Relocation
  {
    id: 'movecorp',
    category: 'Relocation',
    name: 'Crown Relocations',
    tagline: 'Global mobility for exceptional families',
    description:
      "Crown Relocations is a world leader in personal and corporate relocation services, operating in over 180 countries. Their private client team provides bespoke relocation management for UHNW families moving between prime residential markets.",
    services: ['Move management', 'Immigration & visas', 'Destination services', 'Secure logistics'],
    contact: { email: 'privateclient@crownrelo.com', phone: '+44 20 8560 5500', web: 'crownrelo.com' },
    logo: 'CRN',
    tier: 'Gold',
  },
  // Education
  {
    id: 'gabbitas',
    category: 'Education',
    name: 'Gabbitas Education',
    tagline: 'Independent school advisory since 1873',
    description:
      "Gabbitas is the UK's leading independent education consultancy, advising families on school selection across the UK and internationally. For clients relocating with school-age children, their advisors provide a bespoke shortlist and application support service.",
    services: ['School selection', 'Application support', 'Boarding school advisory', 'University preparation'],
    contact: { email: 'enquiries@gabbitas.com', phone: '+44 20 7734 0161', web: 'gabbitas.com' },
    logo: 'GBT',
    tier: 'Gold',
  },
  // Fine Art & Collectibles
  {
    id: 'christies',
    category: 'Fine Art & Collectibles',
    name: "Christie's Private Sales",
    tagline: 'The world\'s leading art business',
    description:
      "Christie's Private Sales division provides discreet advisory and transaction services for collectors acquiring or selling significant works of art, jewellery and luxury items outside the public auction process. Available to clients by introduction only.",
    services: ['Art acquisition', 'Collection valuation', 'Provenance research', 'Insurance advisory'],
    contact: { email: 'privatesales@christies.com', phone: '+44 20 7839 9060', web: 'christies.com' },
    logo: "C'S",
    tier: 'Platinum',
  },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Private Banking': <Building2 size={16} />,
  'Legal & Conveyancing': <Scale size={16} />,
  'Architecture & Design': <Home size={16} />,
  'Private Aviation': <Plane size={16} />,
  'Interior Design': <Diamond size={16} />,
  'Relocation': <Globe size={16} />,
  'Education': <GraduationCap size={16} />,
  'Fine Art & Collectibles': <Briefcase size={16} />,
};

function IntroModal({ partner, onClose }: { partner: Partner | null; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!partner) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#F6F2EC] rounded-2xl max-w-lg w-full p-8 relative shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#E8E1D7] transition text-[#7A6E60]">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-14 h-14 rounded-full bg-[#C9A96A]/20 flex items-center justify-center mx-auto mb-4">
              <ChevronRight size={28} className="text-[#C9A96A]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1C1A17] lux-heading mb-2">Introduction Requested</h3>
            <p className="text-[#7A6E60] text-sm leading-relaxed">
              We will reach out within one business day to arrange a discreet introduction to {partner.name}.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs uppercase tracking-widest text-[#C9A96A] mb-1">Request Introduction</p>
            <h3 className="text-xl font-semibold text-[#1C1A17] lux-heading mb-1">{partner.name}</h3>
            <p className="text-[#7A6E60] text-sm mb-6">{partner.tagline}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input required className="w-full lux-input" placeholder="Your full name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input required type="email" className="w-full lux-input" placeholder="Email address" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <input className="w-full lux-input" placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <textarea className="w-full lux-input h-24 resize-none" placeholder={`What would you like to discuss with ${partner.name}?`} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              <button type="submit" className="w-full lux-button">Request Introduction</button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [introPartner, setIntroPartner] = useState<Partner | null>(null);

  const filtered = activeCategory === 'All'
    ? PARTNERS
    : PARTNERS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=60')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.6em] text-[#C9A96A] mb-3">Curated relationships</p>
          <h1 className="text-5xl md:text-6xl font-light text-white lux-heading mb-4">Preferred Partners</h1>
          <p className="text-[#9A8B7A] max-w-xl text-lg font-light leading-relaxed">
            An invitation-only directory of the world's finest service providers — each vetted by our team and trusted by our most discerning clients.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-10 bg-[#F6F2EC]/95 backdrop-blur border-b border-[#E8E1D7]">
        <div className="max-w-6xl mx-auto px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors border ${
                  activeCategory === cat
                    ? 'bg-[#1C1A17] text-[#C9A96A] border-[#1C1A17]'
                    : 'bg-transparent text-[#7A6E60] border-[#E8E1D7] hover:border-[#C9A96A]'
                }`}
              >
                {cat !== 'All' && CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Partners grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <p className="text-xs text-[#9A8B7A] mb-6">{filtered.length} partners in this category</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(partner => (
            <ScrollReveal key={partner.id}>
              <div className="lux-card p-6 flex flex-col h-full group hover:shadow-xl transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  {/* Monogram logo */}
                  <div className="w-14 h-14 rounded-xl bg-[#1C1A17] flex items-center justify-center text-[#C9A96A] font-bold text-sm tracking-wider">
                    {partner.logo}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full ${
                    partner.tier === 'Platinum'
                      ? 'bg-[#C9A96A]/20 text-[#C9A96A]'
                      : 'bg-[#E8E1D7] text-[#7A6E60]'
                  }`}>
                    {partner.tier}
                  </span>
                </div>

                <div className="mb-1">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A96A] flex items-center gap-1">
                    {CATEGORY_ICONS[partner.category]} {partner.category}
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-[#1C1A17] lux-heading mb-1">{partner.name}</h3>
                <p className="text-xs text-[#9A8B7A] italic mb-3">{partner.tagline}</p>
                <p className="text-sm text-[#5F5448] leading-relaxed flex-1 mb-4">{partner.description}</p>

                {/* Services */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {partner.services.map(s => (
                    <span key={s} className="text-[10px] bg-[#F6F2EC] border border-[#E8E1D7] text-[#7A6E60] px-2 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>

                {/* Contact row */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#E8E1D7] text-xs text-[#7A6E60]">
                  <a href={`mailto:${partner.contact.email}`} className="flex items-center gap-1 hover:text-[#C9A96A] transition-colors">
                    <Mail size={11} /> Email
                  </a>
                  <a href={`tel:${partner.contact.phone}`} className="flex items-center gap-1 hover:text-[#C9A96A] transition-colors">
                    <Phone size={11} /> Call
                  </a>
                  <a href={`https://${partner.contact.web}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#C9A96A] transition-colors">
                    <ExternalLink size={11} /> Website
                  </a>
                  <button
                    onClick={() => setIntroPartner(partner)}
                    className="ml-auto flex items-center gap-1 text-[#C9A96A] font-medium hover:text-[#1C1A17] transition-colors"
                  >
                    Introduction <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#1C1A17]/5 border-t border-[#E8E1D7] py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-[#9A8B7A] max-w-2xl mx-auto leading-relaxed">
            All Preferred Partners are independently vetted by the Raxie Zenith team. Introductions are made in good faith on the basis of shared values of discretion, excellence and client-first service. Raxie Zenith Estate accepts no financial remuneration from partner introductions.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {introPartner && <IntroModal partner={introPartner} onClose={() => setIntroPartner(null)} />}
      </AnimatePresence>
    </div>
  );
}
