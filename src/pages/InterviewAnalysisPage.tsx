import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InterviewAnalysis from '../components/interviews/analysis/InterviewAnalysis';

export default function InterviewAnalysisPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/interviews');
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            Evaluate and learn from your past interviews
          </h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            ← Back
          </button>
        </div>
        <InterviewAnalysis />
      </div>
    </Layout>
  );
}