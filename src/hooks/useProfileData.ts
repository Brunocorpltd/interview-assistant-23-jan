import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
}

export function useProfileData() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: ''
  });

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('users')
          .select('first_name, last_name, email, avatar_url')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;

        setProfileData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          avatarUrl: data.avatar_url || ''
        });
      } catch (err) {
        console.error('Error loading profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user]);

  return {
    profileData,
    loading,
    error
  };
}