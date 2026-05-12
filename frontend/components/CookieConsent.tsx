'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import Link from 'next/link';

const COOKIE_KEY = 'rze_cookie_consent_v1';

interface Prefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      if (!stored) {
        // Small delay so page has time to render first
        const t = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage may be unavailable in SSR
    }
  }, []);

  function save(p: Prefs) {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...p, savedAt: Date.now() }));
    } catch {}
    setVisible(false);
  }

  function acceptAll() {
    save({ necessary: true, analytics: true, marketing: true });
  }

  function acceptNecessary() {
    save({ necessary: true, analytics: false, marketing: false });
  }

  function savePrefs() {
    save(prefs);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[180] bg-[#1C1A17] border-t border-[#2E2B26] shadow-2xl"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Icon + text */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Cookie size={20} className="text-[#C9A96A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-sm leading-relaxed">
                    We use cookies to personalise your experience, analyse site traffic, and show relevant properties.
                    <Link href="/cookies" className="text-[#C9A96A] hover:underline ml-1">Learn more</Link>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="flex items-center gap-1 text-[#9A8B7A] hover:text-white text-xs transition px-2 py-1.5"
                >
                  <Shield size={13} />
                  Manage
                  {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                <button onClick={acceptNecessary} className="text-xs text-[#9A8B7A] hover:text-white transition px-3 py-2 rounded-lg border border-[#3A3530] hover:border-[#5F5448]">
                  Necessary only
                </button>
                <button onClick={acceptAll} className="text-xs font-semibold bg-[#C9A96A] hover:bg-[#B78F4A] text-[#1C1A17] px-4 py-2 rounded-lg transition">
                  Accept all
                </button>
              </div>
            </div>

            {/* Expanded preferences */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-[#2E2B26] grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Necessary */}
                    <div className="bg-[#252220] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">Necessary</span>
                        <span className="text-xs text-[#C9A96A] bg-[#C9A96A]/10 px-2 py-0.5 rounded-full">Always on</span>
                      </div>
                      <p className="text-[#7A6E60] text-xs">Authentication, security, and site functionality. Cannot be disabled.</p>
                    </div>
                    {/* Analytics */}
                    <div className="bg-[#252220] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">Analytics</span>
                        <button
                          onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${prefs.analytics ? 'bg-[#C9A96A]' : 'bg-[#3A3530]'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${prefs.analytics ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                      <p className="text-[#7A6E60] text-xs">Helps us understand how visitors use the site to improve your experience.</p>
                    </div>
                    {/* Marketing */}
                    <div className="bg-[#252220] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white text-sm font-medium">Marketing</span>
                        <button
                          onClick={() => setPrefs(p => ({ ...p, marketing: !p.marketing }))}
                          className={`relative w-10 h-5 rounded-full transition-colors ${prefs.marketing ? 'bg-[#C9A96A]' : 'bg-[#3A3530]'}`}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${prefs.marketing ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                      <p className="text-[#7A6E60] text-xs">Enables personalised property recommendations and relevant advertising.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button onClick={savePrefs} className="text-sm font-semibold bg-[#C9A96A] hover:bg-[#B78F4A] text-[#1C1A17] px-6 py-2 rounded-lg transition">
                      Save preferences
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
