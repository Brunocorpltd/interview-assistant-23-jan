import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fetchUserCVs } from '../lib/documents';
import { CVDocument } from '../types/documents';

export function useUserCVs() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cvs, setCVs] = useState<CVDocument[]>([]);

  const loadCVs = useCallback(async () => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userCVs = await fetchUserCVs(user.id);
      setCVs(userCVs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load CVs');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCVs();
  }, [loadCVs]);

  const refresh = () => {
    loadCVs();
  };

  return {
    loading,
    error,
    cvs,
    refresh
  };
}