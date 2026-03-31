import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';

// Listings
export function useListings(params?: any) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => api.listings.getAll(params).then((res) => res.data),
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => api.listings.getById(id).then((res) => res.data),
    enabled: !!id,
  });
}

export function useListingBySlug(slug: string) {
  return useQuery({
    queryKey: ['listing', slug],
    queryFn: () => api.listings.getBySlug(slug).then((res) => res.data),
    enabled: !!slug,
  });
}

export function useCreateListing() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => api.listings.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listings'] });
    },
  });
}

export function useMyListings(params?: any) {
  return useQuery({
    queryKey: ['my-listings', params],
    queryFn: () => api.listings.getMine(params).then((res) => res.data),
  });
}

// Favorites
export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => api.favorites.getAll().then((res) => res.data),
  });
}

export function useIsFavorite(listingId: string) {
  return useQuery({
    queryKey: ['favorite', listingId],
    queryFn: () => api.favorites.check(listingId).then((res) => res.data.isFavorite),
    enabled: !!listingId,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ listingId, isFavorite }: { listingId: string; isFavorite: boolean }) => {
      if (isFavorite) {
        return api.favorites.remove(listingId);
      } else {
        return api.favorites.add(listingId);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['favorite', variables.listingId] });
    },
  });
}

// Search
export function useSearchListings(filters: any) {
  return useQuery({
    queryKey: ['search', filters],
    queryFn: () => api.search.advanced(filters).then((res) => res.data),
    enabled: !!filters,
  });
}

// User
export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => api.users.getProfile().then((res) => res.data),
  });
}

// Agencies
export function useAgencies() {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: () => api.agencies.getAll().then((res) => res.data),
  });
}
