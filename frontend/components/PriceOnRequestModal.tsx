'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Send, CheckCircle, X } from 'lucide-react';

interface PriceOnRequestModalProps {
  listingId: string;
  listingTitle: string;
  agentName?: string;
  onClose: () => void;
}

export default function PriceOnRequestModal({ listingId, listingTitle, agentName, onClose }: PriceOnRequestModalProps) {
  const [step, setStep] = useState<'form' | 'confirm' | 'submitted'>('form');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    purchaseTimeline: '',
    financingMethod: '',
    message: '',
    agreeNDA: false,
  });
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleNext = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.purchaseTimeline || !form.financingMethod) {
      setError('Please complete all required fields.');
      return;
    }
    if (!form.agreeNDA) {
      setError('You must agree to the confidentiality terms to proceed.');
      return;
    }
    setStep('confirm');
  };

  const handleSubmit = async () => {
    // In production: POST to /api/listings/:id/por-inquiry
    setStep('submitted');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#1C1A17] px-7 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock size={15} className="text-[#C9A96A]" />
              <div>
                <p className="text-[#C9A96A] text-[10px] uppercase tracking-[0.3em]">Confidential Enquiry</p>
                <p className="text-[#F6F2EC] text-sm font-medium">Price on Request</p>
              </div>
            </div>
            <button onClick={onClose} className="text-[#9A8B7A] hover:text-white transition"><X size={18} /></button>
          </div>

          <div className="p-7">
            {step === 'submitted' ? (
              <div className="text-center py-4">
                <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#1C1A17] mb-2">Enquiry Submitted</h3>
                <p className="text-sm text-[#5F5448] mb-1">Your sealed enquiry has been received.</p>
                <p className="text-sm text-[#5F5448] mb-5">{agentName ? `${agentName} will` : 'Our team will'} be in touch within 24 hours with the asking price and further details.</p>
                <p className="text-xs text-[#9A8B7A]">All communications are subject to our confidentiality agreement.</p>
                <button onClick={onClose} className="mt-6 lux-button">Close</button>
              </div>
            ) : step === 'confirm' ? (
              <>
                <h3 className="font-serif text-xl text-[#1C1A17] mb-2">Confirm Your Enquiry</h3>
                <p className="text-sm text-[#5F5448] mb-5">Please review your details before submitting this sealed enquiry for:</p>
                <p className="font-medium text-[#1C1A17] mb-4 text-sm">{listingTitle}</p>
                <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm space-y-2 mb-5">
                  <div className="flex justify-between"><span className="text-[#9A8B7A]">Name</span><span className="font-medium text-[#1C1A17]">{form.firstName} {form.lastName}</span></div>
                  <div className="flex justify-between"><span className="text-[#9A8B7A]">Email</span><span className="font-medium text-[#1C1A17]">{form.email}</span></div>
                  <div className="flex justify-between"><span className="text-[#9A8B7A]">Phone</span><span className="font-medium text-[#1C1A17]">{form.phone}</span></div>
                  <div className="flex justify-between"><span className="text-[#9A8B7A]">Timeline</span><span className="font-medium text-[#1C1A17]">{form.purchaseTimeline}</span></div>
                  <div className="flex justify-between"><span className="text-[#9A8B7A]">Financing</span><span className="font-medium text-[#1C1A17]">{form.financingMethod}</span></div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 mb-5 flex items-start gap-2">
                  <Shield size={13} className="mt-0.5 shrink-0" />
                  By submitting, you confirm that you agree to our confidentiality terms and that your details will only be shared with the instructed agent for this property.
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSubmit} className="lux-button flex-1 flex items-center justify-center gap-1.5"><Send size={13} />Submit Sealed Enquiry</button>
                  <button onClick={() => setStep('form')} className="px-4 py-2.5 rounded-xl border border-[#E8E1D7] text-sm text-[#5F5448] hover:border-[#C9A96A] transition">Back</button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-serif text-xl text-[#1C1A17] mb-1">Request Price &amp; Details</h3>
                <p className="text-sm text-[#5F5448] mb-5">This property is available on a discreet, price-on-request basis. Complete the form below to receive full details.</p>

                {error && <p className="text-red-600 text-xs mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#9A8B7A] mb-1 block">First Name *</label>
                      <input value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className="lux-input w-full text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-[#9A8B7A] mb-1 block">Last Name *</label>
                      <input value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className="lux-input w-full text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#9A8B7A] mb-1 block">Email Address *</label>
                    <input type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} className="lux-input w-full text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-[#9A8B7A] mb-1 block">Phone (incl. country code) *</label>
                    <input type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} className="lux-input w-full text-sm" placeholder="+44 7700 000000" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#9A8B7A] mb-1 block">Purchase Timeline *</label>
                      <select value={form.purchaseTimeline} onChange={e => handleChange('purchaseTimeline', e.target.value)} className="lux-input w-full text-sm">
                        <option value="">Select...</option>
                        <option>Immediately</option>
                        <option>1–3 months</option>
                        <option>3–6 months</option>
                        <option>6–12 months</option>
                        <option>Longer term</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-[#9A8B7A] mb-1 block">Financing Method *</label>
                      <select value={form.financingMethod} onChange={e => handleChange('financingMethod', e.target.value)} className="lux-input w-full text-sm">
                        <option value="">Select...</option>
                        <option>Cash purchase</option>
                        <option>Mortgage / finance</option>
                        <option>Mixed cash & mortgage</option>
                        <option>Corporate / trust structure</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-[#9A8B7A] mb-1 block">Message (optional)</label>
                    <textarea rows={2} value={form.message} onChange={e => handleChange('message', e.target.value)}
                      className="lux-input w-full text-sm resize-none" placeholder="Any specific questions or requirements..." />
                  </div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.agreeNDA} onChange={e => handleChange('agreeNDA', e.target.checked)} className="accent-[#C9A96A] mt-0.5" />
                    <span className="text-xs text-[#5F5448]">I agree that my details will be shared with the instructed agent for this property only, and kept confidential. I understand this is a non-binding expression of interest.</span>
                  </label>
                </div>
                <button onClick={handleNext} className="w-full lux-button mt-5 flex items-center justify-center gap-1.5">
                  <Lock size={13} />Review &amp; Submit Enquiry
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
