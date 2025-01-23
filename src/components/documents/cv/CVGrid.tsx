import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useUserCVs } from '../../../hooks/useUserCVs';
import CVCard from './CVCard';
import { useCV } from '../../../hooks/useCV';
import UploadModal from '../shared/UploadModal';

export default function CVGrid() {
  const { loading, error, cvs, refresh } = useUserCVs();
  const { uploadUserCV, removeCV, loading: actionLoading, error: actionError } = useCV(refresh);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleRemove = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this CV?')) {
      try {
        await removeCV(id);
        refresh(); // Refresh the list after deletion
      } catch (err) {
        console.error('Failed to remove CV:', err);
      }
    }
  };

  const handleUpload = async (file: File) => {
    try {
      await uploadUserCV(file);
      setIsUploadModalOpen(false);
      refresh(); // Refresh the list after upload
    } catch (err) {
      console.error('Failed to upload CV:', err);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Loading CVs...</div>;
  }

  return (
    <div className="w-full">
      {(error || actionError) && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          <span>{error || actionError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cvs.map((cv) => (
          <CVCard 
            key={cv.id} 
            cv={cv} 
            onRemove={handleRemove}
            disabled={actionLoading}
          />
        ))}
        
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          disabled={actionLoading}
          className="p-6 bg-white rounded-lg border border-gray-200 border-dashed hover:border-[#F5B544] transition-colors text-center group disabled:opacity-50 disabled:cursor-not-allowed h-full"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FFF8EE]">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#F5B544]" />
            </div>
            <span className="font-medium text-gray-900 group-hover:text-[#F5B544]">
              Upload New CV
            </span>
          </div>
        </button>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
        title="Upload CV"
        acceptedFileTypes=".pdf,.doc,.docx"
      />
    </div>
  );
}