import { useState, useRef } from 'react';
import { groq } from '../lib/groq-client';

interface AIResponse {
  id: string;
  text: string;
  timestamp: number;
}

const SYSTEM_PROMPT = `You are an expert Interview Co-pilot Assistant helping candidates during live interviews.

Keep your suggestions concise and practical. Format them as bullet points for easy reading.`;

export const useAIResponse = () => {
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const controller = useRef<AbortController | null>(null);

  const generateResponse = async (text: string) => {
    console.log('Generating AI response for text:', text);
    
    // Abort previous request if exists
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          {
            role: 'user',
            content: text
          }
        ],
        model: "mixtral-8x7b-32768",
        temperature: 0.7,
        max_tokens: 1024,
      });

      const response = completion.choices[0]?.message?.content;
      console.log('AI generated response:', response);
      
      if (response) {
        const formattedResponse = response.replace(/^[-*]\s/gm, '• ').replace(/\n{3,}/g, '\n\n');
        console.log('Formatted response:', formattedResponse);
        
        setResponses(prev => [...prev, {
          id: crypto.randomUUID(),
          text: formattedResponse,
          timestamp: Date.now()
        }]);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error generating AI response:', error);
      }
    } finally {
      if (controller.current?.signal.aborted) {
        controller.current = null;
      }
    }
  };

  return {
    responses,
    generateResponse
  };
}; 