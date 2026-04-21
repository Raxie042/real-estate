'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

type Agency = {
  id: string;
  name: string;
};

export default function EnterpriseAdminPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedAgencyId, setSelectedAgencyId] = useState('');
  const [assignForm, setAssignForm] = useState({ listingId: '', agentId: '' });
  const [whiteLabel, setWhiteLabel] = useState({
    brandName: '',
    logoUrl: '',
    primaryColor: '#C9A96A',
    accentColor: '#1C1A17',
    supportEmail: '',
    customDomain: '',
  });

  const { data: agencies = [] } = useQuery<Agency[]>({
    queryKey: ['enterprise-agencies'],
    queryFn: async () => {
      const response = await api.agencies.getAll();
      return response.data || [];
    },
  });

  const effectiveAgencyId = selectedAgencyId || agencies[0]?.id || '';

  const { data: performance } = useQuery({
    queryKey: ['enterprise-performance'],
    queryFn: async () => {
      const response = await api.analytics.getPerformance();
      return response.data;
    },
  });

  const { data: crmDashboard } = useQuery({
    queryKey: ['enterprise-crm-dashboard', user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const response = await api.crm.getDashboard();
      return response.data;
    },
  });

  const { data: teamOverview } = useQuery({
    queryKey: ['enterprise-team-overview', effectiveAgencyId],
    enabled: !!effectiveAgencyId,
    queryFn: async () => {
      const response = await api.agencies.getTeamOverview(effectiveAgencyId);
      return response.data;
    },
  });

  const { data: agentMetrics = [] } = useQuery<any[]>({
    queryKey: ['enterprise-agent-metrics', effectiveAgencyId],
    enabled: !!effectiveAgencyId,
    queryFn: async () => {
      const response = await api.agencies.getAgentMetrics(effectiveAgencyId);
      return response.data || [];
    },
  });

  const { data: whiteLabelConfig } = useQuery({
    queryKey: ['enterprise-white-label-admin'],
    queryFn: async () => {
      const response = await api.whiteLabel.getAdmin();
      return response.data;
    },
  });

  useEffect(() => {
    if (!whiteLabelConfig) return;
    setWhiteLabel({
      brandName: whiteLabelConfig.brandName || '',
      logoUrl: whiteLabelConfig.logoUrl || '',
      primaryColor: whiteLabelConfig.primaryColor || '#C9A96A',
      accentColor: whiteLabelConfig.accentColor || '#1C1A17',
      supportEmail: whiteLabelConfig.supportEmail || '',
      customDomain: whiteLabelConfig.customDomain || '',
    });
  }, [whiteLabelConfig]);

  const saveWhiteLabel = useMutation({
    mutationFn: async () => api.whiteLabel.updateAdmin(whiteLabel),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enterprise-white-label-admin'] });
      queryClient.invalidateQueries({ queryKey: ['enterprise-performance'] });
    },
  });

  const assignListing = useMutation({
    mutationFn: async () => api.agencies.assignListing(effectiveAgencyId, assignForm),
    onSuccess: () => {
      setAssignForm({ listingId: '', agentId: '' });
      queryClient.invalidateQueries({ queryKey: ['enterprise-team-overview', effectiveAgencyId] });
      queryClient.invalidateQueries({ queryKey: ['enterprise-agent-metrics', effectiveAgencyId] });
    },
  });

  const selectedAgencyName = useMemo(
    () => agencies.find((agency) => agency.id === effectiveAgencyId)?.name || 'Agency',
    [agencies, effectiveAgencyId],
  );

  const activeListings = teamOverview?.summary?.activeListings ?? 0;
  const offers = teamOverview?.summary?.offers ?? 0;
  const openTasks = teamOverview?.summary?.openTasks ?? 0;

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#1C1A17]">Phase 4 Enterprise Console</h1>
            <p className="text-[#7A6E60] mt-1">
              Advanced CRM dashboard, multi-agent management, platform performance, and white-label support.
            </p>
          </div>
          <Link href="/admin" className="lux-button-outline">
            Back to Admin
          </Link>
        </div>

        <section className="lux-card p-6">
          <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Performance Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MetricCard label="Total Users" value={performance?.overview?.totalUsers ?? 0} />
            <MetricCard label="Active Listings" value={performance?.overview?.activeListings ?? 0} />
            <MetricCard
              label="Offer Conversion"
              value={`${Number(performance?.overview?.offerConversionRate ?? 0).toFixed(2)}%`}
            />
          </div>
          <div className="mt-5">
            <h3 className="font-medium text-[#2B2620] mb-2">Traffic (Last 30 Days)</h3>
            <div className="max-h-48 overflow-auto rounded-lg border border-[#E8E1D7]">
              <table className="w-full text-sm">
                <thead className="bg-[#F6F2EC] sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2">Date</th>
                    <th className="text-right px-3 py-2">Views</th>
                  </tr>
                </thead>
                <tbody>
                  {(performance?.traffic?.series || []).map((item: any) => (
                    <tr key={item.date} className="border-t border-[#EEE7DC]">
                      <td className="px-3 py-2">{item.date}</td>
                      <td className="px-3 py-2 text-right">{item.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="lux-card p-6">
          <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Advanced CRM Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard label="Total Offers" value={crmDashboard?.totalOffers ?? 0} />
            <MetricCard label="Accepted Offers" value={crmDashboard?.acceptedOffers ?? 0} />
            <MetricCard label="Open Tasks" value={crmDashboard?.taskPipeline?.byStatus?.find((s: any) => s.status === 'PENDING')?.count ?? 0} />
            <MetricCard label="SLA Overdue" value={crmDashboard?.sla?.overdueCount ?? 0} />
          </div>
          <div className="mt-4 text-sm text-[#5F5448]">
            Task completion rate: {Number(crmDashboard?.performance?.completionRate ?? 0).toFixed(2)}%
          </div>
        </section>

        <section className="lux-card p-6">
          <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">Multi-Agent Management</h2>
          <div className="mb-4">
            <label className="block text-sm text-[#5F5448] mb-1">Agency</label>
            <select
              className="lux-input max-w-sm"
              value={effectiveAgencyId}
              onChange={(event) => setSelectedAgencyId(event.target.value)}
            >
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            <MetricCard label="Agency" value={selectedAgencyName} />
            <MetricCard label="Active Listings" value={activeListings} />
            <MetricCard label="Open Tasks" value={openTasks} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-[#2B2620] mb-2">Agent Metrics</h3>
              <div className="rounded-lg border border-[#E8E1D7] overflow-auto max-h-72">
                <table className="w-full text-sm">
                  <thead className="bg-[#F6F2EC] sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2">Agent</th>
                      <th className="text-right px-3 py-2">Listings</th>
                      <th className="text-right px-3 py-2">Accepted</th>
                      <th className="text-right px-3 py-2">Open Tasks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentMetrics.map((agent) => (
                      <tr key={agent.id} className="border-t border-[#EEE7DC]">
                        <td className="px-3 py-2">{agent.firstName} {agent.lastName}</td>
                        <td className="px-3 py-2 text-right">{agent.metrics?.listings ?? 0}</td>
                        <td className="px-3 py-2 text-right">{agent.metrics?.acceptedOffers ?? 0}</td>
                        <td className="px-3 py-2 text-right">{agent.metrics?.openTasks ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-[#2B2620] mb-2">Assign Listing To Agent</h3>
              <div className="space-y-3">
                <input
                  className="lux-input"
                  placeholder="Listing ID"
                  value={assignForm.listingId}
                  onChange={(event) =>
                    setAssignForm((prev) => ({ ...prev, listingId: event.target.value }))
                  }
                />
                <select
                  className="lux-input"
                  value={assignForm.agentId}
                  onChange={(event) =>
                    setAssignForm((prev) => ({ ...prev, agentId: event.target.value }))
                  }
                >
                  <option value="">Select agent</option>
                  {agentMetrics.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.firstName} {agent.lastName}
                    </option>
                  ))}
                </select>
                <button
                  className="lux-button"
                  onClick={() => assignListing.mutate()}
                  disabled={!assignForm.listingId || !assignForm.agentId || assignListing.isPending}
                >
                  {assignListing.isPending ? 'Assigning...' : 'Assign Listing'}
                </button>
                {assignListing.isError ? (
                  <p className="text-sm text-red-600">Assignment failed. Check IDs and try again.</p>
                ) : null}
                {assignListing.isSuccess ? (
                  <p className="text-sm text-green-700">Listing assigned successfully.</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="lux-card p-6">
          <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">White-Label Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="lux-input"
              placeholder="Brand name"
              value={whiteLabel.brandName}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, brandName: event.target.value }))}
            />
            <input
              className="lux-input"
              placeholder="Logo URL"
              value={whiteLabel.logoUrl}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, logoUrl: event.target.value }))}
            />
            <input
              className="lux-input"
              placeholder="Primary color (#hex)"
              value={whiteLabel.primaryColor}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, primaryColor: event.target.value }))}
            />
            <input
              className="lux-input"
              placeholder="Accent color (#hex)"
              value={whiteLabel.accentColor}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, accentColor: event.target.value }))}
            />
            <input
              className="lux-input"
              placeholder="Support email"
              value={whiteLabel.supportEmail}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, supportEmail: event.target.value }))}
            />
            <input
              className="lux-input"
              placeholder="Custom domain"
              value={whiteLabel.customDomain}
              onChange={(event) => setWhiteLabel((prev) => ({ ...prev, customDomain: event.target.value }))}
            />
          </div>
          <div className="mt-4">
            <button className="lux-button" onClick={() => saveWhiteLabel.mutate()} disabled={saveWhiteLabel.isPending}>
              {saveWhiteLabel.isPending ? 'Saving...' : 'Save White-Label Configuration'}
            </button>
            {saveWhiteLabel.isSuccess ? <p className="text-sm text-green-700 mt-2">Saved successfully.</p> : null}
            {saveWhiteLabel.isError ? <p className="text-sm text-red-600 mt-2">Failed to save settings.</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[#E8E1D7] bg-white p-4">
      <p className="text-sm text-[#7A6E60]">{label}</p>
      <p className="text-2xl font-semibold text-[#1C1A17] mt-1">{value}</p>
    </div>
  );
}
