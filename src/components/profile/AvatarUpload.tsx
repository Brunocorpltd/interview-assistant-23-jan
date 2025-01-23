import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';

interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onUpload: (file: File) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export default function AvatarUpload({ 
  currentAvatarUrl, 
  onUpload, 
  onDelete,
  disabled 
}: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(currentAvatarUrl || null);
  }, [currentAvatarUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      onUpload(file);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    onDelete();
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-8 h-8 text-gray-400" />
        )}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Profile picture</p>
        <p className="text-xs text-gray-400">PNG, JPEG under 15MB</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="px-4 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Upload new picture
        </button>
        {previewUrl && (
          <button
            onClick={handleDelete}
            disabled={disabled}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/png,image/jpeg"
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
}