import { useState, useRef, useCallback, useEffect } from 'react';
import { AzureSpeechService } from '../lib/azure-speech';

interface TranscriptionBubble {
  id: number;
  text: string;
  timestamp: number;
  isComplete: boolean;
}

export const useRecordVoice = () => {
  const [micBubbles, setMicBubbles] = useState<TranscriptionBubble[]>([]);
  const [tabBubbles, setTabBubbles] = useState<TranscriptionBubble[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const generateResponseRef = useRef<((text: string) => void) | null>(null);
  const micServiceRef = useRef<AzureSpeechService | null>(null);
  const tabServiceRef = useRef<AzureSpeechService | null>(null);
  const bubbleCounter = useRef<number>(0);
  const tabStreamRef = useRef<MediaStream | null>(null);

  const handleTranscription = useCallback((text: string, source: 'mic' | 'tab') => {
    const newBubble: TranscriptionBubble = {
      id: bubbleCounter.current++,
      text,
      timestamp: Date.now(),
      isComplete: true
    };

    if (source === 'mic') {
      setMicBubbles(prev => [...prev, newBubble]);
    } else {
      setTabBubbles(prev => [...prev, newBubble]);
      if (generateResponseRef.current) {
        generateResponseRef.current(text);
      }
    }
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('Speech recognition error:', error);
  }, []);

  const getPermissions = async () => {
    try {
      // Get tab audio permissions
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });

      // Store the tab stream for cleanup
      tabStreamRef.current = displayStream;

      // Initialize microphone service (Azure will handle mic permissions)
      micServiceRef.current = new AzureSpeechService('mic');
      await micServiceRef.current.initialize(handleTranscription, handleError);

      // Initialize tab audio service with the display stream
      tabServiceRef.current = new AzureSpeechService('tab', displayStream);
      await tabServiceRef.current.initialize(handleTranscription, handleError);

      setRecording(true);
      
      // Start listening on both services
      micServiceRef.current.startListening();
      tabServiceRef.current.startListening();
    } catch (error) {
      console.error('Error getting permissions:', error);
      if (tabStreamRef.current) {
        tabStreamRef.current.getTracks().forEach(track => track.stop());
        tabStreamRef.current = null;
      }
    }
  };

  const stopRecording = useCallback(() => {
    setRecording(false);
    
    if (micServiceRef.current) {
      micServiceRef.current.cleanup();
      micServiceRef.current = null;
    }
    
    if (tabServiceRef.current) {
      tabServiceRef.current.cleanup();
      tabServiceRef.current = null;
    }

    if (tabStreamRef.current) {
      tabStreamRef.current.getTracks().forEach(track => track.stop());
      tabStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return {
    recording,
    stopRecording,
    micBubbles,
    tabBubbles,
    getPermissions,
    setGenerateResponse: (callback: (text: string) => void) => {
      generateResponseRef.current = callback;
    }
  };
}; 