import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { mockInterviews } from '../data/mockInterviews';

export default function Dashboard2Page() {
  const navigate = useNavigate();
  
  const upcomingInterviews = mockInterviews.filter(interview => 
    interview.type === 'Live' || interview.type === 'In Draft'
  );
  const pastInterviews = mockInterviews.filter(interview => 
    interview.type === 'Mock'
  );

  const handleAnalyze = (id: string) => {
    navigate(`/interviews/analysis/${id}`);
  };

  const handleLaunch = () => {
    navigate('/llm-response');
  };

  const handleAceInterview = () => {
    navigate('/ace-interview'); // This will be the new route for the "Ace your next interview" button
  };

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Your path to interview success</h1>

        <div className="bg-white rounded-lg p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold mb-2">Configure InterviewBee for a new live interview</h2>
            <p className="text-gray-600">Ace your live interviews with InterviewBee's AI assistance to prompt you accurate and relevant talking points</p>
          </div>
          <button 
            onClick={handleAceInterview}
            className="px-6 py-2 bg-[#F5B544] text-black rounded-lg font-medium"
          >
            Ace your next interview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Interviews */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4">Your Upcoming Interviews</h2>
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left font-medium text-gray-500 pb-4 border-b border-gray-200">INTERVIEW NAME</th>
                      <th className="text-left font-medium text-gray-500 pb-4 border-b border-gray-200">DATE</th>
                      <th className="w-24 border-b border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingInterviews.map((interview) => (
                      <tr key={interview.id} className="border-b border-gray-200">
                        <td className="py-4 text-sm">{interview.role} @ {interview.company}</td>
                        <td className="py-4 text-sm">{interview.date}</td>
                        <td className="py-4">
                          <button 
                            onClick={handleLaunch}
                            className="w-full mb-1 px-3 py-1 bg-[#F5B544] text-black rounded text-xs font-medium"
                          >
                            Launch
                          </button>
                          <button className="w-full px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            Prepare QnA
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-2">
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">View all upcoming scheduled interviews →</a>
              </div>
            </div>
          </div>

          {/* Past Interviews */}
          <div className="bg-white rounded-lg p-6 flex flex-col h-full">
            <h2 className="text-lg font-semibold mb-4">Your Past Interviews</h2>
            <div className="flex-1 flex flex-col">
              <div className="flex-1">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left font-medium text-gray-500 pb-4 border-b border-gray-200">INTERVIEW NAME</th>
                      <th className="text-left font-medium text-gray-500 pb-4 border-b border-gray-200">DATE</th>
                      <th className="w-24 border-b border-gray-200"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastInterviews.map((interview) => (
                      <tr key={interview.id} className="border-b border-gray-200">
                        <td className="py-4 text-sm">{interview.role} @ {interview.company}</td>
                        <td className="py-4 text-sm">{interview.date}</td>
                        <td className="py-4">
                          <button 
                            onClick={() => handleAnalyze(interview.id)}
                            className="w-full px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                          >
                            Analyze Report
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-2">
                <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">View all past completed interviews →</a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interview Performance */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Your Interview Performance</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">8<span className="text-lg text-gray-500">/10</span></div>
                <div className="text-sm text-gray-600">Live Interviews<br />Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.5<span className="text-lg text-gray-500">/5</span></div>
                <div className="text-sm text-gray-600">Avg. Performance<br />Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2</div>
                <div className="text-sm text-gray-600">Interviews<br />Cracked</div>
              </div>
            </div>
          </div>

          {/* Help Center */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Help Center</h2>
            <div className="space-y-4">
              <p>Need help? <a href="#" className="text-[#F5B544] hover:underline">Check our video tutorials</a></p>
              <p>Looking to prepare for mock interview? <a href="#" className="text-[#F5B544] hover:underline">Click here</a></p>
              <p>Want to upload a new CV? <a href="#" className="text-[#F5B544] hover:underline">Upload</a></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}