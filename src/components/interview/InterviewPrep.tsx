import React, { useState } from 'react';
import { Search } from 'lucide-react';
import QuestionList from './QuestionList';

const InterviewPrep = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl">
      {/* Interview Details */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2 md:space-y-0">
            <div>
              <span className="text-gray-600">Role: </span>
              <span className="text-[#6366F1]">Product Manager</span>
            </div>
            <div className="md:mt-4">
              <span className="text-gray-600">Interview Type: </span>
              <span className="text-[#6366F1]">Technical - Product Manager</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2 md:space-y-0 md:text-right">
            <div>
              <span className="text-gray-600">Company: </span>
              <span className="text-[#6366F1]">Google</span>
            </div>
            <div className="md:mt-4">
              <span className="text-gray-600">Date/Time: </span>
              <span className="text-[#6366F1]">14/12/2024 11:00 AM (GMT +1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-8 mb-6 md:mb-8">
        <h2 className="text-base md:text-lg max-w-2xl">
          Let's make you ready. AI Bees matches your CV and job description smartly
          to generate the top 5 relevant interview questions and sample answers.
        </h2>
        
        <div className="w-full md:w-80 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Questions List */}
      <QuestionList searchQuery={searchQuery} />

      {/* Launch Button */}
      <div className="mt-6 md:mt-8 flex items-center justify-center gap-4">
        <span className="font-bold text-gray-900 text-sm md:text-base">Launch your live Interview Bee</span>
        <button className="px-4 md:px-6 py-2 md:py-3 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors text-sm md:text-base">
          Launch
        </button>
      </div>
    </div>
  );
};

export default InterviewPrep;