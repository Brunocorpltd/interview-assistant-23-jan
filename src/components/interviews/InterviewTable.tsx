import React from 'react';
import { Interview } from './types';

interface InterviewTableProps {
  interviews: Interview[];
  onAnalyze: (id: string) => void;
  currentPage: number;
  itemsPerPage: number;
}

export const InterviewTable = ({ 
  interviews, 
  onAnalyze, 
  currentPage, 
  itemsPerPage 
}: InterviewTableProps) => {
  const startIndex = (currentPage - 1) * itemsPerPage;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'text-purple-600';
      case 'Completed':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getActionButton = (status: string, onAnalyze: () => void) => {
    if (status === 'Upcoming') {
      return (
        <button className="px-4 py-1.5 bg-[#F5B544] hover:bg-[#f0a832] text-black rounded-lg text-sm font-medium">
          Launch
        </button>
      );
    }
    return (
      <button 
        onClick={onAnalyze}
        className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
      >
        Analyze Report
      </button>
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'Live' ? 'text-green-600' : 'text-[#B45F06]';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">INTERVIEW NAME</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">DATE</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">TYPE</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">ROLE</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">COMPANY</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">STATUS</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {interviews.slice(startIndex, startIndex + itemsPerPage).map((interview, index) => (
            <tr key={interview.id} className="border-b border-gray-200">
              <td className="px-4 py-3 text-sm">
                Product Manager - Google - 7th Jan
              </td>
              <td className="px-4 py-3 text-sm">{interview.date}</td>
              <td className={`px-4 py-3 text-sm ${getTypeColor(interview.type)}`}>
                {interview.type}
              </td>
              <td className="px-4 py-3 text-sm">{interview.role}</td>
              <td className="px-4 py-3 text-sm">{interview.company}</td>
              <td className={`px-4 py-3 text-sm ${getStatusColor(interview.status === 'analyze' ? 'Completed' : 'Upcoming')}`}>
                {interview.status === 'analyze' ? 'Completed' : 'Upcoming'}
              </td>
              <td className="px-4 py-3">
                {getActionButton(
                  interview.status === 'analyze' ? 'Completed' : 'Upcoming',
                  () => onAnalyze(interview.id)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};