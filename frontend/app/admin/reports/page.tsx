'use client';

import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import api from '@/lib/api';
import { useToast } from '@/lib/toast';

type ReportStatus = 'PENDING' | 'REVIEWING' | 'RESOLVED' | 'REJECTED';

interface ListingReportItem {
  id: string;
  listingId: string;
  reporterId: string;
  reason: string;
  details?: string;
  status: ReportStatus;
  reviewedById?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
  listing?: {
    id: string;
    title: string;
    slug: string;
    status: string;
    isVerified: boolean;
    city?: string;
    country?: string;
    userId: string;
  };
}

const statusOptions: ReportStatus[] = ['PENDING', 'REVIEWING', 'RESOLVED', 'REJECTED'];

export default function AdminReportsPage() {
  const [status, setStatus] = useState<ReportStatus>('PENDING');
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [verifyListing, setVerifyListing] = useState<Record<string, boolean>>({});
  const [suspendListing, setSuspendListing] = useState<Record<string, boolean>>({});
  const queryClient = useQueryClient();
  const { success, error } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['adminListingReports', status],
    queryFn: async () => {
      const response = await api.listings.getReportsQueue({ status, page: 1, limit: 100 });
      return response.data;
    },
  });

  const reports: ListingReportItem[] = useMemo(() => data?.data || [], [data]);

  const reviewMutation = useMutation({
    mutationFn: async ({ id, decision }: { id: string; decision: 'RESOLVED' | 'REJECTED' }) => {
      return api.listings.reviewReport(id, {
        decision,
        notes: reviewNotes[id]?.trim() || undefined,
        markListingVerified: !!verifyListing[id],
        suspendListing: !!suspendListing[id],
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminListingReports'] });
      success(`Report ${variables.decision.toLowerCase()}.`);
    },
    onError: () => {
      error('Unable to review report.');
    },
  });

  const verificationMutation = useMutation({
    mutationFn: async ({ listingId, isVerified }: { listingId: string; isVerified: boolean }) => {
      return api.listings.setVerification(listingId, isVerified);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['adminListingReports'] });
      success(isVerifiedMessage(variables.isVerified));
    },
    onError: () => {
      error('Unable to update listing verification.');
    },
  });

  return (
    <div className="min-h-screen bg-[#F6F2EC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Listing Reports</h1>
          <p className="text-[#7A6E60]">Review reported listings and apply trust decisions.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => setStatus(option)}
              className={`px-4 py-2 rounded-lg border transition ${
                status === option
                  ? 'bg-[#1C1A17] text-white border-[#1C1A17]'
                  : 'bg-white text-[#1C1A17] border-[#E8E1D7]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="lux-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F6F2EC]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Listing</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Report</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[#1C1A17]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="px-4 py-6 text-[#7A6E60]" colSpan={4}>
                    Loading reports...
                  </td>
                </tr>
              )}

              {!isLoading && reports.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-[#7A6E60]" colSpan={4}>
                    No reports found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                reports.map((item) => (
                  <tr key={item.id} className="border-t border-[#E8E1D7] align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#1C1A17]">{item.listing?.title || item.listingId}</p>
                      <p className="text-sm text-[#7A6E60]">
                        {item.listing?.city || '—'}{item.listing?.country ? `, ${item.listing.country}` : ''}
                      </p>
                      <p className="text-xs text-[#7A6E60] mt-1">Listing ID: {item.listingId}</p>
                      <p className="text-xs mt-1">
                        <span
                          className={`inline-flex px-2 py-1 rounded ${
                            item.listing?.isVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {item.listing?.isVerified ? 'Verified' : 'Unverified'}
                        </span>
                      </p>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#5F5448] max-w-[320px]">
                      <p className="font-medium text-[#1C1A17] mb-1">{item.reason}</p>
                      <p>{item.details || '—'}</p>
                      <p className="text-xs text-[#7A6E60] mt-2">Reporter: {item.reporterId}</p>
                      <p className="text-xs text-[#7A6E60]">{format(new Date(item.createdAt), 'PPP p')}</p>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span
                        className={`inline-flex px-2 py-1 rounded ${statusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                      {item.reviewedAt && (
                        <p className="text-xs text-[#7A6E60] mt-2">Reviewed: {format(new Date(item.reviewedAt), 'PPP p')}</p>
                      )}
                      {item.reviewNotes && (
                        <p className="text-xs text-[#7A6E60] mt-1">Notes: {item.reviewNotes}</p>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <textarea
                        value={reviewNotes[item.id] || item.reviewNotes || ''}
                        onChange={(e) =>
                          setReviewNotes((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder="Review notes"
                        className="lux-input mb-2 min-h-[80px] text-sm"
                      />

                      <label className="flex items-center gap-2 text-sm text-[#5F5448] mb-2">
                        <input
                          type="checkbox"
                          checked={!!verifyListing[item.id]}
                          onChange={(e) =>
                            setVerifyListing((prev) => ({
                              ...prev,
                              [item.id]: e.target.checked,
                            }))
                          }
                        />
                        Mark listing verified
                      </label>

                      <label className="flex items-center gap-2 text-sm text-[#5F5448] mb-3">
                        <input
                          type="checkbox"
                          checked={!!suspendListing[item.id]}
                          onChange={(e) =>
                            setSuspendListing((prev) => ({
                              ...prev,
                              [item.id]: e.target.checked,
                            }))
                          }
                        />
                        Suspend listing on resolve
                      </label>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => reviewMutation.mutate({ id: item.id, decision: 'RESOLVED' })}
                          disabled={reviewMutation.isPending}
                          className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          Resolve
                        </button>
                        <button
                          onClick={() => reviewMutation.mutate({ id: item.id, decision: 'REJECTED' })}
                          disabled={reviewMutation.isPending}
                          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() =>
                            verificationMutation.mutate({
                              listingId: item.listingId,
                              isVerified: !item.listing?.isVerified,
                            })
                          }
                          disabled={verificationMutation.isPending}
                          className="px-3 py-2 bg-[#1C1A17] text-white rounded hover:bg-black disabled:opacity-50"
                        >
                          {item.listing?.isVerified ? 'Unverify' : 'Verify'}
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

function statusClass(status: ReportStatus) {
  if (status === 'RESOLVED') {
    return 'bg-green-100 text-green-700';
  }

  if (status === 'REJECTED') {
    return 'bg-red-100 text-red-700';
  }

  if (status === 'REVIEWING') {
    return 'bg-blue-100 text-blue-700';
  }

  return 'bg-yellow-100 text-yellow-700';
}

function isVerifiedMessage(isVerified: boolean) {
  return isVerified ? 'Listing marked as verified.' : 'Listing marked as unverified.';
}
