'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import api from '@/lib/api';
import { useToast } from '@/lib/toast';

type InvitationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface InvitationApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  market?: string;
  portfolioSize?: string;
  message?: string;
  status: InvitationStatus;
  adminNotes?: string;
  createdAt: string;
  reviewedAt?: string;
  lastEmailSentAt?: string;
  lastEmailType?: string;
  reviewedBy?: {
    firstName?: string;
    lastName?: string;
    email: string;
  };
}

const statusOptions: Array<'ALL' | InvitationStatus> = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

const getEmailTypeBadgeClass = (emailType?: string) => {
  if (emailType === 'DECISION_APPROVED') {
    return 'bg-green-100 text-green-700';
  }

  if (emailType === 'DECISION_REJECTED') {
    return 'bg-red-100 text-red-700';
  }

  if (emailType === 'APPLICATION_RECEIVED') {
    return 'bg-yellow-100 text-yellow-700';
  }

  return 'bg-gray-100 text-gray-700';
};

const getEmailTypeLabel = (emailType?: string) => {
  if (emailType === 'APPLICATION_RECEIVED') {
    return 'Application Received';
  }

  if (emailType === 'DECISION_APPROVED') {
    return 'Decision Approved';
  }

  if (emailType === 'DECISION_REJECTED') {
    return 'Decision Rejected';
  }

  return 'None';
};

export default function AdminInvitationsPage() {
  const [statusFilter, setStatusFilter] = useState<'ALL' | InvitationStatus>('PENDING');
  const [notes, setNotes] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['adminInvitationApplications', statusFilter],
    queryFn: async () => {
      const response = await api.invitations.getAll(
        statusFilter === 'ALL' ? undefined : { status: statusFilter, limit: 100 },
      );
      return response.data;
    },
  });

  const applications: InvitationApplication[] = useMemo(() => data?.data || [], [data]);

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: InvitationStatus }) => {
      return api.invitations.updateStatus(id, {
        status,
        adminNotes: notes[id]?.trim() || undefined,
      });
    },
    onSuccess: (_, variables) => {
      success(`Application ${variables.status.toLowerCase()}.`);
      queryClient.invalidateQueries({ queryKey: ['adminInvitationApplications'] });
    },
    onError: () => {
      error('Unable to update application status.');
    },
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Invitation Applications</h1>
          <p className="text-[#7A6E60]">Review and approve private access requests.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg border transition ${
                statusFilter === status
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-white text-[#1C1A17] border-[#E8E1D7]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="lux-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F6F2EC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Applicant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Details</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Message</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="px-4 py-6 text-[#7A6E60]" colSpan={5}>
                    Loading applications...
                  </td>
                </tr>
              )}

              {!isLoading && applications.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-[#7A6E60]" colSpan={5}>
                    No applications found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                applications.map((item) => (
                  <tr key={item.id} className="border-t border-[#E8E1D7] align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#1C1A17]">
                        {item.firstName} {item.lastName}
                      </p>
                      <p className="text-sm text-[#7A6E60]">{item.email}</p>
                      {item.phone && <p className="text-sm text-[#7A6E60]">{item.phone}</p>}
                      <p className="text-xs text-[#7A6E60] mt-1">
                        {format(new Date(item.createdAt), 'PPP p')}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#5F5448]">
                      <p>{item.company || '—'}</p>
                      <p>{item.market || '—'}</p>
                      <p>{item.portfolioSize || '—'}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#5F5448] max-w-[320px]">
                      {item.message || '—'}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded ${
                          item.status === 'APPROVED'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'REJECTED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                      {item.reviewedBy?.email && (
                        <p className="text-xs text-[#7A6E60] mt-2">By {item.reviewedBy.email}</p>
                      )}
                      <div className="text-xs text-[#7A6E60] mt-2 flex items-center gap-2">
                        <span>Last email:</span>
                        <span
                          className={`inline-flex px-2 py-0.5 rounded ${getEmailTypeBadgeClass(item.lastEmailType)}`}
                        >
                          {getEmailTypeLabel(item.lastEmailType)}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6E60]">
                        Sent at:{' '}
                        {item.lastEmailSentAt ? format(new Date(item.lastEmailSentAt), 'PPP p') : '—'}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <textarea
                        value={notes[item.id] || item.adminNotes || ''}
                        onChange={(e) =>
                          setNotes((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder="Admin notes"
                        className="lux-input mb-2 min-h-[80px] text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: item.id, status: 'APPROVED' })}
                          disabled={updateStatusMutation.isPending}
                          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatusMutation.mutate({ id: item.id, status: 'REJECTED' })}
                          disabled={updateStatusMutation.isPending}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
