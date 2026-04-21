'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Users,
  Home,
  TrendingUp,
  DollarSign,
  UserCheck,
  UserX,
  Search,
  Filter,
  MoreVertical,
  Ban,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/lib/toast';
import api from '@/lib/api';
import {
  UserGrowthChart,
  RevenueChart,
  ListingStatusChart,
  PropertyCategoryChart,
  OffersChart,
} from '@/components/admin/AnalyticsCharts';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  isActive: boolean;
  _count?: {
    listings: number;
    offers: number;
  };
}

interface Listing {
  id: string;
  title: string;
  price: number;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'users' | 'listings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  // Fetch dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.analytics?.getDashboard?.() || { data: {} };
      return response.data;
    },
  });

  // Fetch users
  const { data: users = [], isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      // In production: api.admin.getUsers()
      const response = await api.users?.getProfile?.() || { data: [] };
      return Array.isArray(response.data) ? response.data : [response.data].filter(Boolean);
    },
  });

  // Fetch listings
  const { data: listings = [], isLoading: loadingListings } = useQuery<Listing[]>({
    queryKey: ['adminListings'],
    queryFn: async () => {
      const response = await api.listings?.getAll?.() || { data: [] };
      return response.data;
    },
  });

  // Ban/Activate user mutation
  const toggleUserMutation = useMutation({
    mutationFn: async ({ userId, action }: { userId: string; action: 'ban' | 'activate' }) => {
      // In production: api.admin.toggleUser(userId, action)
      return Promise.resolve({ data: { success: true } });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      success(variables.action === 'ban' ? 'User banned' : 'User activated');
      setSelectedUser(null);
    },
    onError: () => {
      showError('Failed to update user status');
    },
  });

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredListings = listings.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Admin Dashboard</h1>
          <p className="text-[#7A6E60]">Manage users, listings, and platform analytics</p>
          <div className="mt-4">
            <Link href="/admin/invitations" className="lux-button-outline inline-flex">
              Review Invitation Applications
            </Link>
            <Link href="/admin/reports" className="lux-button-outline inline-flex ml-3">
              Moderate Listing Reports
            </Link>
            <Link href="/admin/enterprise" className="lux-button inline-flex ml-3">
              Enterprise Console
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-[#E8E1D7]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'overview'
                ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
                : 'text-[#7A6E60] hover:text-[#1C1A17]'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'analytics'
                ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
                : 'text-[#7A6E60] hover:text-[#1C1A17]'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'users'
                ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
                : 'text-[#7A6E60] hover:text-[#1C1A17]'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'listings'
                ? 'text-[#C9A96A] border-b-2 border-[#C9A96A]'
                : 'text-[#7A6E60] hover:text-[#1C1A17]'
            }`}
          >
            Listings
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="lux-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-[#C9A96A]" />
                  <span className="text-sm text-green-600 font-medium">+12%</span>
                </div>
                <div className="text-3xl font-bold text-[#1C1A17] mb-1">
                  {stats?.totalUsers || 1247}
                </div>
                <div className="text-sm text-[#7A6E60]">Total Users</div>
              </div>

              <div className="lux-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <Home className="w-8 h-8 text-[#C9A96A]" />
                  <span className="text-sm text-green-600 font-medium">+8%</span>
                </div>
                <div className="text-3xl font-bold text-[#1C1A17] mb-1">
                  {stats?.totalListings || 856}
                </div>
                <div className="text-sm text-[#7A6E60]">Active Listings</div>
              </div>

              <div className="lux-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-[#C9A96A]" />
                  <span className="text-sm text-green-600 font-medium">+23%</span>
                </div>
                <div className="text-3xl font-bold text-[#1C1A17] mb-1">
                  {stats?.monthlyViews || 45200}
                </div>
                <div className="text-sm text-[#7A6E60]">Monthly Views</div>
              </div>

              <div className="lux-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-[#C9A96A]" />
                  <span className="text-sm text-green-600 font-medium">+15%</span>
                </div>
                <div className="text-3xl font-bold text-[#1C1A17] mb-1">
                  ${stats?.monthlyRevenue || 12800}
                </div>
                <div className="text-sm text-[#7A6E60]">Monthly Revenue</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lux-card p-6">
                <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {users.slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A96A] rounded-full flex items-center justify-center text-white font-semibold">
                          {user.firstName?.[0]}{user.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-[#1C1A17]">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-[#7A6E60]">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[#7A6E60]">
                        {format(new Date(user.createdAt), 'MMM d')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lux-card p-6">
                <h3 className="text-lg font-semibold text-[#1C1A17] mb-4">Recent Listings</h3>
                <div className="space-y-3">
                  {listings.slice(0, 5).map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-3 bg-[#F6F2EC] rounded-lg">
                      <div>
                        <p className="font-medium text-[#1C1A17] mb-1">{listing.title}</p>
                        <p className="text-sm text-[#7A6E60]">
                          ${listing.price.toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          listing.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserGrowthChart />
              <RevenueChart />
              <ListingStatusChart />
              <PropertyCategoryChart />
            </div>
            <OffersChart />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6E60]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 border border-[#E8E1D7] rounded-lg hover:bg-[#F6F2EC] transition flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>

            {/* Users Table */}
            <div className="lux-card overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F6F2EC]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Role</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Listings</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Joined</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-[#1C1A17]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E1D7]">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-[#F6F2EC] transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#C9A96A] rounded-full flex items-center justify-center text-white font-semibold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-[#1C1A17]">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-[#7A6E60]">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-[#C9A96A]/10 text-[#C9A96A] rounded text-sm font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#5F5448]">
                        {user._count?.listings || 0}
                      </td>
                      <td className="px-6 py-4 text-[#7A6E60]">
                        {format(new Date(user.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${
                            user.isActive !== false
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user.isActive !== false ? (
                            <>
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </>
                          ) : (
                            <>
                              <Ban className="w-3 h-3" />
                              Banned
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 hover:bg-[#E8E1D7] rounded-lg transition"
                        >
                          <MoreVertical className="w-5 h-5 text-[#7A6E60]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6E60]" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 border border-[#E8E1D7] rounded-lg hover:bg-[#F6F2EC] transition flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <div key={listing.id} className="lux-card overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#1C1A17]">{listing.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          listing.status === 'PUBLISHED'
                            ? 'bg-green-100 text-green-700'
                            : listing.status === 'DRAFT'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {listing.status}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#C9A96A] mb-2">
                      ${listing.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-[#7A6E60] mb-3">
                      Listed by {listing.user?.firstName} {listing.user?.lastName}
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-[#C9A96A] text-white rounded-lg hover:bg-[#B78F4A] transition text-sm">
                        View
                      </button>
                      <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition text-sm">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Action Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">User Actions</h2>
            <div className="mb-6">
              <p className="text-[#5F5448] mb-1">
                {selectedUser.firstName} {selectedUser.lastName}
              </p>
              <p className="text-sm text-[#7A6E60]">{selectedUser.email}</p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => {
                  toggleUserMutation.mutate({
                    userId: selectedUser.id,
                    action: selectedUser.isActive !== false ? 'ban' : 'activate',
                  });
                }}
                className={`w-full px-6 py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                  selectedUser.isActive !== false
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedUser.isActive !== false ? (
                  <>
                    <Ban className="w-5 h-5" />
                    Ban User
                  </>
                ) : (
                  <>
                    <UserCheck className="w-5 h-5" />
                    Activate User
                  </>
                )}
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full px-6 py-3 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
