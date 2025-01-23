import React from 'react';
import Layout from '../components/layout/Layout';
import InterviewQAList from '../components/documents/interviewQA/InterviewQAList';

export default function InterviewQAPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Interview Questions & Answers
        </h1>
        <InterviewQAList />
      </div>
    </Layout>
  );
}