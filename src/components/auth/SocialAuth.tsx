import React from 'react';
import GoogleIcon from './icons/GoogleIcon';

interface SocialAuthProps {
  onSocialAuth: (provider: 'google' | 'apple') => void;
  mode: 'signIn' | 'signUp';
}

export default function SocialAuth({ onSocialAuth, mode }: SocialAuthProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={() => onSocialAuth('google')}
        className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-2.5 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-sm text-gray-500">
          or {mode === 'signIn' ? 'sign in' : 'sign up'} with
        </span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>
    </div>
  );
}