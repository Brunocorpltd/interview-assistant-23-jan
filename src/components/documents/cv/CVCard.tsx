import React from 'react';
import { FileText, Trash2, ExternalLink } from 'lucide-react';
import { CVDocument } from '../../../types/documents';

interface CVCardProps {
  cv: CVDocument;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export default function CVCard({ cv, onRemove, disabled }: CVCardProps) {
  const handleView = () => {
    window.open(cv.url, '_blank');
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 hover:border-[#F5B544] transition-colors">
      <div className="flex flex-col items-center gap-4">
        <FileText className="w-12 h-12 text-[#F5B544]" />
        <span className="font-medium text-gray-900 text-center">{cv.name}</span>
        
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleView}
            disabled={disabled}
            className="px-3 py-1.5 bg-[#F5B544] text-black rounded-lg text-sm font-medium flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExternalLink className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onRemove(cv.id)}
            disabled={disabled}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}