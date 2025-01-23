import { useState, useEffect } from 'react';

const TUTORIAL_SHOWN_KEY = 'tutorial_popups_shown';

export function useTutorialPopups() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Always show tutorials on page load, regardless of localStorage
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(TUTORIAL_SHOWN_KEY, 'true');
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  return {
    isOpen,
    currentStep,
    handleClose,
    handleContinue
  };
}