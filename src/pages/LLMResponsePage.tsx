import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Mic, Video, Square, MonitorSmartphone } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useRecordVoice } from '../hooks/useRecordVoice';
import { useAIResponse } from '../hooks/useAIResponse';

interface TranscriptionBubble {
  id: number;
  text: string;
  timestamp: number;
  isComplete: boolean;
}

interface CombinedBubble extends TranscriptionBubble {
  type: 'mic' | 'tab';
}

const PAUSE_THRESHOLD = 2000; // 2 seconds pause threshold, matching useRecordVoice.ts

const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
};

export default function LLMResponsePage() {
  const [isDockedMode, setIsDockedMode] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const transcriptionContainerRef = useRef<HTMLDivElement>(null);
  const lastProcessedBubbleId = useRef<number>(-1);
  
  const {
    stopRecording,
    micBubbles,
    tabBubbles,
    getPermissions,
    setGenerateResponse,
  } = useRecordVoice();

  const { responses, generateResponse } = useAIResponse();

  // Combine and sort all bubbles by timestamp
  const sortedBubbles = useMemo(() => {
    const combined: CombinedBubble[] = [
      ...micBubbles.map(bubble => ({ ...bubble, type: 'mic' as const })),
      ...tabBubbles.map(bubble => ({ ...bubble, type: 'tab' as const }))
    ].sort((a, b) => a.timestamp - b.timestamp);
    
    return combined;
  }, [micBubbles, tabBubbles]);

  // Set up the generate response callback
  useEffect(() => {
    if (generateResponse) {
      setGenerateResponse((text: string) => {
        if (text.trim().length > 5) {  // Only generate for meaningful text
          generateResponse(text);
        }
      });
    }
  }, [generateResponse, setGenerateResponse]);

  // Auto-scroll effect
  useEffect(() => {
    if (transcriptionContainerRef.current) {
      transcriptionContainerRef.current.scrollTop = transcriptionContainerRef.current.scrollHeight;
    }
  }, [sortedBubbles]);

  const handleStartTranscribing = async () => {
    console.log("Starting transcription");
    setIsPressed(true);
    await getPermissions();
  };

  const handleStopTranscribing = () => {
    console.log("Stopping transcription");
    setIsPressed(false);
    stopRecording();
  };

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Time to ace your interview!!</h1>
            <button
              onClick={isPressed ? handleStopTranscribing : handleStartTranscribing}
              className={`px-4 py-2 rounded-lg text-sm flex items-center ${
                isPressed ? 'bg-red-500 text-white' : 'bg-[#F5B544] text-black'
              }`}
            >
              {isPressed ? (
                <>
                  <Square className="mr-2 h-4 w-4" /> Stop Recording
                </>
              ) : (
                <>
                  <MonitorSmartphone className="mr-2 h-4 w-4" />
                  Start Recording
                </>
              )}
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDockedMode(!isDockedMode)}
              className="px-4 py-2 bg-[#F5B544] text-black rounded-lg text-sm"
            >
              Switch to {isDockedMode ? 'normal' : 'docked'} screen mode (recommended)
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm">
              End session
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Panel - What interviewer sees */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">What your interviewer sees</h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <Video className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-base font-medium mb-3">Transcription of interview in Real time</h3>
              <div 
                ref={transcriptionContainerRef}
                className="h-[200px] overflow-y-auto custom-scrollbar space-y-4"
              >
                {/* Display all bubbles in chronological order */}
                {sortedBubbles.map((bubble) => {
                  // Skip empty bubbles
                  if (!bubble.text) return null;
                  
                  return bubble.type === 'tab' ? (
                    // Tab audio bubble (interviewer)
                    <div key={bubble.id} className="flex items-start gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
                      <div className="max-w-[80%]">
                        <div className="rounded-lg p-3 bg-gray-100">
                          <p className="text-gray-700 text-sm">{bubble.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-1">
                          {formatTimestamp(bubble.timestamp)}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Mic audio bubble (user)
                    <div key={bubble.id} className="flex items-start gap-3 justify-end">
                      <div className="max-w-[80%]">
                        <div className="rounded-lg p-3 bg-[#FFF8EE]">
                          <p className="text-gray-700 text-sm">{bubble.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 mr-1 text-right">
                          {formatTimestamp(bubble.timestamp)}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-[#FFF8EE] flex-shrink-0" />
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-end text-sm text-gray-500">
                <span>01:00</span>
              </div>
            </div>
          </div>

          {/* Right Panel - AI Suggestions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">AI Interview Assistant</h2>
            <div className="bg-white rounded-lg p-4">
              <div className="h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar space-y-4">
                {responses.map((response) => (
                  <div key={response.id} className="bg-[#FFF8EE] rounded-lg p-3">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap">
                      {response.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatTimestamp(response.timestamp)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}