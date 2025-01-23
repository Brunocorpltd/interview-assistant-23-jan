import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { mockCVs } from '../../../data/mockCVs';
import FilterDropdown from '../../common/FilterDropdown';
import UploadModal from './UploadModal';

export default function CVList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const roles = Array.from(new Set(mockCVs.map(cv => cv.role)));
  const dates = Array.from(new Set(mockCVs.map(cv => cv.date)));

  const handleUpload = (file: File) => {
    // Here you would typically handle the file upload
    console.log('Uploading file:', file);
    // After successful upload, you would refresh the CV list
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">List of uploaded CVs</h2>
      
      {/* Search and Filters */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CV list"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
          />
        </div>
        <FilterDropdown
          label="Date"
          options={dates}
          value={selectedDate}
          onChange={setSelectedDate}
        />
        <FilterDropdown
          label="Role"
          options={roles}
          value={selectedRole}
          onChange={setSelectedRole}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-8 p-4">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">CV ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DATE</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ROLE</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {mockCVs.map((cv) => (
              <tr key={cv.id} className="border-b border-gray-200">
                <td className="w-8 p-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-4 py-3 text-sm">{cv.id}</td>
                <td className="px-4 py-3 text-sm">{cv.date}</td>
                <td className="px-4 py-3 text-sm">{cv.role}</td>
                <td className="px-4 py-3">
                  <button className="px-4 py-1.5 bg-[#F5B544] hover:bg-[#f0a832] text-black rounded-lg text-sm font-medium">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Show 1 to {mockCVs.length} of {mockCVs.length} results
          </div>
        </div>
      </div>

      {/* Upload New CV Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Looking to upload a new CV?{' '}
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="text-[#F5B544] hover:underline font-medium"
          >
            Upload
          </button>
        </p>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}