'use client';

import Link from 'next/link';
import { User, ChevronDown, LogOut, Heart, Plus, FileText, Settings, Globe } from 'lucide-react';
import { usePreferences, SUPPORTED_LANGUAGES } from '@/lib/preferences-context';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import NotificationDropdown from '@/components/NotificationDropdown';
import PreferencesPanel from '@/components/layout/PreferencesPanel';
import { useTranslations } from 'next-intl';
import { useWhiteLabel } from '@/lib/white-label-context';
import { useRouter } from 'next/navigation';

type NavItem = { label: string; href: string; gold?: boolean };
type NavSubGroup = { heading: string; items: NavItem[] };
type NavGroup = { label: string; cols: number; align: 'left' | 'right'; groups: NavSubGroup[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Buy & Rent',
    cols: 2,
    align: 'left',
    groups: [
      { heading: 'Find a Property', items: [
        { label: 'Browse Properties', href: '/properties' },
        { label: 'Advanced Search', href: '/search' },
        { label: 'Lettings & Rentals', href: '/lettings' },
        { label: 'Property Finder', href: '/property-finder' },
      ]},
      { heading: 'Buying & Selling', items: [
        { label: 'Sell Your Property', href: '/sell' },
        { label: 'Valuation', href: '/valuation' },
        { label: 'Compare Properties', href: '/comparison' },
        { label: 'Coming Soon ✦', href: '/coming-soon', gold: true },
      ]},
    ],
  },
  {
    label: 'Collections',
    cols: 3,
    align: 'left',
    groups: [
      { heading: 'By Property Type', items: [
        { label: 'All Collections', href: '/collections' },
        { label: 'Coastal Retreats', href: '/collections#coastal-retreats' },
        { label: 'Country Estates', href: '/collections#country-estates' },
        { label: 'City Penthouses', href: '/collections#city-penthouses' },
        { label: 'Country Homes', href: '/country-homes' },
      ]},
      { heading: 'Specialist Markets', items: [
        { label: 'New Developments', href: '/new-developments' },
        { label: 'Commercial', href: '/commercial' },
        { label: 'Heritage & Listed', href: '/heritage' },
        { label: 'International', href: '/international' },
        { label: 'Auctions', href: '/auctions' },
        { label: 'Planning & Development', href: '/planning' },
      ]},
      { heading: 'Exclusive', items: [
        { label: 'Virtual Tours', href: '/virtual-tours' },
        { label: 'Art & Architecture', href: '/art' },
        { label: 'Magazine', href: '/magazine' },
        { label: 'Preferred Partners', href: '/partners' },
        { label: 'Private Collection ✦', href: '/private', gold: true },
      ]},
    ],
  },
  {
    label: 'Research',
    cols: 3,
    align: 'left',
    groups: [
      { heading: 'Professionals', items: [
        { label: 'Agent Rankings', href: '/agent-rankings' },
        { label: 'Find an Agent', href: '/agents' },
        { label: 'Agencies', href: '/agencies' },
        { label: 'Investor Intelligence', href: '/investor-intelligence' },
        { label: 'Wealth Reports', href: '/wealth-report' },
      ]},
      { heading: 'Knowledge', items: [
        { label: 'Market Reports', href: '/resources' },
        { label: 'Guides & Advice', href: '/guides' },
        { label: 'Neighbourhood Guides', href: '/neighbourhoods' },
        { label: 'Seasonal Market Calendar', href: '/market-calendar' },
        { label: 'Green Homes', href: '/green-homes' },
        { label: 'Sustainability & ESG', href: '/sustainability' },
      ]},
      { heading: 'Calculators & Data', items: [
        { label: 'Stamp Duty Calculator', href: '/stamp-duty' },
        { label: 'Rental Yield Calculator', href: '/rental-yield' },
        { label: 'Currency Converter', href: '/currency-converter' },
        { label: 'International Tax Guide', href: '/tax-guide' },
        { label: 'International Mortgage', href: '/international-mortgage' },
      ]},
    ],
  },
  {
    label: 'Invest',
    cols: 2,
    align: 'right',
    groups: [
      { heading: 'Property Investment', items: [
        { label: 'Land & Development Plots', href: '/land' },
        { label: 'Fractional Ownership', href: '/fractional' },
        { label: 'Portfolio Tracker', href: '/portfolio' },
        { label: 'Private Office ✦', href: '/private-office', gold: true },
      ]},
      { heading: 'Finance & Data', items: [
        { label: 'Golden Visa Guide', href: '/golden-visa' },
        { label: 'Sold Prices', href: '/sold' },
        { label: 'Planning & Development', href: '/planning' },
      ]},
    ],
  },
  {
    label: 'About',
    cols: 3,
    align: 'right',
    groups: [
      { heading: 'Company', items: [
        { label: 'About Us', href: '/about' },
        { label: 'Awards & Recognition', href: '/awards' },
        { label: 'Testimonials', href: '/testimonials' },
        { label: 'Events', href: '/events' },
        { label: 'Press', href: '/press' },
        { label: 'Philanthropy', href: '/philanthropy' },
        { label: 'Founding Partner', href: '/founding-partner' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ]},
      { heading: 'Property Services', items: [
        { label: 'Financing', href: '/financing' },
        { label: 'Property Management', href: '/property-management' },
        { label: 'Concierge Services', href: '/concierge' },
        { label: 'Insurance', href: '/insurance' },
        { label: 'Conveyancing', href: '/conveyancing' },
        { label: 'Mortgage Brokers', href: '/mortgage-brokers' },
        { label: 'Developers', href: '/developers' },
      ]},
      { heading: 'Lifestyle Services', items: [
        { label: 'Photography & Staging', href: '/staging' },
        { label: 'Interior Design', href: '/interior-design' },
        { label: 'Short-Let & Seasonal', href: '/short-let' },
        { label: 'Relocation Services', href: '/relocation' },
        { label: 'Podcast', href: '/podcast' },
        { label: 'Videos', href: '/videos' },
        { label: 'Offices', href: '/offices' },
        { label: 'Mobile App', href: '/app' },
        { label: 'Accessibility', href: '/accessibility' },
      ]},
    ],
  },
];

export default function Header() {
  const t = useTranslations('Header');
  const { config } = useWhiteLabel();
  const { user, isAuthenticated, logout } = useAuth();
  const { preferences, applyPreferences } = usePreferences();
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const switchLanguage = useCallback((lang: string) => {
    applyPreferences({ language: lang });
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(en|fr|de|ar|zh|ru|pt)(?=\/|$)/, '') || '/';
    const query = window.location.search.replace(/^\?/, '');
    const nextPath = `/${lang}${pathWithoutLocale}`;
    const target = query ? `${nextPath}?${query}` : nextPath;
    router.replace(target);
    router.refresh();
    setLangOpen(false);
  }, [applyPreferences, router]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<number | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem('raxie-onboarded')) {
      setShowOnboarding(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('raxie-onboarded', 'true');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-40">
          <div className="lux-card p-8 max-w-md w-full relative">
            <button
              className="absolute top-3 right-3 text-[#7A6E60] hover:text-[#C9A96A] text-xl"
              onClick={handleCloseOnboarding}
              aria-label="Close onboarding"
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-[#1C1A17] lux-heading">{t('welcomeTitle')}</h2>
            <ul className="mb-6 space-y-2 text-[#7A6E60]">
              <li>🔍 <b>{t('onboardingSearch')}:</b> {t('onboardingSearchDesc')}</li>
              <li>💼 <b>{t('onboardingList')}:</b> {t('onboardingListDesc')}</li>
              <li>📝 <b>{t('onboardingReviews')}:</b> {t('onboardingReviewsDesc')}</li>
              <li>📊 <b>{t('onboardingAnalytics')}:</b> {t('onboardingAnalyticsDesc')}</li>
              <li>💬 <b>{t('onboardingChat')}:</b> {t('onboardingChatDesc')}</li>
            </ul>
            <button className="lux-button" onClick={handleCloseOnboarding}>
              {t('getStarted')}
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white shadow-[0_1px_0_0_#E8E1D7]">

        {/* ── Top utility bar ── */}
        <div className="bg-[#1C1A17] text-white/60 text-[11px] tracking-wide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
            <span className="hidden sm:block">+44 20 7123 4567 &nbsp;·&nbsp; Mon–Sat 9am–6pm GMT</span>
            <div className="flex items-center gap-5 ml-auto">
              <button
                type="button"
                onClick={() => setIsPreferencesOpen(true)}
                className="flex items-center gap-1.5 hover:text-[#C9A96A] transition"
              >
                <Settings size={12} />
                {t('preferences')}
              </button>

              {/* Globe language picker */}
              <div className="relative" ref={langRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen(v => !v)}
                  className="flex items-center gap-1 hover:text-[#C9A96A] transition"
                  aria-label="Change language"
                >
                  <Globe size={12} />
                  <span className="uppercase text-[11px]">{preferences.language}</span>
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-[#E8E1D7] rounded-xl shadow-lg py-1 z-50 min-w-[130px]">
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => switchLanguage(lang)}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-[#F6F2EC] ${
                          preferences.language === lang ? 'text-[#C9A96A] font-semibold' : 'text-[#2B2620]'
                        }`}
                      >
                        {{ en: 'English', fr: 'Français', de: 'Deutsch', ar: 'العربية', zh: '中文', ru: 'Русский', pt: 'Português' }[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!isAuthenticated && (
                <>
                  <Link href="/login" className="hover:text-[#C9A96A] transition">{t('signIn')}</Link>
                  <Link href="/register" className="hover:text-[#C9A96A] transition">{t('getStarted')}</Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Main nav ── */}
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          onMouseLeave={() => setActiveNav(null)}
        >
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              {config.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={config.logoUrl} alt={config.brandName} className="h-9 w-auto object-contain" />
              ) : null}
              <span className="text-[22px] font-semibold tracking-wide text-[#1C1A17] lux-heading whitespace-nowrap">
                {config.brandName}
              </span>
            </Link>

            {/* ── Desktop nav groups ── */}
            <div className="hidden lg:flex items-center gap-0 relative">
              {NAV_GROUPS.map((group, i) => (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setActiveNav(i)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide transition-colors ${
                      activeNav === i ? 'text-[#C9A96A]' : 'text-[#2B2620] hover:text-[#C9A96A]'
                    }`}
                  >
                    {group.label}
                    <ChevronDown size={13} className={`transition-transform duration-200 ${activeNav === i ? 'rotate-180' : ''}`} />
                  </button>

                  {activeNav === i && (
                    <div
                      className={`absolute top-full mt-0 bg-white border-t-2 border-t-[#C9A96A] border-x border-b border-[#E8E1D7] shadow-2xl z-50 py-7 px-8 ${
                        group.align === 'right' ? 'right-0' : 'left-0'
                      }`}
                      style={{ width: `${group.cols * 220}px` }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${group.cols}, 1fr)`,
                          columnGap: '32px',
                        }}
                      >
                        {group.groups.map((subGroup) => (
                          <div key={subGroup.heading}>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C9A96A] mb-3 pb-2 border-b border-[#E8E1D7]">
                              {subGroup.heading}
                            </p>
                            <div className="space-y-0.5">
                              {subGroup.items.map(item => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setActiveNav(null)}
                                  className={`block px-2 py-2 text-[13px] rounded transition-colors hover:bg-[#F6F2EC] hover:text-[#C9A96A] ${
                                    item.gold
                                      ? 'text-[#C9A96A] font-medium'
                                      : 'text-[#2B2620]'
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Right actions ── */}
            <div className="hidden lg:flex items-center gap-3">
              {/* ⌘K search trigger */}
              <button
                onClick={() => {
                  const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true });
                  window.dispatchEvent(event);
                }}
                className="flex items-center gap-2 bg-[#F6F2EC] border border-[#E8E1D7] text-[#7A6E60] hover:border-[#C9A96A] hover:text-[#1C1A17] px-3 py-2 rounded-lg text-xs transition"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/></svg>
                <span>Search</span>
                <kbd className="ml-1 font-mono text-[10px] bg-white border border-[#E8E1D7] rounded px-1">⌘K</kbd>
              </button>

              <Link
                href="/list-property"
                className="lux-button text-[13px] px-5 py-2 whitespace-nowrap"
              >
                {t('listProperty')}
              </Link>

              {isAuthenticated && <NotificationDropdown />}

              {isAuthenticated && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-[#C9A96A] text-[#1C1A17] px-4 py-2 rounded-full hover:bg-[#B78F4A] transition-colors text-[13px]"
                  >
                    <User size={16} />
                    <span>{user?.firstName || t('account')}</span>
                    <ChevronDown size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E8E1D7] py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-[#E8E1D7] flex items-center justify-between">
                        <span className="text-sm text-[#5F5448]">{user?.firstName} {user?.lastName}</span>
                        <span className={`text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          user?.role === 'PLATFORM_ADMIN' ? 'bg-red-100 text-red-700' :
                          user?.role === 'AGENCY_ADMIN' ? 'bg-purple-100 text-purple-700' :
                          user?.role === 'AGENT' ? 'bg-blue-100 text-blue-700' :
                          user?.role === 'SELLER' ? 'bg-amber-100 text-amber-700' :
                          'bg-[#F4EFE8] text-[#7A6E60]'
                        }`}>
                          {user?.role === 'PLATFORM_ADMIN' ? 'Admin' :
                           user?.role === 'AGENCY_ADMIN' ? 'Agency' :
                           user?.role === 'AGENT' ? 'Agent' :
                           user?.role === 'SELLER' ? 'Seller' : 'Buyer'}
                        </span>
                      </div>
                      <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <User size={16} /><span>My Profile</span>
                      </Link>
                      <Link href="/my-listings" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <FileText size={16} /><span>My Listings</span>
                      </Link>
                      <Link href="/open-houses" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        <span>Open Houses</span>
                      </Link>
                      <Link href="/offers" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                        <span>Offers</span>
                      </Link>
                      <Link href="/documents" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <FileText size={16} /><span>Documents</span>
                      </Link>
                      <Link href="/messages" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        <span>Messages</span>
                      </Link>
                      <Link href="/profile" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <Heart size={16} /><span>Saved Properties</span>
                      </Link>
                      <Link href="/subscriptions" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        <span>Subscription</span>
                      </Link>
                      <Link href="/list-property" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                        <Plus size={16} /><span>List Property</span>
                      </Link>
                      {(user?.role === 'ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'AGENT' || user?.role === 'SELLER' || user?.role === 'AGENCY_ADMIN') && (
                        <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                          <span>Dashboard</span>
                        </Link>
                      )}
                      <div className="border-t border-[#E8E1D7] my-1" />
                      <button
                        onClick={() => { logout(); setIsDropdownOpen(false); }}
                        className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-[#F4EFE8] transition-colors w-full text-left text-sm"
                      >
                        <LogOut size={16} /><span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              className="lg:hidden ml-3 p-2 text-[#2B2620]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* ── Mobile Menu ── */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-[#E8E1D7] py-4 space-y-1">
              {NAV_GROUPS.map(group => (
                <div key={group.label} className="pb-2">
                  <p className="px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#C9A96A] font-medium">{group.label}</p>
                  {group.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-[#F6F2EC] ${
                        (item as { gold?: boolean }).gold ? 'text-[#C9A96A] font-medium' : 'text-[#2B2620]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-[#E8E1D7] pt-3 space-y-1">
                <Link href="/list-property" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-[#C9A96A]">
                  List a Property
                </Link>
                <button
                  type="button"
                  onClick={() => { setIsPreferencesOpen(true); setIsMenuOpen(false); }}
                  className="block w-full text-left px-3 py-2 text-sm text-[#2B2620]"
                >
                  {t('preferences')}
                </button>
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-[#2B2620]">My Profile</Link>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-[#2B2620]">Dashboard</Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-red-600">
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-[#2B2620]">{t('signIn')}</Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm bg-[#C9A96A] text-[#1C1A17] rounded-full text-center mt-2">{t('getStarted')}</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <PreferencesPanel isOpen={isPreferencesOpen} onClose={() => setIsPreferencesOpen(false)} />
    </>
  );
}
