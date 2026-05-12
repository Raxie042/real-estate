'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface Props {
  listingTitle: string;
  agentName?: string;
  agentPhone?: string;
  onClose: () => void;
}

const TIME_SLOTS = [
  { label: '9:00 AM', group: 'Morning' },
  { label: '10:00 AM', group: 'Morning' },
  { label: '11:00 AM', group: 'Morning' },
  { label: '12:00 PM', group: 'Afternoon' },
  { label: '1:00 PM', group: 'Afternoon' },
  { label: '2:00 PM', group: 'Afternoon' },
  { label: '3:00 PM', group: 'Afternoon' },
  { label: '4:00 PM', group: 'Afternoon' },
  { label: '5:00 PM', group: 'Evening' },
  { label: '6:00 PM', group: 'Evening' },
];

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDisplayDate(date: Date) {
  return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function BookViewingModal({ listingTitle, agentName, agentPhone, onClose }: Props) {
  const { user } = useAuth();
  const [step, setStep] = useState<'datetime' | 'details' | 'confirm'>('datetime');
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notes, setNotes] = useState('');
  const [isVirtual, setIsVirtual] = useState(false);

  // Build 7-day window starting from today + weekOffset*7
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = addDays(today, weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)).filter(d => d >= today);

  // Disable Sundays and past dates
  function isDisabled(d: Date) {
    return d < today || d.getDay() === 0;
  }

  function handleNextStep() {
    if (step === 'datetime' && selectedDate && selectedTime) setStep('details');
    else if (step === 'details') setStep('confirm');
  }

  function handleBack() {
    if (step === 'details') setStep('datetime');
    else if (step === 'confirm') setStep('details');
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="bg-[#1C1A17] px-6 py-5 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white font-serif">Book a Private Viewing</h2>
              <p className="text-[#C9A96A] text-sm mt-0.5 line-clamp-1">{listingTitle}</p>
            </div>
            <button onClick={onClose} className="text-[#9A8B7A] hover:text-white transition ml-4 mt-0.5">
              <X size={20} />
            </button>
          </div>

          {/* Step indicator */}
          <div className="flex border-b border-[#E8E1D7]">
            {(['datetime', 'details', 'confirm'] as const).map((s, i) => (
              <div key={s} className={`flex-1 py-2 text-xs text-center font-medium transition-colors ${step === s ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]' : 'text-[#9A8B7A]'}`}>
                {i + 1}. {s === 'datetime' ? 'Date & Time' : s === 'details' ? 'Your Details' : 'Confirm'}
              </div>
            ))}
          </div>

          <div className="p-6">
            {/* Step 1: Date & Time */}
            {step === 'datetime' && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
                    disabled={weekOffset === 0}
                    className="p-1 rounded-full hover:bg-[#F6F2EC] disabled:opacity-30 transition"
                  >
                    <ChevronLeft size={18} className="text-[#5F5448]" />
                  </button>
                  <span className="text-sm font-medium text-[#1C1A17]">
                    {weekStart.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => setWeekOffset(w => w + 1)}
                    className="p-1 rounded-full hover:bg-[#F6F2EC] transition"
                  >
                    <ChevronRight size={18} className="text-[#5F5448]" />
                  </button>
                </div>

                {/* Day picker */}
                <div className="grid grid-cols-7 gap-1 mb-5">
                  {days.map((d) => {
                    const disabled = isDisabled(d);
                    const selected = selectedDate && isSameDay(d, selectedDate);
                    return (
                      <button
                        key={d.toISOString()}
                        disabled={disabled}
                        onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                        className={`flex flex-col items-center py-2 rounded-xl text-xs font-medium transition ${
                          disabled ? 'opacity-30 cursor-not-allowed' :
                          selected ? 'bg-[#C9A96A] text-[#1C1A17]' :
                          'hover:bg-[#F6F2EC] text-[#1C1A17]'
                        }`}
                      >
                        <span className="text-[10px] text-[#9A8B7A] mb-0.5">
                          {d.toLocaleDateString('en-GB', { weekday: 'short' })}
                        </span>
                        <span className="text-sm font-bold">{d.getDate()}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17] mb-2">
                      Available times — {formatDisplayDate(selectedDate)}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot.label}
                          onClick={() => setSelectedTime(slot.label)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition border ${
                            selectedTime === slot.label
                              ? 'bg-[#1C1A17] text-[#C9A96A] border-[#1C1A17]'
                              : 'bg-white text-[#1C1A17] border-[#E8E1D7] hover:border-[#C9A96A]'
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Virtual option */}
                <label className="flex items-center gap-3 mt-5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isVirtual}
                    onChange={e => setIsVirtual(e.target.checked)}
                    className="w-4 h-4 accent-[#C9A96A]"
                  />
                  <span className="text-sm text-[#5F5448]">I prefer a virtual video tour instead</span>
                </label>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 'details' && (
              <div className="space-y-4">
                <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm mb-4">
                  <div className="flex items-center gap-2 text-[#1C1A17]">
                    <Calendar size={14} className="text-[#C9A96A]" />
                    <span className="font-medium">{selectedDate && formatDisplayDate(selectedDate)}</span>
                    <Clock size={14} className="text-[#C9A96A] ml-2" />
                    <span className="font-medium">{selectedTime}</span>
                    {isVirtual && <span className="ml-2 text-xs bg-[#C9A96A]/20 text-[#8B6A2A] px-2 py-0.5 rounded-full">Virtual</span>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">Full Name *</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="lux-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">Email *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="lux-input" placeholder="your@email.com" type="email" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="lux-input" placeholder="+44 7700 000000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#5F5448] mb-1">Notes for the agent</label>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} className="lux-input resize-none h-20" placeholder="e.g. I'm cash-ready, interested in the garden level…" />
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 'confirm' && (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-[#C9A96A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#C9A96A]" />
                </div>
                <h3 className="text-xl font-semibold text-[#1C1A17] mb-2 font-serif">Viewing Request Sent</h3>
                <p className="text-[#5F5448] text-sm mb-6">
                  Your request for a {isVirtual ? 'virtual' : 'private in-person'} viewing has been submitted. The agent will confirm within 2 hours.
                </p>
                <div className="bg-[#F6F2EC] rounded-xl p-4 text-sm text-left space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[#7A6E60]">Property</span>
                    <span className="font-medium text-[#1C1A17] text-right max-w-[60%] leading-tight">{listingTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E60]">Date</span>
                    <span className="font-medium text-[#1C1A17]">{selectedDate && formatDisplayDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E60]">Time</span>
                    <span className="font-medium text-[#1C1A17]">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6E60]">Name</span>
                    <span className="font-medium text-[#1C1A17]">{name}</span>
                  </div>
                  {agentName && (
                    <div className="flex justify-between">
                      <span className="text-[#7A6E60]">Agent</span>
                      <span className="font-medium text-[#1C1A17]">{agentName}</span>
                    </div>
                  )}
                </div>
                <button onClick={onClose} className="lux-button w-full">Done</button>
              </div>
            )}
          </div>

          {/* Footer navigation */}
          {step !== 'confirm' && (
            <div className="px-6 pb-6 flex gap-3">
              {step !== 'datetime' && (
                <button onClick={handleBack} className="lux-button-outline flex-1">Back</button>
              )}
              <button
                onClick={handleNextStep}
                disabled={step === 'datetime' ? !selectedDate || !selectedTime : !name.trim() || !email.trim()}
                className="lux-button flex-1 disabled:opacity-40"
              >
                {step === 'details' ? 'Review Booking' : 'Continue'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
