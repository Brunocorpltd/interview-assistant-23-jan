import React from 'react';

interface MicrophoneAccessBannerProps {
  onEnableClick: () => void;
}

export default function MicrophoneAccessBanner({ onEnableClick }: MicrophoneAccessBannerProps) {
  return (
    <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
      <p className="text-red-600">
        Alert: Please allow AI Bees to access your browser's microphone and camera for real-time assistance .
        <button 
          onClick={onEnableClick}
          className="text-red-700 underline hover:no-underline ml-1"
        >
          Click to enable permissions
        </button>
      </p>
    </div>
  );
}