import React from 'react';

interface AuthButtonsProps {
  activeMode: 'signUp' | 'signIn';
  onModeChange: (mode: 'signUp' | 'signIn') => void;
}

export default function AuthButtons({ activeMode, onModeChange }: AuthButtonsProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onModeChange('signUp')}
        className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
          activeMode === 'signUp'
            ? 'bg-[#F5B544] text-black'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Sign Up
      </button>
      <button
        onClick={() => onModeChange('signIn')}
        className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
          activeMode === 'signIn'
            ? 'bg-[#F5B544] text-black'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Sign In
      </button>
    </div>
  );
}