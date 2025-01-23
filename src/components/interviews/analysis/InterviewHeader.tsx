import React from 'react';

interface InterviewHeaderProps {
  name: string;
  company: string;
  interviewDate: string;
  interviewType: string;
}

export default function InterviewHeader({
  name,
  company,
  interviewDate,
  interviewType
}: InterviewHeaderProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <div className="text-gray-600">Name:</div>
            <div className="font-medium">{name}</div>
          </div>
          <div>
            <div className="text-gray-600">Company:</div>
            <div className="font-medium">{company}</div>
          </div>
          <div>
            <div className="text-gray-600">Interview Date & Time:</div>
            <div className="font-medium">{interviewDate}</div>
          </div>
          <div>
            <div className="text-gray-600">Interview Type:</div>
            <div className="font-medium">{interviewType}</div>
          </div>
        </div>
      </div>
    </div>
  );
}