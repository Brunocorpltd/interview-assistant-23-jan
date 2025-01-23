import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import DocumentGrid from '../components/documents/DocumentGrid';

const DocumentsPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">
          Access all your uploaded documents
        </h1>
        <DocumentGrid />
      </main>
    </div>
  );
};

export default DocumentsPage;