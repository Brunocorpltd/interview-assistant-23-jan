import React from 'react';
import { cn } from '../../utils/cn';

interface Tab {
  id: number;
  title: string;
}

interface OnboardingTabsProps {
  currentTab: number;
  tabs: Tab[];
}

const OnboardingTabs = ({ currentTab, tabs }: OnboardingTabsProps) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center space-x-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn(
              "h-1 flex-1 rounded-full",
              tab.id === currentTab ? "bg-[#F5B544]" : "bg-[#F5B544] opacity-30"
            )}
          />
        ))}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        {currentTab} of {tabs.length}
      </div>
    </div>
  );
};

export default OnboardingTabs;