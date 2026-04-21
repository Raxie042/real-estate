import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        document.cookie = 'raxie-auth-token=; path=/; max-age=0; SameSite=Lax';
        // Do not redirect globally; let each page/component handle navigation.
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  auth: {
    register: (data: any) => apiClient.post('/auth/register', data),
    login: (data: any) => apiClient.post('/auth/login', data),
  },
  
  listings: {
    getAll: (params?: any) => apiClient.get('/listings', { params }),
    getMine: (params?: any) => apiClient.get('/listings/my-listings', { params }),
    getById: (id: string) => apiClient.get(`/listings/${id}`),
    getBySlug: (slug: string) => apiClient.get(`/listings/slug/${slug}`),
    getAnalytics: (id: string, timeRange: string) => 
      apiClient.get(`/listings/${id}/analytics`, { params: { timeRange } }),
    create: (data: any) => apiClient.post('/listings', data),
    update: (id: string, data: any) => apiClient.put(`/listings/${id}`, data),
    delete: (id: string) => apiClient.delete(`/listings/${id}`),
    publish: (id: string) => apiClient.post(`/listings/${id}/publish`),
    unpublish: (id: string) => apiClient.post(`/listings/${id}/unpublish`),
    contactSeller: (id: string, data: any) => apiClient.post(`/listings/${id}/contact`, data),
    report: (id: string, data: { reason: string; details?: string }) =>
      apiClient.post(`/listings/${id}/report`, data),
    getReportsQueue: (params?: { status?: string; page?: number; limit?: number }) =>
      apiClient.get('/listings/admin/reports/queue', { params }),
    reviewReport: (
      reportId: string,
      data: {
        decision: 'RESOLVED' | 'REJECTED';
        notes?: string;
        markListingVerified?: boolean;
        suspendListing?: boolean;
      }
    ) => apiClient.post(`/listings/admin/reports/${reportId}/review`, data),
    setVerification: (id: string, isVerified: boolean) =>
      apiClient.put(`/listings/${id}/verification`, { isVerified }),
  },
  
  search: {
    byRadius: (data: any) => apiClient.post('/search/radius', data),
    byBounds: (data: any) => apiClient.post('/search/bounds', data),
    advanced: (data: any) => apiClient.post('/search/advanced', data),
  },
  
  favorites: {
    getAll: () => apiClient.get('/favorites'),
    add: (listingId: string, notes?: string) =>
      apiClient.post('/favorites', { listingId, notes }),
    remove: (listingId: string) => apiClient.delete(`/favorites/${listingId}`),
    check: (listingId: string) => apiClient.get(`/favorites/check/${listingId}`),
  },
  
  users: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: any) => apiClient.put('/users/profile', data),
  },
  
  agencies: {
    getAll: () => apiClient.get('/agencies'),
    getById: (id: string) => apiClient.get(`/agencies/${id}`),
    getReviews: (id: string) => apiClient.get(`/agencies/${id}/reviews`),
    getTeamOverview: (id: string) => apiClient.get(`/agencies/${id}/team-overview`),
    getAgentMetrics: (id: string) => apiClient.get(`/agencies/${id}/agent-metrics`),
    assignListing: (id: string, data: { listingId: string; agentId: string }) =>
      apiClient.post(`/agencies/${id}/assign-listing`, data),
  },

  notifications: {
    getAll: (unreadOnly?: boolean) => apiClient.get('/notifications', { params: { unreadOnly } }),
    getUnread: () => apiClient.get('/notifications/unread'),
    markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.put('/notifications/read-all'),
  },

  analytics: {
    getDashboard: () => apiClient.get('/analytics/dashboard'),
    getPerformance: () => apiClient.get('/analytics/performance'),
  },

  savedSearches: {
    getAll: () => apiClient.get('/saved-searches'),
    create: (data: any) => apiClient.post('/saved-searches', data),
    delete: (id: string) => apiClient.delete(`/saved-searches/${id}`),
    toggleNotifications: (id: string) => apiClient.put(`/saved-searches/${id}/toggle-notifications`),
  },

  openHouses: {
    getAll: () => apiClient.get('/open-houses'),
    getMine: () => apiClient.get('/open-houses/agent/my-open-houses'),
    getById: (id: string) => apiClient.get(`/open-houses/${id}`),
    getByListing: (listingId: string) => apiClient.get(`/open-houses/listing/${listingId}`),
    create: (data: any) => apiClient.post('/open-houses', data),
    update: (id: string, data: any) => apiClient.put(`/open-houses/${id}`, data),
    delete: (id: string) => apiClient.delete(`/open-houses/${id}`),
    rsvp: (id: string, data: any) => apiClient.post(`/open-houses/${id}/rsvp`, data),
  },

  documents: {
    getAll: () => apiClient.get('/documents'),
    getMine: () => apiClient.get('/documents/my-documents'),
    getByListing: (listingId: string) => apiClient.get(`/documents/listing/${listingId}`),
    upload: (data: FormData) => apiClient.post('/documents/upload', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id: string, data: any) => apiClient.patch(`/documents/${id}`, data),
    delete: (id: string) => apiClient.delete(`/documents/${id}`),
  },

  offers: {
    getAll: () => apiClient.get('/offers'),
    getMine: () => apiClient.get('/offers/mine'),
    getById: (id: string) => apiClient.get(`/offers/${id}`),
    create: (data: any) => apiClient.post('/offers', data),
    accept: (id: string) => apiClient.put(`/offers/${id}/accept`),
    reject: (id: string, data?: any) => apiClient.put(`/offers/${id}/reject`, data),
    counter: (id: string, data: any) => apiClient.put(`/offers/${id}/counter`, data),
  },

  chat: {
    getRooms: () => apiClient.get('/chat/rooms'),
    getMessages: (roomId: string) => apiClient.get(`/chat/rooms/${roomId}/messages`),
    sendMessage: (roomId: string, data: any) => apiClient.post(`/chat/rooms/${roomId}/messages`, data),
    createRoom: (listingId: string) => apiClient.post('/chat/rooms', { listingId, participants: [] }),
  },

  payments: {
    getSubscription: () => apiClient.get('/payments/subscription'),
    getPaymentHistory: () => apiClient.get('/payments/history'),
    createSubscription: (plan: 'FREE' | 'BASIC' | 'PREMIUM' | 'ENTERPRISE') =>
      apiClient.post('/payments/subscriptions', { plan }),
    cancelSubscription: () => apiClient.delete('/payments/subscription'),
    reactivateSubscription: () => apiClient.post('/payments/subscription/reactivate'),
    createCheckoutSession: (priceId: string) => apiClient.post('/payments/create-checkout-session', { priceId }),
  },

  reviews: {
    createReview: (data: any) => apiClient.post('/reviews', data),
    getListingReviews: (listingId: string, page?: number, limit?: number) => 
      apiClient.get(`/reviews/listing/${listingId}`, { params: { page, limit } }),
    getListingStats: (listingId: string) => apiClient.get(`/reviews/listing/${listingId}/stats`),
    getAgentReviews: (agentId: string, page?: number, limit?: number) => 
      apiClient.get(`/reviews/agent/${agentId}`, { params: { page, limit } }),
    getAgentStats: (agentId: string) => apiClient.get(`/reviews/agent/${agentId}/stats`),
    markHelpful: (reviewId: string) => apiClient.post(`/reviews/${reviewId}/helpful`),
    markUnhelpful: (reviewId: string) => apiClient.post(`/reviews/${reviewId}/unhelpful`),
    deleteReview: (reviewId: string) => apiClient.delete(`/reviews/${reviewId}`),
    getPendingReviews: (page?: number, limit?: number) => 
      apiClient.get('/reviews/admin/pending', { params: { page, limit } }),
    approveReview: (reviewId: string, approved: boolean) => 
      apiClient.post(`/reviews/${reviewId}/approve`, {}, { params: { approved } }),
  },

  invitations: {
    createApplication: (data: any) => apiClient.post('/invitations/apply', data),
    getAll: (params?: any) => apiClient.get('/invitations', { params }),
    updateStatus: (id: string, data: any) => apiClient.patch(`/invitations/${id}/status`, data),
  },

  crm: {
    getDashboard: () => apiClient.get('/crm/dashboard'),
    getMetrics: (agentId?: string) => apiClient.get('/crm/metrics', { params: { agentId } }),
    calculateLeadScore: (userId: string) => apiClient.post('/crm/lead-score', { userId }),
    getFollowUpSequence: (userId: string) => apiClient.post('/crm/follow-up-sequence', { userId }),
    generateFollowUpTasks: (agentId: string) => apiClient.post('/crm/generate-tasks', { agentId }),
    getHotLeads: () => apiClient.get('/crm/leads/hot'),
    getWarmLeads: () => apiClient.get('/crm/leads/warm'),
    getColdLeads: () => apiClient.get('/crm/leads/cold'),
    getConversionRate: () => apiClient.get('/crm/conversion-rate'),
    getScoreBreakdown: () => apiClient.get('/crm/score-breakdown'),
  },

  rental: {
    createTenant: (data: any) => apiClient.post('/rental/tenant', data),
    updateTenant: (tenantId: string, data: any) => apiClient.put(`/rental/tenant/${tenantId}`, data),
    createLease: (data: any) => apiClient.post('/rental/lease', data),
    recordRentPayment: (data: any) => apiClient.post('/rental/rent-payment', data),
    getTenantPaymentHistory: (tenantId: string) => apiClient.get(`/rental/tenant/${tenantId}/payment-history`),
    getOverdueRent: (propertyId: string) => apiClient.get(`/rental/property/${propertyId}/overdue-rent`),
    getTenantDashboard: (tenantId: string) => apiClient.get(`/rental/tenant/${tenantId}/dashboard`),
    getPropertyDashboard: (propertyId: string) => apiClient.get(`/rental/property/${propertyId}/dashboard`),
    createMaintenanceRequest: (data: any) => apiClient.post('/rental/maintenance-request', data),
    getMaintenanceRequests: (propertyId: string) => apiClient.get(`/rental/property/${propertyId}/maintenance-requests`),
    updateMaintenanceRequest: (requestId: string, data: any) => apiClient.put(`/rental/maintenance-request/${requestId}`, data),
    getLease: (leaseId: string) => apiClient.get(`/rental/lease/${leaseId}`),
    getPropertyLeases: (propertyId: string) => apiClient.get(`/rental/property/${propertyId}/leases`),
  },

  ai: {
    generateDescription: (data: any) => apiClient.post('/ai/generate-description', data),
    getRecommendations: (userId: string, limit = 10) =>
      apiClient.get(`/ai/recommendations/${userId}`, { params: { limit } }),
    getMarketAnalysis: (city: string, state: string) => apiClient.get(`/ai/market-analysis/${city}/${state}`),
    predictPrice: (data: any) => apiClient.post('/ai/price-prediction', data),
    getNeighborhoodInsights: (params?: any) => apiClient.get('/ai/neighborhood-insights', { params }),
  },

  valuation: {
    estimateValue: (data: any) => apiClient.post('/valuation/estimate', data),
    getMarketTrends: () => apiClient.get('/valuation/market-trends'),
  },

  mls: {
    syncReso: (data: any) => apiClient.post('/mls/sync/reso', data),
    syncRets: (data: any) => apiClient.post('/mls/sync/rets', data),
    getSyncHistory: () => apiClient.get('/mls/sync-history'),
    getSyncStatus: (listingId: string) => apiClient.get(`/mls/sync-status/${listingId}`),
    export: (data: any) => apiClient.post('/mls/export', data),
    bulkImport: (data: any) => apiClient.post('/mls/bulk-import', data),
    getConfig: () => apiClient.get('/mls/config'),
    testConnection: (data: any) => apiClient.post('/mls/test-connection', data),
    getStatistics: () => apiClient.get('/mls/statistics'),
    scheduleSync: (data: any) => apiClient.post('/mls/schedule-sync', data),
  },

  neighborhood: {
    getInsights: (location: string) => apiClient.get('/neighborhood/insights', { params: { location } }),
    getCrimeData: (zipCode: string) => apiClient.get(`/neighborhood/crime/${zipCode}`),
    getSchools: (location: string) => apiClient.get('/neighborhood/schools', { params: { location } }),
    getAmenities: (location: string) => apiClient.get('/neighborhood/amenities', { params: { location } }),
  },

  whiteLabel: {
    getPublic: (agencyId?: string) => apiClient.get('/white-label/public', { params: { agencyId } }),
    getAdmin: (agencyId?: string) => apiClient.get('/white-label/admin', { params: { agencyId } }),
    updateAdmin: (data: {
      brandName?: string;
      logoUrl?: string;
      primaryColor?: string;
      accentColor?: string;
      supportEmail?: string;
      customDomain?: string;
      agencyId?: string;
    }) => apiClient.post('/white-label/admin', data),
  },
};

export default api;
