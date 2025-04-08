'server only'
import { GoogleGenAI, createPartFromUri, createUserContent } from '@google/genai';

// 共通設定
const MODEL = "gemini-2.0-flash";
const RETRY_COUNT = 3;
const RETRY_DELAY = 1000; // ms
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// AIクライアントの作成
const createAiClient = (): GoogleGenAI => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
};

// リトライロジック
const withRetry = async <T>(fn: () => Promise<T>, retryCount = RETRY_COUNT, retryDelay = RETRY_DELAY): Promise<T> => {
  let lastError: Error;
  
  for (let i = 0; i < retryCount; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < retryCount - 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (i + 1)));
      }
    }
  }
  
  throw lastError!;
};

// 音声を文字起こし
export const transcribe = async (audioBlob: Blob): Promise<string> => {
  try {
    // サイズ制限をチェック
    if (audioBlob.size > MAX_FILE_SIZE) {
      throw new Error('Audio file size exceeds limit of 10MB');
    }

    const ai = createAiClient();
    
    // 音声ファイルをアップロード
    const file = await withRetry(async () => {
      return await ai.files.upload({
        file: audioBlob,
        config: { mimeType: "audio/wav" }
      });
    });

    // 文字起こしを生成
    const result = await withRetry(async () => {
      if (!file.uri || !file.mimeType) {
        throw new Error('File URI or MIME type is missing');
      }

      const content = createUserContent([
        createPartFromUri(file.uri, file.mimeType),
        "この音声を文字に起こしてください。できるだけ正確に書き起こしてください。句読点や改行も適切に入れてください。"
      ]);

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: content
      });

      const text = response.text;
      if (!text) {
        throw new Error('No transcription generated');
      }

      return text;
    });

    // 使用後にファイルを削除
    if (file.name) {
      await ai.files.delete({ name: file.name }).catch(console.error);
    }

    return result;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio: ' + (error as Error).message);
  }
};

// 文字起こしを分析
export const analyze = async (transcript: string): Promise<string> => {
  try {
    const ai = createAiClient();
    
    const result = await withRetry(async () => {
      const content = createUserContent([
        `以下の文章を分析して、重要なポイントを3-5個にまとめてください：\n\n${transcript}\n\n` +
        'フォーマット：\n- ポイント1\n- ポイント2\n- ポイント3'
      ]);

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: content
      });

      const text = response.text;
      if (!text) {
        throw new Error('No analysis generated');
      }

      return text;
    });

    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Failed to analyze transcript: ' + (error as Error).message);
  }
};

