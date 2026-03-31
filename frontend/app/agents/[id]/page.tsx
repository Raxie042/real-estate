'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, MapPin, Mail, Phone, Briefcase, Award, TrendingUp, Home } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';

interface AgentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bio?: string;
  licenseNumber?: string;
  yearsExperience?: number;
  specialties?: string[];
  avatar?: string;
  agency?: {
    id: string;
    name: string;
    logo?: string;
  };
  listings: Array<{
    id: string;
    title: string;
    price: number;
    images: string[];
    city: string;
    state: string;
    status: string;
  }>;
  stats: {
    totalListings: number;
    activeListing: number;
    totalSales: number;
    averageRating: number;
    reviewCount: number;
  };
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    author: string;
    createdAt: string;
  }>;
}

export default function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const agentId = resolvedParams.id;

  const { data: agent, isLoading } = useQuery<AgentProfile>({
    queryKey: ['agent', agentId],
    queryFn: async () => {
      const response = await api.users?.getProfile?.() || { data: null };
      // In production, this would be: api.agents.getById(agentId)
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#7A6E60]">Loading agent profile...</div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#7A6E60]">Agent not found</div>
      </div>
    );
  }

  const fullName = `${agent.firstName} ${agent.lastName}`;

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="lux-card p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-[#C9A96A] flex items-center justify-center text-white text-4xl font-semibold">
                {agent.firstName[0]}{agent.lastName[0]}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">{fullName}</h1>
                  <div className="flex items-center gap-2 text-[#7A6E60] mb-2">
                    <Star className="w-5 h-5 fill-[#C9A96A] text-[#C9A96A]" />
                    <span className="font-medium">{agent.stats?.averageRating || 4.8}</span>
                    <span>({agent.stats?.reviewCount || 0} reviews)</span>
                  </div>
                  {agent.agency && (
                    <Link
                      href={`/agencies/${agent.agency.id}`}
                      className="text-[#C9A96A] hover:underline flex items-center gap-2"
                    >
                      <Briefcase className="w-4 h-4" />
                      {agent.agency.name}
                    </Link>
                  )}
                </div>
                <button className="lux-button">Contact Agent</button>
              </div>

              <p className="text-[#5F5448] mb-4">{agent.bio || 'Experienced real estate professional'}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-[#5F5448]">
                  <Phone className="w-4 h-4 text-[#C9A96A]" />
                  <span className="text-sm">{agent.phone || '(555) 123-4567'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F5448]">
                  <Mail className="w-4 h-4 text-[#C9A96A]" />
                  <span className="text-sm">{agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F5448]">
                  <Award className="w-4 h-4 text-[#C9A96A]" />
                  <span className="text-sm">{agent.yearsExperience || 5}+ Years</span>
                </div>
                <div className="flex items-center gap-2 text-[#5F5448]">
                  <Briefcase className="w-4 h-4 text-[#C9A96A]" />
                  <span className="text-sm">License #{agent.licenseNumber || 'CA-12345'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="lux-card p-4 text-center">
                <Home className="w-6 h-6 text-[#C9A96A] mx-auto mb-2" />
                <div className="text-2xl font-semibold text-[#1C1A17]">{agent.stats?.totalListings || 12}</div>
                <div className="text-sm text-[#7A6E60]">Listings</div>
              </div>
              <div className="lux-card p-4 text-center">
                <TrendingUp className="w-6 h-6 text-[#C9A96A] mx-auto mb-2" />
                <div className="text-2xl font-semibold text-[#1C1A17]">{agent.stats?.activeListing || 8}</div>
                <div className="text-sm text-[#7A6E60]">Active</div>
              </div>
              <div className="lux-card p-4 text-center">
                <Award className="w-6 h-6 text-[#C9A96A] mx-auto mb-2" />
                <div className="text-2xl font-semibold text-[#1C1A17]">{agent.stats?.totalSales || 45}</div>
                <div className="text-sm text-[#7A6E60]">Sales</div>
              </div>
              <div className="lux-card p-4 text-center">
                <Star className="w-6 h-6 text-[#C9A96A] mx-auto mb-2" />
                <div className="text-2xl font-semibold text-[#1C1A17]">{agent.stats?.averageRating || 4.8}</div>
                <div className="text-sm text-[#7A6E60]">Rating</div>
              </div>
            </div>

            {/* Current Listings */}
            <div className="lux-card p-6">
              <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">Current Listings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.listings?.slice(0, 6).map((listing) => (
                  <Link
                    key={listing.id}
                    href={`/properties/${listing.id}`}
                    className="group"
                  >
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={listing.images[0] || '/placeholder.jpg'}
                        alt={listing.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 bg-white rounded-full text-sm font-semibold text-[#1C1A17]">
                        ${listing.price.toLocaleString()}
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#1C1A17] mb-1 group-hover:text-[#C9A96A]">
                      {listing.title}
                    </h3>
                    <p className="text-sm text-[#7A6E60] flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listing.city}, {listing.state}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Reviews (placeholder) */}
            <div className="lux-card p-6">
              <h2 className="text-2xl font-semibold text-[#1C1A17] mb-4">Client Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-[#E8E1D7] pb-4 last:border-0">
                    <div className="flex items-center gap-2 mb-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-[#C9A96A] text-[#C9A96A]" />
                      ))}
                      <span className="text-sm text-[#7A6E60]">• 2 weeks ago</span>
                    </div>
                    <p className="text-[#5F5448] mb-2">
                      Excellent service! {fullName} helped us find our dream home. Professional, knowledgeable, and always available.
                    </p>
                    <p className="text-sm text-[#7A6E60]">- John Smith</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Specialties */}
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-4">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {(agent.specialties || ['Residential', 'Luxury Homes', 'First-Time Buyers', 'Investment Properties']).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#F6F2EC] text-[#5F5448] rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="lux-card p-6">
              <h3 className="font-semibold text-[#1C1A17] mb-4">Get in Touch</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
                <button type="submit" className="w-full lux-button">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
