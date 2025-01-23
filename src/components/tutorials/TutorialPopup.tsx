import React from 'react';
import { X, Play } from 'lucide-react';

interface TutorialPopupProps {
  isOpen: boolean;
  onClose: () => void;
  step: number;
  content: {
    title: string;
    steps: {
      number: number;
      text: string;
      isTest?: boolean;
    }[];
    note?: string;
    videoPlaceholder?: boolean;
    customButton?: {
      text: string;
      action: string;
    };
  };
  onContinue: () => void;
}

export default function TutorialPopup({ 
  isOpen, 
  onClose, 
  step,
  content,
  onContinue 
}: TutorialPopupProps) {
  if (!isOpen || !content) return null;

  const handleButtonClick = async () => {
    if (content.customButton?.action === 'share') {
      try {
        // Request screen sharing with audio
        await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        // If successful, proceed to next step
        onContinue();
      } catch (err) {
        console.error('Error sharing screen:', err);
        // Continue anyway in case user cancelled or browser doesn't support audio sharing
        onContinue();
      }
    } else if (content.customButton?.action === 'complete') {
      onClose();
    } else {
      onContinue();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFF8EE] rounded-lg max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <h2 className={`text-2xl font-semibold mb-8 ${
            step === 4 ? 'text-green-500' : 'text-red-500'
          }`}>
            {content.title}
          </h2>

          <div className="space-y-8">
            {content.steps.map((step) => (
              <div key={step.number} className="flex gap-4">
                {step.number > 0 && (
                  <div className="font-medium shrink-0">Step {step.number}:</div>
                )}
                <div>
                  {step.text}
                  {step.isTest && (
                    <button className="ml-2 text-black underline hover:no-underline">
                      [Test]
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {content.note && (
            <div className="mt-4 text-red-500 italic text-sm">
              Note: {content.note}
            </div>
          )}

          {content.videoPlaceholder && (
            <div className="mt-8 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-300" />
            </div>
          )}

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={handleButtonClick}
              className={`w-full max-w-xs py-3 rounded-lg transition-colors ${
                content.customButton?.action === 'complete'
                  ? 'bg-[#F5B544] text-black hover:bg-[#f0a832] flex items-center justify-center gap-2'
                  : 'bg-[#F5B544] text-black hover:bg-[#f0a832]'
              }`}
            >
              {content.customButton ? content.customButton.text : 'Continue'}
              {content.customButton?.action === 'complete' && (
                <span className="text-xl">→</span>
              )}
            </button>

            <div className="text-gray-700">
              Need help?{' '}
              <a href="#" className="text-[#F5B544] hover:underline">
                Check out a 30-second video real quick
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}