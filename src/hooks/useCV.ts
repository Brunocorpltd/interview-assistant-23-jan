import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { uploadCV } from '../lib/storage';

export function useCV(onSuccess?: () => void) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadUserCV = async (file: File) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    try {
      setLoading(true);
      setError(null);

      // Upload file to storage
      const cvPath = await uploadCV(file, user.id);

      // Create document and update status
      const { error: docError } = await supabase.rpc('create_document', {
        p_user_id: user.id,
        p_type: 'cv',
        p_name: file.name,
        p_url: cvPath
      });

      if (docError) throw docError;

      // Call success callback if provided
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload CV';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    uploadUserCV
  };
}