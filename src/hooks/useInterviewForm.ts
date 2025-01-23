import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { InterviewDetails } from '../types/interview';
import { saveInterviewDetails } from '../lib/interviews';

export function useInterviewForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (details: InterviewDetails) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await saveInterviewDetails(user.id, details);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save interview details');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSave
  };
}