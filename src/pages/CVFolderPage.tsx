import React from 'react';
import Layout from '../components/layout/Layout';
import CVGrid from '../components/documents/cv/CVGrid';

const CVFolderPage = () => {
  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Upload and save your recent CV
        </h1>
        <CVGrid />
      </div>
    </Layout>
  );
};

export default CVFolderPage;