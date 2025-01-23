import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterviewFilters } from '../../hooks/useInterviewFilters';
import { SearchBar } from './SearchBar';
import FilterDropdown from './InterviewFilters';
import { InterviewTable } from './InterviewTable';
import { TablePagination } from './TablePagination';

const ITEMS_PER_PAGE = 5;

export const InterviewList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    filters,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedRole,
    setSelectedRole,
    selectedCompany,
    setSelectedCompany,
    filteredInterviews
  } = useInterviewFilters();

  const handleAnalyze = (id: string) => {
    navigate(`/interviews/analysis/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6">List of live and mock interviews</h2>
      
      <div className="flex items-center gap-4 mb-8">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="flex gap-4">
          <FilterDropdown
            label="Status"
            options={['All', 'Upcoming', 'Completed']}
            value={selectedType}
            onChange={setSelectedType}
          />
          <FilterDropdown
            label="Type"
            options={['All', ...filters.types]}
            value={selectedType}
            onChange={setSelectedType}
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
        <InterviewTable 
          interviews={filteredInterviews}
          onAnalyze={handleAnalyze}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
        />
        <TablePagination
          totalResults={filteredInterviews.length}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default InterviewList;