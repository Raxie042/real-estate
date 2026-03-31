'use client';

import { useState } from 'react';

export default function ValuationCalculator() {
  const [formData, setFormData] = useState({
    bedrooms: 3,
    bathrooms: 2,
    squareFeet: 2000,
    lotSize: 5000,
    yearBuilt: 2010,
    propertyType: 'HOUSE',
    city: '',
    state: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
  });
  const [valuation, setValuation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/valuation/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setValuation(data);
    } catch (error) {
      console.error('Failed to get valuation:', error);
      alert('Failed to calculate valuation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Property Valuation</h2>
        <p className="text-gray-600 mt-2">
            Get an instant estimate of your property&apos;s market value
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type *
            </label>
            <select
              required
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            >
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="CONDO">Condo</option>
              <option value="TOWNHOUSE">Townhouse</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Square Feet *
            </label>
            <input
              type="number"
              required
              min={100}
              value={formData.squareFeet}
              onChange={(e) => setFormData({ ...formData, squareFeet: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms *
            </label>
            <input
              type="number"
              required
              min={0}
              step={0.5}
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lot Size (sq ft)
            </label>
            <input
              type="number"
              min={0}
              value={formData.lotSize}
              onChange={(e) => setFormData({ ...formData, lotSize: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year Built
            </label>
            <input
              type="number"
              min={1800}
              max={new Date().getFullYear()}
              value={formData.yearBuilt}
              onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude *
            </label>
            <input
              type="number"
              required
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude *
            </label>
            <input
              type="number"
              required
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A96A]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C9A96A] text-white py-3 rounded-lg hover:bg-[#B08850] disabled:opacity-50 transition font-semibold text-lg"
        >
          {loading ? 'Calculating...' : 'Calculate Value'}
        </button>
      </form>

      {valuation && (
        <div className="mt-8 space-y-6">
          <div className="bg-gradient-to-r from-[#C9A96A] to-[#B08850] text-white rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Estimated Value</h3>
            <div className="text-4xl font-bold mb-2">
              ${valuation.estimatedValue?.toLocaleString() || 'N/A'}
            </div>
            <div className="text-white/90">
              Range: ${valuation.lowValue?.toLocaleString()} - ${valuation.highValue?.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Confidence</div>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getConfidenceColor(valuation.confidence)}`}>
                {valuation.confidence}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Price/Sq Ft</div>
              <div className="text-2xl font-bold text-gray-900">
                ${valuation.pricePerSqFt}
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Comparables</div>
              <div className="text-2xl font-bold text-gray-900">
                {valuation.comparablesCount}
              </div>
            </div>
          </div>

          {valuation.comparables && valuation.comparables.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-4">Comparable Properties</h4>
              <div className="space-y-3">
                {valuation.comparables.slice(0, 5).map((comp: any, idx: number) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium">{comp.address}</div>
                      <div className="text-sm text-gray-600">
                        {comp.bedrooms} bed • {comp.bathrooms} bath • {comp.squareFeet.toLocaleString()} sq ft
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">${comp.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{comp.distance} mi away</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
