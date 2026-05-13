'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ChevronRight, Briefcase } from 'lucide-react';

const PARTNERS = [
  { name: 'Coutts', initials: 'CO', tier: 'Platinum', desc: 'Exclusive private bank to HNW clients for over 300 years' },
  { name: 'Julius Baer', initials: 'JB', tier: 'Platinum', desc: 'Global wealth management with specialist real estate lending' },
  { name: 'UBS Wealth', initials: 'UB', tier: 'Gold', desc: 'Global family office and structured lending solutions' },
  { name: 'Rothschild & Co', initials: 'RC', tier: 'Platinum', desc: 'Multi-generational wealth advisory and estate planning' },
];

interface WealthReferralSectionProps {
  /** Minimal card mode for sidebar use */
  compact?: boolean;
  title?: string;
  subtitle?: string;
}

export default function WealthReferralSection({
  compact = false,
  title = 'Access Private Banking',
  subtitle = 'We can introduce you to our network of private banks and wealth managers who specialise in high-value property finance and estate planning.',
}: WealthReferralSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', bank: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (compact) {
    return (
      <>
        <div className="lux-card p-5 border-[#C9A96A]/30">
          <div className="flex items-center gap-2 mb-3">
            <Briefcase size={15} className="text-[#C9A96A]" />
            <h4 className="font-semibold text-[#1C1A17] text-sm">Private Banking Introductions</h4>
          </div>
          <p className="text-xs text-[#7A6E60] leading-relaxed mb-4">
            We can introduce you to specialist private banks who finance acquisitions of this calibre.
          </p>
          <div className="flex gap-2 mb-4">
            {PARTNERS.slice(0, 3).map(p => (
              <div key={p.name} title={p.name} className="w-8 h-8 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#C9A96A] text-[9px] font-bold tracking-wide">
                {p.initials}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-[#E8E1D7] flex items-center justify-center text-[#7A6E60] text-[9px] font-semibold">
              +{PARTNERS.length - 3}
            </div>
          </div>
          <button onClick={() => setModalOpen(true)} className="w-full lux-button-outline text-xs flex items-center justify-center gap-1.5">
            Request Introduction <ChevronRight size={11} />
          </button>
        </div>

        <AnimatePresence>
          {modalOpen && <IntroModal form={form} setForm={setForm} submitted={submitted} onSubmit={handleSubmit} onClose={() => { setModalOpen(false); setSubmitted(false); }} />}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <section className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs uppercase tracking-[0.5em] text-[#C9A96A] mb-3">Private Banking Network</p>
              <h2 className="text-4xl font-light text-white lux-heading mb-5">{title}</h2>
              <div className="w-14 h-px bg-[#C9A96A] mb-6" />
              <p className="text-white/60 leading-relaxed mb-8 text-lg font-light">{subtitle}</p>

              <div className="space-y-4 mb-8">
                {['Property acquisition finance from £2m to £100m+', 'Bridging, development, and investment structures', 'International clients and cross-border transactions', 'Discreet, no-obligation introductions'].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96A] mt-2 shrink-0" />
                    <p className="text-white/60 text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <button onClick={() => setModalOpen(true)} className="lux-button flex items-center gap-2 text-sm">
                Request an Introduction <ChevronRight size={14} />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {PARTNERS.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#C9A96A]/40 hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A96A]/10 border border-[#C9A96A]/30 flex items-center justify-center text-[#C9A96A] font-bold text-[13px] mb-3 group-hover:bg-[#C9A96A]/20 transition-colors">
                    {p.initials}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{p.name}</span>
                    <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-semibold ${p.tier === 'Platinum' ? 'bg-[#C9A96A]/20 text-[#C9A96A]' : 'bg-white/10 text-white/60'}`}>{p.tier}</span>
                  </div>
                  <p className="text-white/40 text-xs leading-snug">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <IntroModal form={form} setForm={setForm} submitted={submitted} onSubmit={handleSubmit} onClose={() => { setModalOpen(false); setSubmitted(false); }} />}
      </AnimatePresence>
    </>
  );
}

function IntroModal({ form, setForm, submitted, onSubmit, onClose }: {
  form: { name: string; email: string; phone: string; bank: string; message: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; phone: string; bank: string; message: string }>>;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        <div className="bg-[#1C1A17] px-7 py-5 flex items-center justify-between">
          <div>
            <p className="text-[#C9A96A] text-[11px] uppercase tracking-[0.4em] mb-1">Private Introduction</p>
            <h3 className="text-white font-light text-lg">Request a Banking Introduction</h3>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white ml-4"><X size={18} /></button>
        </div>

        <div className="p-7">
          {submitted ? (
            <div className="text-center py-6">
              <CheckCircle size={44} className="text-[#C9A96A] mx-auto mb-4" />
              <h4 className="text-xl font-light text-[#1C1A17] lux-heading mb-2">Request Received</h4>
              <p className="text-sm text-[#7A6E60] leading-relaxed max-w-xs mx-auto">
                Our Private Client team will be in touch within one business day to arrange your introduction.
              </p>
              <button onClick={onClose} className="mt-6 lux-button-outline text-sm px-8">Close</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Full Name *</label>
                  <input required className="w-full lux-input text-sm" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Email *</label>
                  <input required type="email" className="w-full lux-input text-sm" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Phone Number</label>
                <input type="tel" className="w-full lux-input text-sm" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Preferred Banking Partner</label>
                <select className="w-full lux-input text-sm" value={form.bank}
                  onChange={e => setForm(f => ({ ...f, bank: e.target.value }))}>
                  <option value="">No preference</option>
                  {PARTNERS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#7A6E60] mb-1 block">Brief context (optional)</label>
                <textarea rows={2} className="w-full lux-input text-sm resize-none"
                  placeholder="Acquisition size, timeline, structure..."
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <p className="text-[10px] text-[#9A8B7A] leading-snug">
                Raxie Zenith Estate accepts no financial remuneration from partner introductions. Your details are held in strict confidence.
              </p>
              <button type="submit" className="w-full lux-button flex items-center justify-center gap-2">
                Submit Request <ChevronRight size={14} />
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
