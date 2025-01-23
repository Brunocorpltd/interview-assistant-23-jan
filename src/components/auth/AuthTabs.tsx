import React from 'react';

interface AuthTabsProps {
  activeTab: 'signUp' | 'signIn';
  onTabChange: (tab: 'signUp' | 'signIn') => void;
}

export default function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => onTabChange('signUp')}
        className={`pb-2 px-1 font-medium relative ${
          activeTab === 'signUp'
            ? 'text-black border-b-2 border-[#F5B544]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Sign Up
      </button>
      <button
        onClick={() => onTabChange('signIn')}
        className={`pb-2 px-1 font-medium relative ${
          activeTab === 'signIn'
            ? 'text-black border-b-2 border-[#F5B544]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Sign In
      </button>
    </div>
  );
}