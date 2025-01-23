import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import SelectedFile from './SelectedFile';
import { useCV } from '../../hooks/useCV';

interface FinalStepFormProps {
  onBack: () => void;
}

const FinalStepForm = ({ onBack }: FinalStepFormProps) => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSuccess = useCallback(() => {
    // Add a small delay to allow state updates to complete
    setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 100);
  }, [navigate]);

  const { uploadUserCV } = useCV(handleSuccess);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError(null);
    
    const files = e.dataTransfer.files;
    if (files?.[0]) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setUploadError(null);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setUploadError(null);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile || isUploading) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      await uploadUserCV(selectedFile);
    } catch (err) {
      console.error('Failed to upload CV:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to upload CV');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">
          Almost done. Bee work smarter with your CV.
        </h1>
      </div>

      {uploadError && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{uploadError}</span>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-4">
            Upload your most recent CV
            <span className="text-red-500 ml-1">*</span>
          </label>
          {selectedFile ? (
            <SelectedFile file={selectedFile} onRemove={handleRemoveFile} />
          ) : (
            <FileUploadZone
              onFileSelect={handleFileSelect}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            />
          )}
          <p className="text-sm text-gray-500 italic mt-4">
            Supported formats: PDF, DOC, DOCX. Maximum size: 15MB
          </p>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            disabled={isUploading}
            className="px-6 py-3 text-gray-600 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`px-6 py-3 bg-[#F5B544] text-black rounded-lg font-medium flex items-center gap-2 ${
              (!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0a832]'
            }`}
          >
            {isUploading ? 'Uploading...' : 'Complete'} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalStepForm;