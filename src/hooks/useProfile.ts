import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ProfileUpdateData {
  firstName: string;
  lastName: string;
  email: string;
  avatar_url?: string | null;
}

interface PasswordUpdateData {
  newPassword: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: ProfileUpdateData) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error: updateError } = await supabase
        .from('users')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          avatar_url: data.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: PasswordUpdateData) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });

      if (error) {
        if (error.message.includes('auth')) {
          throw new Error('Please sign in again to update your password');
        }
        throw error;
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      // Validate file size
      if (file.size > 15 * 1024 * 1024) {
        throw new Error('File size must be less than 15MB');
      }

      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        throw new Error('File must be a PNG or JPEG image');
      }

      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Delete existing avatar if any
      const { data: existingAvatar } = await supabase
        .from('users')
        .select('avatar_url')
        .eq('id', user.id)
        .single();

      if (existingAvatar?.avatar_url) {
        const existingPath = existingAvatar.avatar_url.split('/').pop();
        if (existingPath) {
          await supabase.storage
            .from('profiles')
            .remove([`avatars/${existingPath}`]);
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      // Update user profile with new avatar URL
      await updateProfile({
        firstName: '',
        lastName: '',
        email: '',
        avatar_url: publicUrl
      });

      return publicUrl;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteAvatar = async (url: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setLoading(true);
      setError(null);

      // Extract filename from URL
      const fileName = url.split('/').pop();
      if (!fileName) throw new Error('Invalid avatar URL');

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('profiles')
        .remove([`avatars/${fileName}`]);

      if (deleteError) throw deleteError;

      // Update user profile
      await updateProfile({
        firstName: '',
        lastName: '',
        email: '',
        avatar_url: null
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete avatar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProfile,
    updatePassword,
    uploadAvatar,
    deleteAvatar
  };
}