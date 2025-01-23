import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import InterviewCard from '../components/dashboard/InterviewCard';
import GetStartedCard from '../components/dashboard/GetStartedCard';
import MicrophoneAccessBanner from '../components/dashboard/MicrophoneAccessBanner';
import MicrophoneAccessModal from '../components/dashboard/MicrophoneAccessModal';
import { useMicrophoneAccess } from '../hooks/useMicrophoneAccess';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { hasAccess, requestAccess } = useMicrophoneAccess();

  const handleLiveInterview = () => {
    navigate('/live-interview');
  };

  const handleEnableAccess = async () => {
    const granted = await requestAccess();
    if (granted) {
      setIsModalOpen(false);
    }
  };

  return (
    <Layout>
      <div>
        {!hasAccess && (
          <MicrophoneAccessBanner onEnableClick={() => setIsModalOpen(true)} />
        )}

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
          Let the magic begin with AI Bees
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <InterviewCard
            title="Live Interview"
            features={[
              "Supports all major video interview assessment platforms",
              "Stay undetected, even when you share your screen"
            ]}
            buttonText="Ace your interview"
            onButtonClick={handleLiveInterview}
            variant="highlight"
          />
          
          <InterviewCard
            title="Mock Interview"
            features={[
              "AI powered questions personalized for your Role, Seniority, Company, Domain",
              "Repository of real interview questions",
              "Mock interview performance insights & recommendations"
            ]}
            buttonText="Prepare with AI"
            onButtonClick={() => {}}
          />
        </div>

        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
          How to get started?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <GetStartedCard
            title="Easy setup for your live interview"
            steps={[
              "Add/link the job description for the role",
              "Schedule on calendar",
              "Activate the AI Bee before interview"
            ]}
            onWatch={() => {}}
          />
          
          <GetStartedCard
            title="Prepare for mock interviews"
            steps={[
              "Add/link the job description for the role",
              "Attend AI simulated interview rounds",
              "Talk real-time to AI Bee and prep well"
            ]}
            onWatch={() => {}}
          />
        </div>

        <MicrophoneAccessModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEnable={handleEnableAccess}
        />
      </div>
    </Layout>
  );
};

export default DashboardPage;