import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InterviewPrep from '../components/interview/InterviewPrep';

const InterviewPrepPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/live-interview');
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Ace your live interview</h1>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-200"
          >
            ← Back
          </button>
        </div>
        <InterviewPrep />
      </div>
    </Layout>
  );
};

export default InterviewPrepPage;