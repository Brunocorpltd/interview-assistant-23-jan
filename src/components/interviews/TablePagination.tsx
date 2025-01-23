import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationButton } from './PaginationButton';

interface TablePaginationProps {
  totalResults: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const TablePagination = ({ 
  totalResults, 
  currentPage, 
  itemsPerPage,
  onPageChange 
}: TablePaginationProps) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="text-sm text-gray-500">
        Show {startItem} to {endItem} of {totalResults} results
      </div>
      <div className="flex items-center gap-2">
        <PaginationButton 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </PaginationButton>

        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2">...</span>
          ) : (
            <PaginationButton
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </PaginationButton>
          )
        ))}

        <PaginationButton 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </PaginationButton>
      </div>
    </div>
  );
};