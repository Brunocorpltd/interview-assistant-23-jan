import React from 'react';
import { Share2, Download, Mail } from 'lucide-react';
import InterviewHeader from './InterviewHeader';
import PerformanceReport from './PerformanceReport';
import InterviewRecording from './InterviewRecording';
import InterviewTranscript from './InterviewTranscript';

export default function InterviewAnalysis() {
  return (
    <div className="space-y-6">
      <InterviewHeader
        name="Bismayy Mohapatra"
        company="Google"
        interviewDate="03/01/2024 12:00 PM PST"
        interviewType="Technical Product Manager"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PerformanceReport
            overallScore={{ label: 'Very Good', range: '75% - 90%' }}
            metrics={{
              communication: 4.75,
              technicalDepth: 5.0,
              problemSolving: 4.5,
              behavioralFit: 4.0
            }}
            summary="Ipsum Lorem occaecat et velit ullamco non. Sint quis ullamco esse tempor eu commodo nisi eu velit dolore nisi. Excepteur reprehenderit Lorem ipsum et fugiat cillum laborum labore officia aliquip exercitation tempor. Minim exe"
            improvements="Ipsum Lorem occaecat et velit ullamco non. Sint quis ullamco esse tempor eu commodo nisi eu velit dolore nisi."
          />
        </div>

        <div className="space-y-6">
          <InterviewRecording />
          <InterviewTranscript />
        </div>
      </div>
    </div>
  );
}