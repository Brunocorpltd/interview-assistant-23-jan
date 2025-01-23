import React from 'react';
import { Upload } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  isDragging: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const FileUploadZone = ({
  onFileSelect,
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop
}: FileUploadZoneProps) => {
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
        isDragging ? "border-[#F5B544] bg-[#FFF8EE]" : "border-gray-200"
      )}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Upload className="w-8 h-8 text-[#F5B544] mx-auto mb-4" />
      <div className="text-[#F5B544] font-medium mb-1">
        {isDragging ? 'Drop your file here' : 'Drop file here'}
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Supported format: pdf, txt, docs, doc, etc
      </div>
      <div className="text-sm text-gray-700 font-medium mb-4">OR</div>
      <label className="text-[#F5B544] hover:underline cursor-pointer">
        Browse file
        <input
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};

export default FileUploadZone;