'use client';

import { useCallback, useRef, useState } from 'react';
import { VoiceRecognitionConfig, VoiceRecognitionHook, AudioRecordingState } from '../types/webSpeechAPI';

export const useVoiceRecognition = ({ onResult }: VoiceRecognitionConfig): VoiceRecognitionHook => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingState, setRecordingState] = useState<AudioRecordingState>('inactive');
  
  const isSupported = typeof window !== 'undefined' && 
    ('MediaRecorder' in window);

  const startRecording = useCallback(async () => {
    if (!isSupported) {
      throw new Error('MediaRecorder is not supported in this browser');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        onResult(blob);
        chunksRef.current = [];
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecordingState('recording');
    } catch (error) {
      console.error('Error starting media recording:', error);
      throw error;
    }
  }, [isSupported, onResult]);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      try {
        mediaRecorderRef.current.stop();
        setRecordingState('inactive');
      } catch (error) {
        console.error('Error stopping media recording:', error);
        throw error;
      }
    }
  }, [recordingState]);

  return {
    startRecording,
    stopRecording,
    isSupported,
  };
};
