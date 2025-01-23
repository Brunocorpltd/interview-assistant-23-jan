import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  user_role: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
  roles: string[] | null;
}

export function useUserProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // First ensure user exists
        const { error: initError } = await supabase.rpc('initialize_user', {
          p_user_id: user.id,
          p_email: user.email || ''
        });

        if (initError && !initError.message.includes('duplicate key')) {
          throw initError;
        }

        // Then fetch user data
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('user_role, linkedin_url, portfolio_url, roles')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;

        if (mounted) {
          setProfile(data || {
            user_role: null,
            linkedin_url: null,
            portfolio_url: null,
            roles: []
          });
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          console.error('Error loading profile:', err);
          setError(err instanceof Error ? err.message : 'Failed to load profile');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { profile, loading, error };
}