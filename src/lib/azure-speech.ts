import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

const AZURE_SPEECH_KEY = 'GC2sTwUN1VJbxqkQ3qWOoKGtYLk5jEVuIQyRbpdYsagBfsZwbETbJQQJ99BAACYeBjFXJ3w3AAAYACOGQ31i';
const AZURE_SPEECH_REGION = 'eastus';

export class AzureSpeechService {
  private recognizer: speechsdk.SpeechRecognizer | null = null;
  private isListening = false;
  private onTranscriptCallback: ((text: string, source: 'mic' | 'tab') => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private source: 'mic' | 'tab';
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private audioProcessor: ScriptProcessorNode | null = null;

  constructor(source: 'mic' | 'tab', mediaStream?: MediaStream) {
    this.source = source;
    this.mediaStream = mediaStream || null;
  }

  initialize(
    onTranscript: (text: string, source: 'mic' | 'tab') => void,
    onError: (error: string) => void
  ): void {
    try {
      this.onTranscriptCallback = onTranscript;
      this.onErrorCallback = onError;

      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        AZURE_SPEECH_KEY,
        AZURE_SPEECH_REGION
      );
      speechConfig.speechRecognitionLanguage = 'en-US';

      let audioConfig;
      if (this.source === 'mic') {
        audioConfig = speechsdk.AudioConfig.fromMicrophoneInput();
      } else if (this.mediaStream) {
        this.audioContext = new AudioContext();
        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.audioProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);
        
        source.connect(this.audioProcessor);
        this.audioProcessor.connect(this.audioContext.destination);

        const pushStream = speechsdk.AudioInputStream.createPushStream();
        
        this.audioProcessor.onaudioprocess = (e: AudioProcessingEvent) => {
          const inputData = e.inputBuffer.getChannelData(0);
          const audioData = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            audioData[i] = Math.min(1, Math.max(-1, inputData[i])) * 0x7fff;
          }
          pushStream.write(audioData.buffer);
        };

        audioConfig = speechsdk.AudioConfig.fromStreamInput(pushStream);
      } else {
        throw new Error('No audio source available');
      }

      this.recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
      this.setupRecognition();
      console.log(`Azure Speech Service initialized for ${this.source}`);
    } catch (error) {
      console.error('Failed to initialize speech recognition:', error);
      onError('Speech recognition initialization failed. Please check your connection and try again.');
    }
  }

  private setupRecognition(): void {
    if (!this.recognizer) return;

    this.recognizer.recognized = (_, event) => {
      if (event.result.text) {
        const text = event.result.text.trim();
        if (text && this.onTranscriptCallback) {
          this.onTranscriptCallback(text, this.source);
        }
      }
    };

    this.recognizer.canceled = (_, event) => {
      const errorMessage = event.errorDetails || 'Unknown error occurred';
      console.error('Recognition canceled:', errorMessage);
      if (this.onErrorCallback) {
        this.onErrorCallback(`Recognition error: ${errorMessage}`);
      }
      this.stopListening();
    };

    this.recognizer.sessionStopped = () => {
      this.stopListening();
    };
  }

  startListening(): void {
    if (this.isListening || !this.recognizer) return;
    
    try {
      this.isListening = true;
      this.recognizer.startContinuousRecognitionAsync(
        () => console.log(`Recognition started for ${this.source}`),
        error => {
          console.error('Failed to start recognition:', error);
          if (this.onErrorCallback) {
            this.onErrorCallback('Failed to start recognition. Please check your permissions.');
          }
        }
      );
    } catch (error) {
      console.error('Failed to start recognition:', error);
      if (this.onErrorCallback) {
        this.onErrorCallback('Failed to start recognition. Please check your permissions.');
      }
    }
  }

  stopListening(): void {
    if (!this.isListening || !this.recognizer) return;

    try {
      this.isListening = false;
      this.recognizer.stopContinuousRecognitionAsync(
        () => console.log(`Recognition stopped for ${this.source}`),
        error => console.error('Error stopping recognition:', error)
      );
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }

  cleanup(): void {
    if (this.recognizer) {
      this.stopListening();
      this.recognizer.close();
      this.recognizer = null;
    }

    if (this.audioProcessor) {
      this.audioProcessor.disconnect();
      this.audioProcessor = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
} 