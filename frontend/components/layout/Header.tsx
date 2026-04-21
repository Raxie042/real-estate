'use client';

import Link from 'next/link';
import { User, ChevronDown, LogOut, Heart, Plus, FileText } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import NotificationDropdown from '@/components/NotificationDropdown';
import PreferencesPanel from '@/components/layout/PreferencesPanel';
import { useTranslations } from 'next-intl';
import { useWhiteLabel } from '@/lib/white-label-context';

export default function Header() {
  const t = useTranslations('Header');
  const { config } = useWhiteLabel();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    // Onboarding modal state
    const [showOnboarding, setShowOnboarding] = useState(false);
    useEffect(() => {
      // Show onboarding modal only on first visit (localStorage flag)
      if (!localStorage.getItem('raxie-onboarded')) {
        setShowOnboarding(true);
      }
    }, []);

    const handleCloseOnboarding = () => {
      setShowOnboarding(false);
      localStorage.setItem('raxie-onboarded', 'true');
    };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
            <button
              className="lux-button"
              onClick={handleCloseOnboarding}
            >
              {t('getStarted')}
            </button>
          </div>
        </div>
      )}
      <header className="bg-white/80 backdrop-blur border-b border-[#E8E1D7] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {config.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={config.logoUrl} alt={config.brandName} className="h-9 w-auto object-contain" />
            ) : null}
            <div className="text-2xl font-semibold tracking-wide text-[#1C1A17] lux-heading">
              <span>{config.brandName}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/properties" className="text-[#2B2620] hover:text-[#C9A96A]">
              {t('properties')}
            </Link>
            <Link href="/search" className="text-[#2B2620] hover:text-[#C9A96A]">
              {t('search')}
            </Link>
            <Link href="/agencies" className="text-[#2B2620] hover:text-[#C9A96A]">
              {t('agencies')}
            </Link>
            <Link href="/valuation" className="text-[#2B2620] hover:text-[#C9A96A]">
              {t('valuation')}
            </Link>
            <Link href="/about" className="text-[#2B2620] hover:text-[#C9A96A]">
              {t('about')}
            </Link>
            <Link href="/list-property" className="text-[#2B2620] hover:text-[#C9A96A] font-medium">
              {t('listProperty')}
            </Link>
            <button
              type="button"
              onClick={() => setIsPreferencesOpen(true)}
              className="text-[#2B2620] hover:text-[#C9A96A]"
            >
              {t('preferences')}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <NotificationDropdown />
                <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-[#C9A96A] text-[#1C1A17] px-4 py-2 rounded-full hover:bg-[#B78F4A] transition-colors"
                >
                  <User size={18} />
                  <span>{user?.firstName || t('account')}</span>
                  <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E8E1D7] py-2 z-50">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/my-listings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <FileText size={18} />
                      <span>My Listings</span>
                    </Link>
                    <Link
                      href="/open-houses"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>Open Houses</span>
                    </Link>
                    <Link
                      href="/offers"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                      <span>Offers</span>
                    </Link>
                    <Link
                      href="/documents"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <FileText size={18} />
                      <span>Documents</span>
                    </Link>
                    <Link
                      href="/messages"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <span>Messages</span>
                    </Link>
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <Heart size={18} />
                      <span>Saved Properties</span>
                    </Link>
                    <Link
                      href="/subscriptions"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                      <span>Subscription</span>
                    </Link>
                    <Link
                      href="/list-property"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                    >
                      <Plus size={18} />
                      <span>List Property</span>
                    </Link>
                    {(user?.role === 'ADMIN' || user?.role === 'PLATFORM_ADMIN' || user?.role === 'AGENT') && (
                      <>
                        <Link
                          href="/dashboard"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#2B2620] hover:bg-[#F4EFE8] transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                          <span>Dashboard</span>
                        </Link>
                      </>
                    )}
                    <div className="border-t border-[#E8E1D7] my-2"></div>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-[#F4EFE8] transition-colors w-full text-left"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#2B2620] hover:text-[#C9A96A]"
                >
                  {t('signIn')}
                </Link>
                <Link
                  href="/register"
                  className="bg-[#C9A96A] text-[#1C1A17] px-4 py-2 rounded-full hover:bg-[#B78F4A] transition-colors"
                >
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <button
              type="button"
              onClick={() => {
                setIsPreferencesOpen(true);
                setIsMenuOpen(false);
              }}
              className="block text-[#2B2620]"
            >
              {t('preferences')}
            </button>
            <Link href="/properties" className="block text-[#2B2620]">
              {t('properties')}
            </Link>
            <Link href="/search" className="block text-[#2B2620]">
              {t('search')}
            </Link>
            <Link href="/agencies" className="block text-[#2B2620]">
              {t('agencies')}
            </Link>
            <Link href="/valuation" className="block text-[#2B2620]">
              {t('valuation')}
            </Link>
            <Link href="/about" className="block text-[#2B2620]">
              {t('about')}
            </Link>
            <div className="pt-4 border-t space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    {t('myProfile')}
                  </Link>
                  <Link
                    href="/my-listings"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    {t('myListings')}
                  </Link>
                  <Link
                    href="/open-houses"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    Open Houses
                  </Link>
                  <Link
                    href="/offers"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    Offers
                  </Link>
                  <Link
                    href="/documents"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    Documents
                  </Link>
                  <Link
                    href="/messages"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    Messages
                  </Link>
                  <Link
                    href="/subscriptions"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2"
                  >
                    {t('subscription')}
                  </Link>
                  <Link
                    href="/list-property"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620] py-2 font-medium"
                  >
                    {t('listProperty')}
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-[#2B2620] py-2 font-medium"
                    >
                      {t('adminDashboard')}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 py-2 font-medium"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-[#2B2620]"
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block bg-[#C9A96A] text-[#1C1A17] px-4 py-2 rounded-full text-center"
                  >
                    {t('getStarted')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
    <PreferencesPanel
      isOpen={isPreferencesOpen}
      onClose={() => setIsPreferencesOpen(false)}
    />
    </>
  );
}
