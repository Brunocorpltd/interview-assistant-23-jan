import React from 'react';

interface PaginationButtonProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const PaginationButton = ({ 
  children, 
  active = false, 
  disabled = false,
  onClick
}: PaginationButtonProps) => (
  <button 
    onClick={onClick}
    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors
      ${active ? 'bg-[#F5B544] text-black' : 'text-gray-600 hover:bg-gray-100'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `}
    disabled={disabled}
  >
    {children}
  </button>
);