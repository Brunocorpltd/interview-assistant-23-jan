import React, { useState } from 'react';
import InterviewDetailsForm from './InterviewDetailsForm';
import ScheduleForm from './ScheduleForm';
import InterviewPrep from './InterviewPrep';

const LiveInterviewForm = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    role: 'Product Manager',
    cv: 'BM_Product_Manager_CV_1.pdf',
    company: '',
    jobDescriptionLink: '',
    jobDescriptionText: '',
    interviewType: 'Technical - Product Manager'
  });
  const [isScheduleEnabled, setIsScheduleEnabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    setIsScheduleEnabled(true);
    setActiveTab('schedule');
  };

  const handleBack = () => {
    setActiveTab('details');
  };

  const handleTabClick = (tab: string) => {
    if (tab === 'schedule' && !isScheduleEnabled) {
      return;
    }
    setActiveTab(tab);
  };

  if (activeTab === 'prep') {
    return (
      <InterviewPrep
        interviewDetails={{
          role: formData.role,
          company: formData.company || 'Google',
          interviewType: formData.interviewType,
          dateTime: '14/12/2024 11:00 AM (GMT +1)'
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="flex gap-8 mb-12">
        <button
          className={`pb-2 px-1 font-medium relative ${
            activeTab === 'details'
              ? 'text-black border-b-2 border-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => handleTabClick('details')}
        >
          Add Details
        </button>
        <button
          className={`pb-2 px-1 font-medium relative ${
            activeTab === 'schedule'
              ? 'text-black border-b-2 border-blue-600'
              : `text-gray-500 ${!isScheduleEnabled ? 'cursor-not-allowed opacity-50' : ''}`
          }`}
          onClick={() => handleTabClick('schedule')}
          disabled={!isScheduleEnabled}
        >
          Schedule
        </button>
      </div>

      {activeTab === 'details' ? (
        <InterviewDetailsForm
          formData={formData}
          onInputChange={handleInputChange}
          onContinue={handleContinue}
        />
      ) : (
        <ScheduleForm 
          onBack={handleBack}
          onSubmit={() => console.log('Submitted')}
        />
      )}
    </div>
  );
};

export default LiveInterviewForm;