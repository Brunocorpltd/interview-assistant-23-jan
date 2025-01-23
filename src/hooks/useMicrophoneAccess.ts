import { useState, useCallback } from 'react';

export function useMicrophoneAccess() {
  const [hasAccess, setHasAccess] = useState(false);

  const requestAccess = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true,
        video: true 
      });
      
      // Stop the stream immediately after getting permission
      stream.getTracks().forEach(track => track.stop());
      
      setHasAccess(true);
      return true;
    } catch (err) {
      console.error('Error requesting microphone access:', err);
      setHasAccess(false);
      return false;
    }
  }, []);

  return {
    hasAccess,
    requestAccess
  };
}