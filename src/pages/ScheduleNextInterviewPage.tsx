import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';

export default function ScheduleNextInterviewPage() {
  const navigate = useNavigate();
  const [allowReminder, setAllowReminder] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSchedule = () => {
    setShowConfirmation(true);
  };

  const handleSkipToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContinueToMockQnA = () => {
    navigate('/interview-prep');
  };

  if (showConfirmation) {
    return (
      <Layout>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Ace your live interview
          </h1>

          <div className="max-w-3xl">
            <h2 className="text-xl font-semibold mb-12">
              Here's what you can expect as next steps
            </h2>

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5B544] text-black flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    You'll receive an email confirmation with a link to open the InterviewBee app and get ready.
                  </h3>
                  <p className="text-gray-600">
                    A reminder event has been set on your calendar 10 minutes prior to the actual interview event and you'll also receive an email for reminder.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#F5B544] text-black flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    <span className="text-[#6366F1] font-normal">Recommended:</span>{' '}
                    Access and review mock QnA to think and answer like you
                  </h3>
                  <p className="text-gray-600">
                    You'll find the top 5 relevant interview questions and sample answers generated by InterviewBee. You can modify the answers to improve accuracy and genuineness during the live interview.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleSkipToDashboard}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Skip to Dashboard
                </button>
                <button
                  onClick={handleContinueToMockQnA}
                  className="px-6 py-3 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors flex items-center gap-2"
                >
                  Continue to Mock QnA <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Ace your live interview
        </h1>

        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold mb-8">
            Quick Setup for the next interview round
          </h2>

          <div className="space-y-12">
            {/* Previous Interview Selection */}
            <div className="space-y-2">
              <label className="block text-gray-900 font-medium">
                Select previous interview setup on InterviewBee
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 bg-white border border-[#F5B544] rounded-lg appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#F5B544]"
                  defaultValue="Product Manager - Google - 5th Jan"
                >
                  <option>Product Manager - Google - 5th Jan</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Interview Type Selection */}
            <div className="space-y-2">
              <label className="block text-gray-900 font-medium">
                Type of interview round
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 bg-white border border-[#F5B544] rounded-lg appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#F5B544]"
                  defaultValue="Technical - Product Manager"
                >
                  <option>Technical - Product Manager</option>
                  <option>System Design</option>
                  <option>Behavioral</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Calendar Selection */}
            <div className="space-y-2">
              <label className="block text-gray-900 font-medium">
                Select the interview time slot on your calendar
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 bg-white border border-[#F5B544] rounded-lg appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#F5B544]"
                  defaultValue="Google PM Round 2 [Bismayy]"
                >
                  <option>Google PM Round 2 [Bismayy]</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-sm mt-2">
                <span className="text-gray-600">Connect other calendars:</span>
                <a href="#" className="underline hover:no-underline">Apple Calendar</a>
                <a href="#" className="underline hover:no-underline">Outlook Calendar</a>
              </div>
            </div>

            {/* Reminder Option */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-900 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowReminder}
                  onChange={(e) => setAllowReminder(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#F5B544] focus:ring-[#F5B544]"
                />
                Allow Bees to schedule a reminder on your calendar
              </label>
            </div>

            {/* Schedule Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSchedule}
                className="px-6 py-3 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors flex items-center gap-2"
              >
                Schedule Interview <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}