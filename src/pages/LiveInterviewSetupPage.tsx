import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LiveInterviewForm from '../components/interview/LiveInterviewForm';

const LiveInterviewSetupPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Ace your interview with Live Interview Bee
        </h1>
        <LiveInterviewForm />
      </div>
    </Layout>
  );
};

export default LiveInterviewSetupPage;