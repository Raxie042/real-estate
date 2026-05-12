'use client';

import dynamic from 'next/dynamic';

const WhatsAppWidget = dynamic(() => import('@/components/WhatsAppWidget'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/CommandPalette'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <WhatsAppWidget />
      <CookieConsent />
      <CommandPalette />
    </>
  );
}
