import React from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { useUserCVs } from '../../hooks/useUserCVs';

interface CVSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CVSelect({ value, onChange }: CVSelectProps) {
  const { loading, error, cvs } = useUserCVs();

  if (loading) {
    return (
      <div className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-500">
        Loading CVs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
      >
        <option value="">Select a CV</option>
        {cvs.map((cv) => (
          <option key={cv.id} value={cv.id}>
            {cv.name}
          </option>
        ))}
      </select>
      <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}