'use server';

import { AudioProcessor } from '../services/audio/audioProcessor';
import { SessionRepository } from '../db/session/repository';
import { TranscriptRepository } from '../db/transcript/repository';

export interface TranscriptionResult {
  transcript: string;
  error?: string;
}

export async function createNewSession(title: string = 'New Session') {
  const sessionRepo = new SessionRepository();
  return await sessionRepo.create({ title });
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

export async function saveTranscript(sessionId: string, audioBlob: Blob, transcript: string) {
  try {
    const transcriptRepo = new TranscriptRepository();
    
    // トランスクリプトを保存
    await transcriptRepo.create({
      sessionId,
      content: transcript,
      analysis: '', // TODO: 将来的に分析機能を追加
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving transcript:', error);
    return { success: false, error: 'トランスクリプトの保存中にエラーが発生しました。' };
  }
}
