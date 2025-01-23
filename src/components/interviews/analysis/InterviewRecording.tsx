import React from 'react';

export default function InterviewRecording() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">Watch the Interview recording</h2>
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
        <button className="px-6 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832]">
          Watch
        </button>
      </div>
    </div>
  );
}