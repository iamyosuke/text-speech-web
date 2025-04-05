'use client';

import { useCallback, useRef } from 'react';
import { VoiceRecognitionConfig, VoiceRecognitionHook } from '../types/webSpeechAPI';

export const useVoiceRecognition = ({ onResult }: VoiceRecognitionConfig): VoiceRecognitionHook => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      throw new Error('Speech recognition is not supported in this browser');
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.lang = 'ja-JP';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        onResult(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      throw error;
    }
  }, [isSupported, onResult]);

  const stopRecording = useCallback(async () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
        throw error;
      }
    }
  }, []);

  return {
    startRecording,
    stopRecording,
    isSupported,
  };
};
