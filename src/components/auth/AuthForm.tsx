import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
  onSuccess: () => void;
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showResetMessage, setShowResetMessage] = useState(false);
  const { signIn, signUp } = useAuth();

  const validations = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /\d/.test(password), text: 'One number' },
    { met: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'One special character' }
  ];

  const isPasswordValid = mode === 'signIn' ? password.length > 0 : validations.every(v => v.met);
  const isFormValid = email.length > 0 && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signUp' && !isPasswordValid) {
      setError('Please ensure your password meets all requirements');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signUp') {
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        navigate('/onboarding', { replace: true });
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowResetMessage(true);
    setTimeout(() => setShowResetMessage(false), 3000);
  };

  const ValidationItem = ({ met, text }: { met: boolean; text: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {met ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-gray-300" />
      )}
      <span className={met ? 'text-green-500' : 'text-gray-500'}>{text}</span>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-2.5 lg:p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {showResetMessage && (
        <div className="p-2.5 lg:p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
          <Check className="w-4 h-4" />
          <span className="text-sm">Password reset link has been sent to your email</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          className="w-full px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
          placeholder="Enter your email to continue..."
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          {mode === 'signIn' && (
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-[#F5B544] hover:underline"
            >
              Forgot Password?
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-3 py-2 bg-gray-100 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
            placeholder="Enter your password..."
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {mode === 'signUp' && isFocused && (
          <div className="mt-2 space-y-1">
            {validations.map((validation, index) => (
              <ValidationItem key={index} {...validation} />
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || !isFormValid}
        className="w-full bg-[#F5B544] text-black py-2.5 px-4 rounded-lg hover:bg-[#f0a832] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? 'Please wait...' : mode === 'signIn' ? 'Sign in' : 'Sign up'}
      </button>
    </form>
  );
}