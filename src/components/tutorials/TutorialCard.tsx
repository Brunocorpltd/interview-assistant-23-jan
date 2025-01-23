import React from 'react';
import { Play } from 'lucide-react';

interface TutorialCardProps {
  title: string;
  steps: string[];
  thumbnailUrl: string;
  onWatch: () => void;
}

export default function TutorialCard({ title, steps, thumbnailUrl, onWatch }: TutorialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Follow the 3-step process</p>
        <ul className="space-y-1">
          {steps.map((step, index) => (
            <li key={index} className="text-gray-700 flex items-start gap-2">
              <span className="text-[#F5B544]">•</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="relative group cursor-pointer" onClick={onWatch}>
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-300" />
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
          <button className="bg-[#F5B544] text-black px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            Watch
          </button>
        </div>
      </div>
    </div>
  );
}