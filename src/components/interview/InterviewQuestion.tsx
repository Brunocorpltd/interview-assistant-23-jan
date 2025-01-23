import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';

interface InterviewQuestionProps {
  number: number;
  question: string;
  answer: string;
  onEdit: () => void;
}

const InterviewQuestion = ({ number, question, answer, onEdit }: InterviewQuestionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div 
        className="p-4 cursor-pointer flex justify-between items-start"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="font-medium text-gray-900">
            {number}. {question}
          </h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
        />
      </div>

      {isExpanded && (
        <div className="p-4 pt-0">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  Was this answer accurate and helpful?
                </span>
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <ThumbsUp className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded-full">
                  <ThumbsDown className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors"
              >
                Edit the answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestion;