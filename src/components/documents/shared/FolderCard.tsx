import React from 'react';

interface FolderCardProps {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function FolderCard({ name, icon, onClick }: FolderCardProps) {
  return (
    <button
      onClick={onClick}
      className="p-6 bg-white rounded-lg border border-gray-200 hover:border-[#F5B544] transition-colors text-center group"
    >
      <div className="flex flex-col items-center gap-4">
        {icon}
        <span className="font-medium text-gray-900 group-hover:text-[#F5B544]">
          {name}
        </span>
      </div>
    </button>
  );
}