import React, { useState } from 'react';
import { useInterviewQAFilters } from '../../../hooks/useInterviewQAFilters';
import { SearchBar } from '../../interviews/SearchBar';
import FilterDropdown from '../../interviews/InterviewFilters';
import { TablePagination } from '../../interviews/TablePagination';
import UploadModal from '../shared/UploadModal';

const ITEMS_PER_PAGE = 5;

export default function InterviewQAList() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    filters,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    selectedRole,
    setSelectedRole,
    selectedType,
    setSelectedType,
    filteredInterviewQA
  } = useInterviewQAFilters();

  const handleUpload = (file: File) => {
    console.log('Uploading interview Q&A:', file);
    setIsUploadModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedQAs = filteredInterviewQA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="grid grid-cols-3 md:flex gap-4">
          <FilterDropdown
            label="Date"
            options={['All', ...filters.dates]}
            value={selectedDate}
            onChange={setSelectedDate}
          />
          <FilterDropdown
            label="Role"
            options={['All', ...filters.roles]}
            value={selectedRole}
            onChange={setSelectedRole}
          />
          <FilterDropdown
            label="Type"
            options={['All', ...filters.types]}
            value={selectedType}
            onChange={setSelectedType}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">S.No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Q&A ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DATE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ROLE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">TYPE</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {displayedQAs.map((qa, index) => (
                <tr key={qa.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-sm text-gray-600">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 text-sm">{qa.id}</td>
                  <td className="px-4 py-3 text-sm">{qa.date}</td>
                  <td className="px-4 py-3 text-sm">{qa.role}</td>
                  <td className="px-4 py-3 text-sm">{qa.type}</td>
                  <td className="px-4 py-3">
                    <button className="px-4 py-1.5 bg-[#F5B544] hover:bg-[#f0a832] text-black rounded-lg text-sm font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination
          totalResults={filteredInterviewQA.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Want to add new interview questions?{' '}
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
        title="Upload Interview Q&A"
        acceptedFileTypes=".pdf,.doc,.docx,.txt"
      />
    </div>
  );
}