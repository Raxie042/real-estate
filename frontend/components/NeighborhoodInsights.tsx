'use client';

import { useState, useEffect, useCallback } from 'react';

interface NeighborhoodInsightsProps {
  latitude: number;
  longitude: number;
  address?: string;
}

export default function NeighborhoodInsights({ latitude, longitude, address }: NeighborhoodInsightsProps) {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'schools' | 'places'>('overview');

  const loadInsights = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/neighborhood/insights?lat=${latitude}&lng=${longitude}`
      );
      const data = await response.json();
      setInsights(data);
    } catch (error) {
      console.error('Failed to load insights:', error);
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    loadInsights();
  }, [loadInsights]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!insights) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#C9A96A] to-[#B08850] text-white p-6">
        <h2 className="text-2xl font-bold">Neighborhood Insights</h2>
        <p className="text-white/90 mt-1">Discover what makes this area special</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-6 py-3 font-medium transition ${
            activeTab === 'overview'
              ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('schools')}
          className={`flex-1 px-6 py-3 font-medium transition ${
            activeTab === 'schools'
              ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Schools
        </button>
        <button
          onClick={() => setActiveTab('places')}
          className={`flex-1 px-6 py-3 font-medium transition ${
            activeTab === 'places'
              ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Nearby Places
        </button>
      </div>

      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && insights.walkScore && (
          <div className="space-y-6">
            {/* Walk Score */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Transportation Scores</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#C9A96A]">{insights.walkScore.walkScore}</div>
                  <div className="text-sm text-gray-600 mt-1">Walk Score</div>
                  <div className="text-xs text-gray-500 mt-1">{insights.walkScore.description}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#C9A96A]">{insights.walkScore.transitScore}</div>
                  <div className="text-sm text-gray-600 mt-1">Transit Score</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#C9A96A]">{insights.walkScore.bikeScore}</div>
                  <div className="text-sm text-gray-600 mt-1">Bike Score</div>
                </div>
              </div>
            </div>

            {/* Demographics */}
            {insights.demographics && (
              <div>
                <h3 className="font-semibold text-lg mb-4">Demographics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Population</span>
                    <span className="font-semibold">{insights.demographics.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Median Age</span>
                    <span className="font-semibold">{insights.demographics.medianAge}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Median Income</span>
                    <span className="font-semibold">${insights.demographics.medianIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Employment Rate</span>
                    <span className="font-semibold">{insights.demographics.employmentRate}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Transit */}
            {insights.transit && (
              <div>
                <h3 className="font-semibold text-lg mb-4">{insights.transit.description}</h3>
                <div className="space-y-2">
                  {insights.transit.nearbyStops.map((stop: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#C9A96A] text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {stop.type[0]}
                        </div>
                        <span className="font-medium">{stop.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{stop.distance} mi</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Schools Tab */}
        {activeTab === 'schools' && insights.schools && (
          <div className="space-y-4">
            {insights.schools.map((school: any, idx: number) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-lg">{school.name}</h4>
                    <p className="text-sm text-gray-600">{school.type} • Grades {school.grades}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#C9A96A]">{school.rating}/10</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{school.distance} miles away</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Places Tab */}
        {activeTab === 'places' && (
          <div className="space-y-4">
            <p className="text-gray-600 text-center py-8">
              Select a category below to see nearby places
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['restaurant', 'grocery_store', 'park', 'hospital', 'gym'].map(type => (
                <button
                  key={type}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#C9A96A] hover:bg-gray-50 transition text-center"
                >
                  <div className="capitalize font-medium">{type.replace('_', ' ')}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
