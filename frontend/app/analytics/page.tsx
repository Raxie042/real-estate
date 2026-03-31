'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Eye, Heart, FileText, TrendingUp, MessageSquare, Calendar, Tag, DollarSign } from 'lucide-react';

export default function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await api.analytics.getDashboard();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-[#EFE8DD] rounded w-1/4" />
              <div className="grid grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-32 bg-[#EFE8DD] rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const stats = [
    {
      label: 'Total Listings',
      value: analytics?.listingsCount || 0,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      label: 'Total Views',
      value: analytics?.totalViews || 0,
      icon: Eye,
      color: 'bg-green-500',
      change: '+23%',
    },
    {
      label: 'Saved Favorites',
      value: analytics?.favoritesCount || 0,
      icon: Heart,
      color: 'bg-red-500',
      change: '+8%',
    },
    {
      label: 'Recent Searches',
      value: analytics?.savedSearchesCount || 0,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+15%',
    },
  ];

  const phase2Stats = [
    {
      label: 'Pending Offers',
      value: 3,
      icon: Tag,
      color: 'bg-orange-500',
      description: 'Awaiting your response',
    },
    {
      label: 'Upcoming Open Houses',
      value: 3,
      icon: Calendar,
      color: 'bg-cyan-500',
      description: '15 total RSVPs',
    },
    {
      label: 'Active Chats',
      value: 1,
      icon: MessageSquare,
      color: 'bg-indigo-500',
      description: 'Real-time conversations',
    },
    {
      label: 'Documents',
      value: 2,
      icon: FileText,
      color: 'bg-teal-500',
      description: 'Uploaded files',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Analytics Dashboard</h1>
            <p className="text-[#7A6E60]">Track your property listing performance</p>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="lux-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                      <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <p className="text-3xl font-semibold text-[#1C1A17] mb-1">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#7A6E60]">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Phase 2 Features Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Phase 2 Features Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {phase2Stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="lux-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-lg ${stat.color} bg-opacity-10`}>
                        <Icon className={`w-5 h-5 ${stat.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-[#1C1A17]">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-[#1C1A17] mb-1">{stat.label}</p>
                    <p className="text-xs text-[#7A6E60]">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Recent Offers</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Modern Downtown Loft</p>
                    <p className="text-xs text-[#7A6E60]">Offer: $825,000 - Pending</p>
                  </div>
                  <Tag className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Suburban Family Home</p>
                    <p className="text-xs text-[#7A6E60]">Offer: $680,000 - Pending</p>
                  </div>
                  <Tag className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Luxury Beachfront Condo</p>
                    <p className="text-xs text-[#7A6E60]">Offer: $1,200,000 - Pending</p>
                  </div>
                  <Tag className="w-5 h-5 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Upcoming Open Houses</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Modern Downtown Loft</p>
                    <p className="text-xs text-[#7A6E60]">Tomorrow, 2:00 PM - 2 RSVPs</p>
                  </div>
                  <Calendar className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Suburban Family Home</p>
                    <p className="text-xs text-[#7A6E60]">Next week, 10:00 AM - 1 RSVP</p>
                  </div>
                  <Calendar className="w-5 h-5 text-cyan-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#1C1A17]">Luxury Beachfront Condo</p>
                    <p className="text-xs text-[#7A6E60]">Next week, 3:00 PM - 0 RSVPs</p>
                  </div>
                  <Calendar className="w-5 h-5 text-cyan-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
