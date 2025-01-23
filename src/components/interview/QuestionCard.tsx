import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface QuestionCardProps {
  number: number;
  question: string;
  answer: string;
}

const QuestionCard = ({ number, question, answer }: QuestionCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const handleSave = () => {
    // Here you would typically save the edited answer
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-4 text-sm md:text-base">
          {number}. {question}
        </h3>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          {isEditing ? (
            <div className="space-y-4">
              <textarea
                value={editedAnswer}
                onChange={(e) => setEditedAnswer(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent min-h-[120px] text-sm md:text-base"
                placeholder="Type your answer here..."
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] text-sm md:text-base"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-700 whitespace-pre-wrap text-sm md:text-base">{editedAnswer}</p>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2 md:gap-4">
                  <span className="text-xs md:text-sm text-gray-500">
                    Was this answer accurate and helpful?
                  </span>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded-full">
                    <ThumbsDown className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                  </button>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] text-sm md:text-base"
                >
                  Edit the answer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;