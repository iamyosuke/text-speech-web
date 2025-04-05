export interface VoiceRecognitionConfig {
  onResult: (blob: Blob) => void;
}

export interface VoiceRecognitionHook {
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  isSupported: boolean;
}

export type AudioRecordingState = 'inactive' | 'recording' | 'paused';
