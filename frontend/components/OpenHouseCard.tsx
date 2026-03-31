'use client';

import { useState } from 'react';

interface OpenHouse {
  id: string;
  startTime: string;
  endTime: string;
  description: string;
  maxAttendees: number;
  rsvps: any[];
}

interface OpenHouseCardProps {
  openHouse: OpenHouse;
  onRSVP: (openHouseId: string) => void;
}

export default function OpenHouseCard({ openHouse, onRSVP }: OpenHouseCardProps) {
  const [showRSVPForm, setShowRSVPForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const spotsLeft = openHouse.maxAttendees
    ? openHouse.maxAttendees - openHouse.rsvps.reduce((sum, rsvp) => sum + rsvp.guests, 0)
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/open-houses/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          openHouseId: openHouse.id,
          ...formData,
        }),
      });

      if (response.ok) {
        alert('RSVP submitted successfully!');
        setShowRSVPForm(false);
        onRSVP(openHouse.id);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to submit RSVP');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-[#C9A96A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="font-semibold text-lg">{formatDate(openHouse.startTime)}</h3>
          </div>
          <p className="text-gray-600 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              {formatTime(openHouse.startTime)} - {formatTime(openHouse.endTime)}
            </span>
          </p>
        </div>
        
        {spotsLeft !== null && (
          <div className="text-right">
            <p className="text-sm text-gray-500">Available spots</p>
            <p className={`text-2xl font-bold ${spotsLeft < 5 ? 'text-red-600' : 'text-[#C9A96A]'}`}>
              {spotsLeft}
            </p>
          </div>
        )}
      </div>

      {openHouse.description && (
        <p className="text-gray-600 mb-4">{openHouse.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>{openHouse.rsvps.length} attending</span>
        </div>

        <button
          onClick={() => setShowRSVPForm(!showRSVPForm)}
          disabled={spotsLeft !== null && spotsLeft <= 0}
          className="bg-[#C9A96A] text-white px-6 py-2 rounded-lg hover:bg-[#B08850] disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
        >
          {spotsLeft !== null && spotsLeft <= 0 ? 'Full' : 'RSVP'}
        </button>
      </div>

      {showRSVPForm && (
        <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of guests</label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#C9A96A] text-white py-2 rounded-lg hover:bg-[#B08850] disabled:opacity-50 transition font-medium"
            >
              {isSubmitting ? 'Submitting...' : 'Confirm RSVP'}
            </button>
            <button
              type="button"
              onClick={() => setShowRSVPForm(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
