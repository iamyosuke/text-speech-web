'use server';

import { AudioProcessor } from '../services/audio/audioProcessor';

export interface TranscriptionResult {
  transcript: string;
  error?: string;
}

export async function processAudioData(audioBlob: Blob): Promise<TranscriptionResult> {
  try {
    const processor = new AudioProcessor();
    
    // 音声を文字起こし
    const transcript = await processor.transcribe(audioBlob);
    
    return {
      transcript: transcript
    };
  } catch (error) {
    console.error('Error processing audio:', error);
    return {
      transcript: '',
      error: '音声データの処理中にエラーが発生しました。',
    };
  }
}

export async function saveSession(audioBlob: Blob, transcript: string) {
  try {
    // TODO: Implement database integration
    console.log('Session saved:', { audioSize: audioBlob.size, transcript });
    return { success: true };
  } catch (error) {
    console.error('Error saving session:', error);
    return { success: false, error: 'セッションの保存中にエラーが発生しました。' };
  }
}
