import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { validatePassword } from '../../utils/passwordValidation';

interface PasswordSectionProps {
  onSubmit: (password: string) => Promise<void>;
  disabled?: boolean;
}

interface ValidationItem {
  met: boolean;
  text: string;
}

export default function PasswordSection({ onSubmit, disabled }: PasswordSectionProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [validations, setValidations] = useState<ValidationItem[]>([
    { met: false, text: 'At least 8 characters' },
    { met: false, text: 'One uppercase letter' },
    { met: false, text: 'One lowercase letter' },
    { met: false, text: 'One number' },
    { met: false, text: 'One special character' }
  ]);

  useEffect(() => {
    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    setValidations([
      { met: hasMinLength, text: 'At least 8 characters' },
      { met: hasUpperCase, text: 'One uppercase letter' },
      { met: hasLowerCase, text: 'One lowercase letter' },
      { met: hasNumber, text: 'One number' },
      { met: hasSpecialChar, text: 'One special character' }
    ]);
  }, [newPassword]);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    try {
      await onSubmit(newPassword);
      // Clear fields after successful update
      setNewPassword('');
      setConfirmPassword('');
      setIsFocused(false);
      setSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    }
  };

  const ValidationItem = ({ met, text }: ValidationItem) => (
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
    <div className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">New password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {(isFocused || newPassword.length > 0) && (
          <div className="mt-2 space-y-1">
            {validations.map((validation, index) => (
              <ValidationItem key={index} {...validation} />
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Retype new password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent pr-10"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {success && (
        <p className="text-sm text-green-500">Password updated successfully!</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={disabled || !newPassword || !confirmPassword}
        className="px-6 py-2 bg-[#F5B544] text-black rounded-lg hover:bg-[#f0a832] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Update Password
      </button>
    </div>
  );
}