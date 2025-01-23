import React from 'react';
import Layout from '../components/layout/Layout';
import InterviewList from '../components/interviews/InterviewList';

const MyInterviewsPage = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Evaluate and learn from your past interviews
        </h1>
        <InterviewList />
      </div>
    </Layout>
  );
};

export default MyInterviewsPage;