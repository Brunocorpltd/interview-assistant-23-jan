import React, { useState } from 'react';
import { useJobDescriptionFilters } from '../../../hooks/useJobDescriptionFilters';
import { SearchBar } from '../../interviews/SearchBar';
import FilterDropdown from '../../interviews/InterviewFilters';
import { TablePagination } from '../../interviews/TablePagination';
import UploadModal from '../shared/UploadModal';

const ITEMS_PER_PAGE = 5;

export default function JobDescriptionList() {
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
    selectedCompany,
    setSelectedCompany,
    filteredJobDescriptions
  } = useJobDescriptionFilters();

  const handleUpload = (file: File) => {
    console.log('Uploading job description:', file);
    setIsUploadModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedJDs = filteredJobDescriptions.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
            label="Company"
            options={['All', ...filters.companies]}
            value={selectedCompany}
            onChange={setSelectedCompany}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">S.No</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">JD ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DATE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ROLE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">COMPANY</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {displayedJDs.map((jd, index) => (
                <tr key={jd.id} className="border-b border-gray-200">
                  <td className="px-4 py-3 text-sm text-gray-600">{startIndex + index + 1}</td>
                  <td className="px-4 py-3 text-sm">{jd.id}</td>
                  <td className="px-4 py-3 text-sm">{jd.date}</td>
                  <td className="px-4 py-3 text-sm">{jd.role}</td>
                  <td className="px-4 py-3 text-sm">{jd.company}</td>
                  <td className="px-4 py-3">
                    <button className="px-4 py-1.5 bg-[#F5B544] hover:bg-[#f0a832] text-black rounded-lg text-sm font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TablePagination
          totalResults={filteredJobDescriptions.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Looking to upload a new job description?{' '}
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
        title="Upload Job Description"
        acceptedFileTypes=".pdf,.doc,.docx,.txt"
      />
    </div>
  );
}