import React from 'react';
import Layout from '../components/layout/Layout';
import JobDescriptionList from '../components/documents/jobDescriptions/JobDescriptionList';

export default function JobDescriptionsPage() {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Job Descriptions
        </h1>
        <JobDescriptionList />
      </div>
    </Layout>
  );
}