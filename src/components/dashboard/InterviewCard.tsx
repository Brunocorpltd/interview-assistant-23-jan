import React from 'react';
import { Star } from 'lucide-react';
import PlatformIcons from './PlatformIcons';

interface InterviewCardProps {
  title: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  variant?: 'default' | 'highlight';
}

const InterviewCard = ({ 
  title, 
  features, 
  buttonText, 
  onButtonClick,
  variant = 'default' 
}: InterviewCardProps) => {
  return (
    <div className={`h-full flex flex-col p-4 md:p-8 rounded-lg ${variant === 'highlight' ? 'bg-[#FFF8EE]' : 'bg-white'}`}>
      <div className="flex-1">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">{title}</h2>
        <div className="space-y-3 md:space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <Star className="w-5 h-5 text-[#F5B544] shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                
                {/* Add platform icons for the first feature if it's about video platforms */}
                {index === 0 && feature.toLowerCase().includes('video interview') && (
                  <PlatformIcons />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onButtonClick}
        className="w-full mt-6 md:mt-8 py-2.5 md:py-3 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors font-medium"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default InterviewCard;