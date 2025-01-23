import React from 'react';
import { Plus } from 'lucide-react';

export function CreateNewFolder() {
  return (
    <button className="p-6 bg-white rounded-lg border border-gray-200 border-dashed hover:border-[#F5B544] transition-colors text-center group">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FFF8EE]">
          <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#F5B544]" />
        </div>
        <span className="font-medium text-gray-900 group-hover:text-[#F5B544]">
          Create New Folder
        </span>
      </div>
    </button>
  );
}