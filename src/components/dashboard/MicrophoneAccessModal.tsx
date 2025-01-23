import React from 'react';
import { Mic, Video, X } from 'lucide-react';

interface MicrophoneAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
}

export default function MicrophoneAccessModal({ 
  isOpen, 
  onClose,
  onEnable 
}: MicrophoneAccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFF8EE] rounded-lg p-8 max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-[#F5B544] hover:text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center gap-8 mb-8">
          <Mic className="w-12 h-12" />
          <Video className="w-12 h-12" />
        </div>

        <div className="text-center mb-6">
          <p className="text-lg font-medium mb-4">
            The AI Bees app requires access to your <span className="font-bold">microphone</span> and <span className="font-bold">camera</span> on the browser.
          </p>
          <p className="text-gray-600 border border-dashed border-gray-300 rounded-lg p-4">
            This helps us generate smarter and contextual responses to your conversations during the live interview.
          </p>
        </div>

        <button
          onClick={onEnable}
          className="w-full py-3 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors font-medium"
        >
          Enable access
        </button>
      </div>
    </div>
  );
}