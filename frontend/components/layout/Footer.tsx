'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-[#15120D] text-[#F4EFE8] border-t border-[#2A231A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E7D8C2]">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Buyers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E7D8C2]">{t('forBuyers')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('browseProperties')}
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('propertySearch')}
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('buyingGuides')}
                </Link>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E7D8C2]">{t('forSellers')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/list-property" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('listProperty')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('resources')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#E7D8C2]">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('termsOfService')}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-[#C9B8A3] hover:text-[#C9A96A]">
                  {t('cookiePolicy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A231A] mt-8 pt-8 text-center text-[#B9AA98]">
          <p>&copy; {new Date().getFullYear()} Raxie Zenith Estate. {t('rightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}
