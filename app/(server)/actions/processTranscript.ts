'use server';

import { AudioProcessor } from '../services/audio/audioProcessor';

export interface AIResponse {
  transcript?: string;
  response: string;
  error?: string;
}

export async function processAudioData(audioBlob: Blob): Promise<AIResponse> {
  try {
    const processor = new AudioProcessor();
    
    // 音声を文字起こし
    const transcript = await processor.transcribe(audioBlob);
    
    // 文字起こし結果を分析
    const analysis = await processor.analyze(transcript);

    return {
      response: analysis,
      transcript: transcript
    };
  } catch (error) {
    console.error('Error processing audio:', error);
    return {
      response: '',
      error: '音声データの処理中にエラーが発生しました。',
    };
  }
}

export async function saveSession(audioBlob: Blob, aiResponse: string) {
  try {
    // TODO: Implement database integration
    // この部分は後でデータベースと連携します
    console.log('Session saved:', { audioSize: audioBlob.size, aiResponse });
    return { success: true };
  } catch (error) {
    console.error('Error saving session:', error);
    return { success: false, error: 'セッションの保存中にエラーが発生しました。' };
  }
}
