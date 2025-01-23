import React from 'react';
import { ActionButtonProps } from './types';

export const ActionButton = ({ status, onClick }: ActionButtonProps) => {
  const styles = {
    analyze: 'bg-[#F5B544] hover:bg-[#f0a832] text-black',
    activate: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  };

  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-lg text-sm font-medium ${styles[status]}`}
    >
      {status === 'analyze' ? 'Analyze' : 'Activate'}
    </button>
  );
};