import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SignUpPage from './pages/SignUpPage';
import Onboarding from './pages/Onboarding';
import DashboardPage from './pages/DashboardPage';
import Dashboard2Page from './pages/Dashboard2Page';
import LiveInterviewSetupPage from './pages/LiveInterviewSetupPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import MyInterviewsPage from './pages/MyInterviewsPage';
import InterviewAnalysisPage from './pages/InterviewAnalysisPage';
import DocumentsPage from './pages/DocumentsPage';
import CVFolderPage from './pages/CVFolderPage';
import JobDescriptionsPage from './pages/JobDescriptionsPage';
import InterviewQAPage from './pages/InterviewQAPage';
import ProfilePage from './pages/ProfilePage';
import TutorialsPage from './pages/TutorialsPage';
import FAQPage from './pages/FAQPage';
import LLMResponsePage from './pages/LLMResponsePage';
import AceInterviewPage from './pages/AceInterviewPage';
import ScheduleNextInterviewPage from './pages/ScheduleNextInterviewPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute requireOnboarding={false}>
                <Onboarding />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard2"
            element={
              <ProtectedRoute>
                <Dashboard2Page />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ace-interview"
            element={
              <ProtectedRoute>
                <AceInterviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/schedule-next-interview"
            element={
              <ProtectedRoute>
                <ScheduleNextInterviewPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/live-interview"
            element={
              <ProtectedRoute>
                <LiveInterviewSetupPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interview-prep"
            element={
              <ProtectedRoute>
                <InterviewPrepPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews"
            element={
              <ProtectedRoute>
                <MyInterviewsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/interviews/analysis/:id"
            element={
              <ProtectedRoute>
                <InterviewAnalysisPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/llm-response"
            element={
              <ProtectedRoute>
                <LLMResponsePage />
              </ProtectedRoute>
            }
          />

          <Route path="/documents">
            <Route 
              index 
              element={
                <ProtectedRoute>
                  <DocumentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="cvs" 
              element={
                <ProtectedRoute>
                  <CVFolderPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="job-descriptions" 
              element={
                <ProtectedRoute>
                  <JobDescriptionsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="interview-qa" 
              element={
                <ProtectedRoute>
                  <InterviewQAPage />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tutorials"
            element={
              <ProtectedRoute>
                <TutorialsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/faqs"
            element={
              <ProtectedRoute>
                <FAQPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}