'use client';

import { useState } from 'react';
import api from '@/lib/api';

interface MakeOfferProps {
  listingId: string;
  listingTitle?: string;
  listingPrice: number;
  currency?: string;
  onOfferSubmitted?: () => void;
  onClose?: () => void;
}

export default function MakeOffer({ listingId, listingTitle, listingPrice, currency, onOfferSubmitted, onClose }: MakeOfferProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: listingPrice,
    message: '',
    conditions: '',
    expiresInDays: 7,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      alert('Offer submitted successfully!');
      setShowForm(false);
      onOfferSubmitted?.();
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentOfAsking = ((formData.amount / listingPrice) * 100).toFixed(1);

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-[#C9A96A] text-white px-8 py-3 rounded-lg hover:bg-[#B08850] transition font-semibold text-lg"
      >
        Make an Offer
      </button>

      {showForm && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Submit Your Offer</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Offer Amount ({currency}) *
              </label>
              <input
                type="number"
                required
                min={0}
                step={1000}
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A] text-lg font-semibold"
              />
              <p className="mt-1 text-sm text-gray-600">
                Asking price: {currency} {listingPrice.toLocaleString()} • 
                Your offer: <span className={`font-semibold ${formData.amount < listingPrice ? 'text-red-600' : 'text-green-600'}`}>
                  {percentOfAsking}%
                </span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message to Seller
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Introduce yourself and explain your offer..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Conditions / Contingencies
              </label>
              <textarea
                rows={3}
                value={formData.conditions}
                onChange={(e) => setFormData({ ...formData, conditions: e.target.value })}
                placeholder="E.g., Subject to inspection, financing approval, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Offer Valid For
              </label>
              <select
                value={formData.expiresInDays}
                onChange={(e) => setFormData({ ...formData, expiresInDays: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
              >
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
                <option value={30}>30 days</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This offer is not legally binding until accepted by the seller 
                and proper contracts are signed. Always consult with a real estate attorney.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-[#C9A96A] text-white py-3 rounded-lg hover:bg-[#B08850] disabled:opacity-50 transition font-semibold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Offer'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
