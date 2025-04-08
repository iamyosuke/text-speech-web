'server only'

import { createSession } from '../../db/session';
import { createTranscript } from '../../db/transcript';
import { transcribe } from './audioProcessor';

// 音声処理
export const processAudio = async (
  audioBlob: Blob,
  sessionId: string
) => {
  try {
    // 1. 音声の文字起こし
    const transcript = await transcribe(audioBlob);

    if (!sessionId) {
      const session = await createSession({
        title: 'New Session',
      });
      sessionId = session.id;
    }
    
    // 3. DBへの保存
    await createTranscript({
      content: transcript,
      sessionId: sessionId,
    });
    

    // 4. レスポンスの返却
    return {
      success: true,
      data: {
        transcript,
        sessionId: sessionId
      }
    };
  } catch (error) {
    console.error('Error in processAudio:', error);
    return {
      success: false,
      error: 'Failed to process audio'
    };
  }
};
