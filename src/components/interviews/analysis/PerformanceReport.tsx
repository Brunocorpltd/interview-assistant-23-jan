import React from 'react';
import { Share2, Download, Mail } from 'lucide-react';
import ScoreCircle from './ScoreCircle';

interface PerformanceReportProps {
  overallScore: {
    label: string;
    range: string;
  };
  metrics: {
    communication: number;
    technicalDepth: number;
    problemSolving: number;
    behavioralFit: number;
  };
  summary: string;
  improvements: string;
}

export default function PerformanceReport({
  overallScore,
  metrics,
  summary,
  improvements
}: PerformanceReportProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl font-semibold">Interview Performance Report</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Share2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="text-gray-600 mb-2">Overall Performance:</div>
        <div className="flex items-center gap-2">
          <span className="text-green-500 font-medium">{overallScore.label}</span>
          <span className="text-gray-500">({overallScore.range})</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mb-8">
        <ScoreCircle label="Communication" score={metrics.communication} />
        <ScoreCircle label="Technical Depth" score={metrics.technicalDepth} />
        <ScoreCircle label="Problem-Solving" score={metrics.problemSolving} />
        <ScoreCircle label="Behavioral Fit" score={metrics.behavioralFit} />
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">Interview Summary</h3>
          <p className="text-gray-600">{summary}</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Areas of Improvement</h3>
          <p className="text-gray-600">{improvements}</p>
        </div>
      </div>
    </div>
  );
}