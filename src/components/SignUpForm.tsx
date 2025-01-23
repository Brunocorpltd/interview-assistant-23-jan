import React from 'react';
import { Apple, Chrome } from 'lucide-react';

interface SignUpFormProps {
  onSignUp: () => void;
}

const SignUpForm = ({ onSignUp }: SignUpFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp();
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to InterviewBee</h2>
      <p className="text-gray-600 mb-6">Ace your live interviews with a bit of AI help.</p>
      
      <div className="space-y-4">
        <button 
          onClick={onSignUp}
          className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          <Chrome size={20} />
          Google
        </button>
        
        <button 
          onClick={onSignUp}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2.5 px-4 rounded-md hover:bg-gray-800 transition-colors"
        >
          <Apple size={20} />
          Apple
        </button>
        
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500">or sign up with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-200"
              placeholder="Enter your email to continue..."
            />
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            By clicking on "Create account", you agree{' '}
            <a href="#" className="text-blue-600 hover:underline">Terms</a> and{' '}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
          </div>
          
          <button 
            type="submit"
            className="w-full mt-4 bg-[#F5B544] text-black py-2.5 px-4 rounded-md hover:bg-[#f0a832] transition-colors"
          >
            Create account
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="#" className="text-[#F5B544] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;