import { useCallback, useState } from 'react';
import axios from 'axios';

export interface SavedSearch {
  id: string;
  name: string;
  filters: Record<string, any>;
  createdAt: string;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
});

/**
 * Hook for managing saved searches
 */
export const useSavedSearches = (userId: string) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch saved searches for user
   */
  const fetchSavedSearches = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(
        `/search/saved/${userId}`
      );
      setSavedSearches(response.data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch saved searches';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  /**
   * Save a new search
   */
  const saveSearch = useCallback(
    async (name: string, filters: Record<string, any>) => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);

      try {
        await apiClient.post('/search/save', {
          userId,
          name,
          filters,
        });

        // Refresh the list
        await fetchSavedSearches();
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save search';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [userId, fetchSavedSearches]
  );

  /**
   * Run (execute) a saved search
   */
  const runSavedSearch = useCallback(
    async (searchId: string) => {
      if (!userId) return null;

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post(
          `/search/saved/${searchId}/run?userId=${userId}`
        );
        return response.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to run saved search';
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  /**
   * Delete a saved search
   */
  const deleteSavedSearch = useCallback(
    async (searchId: string) => {
      if (!userId) return false;

      setIsLoading(true);
      setError(null);

      try {
        await apiClient.post(
          `/search/saved/${searchId}/delete?userId=${userId}`
        );

        // Remove from local state
        setSavedSearches(prev => prev.filter(s => s.id !== searchId));
        return true;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete saved search';
        setError(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  /**
   * Run advanced search with filters
   */
  const advancedSearch = useCallback(
    async (filters: Record<string, any>) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.post('/search/advanced', filters);
        return response.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Search failed';
        setError(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    savedSearches,
    isLoading,
    error,
    fetchSavedSearches,
    saveSearch,
    runSavedSearch,
    deleteSavedSearch,
    advancedSearch,
  };
};

export default useSavedSearches;
