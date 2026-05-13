'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileText, PenLine, CheckCircle, ChevronRight, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import api from '@/lib/api';

const ESignatureModal = dynamic(() => import('@/components/ESignatureModal'), { ssr: false });

interface MakeOfferProps {
  listingId: string;
  listingTitle?: string;
  listingPrice: number;
  currency?: string;
  requireNda?: boolean;
  onOfferSubmitted?: () => void;
  onClose?: () => void;
}

type Step = 'idle' | 'nda' | 'form' | 'success';

export default function MakeOffer({
  listingId,
  listingTitle,
  listingPrice,
  currency = '£',
  requireNda,
  onOfferSubmitted,
  onClose,
}: MakeOfferProps) {
  const [step, setStep] = useState<Step>('idle');
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    amount: listingPrice,
    message: '',
    conditions: '',
    expiresInDays: 7,
    fullName: '',
    email: '',
    phone: '',
    financingType: 'cash' as 'cash' | 'mortgage' | 'bridging',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const needsNda = requireNda || listingPrice >= 5_000_000;
  const percentOfAsking = listingPrice > 0
    ? ((formData.amount / listingPrice) * 100).toFixed(1)
    : '100.0';

  const handleOpenOffer = () => {
    if (needsNda) setStep('nda');
    else setStep('form');
  };

  const handleSigned = (dataUrl: string) => {
    setSignatureDataUrl(dataUrl);
    setStep('form');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + formData.expiresInDays);
      await api.offers.create({
        listingId,
        amount: formData.amount,
        currency,
        message: formData.message,
        conditions: formData.conditions ? { notes: formData.conditions } : null,
        expiresAt: expiresAt.toISOString(),
      });
      setStep('success');
      onOfferSubmitted?.();
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      {step === 'idle' && (
        <button
          onClick={handleOpenOffer}
          className="w-full lux-button flex items-center justify-center gap-2 text-lg py-3.5"
        >
          {needsNda && <Lock size={17} />}
          Make an Offer
        </button>
      )}

      {/* NDA step */}
      <AnimatePresence>
        {step === 'nda' && (
          <ESignatureModal
            title="Non-Disclosure Agreement"
            onSign={handleSigned}
            onClose={() => setStep('idle')}
          />
        )}
      </AnimatePresence>

      {/* Offer Form */}
      <AnimatePresence>
        {step === 'form' && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#F6F2EC] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            >
              {/* Header */}
              <div className="bg-[#1C1A17] px-6 py-4 flex items-center justify-between shrink-0">
                <div>
                  {signatureDataUrl && (
                    <span className="text-[10px] text-[#C9A96A] flex items-center gap-1 mb-0.5">
                      <Lock size={10} /> NDA Signed
                    </span>
                  )}
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#C9A96A]">Submit Your Offer</p>
                  {listingTitle && <p className="text-white/70 text-xs mt-0.5 font-light">{listingTitle}</p>}
                </div>
                <button onClick={() => { setStep('idle'); onClose?.(); }}
                  className="p-1.5 rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              {/* Steps bar */}
              <div className="flex items-center gap-0 px-6 py-3 border-b border-[#E8E1D7] bg-[#FAF7F2] shrink-0 text-xs">
                {needsNda && (
                  <>
                    <span className="flex items-center gap-1.5 text-[#C9A96A]">
                      <CheckCircle size={13} className="fill-[#C9A96A] text-white" /> NDA Signed
                    </span>
                    <ChevronRight size={12} className="mx-3 text-[#BBAD98]" />
                  </>
                )}
                <span className="flex items-center gap-1.5 text-[#1C1A17] font-semibold">
                  <FileText size={13} /> Offer Details
                </span>
                <ChevronRight size={12} className="mx-3 text-[#BBAD98]" />
                <span className="flex items-center gap-1.5 text-[#BBAD98]">
                  <PenLine size={13} /> Confirm
                </span>
              </div>

              {/* Form body */}
              <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[#7A6E60] mb-1 block">Full name *</label>
                    <input required className="w-full lux-input" value={formData.fullName}
                      onChange={e => setFormData(f => ({ ...f, fullName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-[#7A6E60] mb-1 block">Email *</label>
                    <input required type="email" className="w-full lux-input" value={formData.email}
                      onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Phone</label>
                  <input type="tel" className="w-full lux-input" value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} />
                </div>

                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Offer Amount ({currency}) *</label>
                  <input required type="number" min={1} step={1000} className="w-full lux-input text-lg font-semibold"
                    value={formData.amount}
                    onChange={e => setFormData(f => ({ ...f, amount: parseInt(e.target.value) || 0 }))} />
                  <div className="flex justify-between mt-1 text-xs text-[#9A8B7A]">
                    <span>Asking: {currency}{listingPrice.toLocaleString()}</span>
                    <span className={`font-semibold ${formData.amount < listingPrice ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {percentOfAsking}% of asking
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Financing</label>
                  <div className="flex gap-2">
                    {(['cash', 'mortgage', 'bridging'] as const).map(type => (
                      <button type="button" key={type}
                        onClick={() => setFormData(f => ({ ...f, financingType: type }))}
                        className={`flex-1 text-xs py-2 rounded-lg border capitalize transition-colors ${
                          formData.financingType === type
                            ? 'bg-[#1C1A17] text-[#C9A96A] border-[#1C1A17]'
                            : 'bg-white text-[#7A6E60] border-[#E8E1D7] hover:border-[#C9A96A]'
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Message to Seller</label>
                  <textarea rows={3} className="w-full lux-input resize-none"
                    placeholder="Introduce yourself and explain your interest..."
                    value={formData.message}
                    onChange={e => setFormData(f => ({ ...f, message: e.target.value }))} />
                </div>

                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Conditions / Contingencies</label>
                  <textarea rows={2} className="w-full lux-input resize-none"
                    placeholder="e.g. Subject to survey, subject to finance..."
                    value={formData.conditions}
                    onChange={e => setFormData(f => ({ ...f, conditions: e.target.value }))} />
                </div>

                <div>
                  <label className="text-xs text-[#7A6E60] mb-1 block">Offer valid for</label>
                  <select className="w-full lux-input" value={formData.expiresInDays}
                    onChange={e => setFormData(f => ({ ...f, expiresInDays: parseInt(e.target.value) }))}>
                    <option value={3}>3 days</option>
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={30}>30 days</option>
                  </select>
                </div>

                {signatureDataUrl && (
                  <div className="border border-[#E8E1D7] rounded-xl p-3 bg-white">
                    <p className="text-[10px] uppercase tracking-widest text-[#9A8B7A] mb-2 flex items-center gap-1">
                      <Lock size={10} /> Your NDA Signature
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={signatureDataUrl} alt="Signature" className="h-14 object-contain" />
                  </div>
                )}

                <div className="bg-[#C9A96A]/10 border border-[#C9A96A]/30 rounded-xl p-4 text-xs text-[#7A6E60]">
                  This offer is not legally binding until accepted in writing and formal contracts are exchanged. Always consult a solicitor before proceeding.
                </div>

                <div className="flex gap-3 pb-2">
                  <button type="submit" disabled={isSubmitting} className="flex-1 lux-button disabled:opacity-50">
                    {isSubmitting ? 'Submitting…' : 'Submit Offer'}
                  </button>
                  <button type="button" onClick={() => { setStep('idle'); onClose?.(); }} className="lux-button-outline px-6">
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success */}
      <AnimatePresence>
        {step === 'success' && (
          <motion.div
            className="fixed inset-0 z-[400] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#F6F2EC] rounded-2xl max-w-sm w-full shadow-2xl p-10 text-center"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={48} className="text-[#C9A96A] mx-auto mb-4" />
              <h3 className="text-2xl font-light text-[#1C1A17] lux-heading mb-2">Offer Submitted</h3>
              <p className="text-[#7A6E60] text-sm leading-relaxed mb-6">
                Your offer has been securely submitted to the listing agent.
                {signatureDataUrl && ' Your signed NDA has been recorded.'}
                {' '}You will be contacted within 24 hours.
              </p>
              <button onClick={() => { setStep('idle'); onClose?.(); }} className="lux-button">
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
