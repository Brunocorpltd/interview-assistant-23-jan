import React, { useState, useEffect } from 'react';
import { useUserInfo } from '../../hooks/useUserInfo';
import { useUserProfile } from '../../hooks/useUserProfile';
import { AlertCircle } from 'lucide-react';
import MultiSelectDropdown from '../common/MultiSelectDropdown';
import { validateUserInfo } from '../../utils/validation';

interface UserInfoFormProps {
  onNext: () => void;
}

const UserInfoForm = ({ onNext }: UserInfoFormProps) => {
  const { loading: saving, error: apiError, saveUserInfo } = useUserInfo();
  const { profile, loading: loadingProfile } = useUserProfile();
  const [formData, setFormData] = useState({
    selectedRoles: [] as string[],
    linkedinUrl: '',
    portfolioUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    roles: false,
    linkedinUrl: false
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        selectedRoles: profile.roles || [],
        linkedinUrl: profile.linkedin_url || '',
        portfolioUrl: profile.portfolio_url || '',
      });
    }
  }, [profile]);

  const roles = [
    { value: "Product Manager", label: "Product Manager" },
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Data Scientist", label: "Data Scientist" },
    { value: "UX Designer", label: "UX Designer" },
    { value: "Product Designer", label: "Product Designer" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    setTouched({
      roles: true,
      linkedinUrl: true
    });

    if (formData.selectedRoles.length === 0) {
      setError('Please select at least one role');
      return;
    }

    if (!formData.linkedinUrl) {
      setError('LinkedIn profile URL is required');
      return;
    }

    const validationError = validateUserInfo(formData);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    try {
      await saveUserInfo({
        currentRole: formData.selectedRoles[0],
        linkedinUrl: formData.linkedinUrl,
        portfolioUrl: formData.portfolioUrl || undefined,
        roles: formData.selectedRoles
      });
      onNext();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save user information');
    }
  };

  if (loadingProfile) {
    return (
      <div className="w-full max-w-xl flex items-center justify-center py-8">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Hey, personalize your Bee.</h1>
      </div>

      {(error || apiError) && (
        <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm">{error || apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            What is your current role (or the role you are applying for)?
            <span className="text-red-500 ml-1">*</span>
          </label>
          <p className="text-sm text-gray-500 mb-2">Select up to 3 roles at a time.</p>
          <MultiSelectDropdown
            options={roles}
            value={formData.selectedRoles}
            onChange={(selectedRoles) => {
              setFormData(prev => ({ ...prev, selectedRoles }));
              setTouched(prev => ({ ...prev, roles: true }));
              setError(null);
            }}
            maxSelections={3}
            placeholder="Select roles"
            error={touched.roles && formData.selectedRoles.length === 0}
          />
          {touched.roles && formData.selectedRoles.length === 0 && (
            <p className="mt-1 text-sm text-red-500">Please select at least one role</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Add your LinkedIn profile URL
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }));
              setError(null);
            }}
            onBlur={() => setTouched(prev => ({ ...prev, linkedinUrl: true }))}
            className={`w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent ${
              touched.linkedinUrl && !formData.linkedinUrl ? 'border-red-300' : 'border-gray-200'
            }`}
            placeholder="https://www.linkedin.com/in/yourprofile"
            required
          />
          {touched.linkedinUrl && !formData.linkedinUrl && (
            <p className="mt-1 text-sm text-red-500">LinkedIn profile URL is required</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Do you have a website or portfolio? (optional)
          </label>
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }));
              setError(null);
            }}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`w-32 bg-[#F5B544] text-black py-3 px-4 rounded-lg hover:bg-[#f0a832] transition-colors font-medium flex items-center justify-center gap-2 ${
            saving ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {saving ? 'Saving...' : 'Continue'}
          {!saving && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}

export default UserInfoForm;