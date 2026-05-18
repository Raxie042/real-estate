'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const OFFICES = [
  {
    city: 'London — Mayfair HQ',
    address: '47 Berkeley Square, Mayfair, London W1J 5AP',
    phone: '+44 20 7000 0000',
    email: 'london@raxiezenithestate.com',
    hours: 'Mon–Fri 9am–7pm, Sat 10am–5pm',
    flag: 'GB',
  },
  {
    city: 'Dubai',
    address: 'DIFC Gate Building, Level 14, Dubai, UAE',
    phone: '+971 4 000 0000',
    email: 'dubai@raxiezenithestate.com',
    hours: 'Sun–Thu 9am–6pm GST',
    flag: 'AE',
  },
  {
    city: 'New York',
    address: '432 Park Avenue, Floor 22, New York, NY 10022',
    phone: '+1 212 000 0000',
    email: 'newyork@raxiezenithestate.com',
    hours: 'Mon–Fri 9am–6pm EST',
    flag: 'US',
  },
  {
    city: 'Singapore',
    address: 'Marina Bay Financial Centre, Tower 1, Singapore 018989',
    phone: '+65 6000 0000',
    email: 'singapore@raxiezenithestate.com',
    hours: 'Mon–Fri 9am–6pm SGT',
    flag: 'SG',
  },
];

