'use client';

import ScrollReveal from '@/components/ScrollReveal';
import Link from 'next/link';
import { Eye, Keyboard, Monitor, Volume2, Hand, Mail, Phone, ExternalLink } from 'lucide-react';

const CONFORMANCE = [
  { principle: 'Perceivable', status: 'AA', desc: 'All images include descriptive alt text. Colour contrast ratios meet or exceed 4.5:1 for normal text and 3:1 for large text.' },
  { principle: 'Operable', status: 'AA', desc: 'All interactive elements are keyboard accessible. Focus indicators are visible. No content flashes more than 3 times per second.' },
  { principle: 'Understandable', status: 'AA', desc: 'Language is declared on the page. Error messages are descriptive. Navigation is consistent throughout.' },
  { principle: 'Robust', status: 'Partial', desc: 'Markup is valid HTML5. ARIA labels are used on complex widgets. Some third-party embeds (maps, virtual tours) may have limited support.' },
];

const FEATURES = [
  { icon: <Keyboard size={20} className="text-[#C9A96A]" />, title: 'Keyboard Navigation', desc: 'The entire site can be navigated using only a keyboard. Tab, Enter, Space and arrow keys work throughout.' },
  { icon: <Monitor size={20} className="text-[#C9A96A]" />, title: 'Screen Reader Support', desc: 'Pages use semantic HTML5 landmarks, ARIA roles, and descriptive link text compatible with NVDA, JAWS, and VoiceOver.' },
  { icon: <Eye size={20} className="text-[#C9A96A]" />, title: 'High Contrast', desc: 'Text and interactive elements meet WCAG 2.1 AA contrast requirements. The site respects system-level dark/high-contrast preferences.' },
  { icon: <Volume2 size={20} className="text-[#C9A96A]" />, title: 'Media Alternatives', desc: 'Property videos include captions where available. Audio descriptions are available on request for virtual tours.' },
  { icon: <Hand size={20} className="text-[#C9A96A]" />, title: 'Touch & Motor', desc: 'Touch targets are at least 44×44px. Drag interactions have keyboard equivalents. No actions require complex gestures.' },
];

const KNOWN_ISSUES = [
  { area: 'Interactive Map', issue: 'The property map (Leaflet) has limited keyboard support for pin navigation. We are exploring an accessible list-based alternative.' },
  { area: 'Virtual Tour Player', issue: 'Embedded Matterport and YouTube players are subject to those providers\' own accessibility implementations.' },
  { area: 'PDF Documents', issue: 'Dynamically generated property brochures and market reports may not be fully tagged for screen readers. Tagged versions are available on request.' },
  { area: 'Currency Converter', issue: 'Live rate announcements to screen readers are being improved in the next release.' },
];

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <section className="bg-[#1C1A17] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl font-bold text-white mb-4 font-serif">Accessibility Statement</h1>
            <p className="text-[#BBAD98] text-lg">
              Raxie Zenith Estate is committed to ensuring digital accessibility for all users, including people with disabilities.
              This statement was last reviewed on <strong className="text-[#C9A96A]">12 May 2026</strong>.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-12">

        {/* Standard & Target */}
        <ScrollReveal>
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-3">Our Commitment</h2>
            <p className="text-[#5F5448] mb-4">
              We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as required under the UK Equality Act 2010 and the EU Web Accessibility Directive 2016/2102.
            </p>
            <p className="text-[#5F5448]">
              We continuously audit our platform and work to remediate issues identified through automated and manual testing, including testing with assistive technologies.
            </p>
          </div>
        </ScrollReveal>

        {/* POUR Principles */}
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4 font-serif">Conformance Status</h2>
          <div className="space-y-3">
            {CONFORMANCE.map(c => (
              <div key={c.principle} className="lux-card p-5 flex items-start gap-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${c.status === 'AA' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{c.status}</span>
                <div>
                  <h3 className="font-semibold text-[#1C1A17] mb-0.5">{c.principle}</h3>
                  <p className="text-sm text-[#5F5448]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Features */}
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4 font-serif">Accessibility Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(f => (
              <div key={f.title} className="lux-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  {f.icon}
                  <h3 className="font-semibold text-[#1C1A17] text-sm">{f.title}</h3>
                </div>
                <p className="text-sm text-[#5F5448]">{f.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Known issues */}
        <ScrollReveal>
          <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4 font-serif">Known Issues</h2>
          <div className="lux-card p-6 space-y-4">
            {KNOWN_ISSUES.map(k => (
              <div key={k.area} className="pb-4 border-b border-[#F0EBE3] last:border-0 last:pb-0">
                <h3 className="font-semibold text-[#1C1A17] mb-1 text-sm">{k.area}</h3>
                <p className="text-sm text-[#5F5448]">{k.issue}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Technical */}
        <ScrollReveal>
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-3">Technical Specification</h2>
            <p className="text-[#5F5448] mb-4 text-sm">
              This website relies on the following technologies for its accessibility:
            </p>
            <ul className="space-y-1 text-sm text-[#5F5448]">
              {['HTML5 semantic elements', 'CSS (including prefers-reduced-motion and prefers-color-scheme)', 'WAI-ARIA 1.2 attributes', 'JavaScript (progressive enhancement)'].map(t => (
                <li key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#C9A96A] rounded-full flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Feedback */}
        <ScrollReveal>
          <div className="lux-card p-6 bg-[#1C1A17] text-white">
            <h2 className="text-xl font-semibold mb-3 font-serif">Report an Accessibility Issue</h2>
            <p className="text-[#BBAD98] mb-5 text-sm">
              If you encounter a barrier or believe a feature does not meet the stated standard, we want to hear from you. We aim to respond within 5 working days.
            </p>
            <div className="space-y-3">
              <a href="mailto:accessibility@raxiezenith.com" className="flex items-center gap-3 text-[#C9A96A] hover:text-[#E0C27A] transition text-sm">
                <Mail size={16} />
                accessibility@raxiezenith.com
              </a>
              <a href="tel:+442071234567" className="flex items-center gap-3 text-[#C9A96A] hover:text-[#E0C27A] transition text-sm">
                <Phone size={16} />
                +44 (0)20 7123 4567
              </a>
              <Link href="/contact" className="flex items-center gap-3 text-[#C9A96A] hover:text-[#E0C27A] transition text-sm">
                <ExternalLink size={16} />
                Online contact form
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Enforcement */}
        <ScrollReveal>
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-3">Enforcement Procedure</h2>
            <p className="text-[#5F5448] text-sm">
              If you are not satisfied with our response, you can contact the <strong>Equality Advisory and Support Service (EASS)</strong> in the UK.{' '}
              <a href="https://www.equalityadvisoryservice.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A96A] hover:underline">equalityadvisoryservice.com</a>
            </p>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
