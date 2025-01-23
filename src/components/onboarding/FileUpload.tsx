import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      onFileSelect(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Upload className="w-8 h-8 text-[#F5B544] mx-auto mb-4" />
      <div className="text-[#F5B544] font-medium mb-1">Drop file here</div>
      <div className="text-sm text-gray-500 mb-4">Supported format: pdf, txt, docs, doc, etc</div>
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

export default FileUpload;