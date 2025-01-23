import React from 'react';
import { Play } from 'lucide-react';

interface GetStartedCardProps {
  title: string;
  steps: string[];
  onWatch: () => void;
}

const GetStartedCard = ({ title, steps, onWatch }: GetStartedCardProps) => {
  return (
    <div className="p-4 md:p-8 bg-white rounded-lg">
      <h3 className="text-lg md:text-xl font-semibold mb-4">{title}</h3>
      <div className="text-sm text-gray-600 mb-2">Follow the 3-step process</div>
      <ul className="list-disc list-inside space-y-2 mb-4 md:mb-6 text-gray-700 text-sm md:text-base">
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={onWatch}
          className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm md:text-base"
        >
          Watch
        </button>
        <div className="aspect-video w-full md:w-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <Play className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default GetStartedCard;