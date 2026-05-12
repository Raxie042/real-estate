'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Building2, BookOpen, Calculator, Globe, Star } from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon: React.ReactNode;
  category: string;
  keywords: string;
}

const COMMANDS: CommandItem[] = [
  // Properties
  { id: 'search', label: 'Search Properties', description: 'Browse all listings', href: '/search', icon: <Search size={16} />, category: 'Properties', keywords: 'search browse listings properties' },
  { id: 'new-dev', label: 'New Developments', href: '/new-developments', icon: <Building2 size={16} />, category: 'Properties', keywords: 'new developments off plan build' },
  { id: 'commercial', label: 'Commercial Property', href: '/commercial', icon: <Building2 size={16} />, category: 'Properties', keywords: 'commercial office retail warehouse' },
  { id: 'auctions', label: 'Auctions', href: '/auctions', icon: <Star size={16} />, category: 'Properties', keywords: 'auctions bid hammer' },
  // Tools
  { id: 'valuation', label: 'Property Valuation', href: '/valuation', icon: <Calculator size={16} />, category: 'Tools', keywords: 'valuation estimate price worth appraisal' },
  { id: 'stamp-duty', label: 'Stamp Duty Calculator', href: '/stamp-duty', icon: <Calculator size={16} />, category: 'Tools', keywords: 'stamp duty tax sdlt calculator' },
  { id: 'rental-yield', label: 'Rental Yield Calculator', href: '/rental-yield', icon: <Calculator size={16} />, category: 'Tools', keywords: 'rental yield roi return investment calculator' },
  { id: 'intl-mortgage', label: 'International Mortgage Calculator', href: '/international-mortgage', icon: <Calculator size={16} />, category: 'Tools', keywords: 'international mortgage calculator uae portugal spain france rates' },
  { id: 'currency', label: 'Currency Converter', href: '/currency-converter', icon: <Globe size={16} />, category: 'Tools', keywords: 'currency converter exchange rate gbp usd eur' },
  { id: 'tax-guide', label: 'International Tax Guide', href: '/tax-guide', icon: <Globe size={16} />, category: 'Tools', keywords: 'tax guide international uae singapore us france' },
  // Research
  { id: 'resources', label: 'Market Reports', href: '/resources', icon: <BookOpen size={16} />, category: 'Research', keywords: 'market reports research pdf download' },
  { id: 'magazine', label: 'Magazine', href: '/magazine', icon: <BookOpen size={16} />, category: 'Research', keywords: 'magazine editorial articles luxury property' },
  { id: 'investor', label: 'Investor Intelligence', href: '/investor-intelligence', icon: <BookOpen size={16} />, category: 'Research', keywords: 'investor intelligence analytics yield roi' },
  { id: 'guides', label: 'Property Guides', href: '/guides', icon: <BookOpen size={16} />, category: 'Research', keywords: 'guides buying selling renting advice' },
  { id: 'green-homes', label: 'Green Homes', href: '/green-homes', icon: <BookOpen size={16} />, category: 'Research', keywords: 'green homes epc sustainable eco energy efficient' },
  { id: 'sold', label: 'Sold Properties', href: '/sold', icon: <BookOpen size={16} />, category: 'Research', keywords: 'sold transactions recent prices achieved' },
  { id: 'wealth-report', label: 'Wealth Reports', href: '/wealth-report', icon: <BookOpen size={16} />, category: 'Research', keywords: 'wealth report research pdf download annual prime' },
  { id: 'market-calendar', label: 'Seasonal Market Calendar', href: '/market-calendar', icon: <BookOpen size={16} />, category: 'Research', keywords: 'market calendar seasonal best time list buy demand' },
  { id: 'agent-rankings', label: 'Agent Rankings', href: '/agent-rankings', icon: <BookOpen size={16} />, category: 'Research', keywords: 'agent rankings league table performance best rated' },
  // Invest
  { id: 'land', label: 'Land & Development Plots', href: '/land', icon: <Building2 size={16} />, category: 'Invest', keywords: 'land plots development building site agricultural' },
  { id: 'fractional', label: 'Fractional Ownership', href: '/fractional', icon: <Building2 size={16} />, category: 'Invest', keywords: 'fractional co-ownership shares property investment' },
  { id: 'portfolio', label: 'Portfolio Wealth Tracker', href: '/portfolio', icon: <Calculator size={16} />, category: 'Invest', keywords: 'portfolio tracker wealth property value equity yield' },
  { id: 'golden-visa', label: 'Golden Visa Guide', href: '/golden-visa', icon: <Globe size={16} />, category: 'Invest', keywords: 'golden visa residency investment uae portugal greece malta spain' },
  { id: 'short-let', label: 'Short-Let & Seasonal Rentals', href: '/short-let', icon: <Building2 size={16} />, category: 'Invest', keywords: 'short let seasonal rental weekly monthly holiday' },
  { id: 'mortgage-brokers', label: 'Mortgage Brokers', href: '/mortgage-brokers', icon: <Star size={16} />, category: 'Company', keywords: 'mortgage broker finance lending dip fca' },
  { id: 'staging', label: 'Photography & Staging', href: '/staging', icon: <Star size={16} />, category: 'Company', keywords: 'photography staging drone floor plan virtual shoot' },
  { id: 'interior-design', label: 'Interior Design Partners', href: '/interior-design', icon: <Star size={16} />, category: 'Company', keywords: 'interior design partner studio renovation decor styling' },
  // Cities
  { id: 'london', label: 'London Properties', href: '/cities/london', icon: <Globe size={16} />, category: 'Cities', keywords: 'london prime central belgravia mayfair chelsea' },
  { id: 'dubai', label: 'Dubai Properties', href: '/cities/dubai', icon: <Globe size={16} />, category: 'Cities', keywords: 'dubai palm jumeirah marina downtown uae' },
  { id: 'edinburgh', label: 'Edinburgh Properties', href: '/cities/edinburgh', icon: <Globe size={16} />, category: 'Cities', keywords: 'edinburgh new town scotland' },
  { id: 'monaco', label: 'Monaco Properties', href: '/cities/monaco', icon: <Globe size={16} />, category: 'Cities', keywords: 'monaco monte carlo principality' },
  // Company
  { id: 'about', label: 'About Us', href: '/about', icon: <Star size={16} />, category: 'Company', keywords: 'about team history company offices' },
  { id: 'awards', label: 'Awards & Recognition', href: '/awards', icon: <Star size={16} />, category: 'Company', keywords: 'awards recognition accolades industry' },
  { id: 'testimonials', label: 'Client Testimonials', href: '/testimonials', icon: <Star size={16} />, category: 'Company', keywords: 'testimonials reviews client stories success' },
  { id: 'events', label: 'Events & Briefings', href: '/events', icon: <Star size={16} />, category: 'Company', keywords: 'events market briefings open house seminars' },
  { id: 'videos', label: 'Property Videos', href: '/videos', icon: <Star size={16} />, category: 'Company', keywords: 'videos tours virtual walkthroughs films' },
  { id: 'developers', label: 'Developer Profiles', href: '/developers', icon: <Star size={16} />, category: 'Company', keywords: 'developers new development construction' },
  { id: 'concierge', label: 'Concierge Services', href: '/concierge', icon: <Star size={16} />, category: 'Company', keywords: 'concierge services luxury assistance bespoke' },
  { id: 'insurance', label: 'Property Insurance', href: '/insurance', icon: <Star size={16} />, category: 'Company', keywords: 'insurance high value home cover chubb hiscox' },
  { id: 'conveyancing', label: 'Find a Solicitor', href: '/conveyancing', icon: <Star size={16} />, category: 'Company', keywords: 'conveyancing solicitor legal property law' },
  { id: 'app', label: 'Mobile App', href: '/app', icon: <Star size={16} />, category: 'Company', keywords: 'mobile app ios android download' },
  { id: 'agents', label: 'Our Agents', href: '/agents', icon: <Star size={16} />, category: 'Company', keywords: 'agents team brokers' },
  { id: 'contact', label: 'Contact Us', href: '/contact', icon: <Star size={16} />, category: 'Company', keywords: 'contact phone email get in touch' },
  { id: 'careers', label: 'Careers', href: '/careers', icon: <Star size={16} />, category: 'Company', keywords: 'careers jobs hiring work' },
  { id: 'relocation', label: 'Relocation Services', href: '/relocation', icon: <Globe size={16} />, category: 'Company', keywords: 'relocation moving abroad international' },
  // Account
  { id: 'dashboard', label: 'My Dashboard', href: '/dashboard', icon: <Star size={16} />, category: 'Account', keywords: 'dashboard account my listings' },
  { id: 'profile', label: 'My Profile', href: '/profile', icon: <Star size={16} />, category: 'Account', keywords: 'profile account settings' },
  { id: 'saved', label: 'Saved Properties', href: '/profile', icon: <Star size={16} />, category: 'Account', keywords: 'saved favorites wishlist' },
  { id: 'saved-searches', label: 'Saved Searches', href: '/saved-searches', icon: <Search size={16} />, category: 'Account', keywords: 'saved searches alerts notifications' },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? COMMANDS.filter(c =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.keywords.toLowerCase().includes(query.toLowerCase()) ||
        (c.description || '').toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS.slice(0, 8);

  const grouped: Record<string, CommandItem[]> = {};
  for (const item of filtered) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  const flatFiltered = filtered;

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery('');
    router.push(href);
  }, [router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setHighlighted(0); }, [query]);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, flatFiltered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && flatFiltered[highlighted]) { navigate(flatFiltered[highlighted].href); }
  }

  return (
    <>
      {/* Trigger hint in header — rendered separately in Header.tsx; this just listens to ⌘K */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[12vh] px-4">
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden border border-[#E8E1D7]"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E8E1D7]">
                <Search size={18} className="text-[#9A8B7A] flex-shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 text-[#1C1A17] bg-transparent outline-none placeholder-[#BBAD98] text-base"
                  placeholder="Search pages, tools, features..."
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-[#9A8B7A] hover:text-[#1C1A17]">
                    <X size={16} />
                  </button>
                )}
                <kbd className="hidden sm:block text-[10px] text-[#9A8B7A] border border-[#E8E1D7] rounded px-1.5 py-0.5 font-mono">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-[420px] overflow-y-auto py-2">
                {flatFiltered.length === 0 ? (
                  <div className="px-4 py-10 text-center text-[#9A8B7A] text-sm">No results for &ldquo;{query}&rdquo;</div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category}>
                      <div className="px-4 py-1.5 text-[10px] font-semibold tracking-widest text-[#9A8B7A] uppercase">
                        {category}
                      </div>
                      {items.map(item => {
                        const idx = flatFiltered.indexOf(item);
                        const isHighlighted = idx === highlighted;
                        return (
                          <button
                            key={item.id}
                            onClick={() => navigate(item.href)}
                            onMouseEnter={() => setHighlighted(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isHighlighted ? 'bg-[#F6F2EC]' : ''}`}
                          >
                            <span className={`flex-shrink-0 ${isHighlighted ? 'text-[#C9A96A]' : 'text-[#9A8B7A]'}`}>{item.icon}</span>
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm font-medium ${isHighlighted ? 'text-[#1C1A17]' : 'text-[#2B2620]'}`}>{item.label}</span>
                              {item.description && <span className="text-xs text-[#9A8B7A] ml-2">{item.description}</span>}
                            </div>
                            {isHighlighted && <ArrowRight size={14} className="text-[#C9A96A] flex-shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-[#E8E1D7] flex items-center gap-4 text-[10px] text-[#BBAD98]">
                <span><kbd className="font-mono border border-[#E8E1D7] rounded px-1">↑↓</kbd> Navigate</span>
                <span><kbd className="font-mono border border-[#E8E1D7] rounded px-1">↵</kbd> Open</span>
                <span><kbd className="font-mono border border-[#E8E1D7] rounded px-1">ESC</kbd> Close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
