import React, { useState } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { useInterviewForm } from '../../hooks/useInterviewForm';
import { InterviewDetails } from '../../types/interview';
import CVSelect from './CVSelect';

interface InterviewDetailsFormProps {
  onContinue: () => void;
}

const InterviewDetailsForm = ({ onContinue }: InterviewDetailsFormProps) => {
  const { loading, error, handleSave } = useInterviewForm();
  const [formData, setFormData] = useState<InterviewDetails>({
    cv: '',
    company: '',
    jobDescriptionLink: '',
    jobDescriptionText: '',
    interviewType: 'Technical - Product Manager'
  });

  const interviewTypes = [
    "Technical - Product Manager",
    "Product Sense",
    "Leadership & Strategy"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCVChange = (cvId: string) => {
    setFormData(prev => ({ ...prev, cv: cvId }));
  };

  const handleSubmit = async () => {
    try {
      await handleSave(formData);
      onContinue();
    } catch (err) {
      console.error('Failed to save interview details:', err);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-[200px,1fr] gap-6">
        <div className="text-gray-900 font-medium pt-3">
          Company you are interviewing for
        </div>
        <div className="flex justify-center">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            placeholder="Google"
          />
        </div>

        <div className="text-gray-900 font-medium pt-3">
          Job description for the role
        </div>
        <div className="flex flex-col items-center space-y-4">
          <input
            type="url"
            name="jobDescriptionLink"
            value={formData.jobDescriptionLink}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            placeholder="Insert the link to the job description"
          />
          <div className="text-gray-600">OR</div>
          <textarea
            name="jobDescriptionText"
            value={formData.jobDescriptionText}
            onChange={handleInputChange}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            placeholder="Copy paste the job description in a text format"
            rows={4}
          />
        </div>

        <div className="text-gray-900 font-medium pt-3">
          Type of interview round
        </div>
        <div className="flex justify-center">
          <div className="relative w-full">
            <select
              name="interviewType"
              value={formData.interviewType}
              onChange={handleInputChange}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
            >
              {interviewTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="text-gray-900 font-medium pt-3">
          CV you have applied with
        </div>
        <div className="flex justify-center">
          <CVSelect value={formData.cv} onChange={handleCVChange} />
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className={`px-6 py-3 bg-[#F5B544] text-black rounded-lg font-medium flex items-center gap-2 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0a832]'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default InterviewDetailsForm;