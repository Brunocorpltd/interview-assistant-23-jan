import React from 'react';
import { InterviewTypeProps } from './types';

export const InterviewType = ({ type }: InterviewTypeProps) => {
  const colors = {
    Mock: 'text-[#B45F06] bg-[#FFF3E0]',
    Live: 'text-[#1E8E3E] bg-[#E6F4EA]',
    'In Draft': 'text-gray-600 bg-gray-100'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${colors[type as keyof typeof colors]}`}>
      {type}
    </span>
  );
};