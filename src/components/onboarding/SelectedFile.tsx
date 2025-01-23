import React from 'react';
import { FileText, X } from 'lucide-react';

interface SelectedFileProps {
  file: File;
  onRemove: () => void;
}

const SelectedFile = ({ file, onRemove }: SelectedFileProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <FileText className="w-5 h-5 text-[#F5B544]" />
        <div>
          <p className="font-medium text-gray-900">{file.name}</p>
          <p className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
      </div>
      <button
        onClick={onRemove}
        className="p-1 hover:bg-gray-200 rounded-full transition-colors"
        aria-label="Remove file"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
};

export default SelectedFile;