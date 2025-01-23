import React from 'react';

interface InterviewHeaderProps {
  role: string;
  company: string;
  interviewType: string;
  dateTime: string;
}

const InterviewHeader = ({ role, company, interviewType, dateTime }: InterviewHeaderProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div>
        <span className="text-gray-600">Role: </span>
        <span className="text-[#6366F1]">{role}</span>
      </div>
      <div className="text-right">
        <span className="text-gray-600">Company: </span>
        <span className="text-[#6366F1]">{company}</span>
      </div>
      <div>
        <span className="text-gray-600">Interview Type: </span>
        <span className="text-[#6366F1]">{interviewType}</span>
      </div>
      <div className="text-right">
        <span className="text-gray-600">Date/Time: </span>
        <span className="text-[#6366F1]">{dateTime}</span>
      </div>
    </div>
  );
};

export default InterviewHeader;