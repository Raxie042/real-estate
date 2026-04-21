"use client";
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/api';
import { UserGrowthChart, RevenueChart, ListingStatusChart, PropertyCategoryChart, OffersChart } from '@/components/admin/AnalyticsCharts';
import { dashboardIcons } from '@/components/dashboard/DashboardIcons';
import SectionBoundary from '@/components/layout/SectionBoundary';

export default function DashboardPage() {
  const { user } = useAuth();

  // State for dynamic stats
  const [stats, setStats] = useState<any>({});
  const [displayStats, setDisplayStats] = useState<any>({});
  const animationRef = useRef<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const fetchStats = async () => {
      try {
        if (user.role === 'ADMIN' || user.role === 'PLATFORM_ADMIN') {
          const res = await api.analytics.getDashboard();
          setStats(res.data);
          setActivity(res.data.recentActivity || []);
        } else if (user.role === 'AGENT') {
          const [listings, offers, leads] = await Promise.all([
            api.listings.getMine(),
            api.offers.getAll(),
            api.crm.getMetrics(user.id),
          ]);
          setStats({
            active: listings.data.filter((l: any) => l.status === 'ACTIVE').length,
            pending: listings.data.filter((l: any) => l.status === 'PENDING').length,
            sold: listings.data.filter((l: any) => l.status === 'SOLD').length,
            offers: offers.data.length,
            leads: leads.data.leads || 0,
          });
          setActivity([]); // Optionally fetch agent activity
        } else {
          const [favorites, offers, messages, aiRecommendations] = await Promise.all([
            api.favorites.getAll(),
            api.offers.getAll(),
            api.chat.getRooms(),
            api.ai.getRecommendations(user.id, 6),
          ]);
          setStats({
            favorites: favorites.data.length,
            offers: offers.data.length,
            messages: messages.data.length,
          });
          setRecommendations(aiRecommendations.data?.properties || []);
          setActivity([]); // Optionally fetch buyer activity
        }
      } catch {
        setStats({});
        setActivity([]);
        setRecommendations([]);
      }
      setLoading(false);
    };
    fetchStats();
  }, [user]);

  // Animate stat count-up
  useEffect(() => {
    if (!stats || Object.keys(stats).length === 0) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    const duration = 700;
    const start = performance.now();
    const initial = { ...displayStats };
    const target = { ...stats };
    const keys = Object.keys(target);
    function animate(now: number) {
      const elapsed = Math.min(1, (now - start) / duration);
      const next: any = {};
      keys.forEach((k) => {
        const from = Number(initial[k] ?? 0);
        const to = Number(target[k] ?? 0);
        next[k] = Math.round(from + (to - from) * elapsed);
      });
      setDisplayStats(next);
      if (elapsed < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }
    animationRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line
  }, [stats]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-[#7A6E60] mb-4">Please <Link href="/login" className="text-[#C9A96A] underline">sign in</Link> to view your dashboard.</p>
      </div>
    );
  }

  if (user.role === 'ADMIN' || user.role === 'PLATFORM_ADMIN') {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#1C1A17]">Admin Dashboard</h1>
        <SectionBoundary sectionName="Dashboard overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold mb-2">Site Stats</h2>
              <ul className="space-y-2">
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.users} Users: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.users ?? '-'}</span>
                </li>
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.listings} Listings: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.listings ?? '-'}</span>
                </li>
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.offers} Offers: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.offers ?? '-'}</span>
                </li>
              </ul>
            </div>
            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
              <ul className="space-y-2">
                <li><Link href="/admin/users" className="text-[#C9A96A] hover:text-[#B78F4A]">Manage Users</Link></li>
                <li><Link href="/admin/listings" className="text-[#C9A96A] hover:text-[#B78F4A]">Manage Listings</Link></li>
                <li><Link href="/analytics" className="text-[#C9A96A] hover:text-[#B78F4A]">View Analytics</Link></li>
              </ul>
            </div>
          </div>
        </SectionBoundary>
        {/* Luxury Analytics Section */}
        <SectionBoundary sectionName="Dashboard analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <UserGrowthChart />
            <RevenueChart />
            <ListingStatusChart />
            <PropertyCategoryChart />
            <OffersChart />
          </div>
        </SectionBoundary>
        <SectionBoundary sectionName="Recent activity">
          <div className="lux-card p-6 mt-8">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <ul className="space-y-2">
              {activity.length > 0 ? activity.map((a, i) => (
                <li key={i}>{a}</li>
              )) : <li>No recent activity</li>}
            </ul>
          </div>
        </SectionBoundary>
      </div>
    );
  }

  if (user.role === 'AGENT') {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-[#1C1A17]">Agent Dashboard</h1>
        <SectionBoundary sectionName="Agent overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold mb-2">My Listings</h2>
              <ul className="space-y-2">
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.active} Active: <span className="font-bold ml-1 group-hover:text-[#27ae60] transition">{displayStats.active ?? '-'}</span>
                </li>
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.pending} Pending: <span className="font-bold ml-1 group-hover:text-[#f39c12] transition">{displayStats.pending ?? '-'}</span>
                </li>
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.sold} Sold: <span className="font-bold ml-1 group-hover:text-[#B78F4A] transition">{displayStats.sold ?? '-'}</span>
                </li>
              </ul>
              <Link href="/list-property" className="lux-button mt-4">Add New Listing</Link>
            </div>
            <div className="lux-card p-6">
              <h2 className="text-xl font-semibold mb-2">Leads & Offers</h2>
              <ul className="space-y-2">
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.leads} New Leads: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.leads ?? '-'}</span>
                </li>
                <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                  {dashboardIcons.offers} Offers Received: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.offers ?? '-'}</span>
                </li>
              </ul>
              <Link href="/offers" className="lux-button mt-4">View Offers</Link>
            </div>
          </div>
        </SectionBoundary>
        {/* Luxury Analytics Section for Agent */}
        <SectionBoundary sectionName="Agent analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ListingStatusChart />
            <OffersChart />
          </div>
        </SectionBoundary>
        <SectionBoundary sectionName="Recent activity">
          <div className="lux-card p-6 mt-8">
            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
            <ul className="space-y-2">
              {activity.length > 0 ? activity.map((a, i) => (
                <li key={i}>{a}</li>
              )) : <li>No recent activity</li>}
            </ul>
          </div>
        </SectionBoundary>
      </div>
    );
  }

  // Buyer or default
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#1C1A17]">My Dashboard</h1>
      <SectionBoundary sectionName="Dashboard overview">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold mb-2">Saved Properties</h2>
            <ul className="space-y-2">
              <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                {dashboardIcons.favorites} Favorites: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.favorites ?? '-'}</span>
              </li>
              <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                {dashboardIcons.listings} Recently Viewed: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">-</span>
              </li>
            </ul>
            <Link href="/favorites" className="lux-button mt-4">View Favorites</Link>
          </div>
          <div className="lux-card p-6">
            <h2 className="text-xl font-semibold mb-2">Offers & Messages</h2>
            <ul className="space-y-2">
              <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                {dashboardIcons.offers} Offers Made: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.offers ?? '-'}</span>
              </li>
              <li className="flex items-center group transition-transform hover:scale-105 animate-fade-in">
                {dashboardIcons.messages} Messages: <span className="font-bold ml-1 group-hover:text-[#C9A96A] transition">{displayStats.messages ?? '-'}</span>
              </li>
            </ul>
            <Link href="/offers" className="lux-button mt-4">View Offers</Link>
          </div>
        </div>
      </SectionBoundary>
      {/* Luxury Analytics Section for Buyer */}
      <SectionBoundary sectionName="Dashboard analytics">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <OffersChart />
        </div>
      </SectionBoundary>
      <SectionBoundary sectionName="AI recommendations">
        <div className="lux-card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">AI Recommendations For You</h2>
          {recommendations.length === 0 ? (
            <p className="text-[#7A6E60]">No recommendations yet. Save searches and favorite listings to improve suggestions.</p>
          ) : (
            <div className="space-y-3">
              {recommendations.slice(0, 6).map((listing: any) => (
                <Link
                  key={listing.id}
                  href={`/properties/${listing.id}`}
                  className="block p-4 rounded-lg border border-[#E8E1D7] hover:border-[#C9A96A] transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-[#1C1A17]">{listing.title}</div>
                      <div className="text-sm text-[#7A6E60]">{[listing.city, listing.state].filter(Boolean).join(', ')}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#1C1A17]">${Number(listing.price || 0).toLocaleString()}</div>
                      {typeof listing.score === 'number' && (
                        <div className="text-xs text-[#7A6E60]">Match score: {listing.score}</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SectionBoundary>
      <SectionBoundary sectionName="Recent activity">
        <div className="lux-card p-6 mt-8">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <ul className="space-y-2">
            {activity.length > 0 ? activity.map((a, i) => (
              <li key={i} className="animate-fade-in delay-[.1s]">{a}</li>
            )) : <li className="animate-fade-in">No recent activity</li>}
          </ul>
        </div>
      </SectionBoundary>
    </div>
  );
}
