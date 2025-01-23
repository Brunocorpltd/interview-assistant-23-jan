import React from 'react';

export default function InterviewTranscript() {
  const transcript = [
    "Thanks for the question.",
    "Bismayy Mohapatra, Platform Product Manager",
    "Led AI-powered e-commerce search engine development",
    "lorem ipsum lorem ipsum"
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Read the full transcription</h2>
      <div className="bg-[#FFF8EE] rounded-lg p-4 max-h-[400px] overflow-y-auto">
        <ul className="space-y-2">
          {transcript.map((line, index) => (
            <li key={index} className="text-gray-700">{line}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}