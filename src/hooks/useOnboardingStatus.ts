import { useState, useEffect } from 'react';
import { supabase, checkSupabaseConnection } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface OnboardingStatus {
  user_info_completed: boolean;
  cv_uploaded: boolean;
}

export function useOnboardingStatus() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<OnboardingStatus | null>(null);

  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const maxRetries = 3;

    async function loadStatus() {
      if (!user?.id) {
        if (mounted) {
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check connection first
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          throw new Error('Unable to connect to database');
        }

        // Get onboarding status
        const { data, error: fetchError } = await supabase
          .rpc('get_onboarding_status', {
            p_user_id: user.id
          });

        if (fetchError) throw fetchError;

        if (mounted) {
          setStatus(data?.[0] || {
            user_info_completed: false,
            cv_uploaded: false
          });
        }
      } catch (err) {
        console.error('Error loading onboarding status:', err);
        if (mounted) {
          if (retryCount < maxRetries) {
            retryCount++;
            // Retry after 1 second
            setTimeout(loadStatus, 1000);
            return;
          }
          setError('Unable to load onboarding status. Please refresh the page.');
          // Set default status to prevent infinite loops
          setStatus({
            user_info_completed: false,
            cv_uploaded: false
          });
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadStatus();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  return { status, loading, error };
}