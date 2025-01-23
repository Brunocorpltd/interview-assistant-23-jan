import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange: (isValid: boolean) => void;
  mode: 'signIn' | 'signUp';
}

export default function PasswordInput({ 
  value, 
  onChange, 
  onValidationChange,
  mode 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
  const isValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

  React.useEffect(() => {
    onValidationChange(isValid);
  }, [isValid, onValidationChange]);

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
    <div>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-3 py-2 bg-gray-100 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
          placeholder="Enter your password..."
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>

      {mode === 'signUp' && (isFocused || value.length > 0) && (
        <div className="mt-2 space-y-1">
          <ValidationItem met={hasMinLength} text="At least 8 characters" />
          <ValidationItem met={hasUpperCase} text="One uppercase letter" />
          <ValidationItem met={hasLowerCase} text="One lowercase letter" />
          <ValidationItem met={hasNumber} text="One number" />
          <ValidationItem met={hasSpecialChar} text="One special character" />
        </div>
      )}
    </div>
  );
}