import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';

export default function AceInterviewPage() {
  const navigate = useNavigate();
  const [showSetupModal, setShowSetupModal] = useState(true);

  const handleSetupNew = () => {
    navigate('/live-interview');
  };

  const handleScheduleNext = () => {
    navigate('/schedule-next-interview');
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          Ace your live interview
        </h1>

        {/* Setup Modal */}
        {showSetupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full relative">
              <button
                onClick={() => setShowSetupModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8">
                <h2 className="text-2xl font-semibold text-center mb-12">
                  What would you like to setup?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Setup New Interview */}
                  <button
                    onClick={handleSetupNew}
                    className="group p-8 bg-[#FFF8EE] rounded-lg text-center hover:bg-[#F5B544]/10 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center">
                      <Plus className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      Setup a new interview
                    </h3>
                    <p className="text-gray-600">
                      Choose this flow if you will appear for a new role or in a new company and haven't setup the interview earlier in InterviewBee
                    </p>
                  </button>

                  {/* Schedule Next Round */}
                  <button
                    onClick={handleScheduleNext}
                    className="group p-8 bg-[#FFF8EE] rounded-lg text-center hover:bg-[#F5B544]/10 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4">
                      Schedule next interview round
                    </h3>
                    <p className="text-gray-600">
                      Choose this flow if you will appear for the next round of an existing interview that's already setup in InterviewBee
                    </p>
                  </button>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowSetupModal(false)}
                    className="px-6 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors flex items-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}