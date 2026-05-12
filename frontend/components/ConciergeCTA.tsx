'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, X, ChevronDown } from 'lucide-react';

interface Props {
  propertyTitle?: string;
}

export default function ConciergeCTA({ propertyTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-80 bg-white rounded-2xl shadow-2xl border border-[#E8E1D7] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1C1A17] px-5 py-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#C9A96A] mb-0.5">White-Glove Service</p>
                  <h3 className="text-base font-light text-white lux-heading">Speak to an Advisor</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white transition mt-0.5">
                  <X size={16} />
                </button>
              </div>

              <div className="p-5">
                {sent ? (
                  <div className="text-center py-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <p className="text-sm text-[#5F5448]">Thank you. An advisor will call you at your preferred time.</p>
                  </div>
                ) : (
                  <>
                    {propertyTitle && (
                      <p className="text-xs text-[#9A8B7A] mb-4 truncate">Re: {propertyTitle}</p>
                    )}
                    <form
                      className="space-y-3"
                      onSubmit={e => { e.preventDefault(); setSent(true); }}
                    >
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#9A8B7A] block mb-1">Your Name</label>
                        <input
                          className="lux-input text-sm py-2"
                          placeholder="Full name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#9A8B7A] block mb-1">Phone Number</label>
                        <input
                          className="lux-input text-sm py-2"
                          type="tel"
                          placeholder="+44 7700 000000"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-[#9A8B7A] block mb-1">Preferred Call Time</label>
                        <select
                          className="lux-input text-sm py-2"
                          value={time}
                          onChange={e => setTime(e.target.value)}
                          required
                        >
                          <option value="">Select a time</option>
                          <option>Morning (9am – 12pm)</option>
                          <option>Afternoon (12pm – 5pm)</option>
                          <option>Evening (5pm – 8pm)</option>
                          <option>Any time</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full lux-button text-sm">Request Callback</button>
                    </form>
                    <div className="flex gap-3 mt-3">
                      <a
                        href="tel:+442012345678"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#F6F2EC] text-[#5F5448] text-xs rounded-xl py-2.5 hover:bg-[#EDE7DC] transition"
                      >
                        <Phone size={13} /> Call Now
                      </a>
                      <a
                        href="https://wa.me/442012345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#25D366] text-xs rounded-xl py-2.5 hover:bg-[#25D366]/20 transition"
                      >
                        <MessageSquare size={13} /> WhatsApp
                      </a>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setOpen(o => !o)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 bg-[#1C1A17] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl hover:bg-[#2D2A24] transition"
        >
          <div className="w-7 h-7 rounded-full bg-[#C9A96A] flex items-center justify-center shrink-0">
            <Phone size={13} className="text-[#1C1A17]" />
          </div>
          <span className="text-sm font-light tracking-wide">Speak to an Advisor</span>
          <ChevronDown size={14} className={`text-white/50 transition-transform ${open ? 'rotate-180' : ''}`} />
        </motion.button>
      </div>
    </>
  );
}
