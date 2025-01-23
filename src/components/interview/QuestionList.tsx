import React from 'react';
import QuestionCard from './QuestionCard';
import { mockQuestions } from '../../data/mockQuestions';

interface QuestionListProps {
  searchQuery: string;
}

const QuestionList = ({ searchQuery }: QuestionListProps) => {
  const filteredQuestions = mockQuestions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 md:space-y-6 max-h-[calc(100vh-400px)] md:max-h-[calc(100vh-300px)] overflow-y-auto pr-2 md:pr-4">
      {filteredQuestions.map((qa, index) => (
        <QuestionCard
          key={qa.id}
          number={index + 1}
          question={qa.question}
          answer={qa.answer}
        />
      ))}
    </div>
  );
};

export default QuestionList;