import React from 'react';
import Layout from '../components/layout/Layout';
import FAQList from '../components/faq/FAQList';
import EmailSupport from '../components/faq/EmailSupport';

export default function FAQPage() {
  return (
    <Layout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Your questions answered</h1>
        <div className="max-w-3xl">
          <FAQList />
          <EmailSupport />
        </div>
      </div>
    </Layout>
  );
}