'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Search,
  Filter,
  Plus,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Home,
  Star,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/lib/toast';
import api from '@/lib/api';

interface Lead {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  propertyInterest: string;
  budget: number;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'NEGOTIATING' | 'LOST';
  source: 'WEBSITE' | 'INQUIRY' | 'SEARCH' | 'OPEN_HOUSE' | 'REFERRAL';
  notes: string;
  createdAt: string;
  lastContactDate?: string;
  assignedTo?: string;
}

export default function LeadManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Lead['status'] | 'ALL'>('ALL');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [newLead, setNewLead] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyInterest: '',
    budget: 0,
    source: 'WEBSITE' as Lead['source'],
  });

  const queryClient = useQueryClient();
  const { success, error } = useToast();

  // Fetch leads
  const { data: leads = [] } = useQuery<Lead[]>({
    queryKey: ['leads'],
    queryFn: async () => {
      return []; // Placeholder - implement in backend
    },
  });

  // Add lead mutation
  const addLeadMutation = useMutation({
    mutationFn: async (data: typeof newLead) => {
      return Promise.resolve({ data: { ...data, id: Date.now().toString(), status: 'NEW', createdAt: new Date().toISOString() } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      success('Lead added successfully');
      setNewLead({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        propertyInterest: '',
        budget: 0,
        source: 'WEBSITE' as Lead['source'],
      });
      setIsAddingLead(false);
    },
    onError: () => {
      error('Failed to add lead');
    },
  });

  // Update lead status mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ leadId, status }: { leadId: string; status: Lead['status'] }) => {
      return Promise.resolve({ data: { success: true } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      success('Lead updated');
    },
  });

  // Delete lead mutation
  const deleteLeadMutation = useMutation({
    mutationFn: async (leadId: string) => {
      return Promise.resolve({ data: { success: true } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      success('Lead deleted');
      setSelectedLead(null);
    },
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName} ${lead.email}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || lead.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    NEW: 'bg-blue-100 text-blue-700',
    CONTACTED: 'bg-yellow-100 text-yellow-700',
    QUALIFIED: 'bg-purple-100 text-purple-700',
    NEGOTIATING: 'bg-orange-100 text-orange-700',
    LOST: 'bg-red-100 text-red-700',
  };

  const sourceLabels = {
    WEBSITE: 'Website',
    INQUIRY: 'Inquiry Form',
    SEARCH: 'Search',
    OPEN_HOUSE: 'Open House',
    REFERRAL: 'Referral',
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Lead Management</h1>
            <p className="text-[#7A6E60]">Track and manage your sales leads</p>
          </div>
          <button
            onClick={() => setIsAddingLead(true)}
            className="flex items-center gap-2 bg-[#C9A96A] text-white px-6 py-3 rounded-lg hover:bg-[#B78F4A] transition"
          >
            <Plus className="w-5 h-5" />
            Add Lead
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A6E60]" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Lead['status'] | 'ALL')}
            className="px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="LOST">Lost</option>
          </select>
        </div>

        {/* Leads Table */}
        <div className="lux-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F6F2EC]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Lead</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Interest</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Budget</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Source</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[#1C1A17]">Created</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-[#1C1A17]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1D7]">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#F6F2EC] transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#C9A96A] rounded-full flex items-center justify-center text-white font-semibold">
                          {lead.firstName?.[0]}{lead.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-medium text-[#1C1A17]">
                            {lead.firstName} {lead.lastName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-sm text-[#5F5448] flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </p>
                        <p className="text-sm text-[#7A6E60] flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#5F5448]">
                      <span className="flex items-center gap-1">
                        <Home className="w-4 h-4" />
                        {lead.propertyInterest || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-[#C9A96A] font-medium">
                        <DollarSign className="w-4 h-4" />
                        {lead.budget ? `$${(lead.budget / 1000).toFixed(0)}K` : 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadMutation.mutate({
                            leadId: lead.id,
                            status: e.target.value as Lead['status'],
                          })
                        }
                        className={`px-3 py-1 rounded text-sm font-medium border-0 ${statusColors[lead.status]}`}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="QUALIFIED">Qualified</option>
                        <option value="NEGOTIATING">Negotiating</option>
                        <option value="LOST">Lost</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-[#7A6E60] text-sm">
                      {sourceLabels[lead.source]}
                    </td>
                    <td className="px-6 py-4 text-[#7A6E60] text-sm">
                      {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 hover:bg-[#E8E1D7] rounded-lg transition"
                      >
                        <Edit className="w-5 h-5 text-[#7A6E60]" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#7A6E60]">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddingLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">Add New Lead</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newLead.firstName}
                  onChange={(e) => setNewLead({ ...newLead, firstName: e.target.value })}
                  className="px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newLead.lastName}
                  onChange={(e) => setNewLead({ ...newLead, lastName: e.target.value })}
                  className="px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={newLead.email}
                onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newLead.phone}
                onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Property Interest"
                value={newLead.propertyInterest}
                onChange={(e) => setNewLead({ ...newLead, propertyInterest: e.target.value })}
                className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Budget"
                value={newLead.budget}
                onChange={(e) => setNewLead({ ...newLead, budget: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              />
              <select
                value={newLead.source}
                onChange={(e) => setNewLead({ ...newLead, source: e.target.value as Lead['source'] })}
                className="w-full px-4 py-2 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              >
                <option value="WEBSITE">Website</option>
                <option value="INQUIRY">Inquiry Form</option>
                <option value="SEARCH">Search</option>
                <option value="OPEN_HOUSE">Open House</option>
                <option value="REFERRAL">Referral</option>
              </select>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => addLeadMutation.mutate(newLead)}
                  className="flex-1 bg-[#C9A96A] text-white py-2 rounded-lg hover:bg-[#B78F4A] transition"
                >
                  Add Lead
                </button>
                <button
                  onClick={() => setIsAddingLead(false)}
                  className="flex-1 border border-[#E8E1D7] text-[#1C1A17] py-2 rounded-lg hover:bg-[#F6F2EC] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#1C1A17]">
                  {selectedLead.firstName} {selectedLead.lastName}
                </h2>
                <p className="text-[#7A6E60]">{selectedLead.email}</p>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-medium ${statusColors[selectedLead.status]}`}>
                {selectedLead.status}
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-[#5F5448]">
                <Phone className="w-5 h-5 text-[#C9A96A]" />
                <a href={`tel:${selectedLead.phone}`}>{selectedLead.phone}</a>
              </div>
              <div className="flex items-center gap-3 text-[#5F5448]">
                <Home className="w-5 h-5 text-[#C9A96A]" />
                <span>{selectedLead.propertyInterest}</span>
              </div>
              <div className="flex items-center gap-3 text-[#5F5448]">
                <DollarSign className="w-5 h-5 text-[#C9A96A]" />
                <span>${selectedLead.budget.toLocaleString()} budget</span>
              </div>
              <div className="flex items-center gap-3 text-[#5F5448]">
                <Clock className="w-5 h-5 text-[#C9A96A]" />
                <span>Added {format(new Date(selectedLead.createdAt), 'MMM d, yyyy')}</span>
              </div>
            </div>

            {selectedLead.notes && (
              <div className="mb-6 p-4 bg-[#F6F2EC] rounded-lg">
                <p className="text-sm text-[#7A6E60]">{selectedLead.notes}</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  deleteLeadMutation.mutate(selectedLead.id);
                }}
                className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
              <button
                onClick={() => setSelectedLead(null)}
                className="flex-1 bg-[#C9A96A] text-white py-2 rounded-lg hover:bg-[#B78F4A] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
