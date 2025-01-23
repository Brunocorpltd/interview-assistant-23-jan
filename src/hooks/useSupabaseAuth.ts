import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useSupabaseAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    try {
      setError(null);
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleSocialAuth
  };
}