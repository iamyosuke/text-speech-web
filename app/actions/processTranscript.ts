'use server';

export interface AIResponse {
  response: string;
  error?: string;
}

export async function processTranscript(transcript: string): Promise<AIResponse> {
  try {
    // TODO: Implement actual AI service integration
    // この部分は後でAI APIと連携します
    const mockResponse = {
      response: `AIの応答：\n「${transcript}」について考えてみましょう。\n1. まず...\n2. 次に...\n3. そして...`,
    };

    return mockResponse;
  } catch (error) {
    console.error('Error processing transcript:', error);
    return {
      response: '',
      error: 'AIサービスとの通信中にエラーが発生しました。',
    };
  }
}

export async function saveSession(transcript: string, aiResponse: string) {
  try {
    // TODO: Implement database integration
    // この部分は後でデータベースと連携します
    console.log('Session saved:', { transcript, aiResponse });
    return { success: true };
  } catch (error) {
    console.error('Error saving session:', error);
    return { success: false, error: 'セッションの保存中にエラーが発生しました。' };
  }
}
