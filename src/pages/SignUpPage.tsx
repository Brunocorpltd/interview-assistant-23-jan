import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import Testimonial from '../components/Testimonial';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { AlertCircle } from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { handleSocialAuth, loading, error } = useSupabaseAuth();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  const handleSuccess = () => {
    navigate('/onboarding', { replace: true });
  };

  const toggleMode = () => {
    setMode(mode === 'signIn' ? 'signUp' : 'signIn');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Content Section */}
      <div className="w-full lg:w-1/2 flex-shrink-0 flex flex-col justify-center p-6 lg:px-12 relative">
        <div className="max-w-xl mx-auto space-y-8 lg:space-y-12">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">
              The <span className="italic">must</span> AI co-pilot for your{' '}
              <span className="relative">
                <span className="line-through decoration-[4px] decoration-red-500 [text-decoration-skip-ink:none] [text-decoration-thickness:4px] [text-underline-offset:12px]">mock</span>{' '}
              </span>
              <span className="italic">live</span>{' '}
              interview.
            </h1>
          </div>

          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <button className="w-12 h-12 lg:w-16 lg:h-16 bg-black rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-6 border-b-6 lg:border-t-8 lg:border-b-8 border-l-8 lg:border-l-12 border-transparent border-l-white ml-1"></div>
            </button>
          </div>

          <div className="hidden lg:block">
            <Testimonial />
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="w-full lg:w-1/2 bg-[#FFF8EE] flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md bg-white rounded-lg p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
            Welcome to InterviewBee
          </h2>
          <p className="text-gray-600 mb-6">
            Ace your live interviews with a bit of AI help.
          </p>

          {error && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <button 
              onClick={() => handleSocialAuth('google')}
              className="w-full h-11 flex items-center bg-[#F5B544] hover:bg-[#f0a832] text-black rounded-lg transition-colors relative overflow-hidden"
            >
              <div className="h-full aspect-square bg-gray-100 flex items-center justify-center">
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google" 
                  className="w-5 h-5"
                />
              </div>
              <span className="flex-1 text-center font-medium">Continue with Google</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-500">
                or {mode === 'signIn' ? 'sign in' : 'sign up'} with
              </span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <AuthForm mode={mode} onSuccess={handleSuccess} />

            <div className="text-center text-sm">
              {mode === 'signIn' ? (
                <p className="text-gray-600">
                  New to InterviewBee?{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-[#F5B544] hover:underline font-medium"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button 
                    onClick={toggleMode}
                    className="text-[#F5B544] hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}