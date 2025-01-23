import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import { useUserProfileSection } from '../../hooks/useUserProfileSection';

export default function UserProfileSection() {
  const navigate = useNavigate();
  const { profileData, loading } = useUserProfileSection();

  if (loading) {
    return (
      <div className="w-full flex items-center gap-3 p-2">
        <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 bg-gray-100 rounded animate-pulse mb-1" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>
      </div>
    );
  }

  const displayName = profileData ? 
    [profileData.firstName, profileData.lastName].filter(Boolean).join(' ') || 'Anonymous User' 
    : 'Anonymous User';

  return (
    <button 
      onClick={() => navigate('/profile')}
      className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
    >
      <div className="relative">
        {profileData?.avatarUrl ? (
          <img 
            src={profileData.avatarUrl}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-1 text-left">
        <div className="font-medium text-gray-900 truncate">{displayName}</div>
        <div className="text-sm text-gray-500 truncate">{profileData?.email}</div>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400" />
    </button>
  );
}