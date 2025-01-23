import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingTabs from '../components/onboarding/OnboardingTabs';
import UserInfoForm from '../components/onboarding/UserInfoForm';
import FinalStepForm from '../components/onboarding/FinalStepForm';
import { Bug } from 'lucide-react';
import { useOnboardingStatus } from '../hooks/useOnboardingStatus';
import { useAuth } from '../contexts/AuthContext';

const tabs = [
  { id: 1, title: "User Information" },
  { id: 2, title: "Final Steps" }
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { status, loading: statusLoading, error } = useOnboardingStatus();
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/', { replace: true });
      return;
    }

    if (!statusLoading && status) {
      if (status.user_info_completed && status.cv_uploaded) {
        navigate('/dashboard', { replace: true });
      } else if (status.user_info_completed) {
        setCurrentTab(2);
      }
    }
  }, [status, statusLoading, user, authLoading, navigate]);

  const loading = authLoading || statusLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">Error loading onboarding status. Please refresh the page.</div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentTab(2);
  };

  const handleBack = () => {
    setCurrentTab(1);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left section */}
      <div className="w-full lg:w-1/2 py-8 px-4 lg:py-12 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-2">
            <Bug className="w-6 h-6" />
            <span className="text-lg font-medium">InterviewBee</span>
          </div>
          
          <OnboardingTabs currentTab={currentTab} tabs={tabs} />
          
          {currentTab === 1 && <UserInfoForm onNext={handleNext} />}
          {currentTab === 2 && <FinalStepForm onBack={handleBack} />}
        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/2 bg-[#FFF8EE] py-8 px-4 lg:py-12 lg:px-8 flex flex-col gap-6 lg:gap-8">
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12 lg:w-16 lg:h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;