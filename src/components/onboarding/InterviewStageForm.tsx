import React from 'react';
import { Briefcase, Rocket } from 'lucide-react';

interface InterviewStageFormProps {
  onNext: () => void;
  onBack: () => void;
}

const InterviewStageForm = ({ onNext, onBack }: InterviewStageFormProps) => {
  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Which stage are you in the interview journey?</h1>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <label className="relative group cursor-pointer">
            <input type="radio" name="stage" className="peer sr-only" />
            <div className="p-6 border border-gray-200 rounded-lg peer-checked:border-[#F5B544] peer-checked:border-2 hover:border-[#F5B544] transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <Briefcase className="w-8 h-8 text-[#F5B544]" />
                <span className="font-medium">Actively interviewing</span>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 peer-checked:opacity-100">
                <div className="w-5 h-5 bg-[#F5B544] rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </label>

          <label className="relative group cursor-pointer">
            <input type="radio" name="stage" className="peer sr-only" />
            <div className="p-6 border border-gray-200 rounded-lg peer-checked:border-[#F5B544] peer-checked:border-2 hover:border-[#F5B544] transition-colors">
              <div className="flex flex-col items-center text-center gap-4">
                <Rocket className="w-8 h-8 text-[#F5B544]" />
                <span className="font-medium">Preparing for a switch</span>
              </div>
            </div>
          </label>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Add upto 5 companies that you are currently interviewing for (optional)
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 pr-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
              placeholder="Google"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-600 font-medium flex items-center gap-2"
          >
            ← Back
          </button>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-[#F5B544] text-black rounded-lg font-medium flex items-center gap-2"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewStageForm;