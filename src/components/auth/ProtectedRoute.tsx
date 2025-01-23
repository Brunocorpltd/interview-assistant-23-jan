import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useOnboardingStatus } from '../../hooks/useOnboardingStatus';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireOnboarding = true 
}: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  const { status, loading: statusLoading } = useOnboardingStatus();
  const location = useLocation();

  // Show loading state only during initial auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If we need to check onboarding status
  if (requireOnboarding && !statusLoading) {
    const isOnboardingComplete = status?.user_info_completed && status?.cv_uploaded;

    // Redirect to onboarding if not complete
    if (!isOnboardingComplete && location.pathname !== '/onboarding') {
      return <Navigate to="/onboarding" replace />;
    }
  }

  // If we're on onboarding page but it's already complete, redirect to dashboard
  if (!requireOnboarding && !statusLoading && status?.user_info_completed && status?.cv_uploaded) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}