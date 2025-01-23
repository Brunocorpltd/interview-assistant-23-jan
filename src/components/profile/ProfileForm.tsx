import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { useProfileData } from '../../hooks/useProfileData';
import AvatarUpload from './AvatarUpload';
import PasswordSection from './PasswordSection';

export default function ProfileForm() {
  const { loading: updating, error: updateError, updateProfile, updatePassword, uploadAvatar, deleteAvatar } = useProfile();
  const { profileData, loading: loadingProfile, error: loadError } = useProfileData();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: ''
  });

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const publicUrl = await uploadAvatar(file);
      await updateProfile({
        ...formData,
        avatar_url: publicUrl
      });
      setFormData(prev => ({ ...prev, avatarUrl: publicUrl }));
    } catch (err) {
      console.error('Failed to upload avatar:', err);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      if (formData.avatarUrl) {
        await deleteAvatar(formData.avatarUrl);
        setFormData(prev => ({ ...prev, avatarUrl: '' }));
      }
    } catch (err) {
      console.error('Failed to delete avatar:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const handlePasswordUpdate = async (newPassword: string) => {
    await updatePassword({ newPassword });
  };

  const error = updateError || loadError;
  const loading = updating || loadingProfile;

  return (
    <div className="max-w-3xl bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Details</h2>

      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="mb-8">
        <AvatarUpload
          currentAvatarUrl={formData.avatarUrl}
          onUpload={handleAvatarUpload}
          onDelete={handleAvatarDelete}
          disabled={loading}
        />
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">First name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Last name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <PasswordSection onSubmit={handlePasswordUpdate} disabled={loading} />
      </div>
    </div>
  );
}