'use server';

export interface AIResponse {
  response: string;
  error?: string;
}

export async function processAudioData(audioBlob: Blob): Promise<AIResponse> {
  try {
    // TODO: Implement actual audio processing and AI service integration
    // この部分は後で音声処理とAI APIと連携します
    const mockResponse = {
      response: `AIの応答：\n音声データを受け付けました。\n長さ: ${Math.round(audioBlob.size / 1024)}KB`,
    };

    return mockResponse;
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
