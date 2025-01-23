import React from 'react';
import FAQItem from './FAQItem';
import { faqs } from '../../data/faqs';

export default function FAQList() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-6">List of FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <FAQItem
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}