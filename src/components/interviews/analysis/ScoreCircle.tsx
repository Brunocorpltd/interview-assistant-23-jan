import React from 'react';

interface ScoreCircleProps {
  label: string;
  score: number;
}

export default function ScoreCircle({ label, score }: ScoreCircleProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full bg-[#F5B544] flex items-center justify-center mb-2">
        <span className="text-2xl font-bold">{score.toFixed(1)}</span>
      </div>
      <span className="text-gray-600">{label}</span>
    </div>
  );
}