'use client';

import { useCallback, useRef, useState, useEffect } from 'react';
import { VoiceRecognitionConfig, VoiceRecognitionHook, AudioRecordingState } from '../types/webSpeechAPI';

export const useVoiceRecognition = ({ onResult }: VoiceRecognitionConfig): VoiceRecognitionHook => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingState, setRecordingState] = useState<AudioRecordingState>('inactive');
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  
  const isSupported = typeof window !== 'undefined' && 
    ('MediaRecorder' in window);

  const startRecording = useCallback(async () => {
    console.log('startRecording called, checking browser support...');
    if (!isSupported) {
      console.error('MediaRecorder is not supported in this browser');
      throw new Error('MediaRecorder is not supported in this browser');
    }

    try {
      console.log('Requesting microphone permission...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('Microphone permission granted, creating MediaRecorder...');
      setAudioStream(stream);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available event triggered, size:', event.data.size);
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
          console.log('Audio chunk added, total chunks:', chunksRef.current.length);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('MediaRecorder stopped, processing recorded data...');
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        console.log('Audio blob created, size:', blob.size);
        onResult(blob);
        chunksRef.current = [];
        console.log('Stopping audio tracks...');
        setAudioStream(null);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      console.log('MediaRecorder started successfully');
      setRecordingState('recording');
    } catch (error) {
      console.error('Error starting media recording:', error);
      
      // より詳細なエラーメッセージを提供
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          throw new Error('マイクの使用が許可されていません。ブラウザの設定でマイクへのアクセスを許可してください。');
        } else if (error.name === 'NotFoundError') {
          throw new Error('マイクが見つかりません。デバイスを確認してください。');
        } else if (error.name === 'NotReadableError') {
          throw new Error('マイクにアクセスできません。他のアプリケーションが使用している可能性があります。');
        }
      }
      throw error;
    }
  }, [isSupported, onResult]);

  const stopRecording = useCallback(async () => {
    console.log('stopRecording called, current state:', recordingState);
    if (mediaRecorderRef.current && recordingState === 'recording') {
      try {
        console.log('Stopping MediaRecorder...');
        mediaRecorderRef.current.stop();
        setRecordingState('inactive');
        console.log('Recording stopped successfully');
      } catch (error) {
        console.error('Error stopping media recording:', error);
        console.error('MediaRecorder state:', mediaRecorderRef.current.state);
        throw error;
      }
    } else {
      console.log('Cannot stop recording: MediaRecorder not active or not in recording state');
    }
  }, [recordingState]);

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
        setAudioStream(null);
      }
    };
  }, []);

  return {
    startRecording,
    stopRecording,
    isSupported,
    audioStream,
  };
};
