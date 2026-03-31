'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Clock, MapPin, Users, Plus, Edit, Trash, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/lib/api';
import { useToast } from '@/lib/toast';

interface OpenHouse {
  id: string;
  listingId: string;
  startTime: string;
  endTime: string;
  maxAttendees?: number;
  listing: {
    id: string;
    title: string;
    addressLine1: string;
    city: string;
    state: string;
  };
  _count?: {
    rsvps: number;
  };
}

interface OpenHouseFormData {
  listingId: string;
  startTime: string;
  endTime: string;
  maxAttendees?: number;
}

export default function OpenHousesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<OpenHouseFormData>({
    listingId: '',
    startTime: '',
    endTime: '',
    maxAttendees: undefined,
  });

  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  // Fetch open houses
  const { data: openHouses = [], isLoading } = useQuery<OpenHouse[]>({
    queryKey: ['openHouses'],
    queryFn: async () => {
      const response = await api.openHouses.getMine();
      return response.data;
    },
  });

  // Fetch user's listings for the form
  const { data: listings = [] } = useQuery({
    queryKey: ['myListings'],
    queryFn: async () => {
      const response = await api.listings.getMine();
      return response.data;
    },
  });

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: OpenHouseFormData) => {
      if (editingId) {
        return api.openHouses.update(editingId, data);
      }
      return api.openHouses.create(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openHouses'] });
      success(editingId ? 'Open house updated!' : 'Open house created!');
      resetForm();
    },
    onError: () => {
      showError('Failed to save open house');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.openHouses.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openHouses'] });
      success('Open house deleted');
    },
    onError: () => {
      showError('Failed to delete open house');
    },
  });

  const resetForm = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      listingId: '',
      startTime: '',
      endTime: '',
      maxAttendees: undefined,
    });
  };

  const handleEdit = (openHouse: OpenHouse) => {
    setEditingId(openHouse.id);
    setFormData({
      listingId: openHouse.listingId,
      startTime: new Date(openHouse.startTime).toISOString().slice(0, 16),
      endTime: new Date(openHouse.endTime).toISOString().slice(0, 16),
      maxAttendees: openHouse.maxAttendees || undefined,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  // Categorize open houses
  const now = new Date();
  const upcoming = openHouses.filter((oh) => new Date(oh.startTime) > now);
  const past = openHouses.filter((oh) => new Date(oh.endTime) < now);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Open Houses</h1>
            <p className="text-[#7A6E60]">Manage your property showings and RSVPs</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="lux-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Schedule Open House
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="text-sm font-medium text-[#7A6E60]">Upcoming</h3>
            </div>
            <p className="text-3xl font-semibold text-[#1C1A17]">{upcoming.length}</p>
          </div>
          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="text-sm font-medium text-[#7A6E60]">Total RSVPs</h3>
            </div>
            <p className="text-3xl font-semibold text-[#1C1A17]">
              {upcoming.reduce((sum, oh) => sum + (oh._count?.rsvps || 0), 0)}
            </p>
          </div>
          <div className="lux-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-[#C9A96A]" />
              <h3 className="text-sm font-medium text-[#7A6E60]">Completed</h3>
            </div>
            <p className="text-3xl font-semibold text-[#1C1A17]">{past.length}</p>
          </div>
        </div>

        {/* Upcoming Open Houses */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">
            Upcoming Open Houses ({upcoming.length})
          </h2>
          {upcoming.length === 0 ? (
            <div className="lux-card p-12 text-center">
              <Calendar className="w-12 h-12 text-[#C9A96A] mx-auto mb-4" />
              <p className="text-[#7A6E60]">No upcoming open houses scheduled</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((openHouse) => (
                <div key={openHouse.id} className="lux-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-[#1C1A17] mb-1">
                        {openHouse.listing.title}
                      </h3>
                      <p className="text-sm text-[#7A6E60] flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {openHouse.listing.addressLine1}, {openHouse.listing.city},{' '}
                        {openHouse.listing.state}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(openHouse)}
                        className="p-2 hover:bg-[#F6F2EC] rounded-lg transition"
                      >
                        <Edit className="w-4 h-4 text-[#7A6E60]" />
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(openHouse.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#5F5448]">
                      <Calendar className="w-4 h-4 text-[#C9A96A]" />
                      <span>{format(new Date(openHouse.startTime), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5F5448]">
                      <Clock className="w-4 h-4 text-[#C9A96A]" />
                      <span>
                        {format(new Date(openHouse.startTime), 'h:mm a')} -{' '}
                        {format(new Date(openHouse.endTime), 'h:mm a')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#5F5448]">
                      <Users className="w-4 h-4 text-[#C9A96A]" />
                      <span>
                        {openHouse._count?.rsvps || 0} RSVP
                        {openHouse.maxAttendees && ` / ${openHouse.maxAttendees} max`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Open Houses */}
        {past.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">
              Past Open Houses ({past.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {past.map((openHouse) => (
                <div key={openHouse.id} className="lux-card p-6 opacity-75">
                  <h3 className="font-semibold text-[#1C1A17] mb-1">
                    {openHouse.listing.title}
                  </h3>
                  <p className="text-sm text-[#7A6E60] mb-3">
                    {format(new Date(openHouse.startTime), 'MMM d, yyyy • h:mm a')}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-[#5F5448]">
                    <Users className="w-4 h-4" />
                    <span>{openHouse._count?.rsvps || 0} attendees</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">
              {editingId ? 'Edit Open House' : 'Schedule Open House'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                  Property
                </label>
                <select
                  value={formData.listingId}
                  onChange={(e) => setFormData({ ...formData, listingId: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                  required
                >
                  <option value="">Select a property</option>
                  {listings.map((listing: any) => (
                    <option key={listing.id} value={listing.id}>
                      {listing.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                  Max Attendees (Optional)
                </label>
                <input
                  type="number"
                  value={formData.maxAttendees || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxAttendees: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  className="w-full px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
                  min="1"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-1 lux-button disabled:opacity-50"
                >
                  {saveMutation.isPending ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