const DEPARTMENTS = [
  { label: 'Residential Sales Enquiry', value: 'sales' },
  { label: 'Lettings Enquiry', value: 'lettings' },
  { label: 'Valuation Request', value: 'valuation' },
  { label: 'Off-Market / Pre-Market', value: 'offmarket' },
  { label: 'International Property', value: 'international' },
  { label: 'Commercial Property', value: 'commercial' },
  { label: 'Founding Partner Programme', value: 'partner' },
  { label: 'Press & Media', value: 'press' },
  { label: 'General Enquiry', value: 'general' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', dept: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <div className="min-h-screen bg-[#F6F2EC]">
      {/* Hero */}
      <div className="bg-[#1C1A17] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            className="text-[#C9A96A] text-xs uppercase tracking-[0.5em] mb-4">Get in Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl text-[#F4EFE8] mb-5">How Can We Help?</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#B9AA98] max-w-xl mx-auto text-lg">
            Our advisory team is available seven days a week. Whether you are buying, selling or simply exploring, we are here to assist.
          </motion.p>
        </div>
      </div>

      {/* Quick contact options */}
      <div className="bg-[#C9A96A]">
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a href="tel:+442070000000" className="flex items-center justify-center gap-3 text-[#1C1A17] hover:opacity-80 transition-opacity">
            <Phone className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider">Call Us</p>
              <p className="font-semibold">+44 20 7000 0000</p>
            </div>
          </a>
          <a href="mailto:hello@raxiezenithestate.com" className="flex items-center justify-center gap-3 text-[#1C1A17] hover:opacity-80 transition-opacity">
            <Mail className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider">Email Us</p>
              <p className="font-semibold">hello@raxiezenithestate.com</p>
            </div>
          </a>
          <a href="https://wa.me/442070000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-[#1C1A17] hover:opacity-80 transition-opacity">
            <MessageCircle className="w-5 h-5" />
            <div className="text-left">
              <p className="text-xs font-medium uppercase tracking-wider">WhatsApp</p>
              <p className="font-semibold">Message Us Now</p>
            </div>
          </a>
        </div>
      </div>

      {/* Form + Info */}
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Form */}
        <div className="lg:col-span-3">
          <h2 className="font-serif text-3xl text-[#1C1A17] mb-8">Send a Message</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="lux-input w-full" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="lux-input w-full" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="lux-input w-full" placeholder="+44 ..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">How Can We Help? *</label>
                <select required value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })} className="lux-input w-full">
                  <option value="">Please select...</option>
                  {DEPARTMENTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1A17] mb-1">Message *</label>
                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="lux-input w-full h-36 resize-none" placeholder="Tell us about your requirements..." />
              </div>
              <button type="submit" className="lux-button w-full py-3">Send Message</button>
              <p className="text-xs text-[#9A8B7A] text-center">We respond to all enquiries within 2 business hours. Your details are handled with complete discretion.</p>
            </form>
          ) : (
            <div className="lux-card p-12 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-serif text-2xl text-[#C9A96A] mb-3">Message Received</h3>
              <p className="text-[#5F5448]">Thank you for contacting us. A member of our team will be in touch within 2 business hours.</p>
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="lux-card p-6">
            <Clock className="w-5 h-5 text-[#C9A96A] mb-3" />
            <h3 className="font-semibold text-[#1C1A17] mb-3">Response Times</h3>
            <ul className="space-y-2 text-sm text-[#5F5448]">
              <li className="flex justify-between"><span>Sales enquiries</span><span className="text-[#1C1A17] font-medium">Within 2 hrs</span></li>
              <li className="flex justify-between"><span>Valuation requests</span><span className="text-[#1C1A17] font-medium">Same day</span></li>
              <li className="flex justify-between"><span>Off-market enquiries</span><span className="text-[#1C1A17] font-medium">Within 24 hrs</span></li>
              <li className="flex justify-between"><span>General enquiries</span><span className="text-[#1C1A17] font-medium">Within 1 day</span></li>
            </ul>
          </div>
          <div className="lux-card p-6">
            <h3 className="font-semibold text-[#1C1A17] mb-4">Specialist Contacts</h3>
            <div className="space-y-3 text-sm">
              <div><p className="text-[#C9A96A] font-medium text-xs uppercase tracking-wider mb-0.5">Press & Media</p><a href="mailto:press@raxiezenithestate.com" className="text-[#5F5448] hover:text-[#C9A96A]">press@raxiezenithestate.com</a></div>
              <div><p className="text-[#C9A96A] font-medium text-xs uppercase tracking-wider mb-0.5">Founding Partners</p><a href="mailto:founders@raxiezenithestate.com" className="text-[#5F5448] hover:text-[#C9A96A]">founders@raxiezenithestate.com</a></div>
              <div><p className="text-[#C9A96A] font-medium text-xs uppercase tracking-wider mb-0.5">Careers</p><a href="mailto:careers@raxiezenithestate.com" className="text-[#5F5448] hover:text-[#C9A96A]">careers@raxiezenithestate.com</a></div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Offices */}
      <div className="bg-[#1C1A17] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] text-[#C9A96A] mb-3">Global Presence</p>
            <h2 className="font-serif text-4xl text-[#F4EFE8] mb-4">Our Offices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OFFICES.map(o => (
              <div key={o.city} className="bg-[#252220] rounded-xl p-6">
                <h3 className="font-serif text-xl text-[#F4EFE8] mb-3">{o.city}</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex items-start gap-2 text-[#9A8B7A]"><MapPin className="w-4 h-4 text-[#C9A96A] shrink-0 mt-0.5" />{o.address}</p>
                  <p className="flex items-center gap-2 text-[#9A8B7A]"><Phone className="w-4 h-4 text-[#C9A96A] shrink-0" /><a href={`tel:${o.phone.replace(/\s/g, '')}`} className="hover:text-[#C9A96A]">{o.phone}</a></p>
                  <p className="flex items-center gap-2 text-[#9A8B7A]"><Mail className="w-4 h-4 text-[#C9A96A] shrink-0" /><a href={`mailto:${o.email}`} className="hover:text-[#C9A96A]">{o.email}</a></p>
                  <p className="flex items-center gap-2 text-[#9A8B7A]"><Clock className="w-4 h-4 text-[#C9A96A] shrink-0" />{o.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency / Out of hours */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <p className="text-[#7A6E60] mb-2">Urgent out-of-hours enquiries</p>
        <p className="font-serif text-xl text-[#1C1A17] mb-4">Our Priority Client line is available 24/7</p>
        <a href="tel:+442070000099" className="lux-button px-8 py-3 inline-flex items-center gap-2">
          <Phone className="w-4 h-4" /> +44 20 7000 0099
        </a>
      </div>
    </div>
  );
}
