'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FileText, Download, Trash, Eye, Upload, Filter } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/lib/api';
import { useToast } from '@/lib/toast';
import DocumentUpload from '@/components/DocumentUpload';

interface Document {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  isPublic: boolean;
  createdAt: string;
  listing: {
    id: string;
    title: string;
  };
}

export default function DocumentsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'public' | 'private'>('all');

  const queryClient = useQueryClient();
  const { success, error: showError } = useToast();

  // Fetch documents
  const { data: documents = [], isLoading } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await api.documents.getMine();
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

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return api.documents.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      success('Document deleted');
    },
    onError: () => {
      showError('Failed to delete document');
    },
  });

  // Toggle public/private mutation
  const toggleVisibilityMutation = useMutation({
    mutationFn: async ({ id, isPublic }: { id: string; isPublic: boolean }) => {
      return api.documents.update(id, { isPublic });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      success('Document visibility updated');
    },
    onError: () => {
      showError('Failed to update document');
    },
  });

  const handleUploadComplete = (fileUrl: string) => {
    queryClient.invalidateQueries({ queryKey: ['documents'] });
    setShowUploadModal(false);
  };

  // Filter documents
  const filteredDocuments = documents.filter((doc) => {
    if (filterType === 'public') return doc.isPublic;
    if (filterType === 'private') return !doc.isPublic;
    return true;
  });

  // Group documents by listing
  const documentsByListing = filteredDocuments.reduce((acc, doc) => {
    const listingId = doc.listing.id;
    if (!acc[listingId]) {
      acc[listingId] = {
        listing: doc.listing,
        documents: [],
      };
    }
    acc[listingId].documents.push(doc);
    return acc;
  }, {} as Record<string, { listing: any; documents: Document[] }>);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1C1A17] mb-2">Documents</h1>
            <p className="text-[#7A6E60]">Manage property documents and files</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="lux-button flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            Upload Document
          </button>
        </div>

        {/* Stats & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 grid grid-cols-3 gap-4">
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-sm text-[#7A6E60]">Total</span>
              </div>
              <p className="text-2xl font-semibold text-[#1C1A17]">{documents.length}</p>
            </div>
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-[#C9A96A]" />
                <span className="text-sm text-[#7A6E60]">Public</span>
              </div>
              <p className="text-2xl font-semibold text-[#1C1A17]">
                {documents.filter((d) => d.isPublic).length}
              </p>
            </div>
            <div className="lux-card p-4">
              <div className="flex items-center gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#C9A96A]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span className="text-sm text-[#7A6E60]">Private</span>
              </div>
              <p className="text-2xl font-semibold text-[#1C1A17]">
                {documents.filter((d) => !d.isPublic).length}
              </p>
            </div>
          </div>

          {/* Filter */}
          <div className="lux-card p-4 flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#C9A96A]" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border-none bg-transparent text-[#1C1A17] focus:outline-none"
            >
              <option value="all">All Documents</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>
          </div>
        </div>

        {/* Documents by Listing */}
        {Object.keys(documentsByListing).length === 0 ? (
          <div className="lux-card p-12 text-center">
            <FileText className="w-12 h-12 text-[#C9A96A] mx-auto mb-4" />
            <p className="text-[#7A6E60] mb-4">No documents uploaded yet</p>
            <button onClick={() => setShowUploadModal(true)} className="lux-button">
              Upload Your First Document
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.values(documentsByListing).map(({ listing, documents }) => (
              <div key={listing.id}>
                <h2 className="text-xl font-semibold text-[#1C1A17] mb-4">{listing.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="lux-card p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#F6F2EC] rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-[#C9A96A]" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[#1C1A17] truncate">
                              {doc.fileName}
                            </p>
                            <p className="text-xs text-[#7A6E60]">
                              {(doc.fileSize / 1024).toFixed(0)} KB
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            doc.isPublic
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {doc.isPublic ? 'Public' : 'Private'}
                        </span>
                        <span className="text-xs text-[#7A6E60]">
                          {format(new Date(doc.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-[#C9A96A] text-white rounded-lg text-sm hover:bg-[#B78F4A] transition flex items-center justify-center gap-1"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                        <button
                          onClick={() =>
                            toggleVisibilityMutation.mutate({
                              id: doc.id,
                              isPublic: !doc.isPublic,
                            })
                          }
                          className="px-3 py-2 border border-[#E8E1D7] text-[#1C1A17] rounded-lg text-sm hover:bg-[#F6F2EC] transition"
                          title={doc.isPublic ? 'Make Private' : 'Make Public'}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(doc.id)}
                          className="px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 transition"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-[#1C1A17] mb-6">Upload Document</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#1C1A17] mb-2">
                Select Property
              </label>
              <select
                value={selectedListing}
                onChange={(e) => setSelectedListing(e.target.value)}
                className="w-full px-4 py-3 border border-[#E8E1D7] rounded-lg focus:ring-2 focus:ring-[#C9A96A] focus:border-transparent"
              >
                <option value="">Choose a property</option>
                {listings.map((listing: any) => (
                  <option key={listing.id} value={listing.id}>
                    {listing.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedListing ? (
              <>
                <DocumentUpload
                  listingId={selectedListing}
                  onUploadComplete={handleUploadComplete}
                />
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedListing('');
                  }}
                  className="w-full mt-4 px-6 py-3 border border-[#E8E1D7] text-[#1C1A17] rounded-lg hover:bg-[#F6F2EC] transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <p className="text-sm text-[#7A6E60] text-center py-4">
                Please select a property first
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
