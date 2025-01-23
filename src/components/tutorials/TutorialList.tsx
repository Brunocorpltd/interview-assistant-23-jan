import React from 'react';
import TutorialCard from './TutorialCard';
import { tutorials } from '../../data/tutorials';

export default function TutorialList() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">How-to video tutorials</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id}
            {...tutorial}
          />
        ))}
      </div>
    </div>
  );
}