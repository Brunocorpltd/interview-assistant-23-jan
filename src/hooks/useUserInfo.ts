import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface UserInfoForm {
  currentRole: string;
  linkedinUrl: string;
  portfolioUrl?: string;
  roles: string[];
}

export function useUserInfo() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveUserInfo = async (data: UserInfoForm) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First ensure user exists
      const { error: initError } = await supabase.rpc('initialize_user', {
        p_user_id: user.id,
        p_email: user.email || ''
      });

      if (initError && !initError.message?.includes('duplicate key')) {
        throw initError;
      }

      // Update user info
      const { error: updateError } = await supabase.rpc('update_user_info', {
        p_user_id: user.id,
        p_user_role: data.currentRole,
        p_linkedin_url: data.linkedinUrl,
        p_portfolio_url: data.portfolioUrl,
        p_roles: data.roles
      });

      if (updateError) throw updateError;

    } catch (err) {
      console.error('Error saving user info:', err);
      setError(err instanceof Error ? err.message : 'Failed to save user information');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    saveUserInfo
  };
}