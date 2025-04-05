import { GoogleGenAI, createPartFromUri, createUserContent } from '@google/genai';

export class AudioProcessor {
  private ai: GoogleGenAI;
  private model: string = "gemini-2.0-flash";
  private retryCount = 3;
  private retryDelay = 1000; // ms

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  private async retry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error;
    for (let i = 0; i < this.retryCount; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (i < this.retryCount - 1) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * (i + 1)));
        }
      }
    }
    throw lastError!;
  }

  async transcribe(audioBlob: Blob): Promise<string> {
    try {
      // Check file size limit (10MB)
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (audioBlob.size > MAX_FILE_SIZE) {
        throw new Error('Audio file size exceeds limit of 10MB');
      }

      // Upload audio file
      const file = await this.retry(async () => {
        return await this.ai.files.upload({
          file: audioBlob,
          config: { mimeType: "audio/wav" }
        });
      });

      // Generate transcription
      const result = await this.retry(async () => {
        if (!file.uri || !file.mimeType) {
          throw new Error('File URI or MIME type is missing');
        }

        const content = createUserContent([
          createPartFromUri(file.uri, file.mimeType),
          "この音声を文字に起こしてください。できるだけ正確に書き起こしてください。句読点や改行も適切に入れてください。"
        ]);

        const response = await this.ai.models.generateContent({
          model: this.model,
          contents: content
        });

        const text = response.text;
        if (!text) {
          throw new Error('No transcription generated');
        }

        return text;
      });

      // Delete uploaded file after transcription
      if (file.name) {
        await this.ai.files.delete({ name: file.name }).catch(console.error);
      }

      return result;
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio: ' + (error as Error).message);
    }
  }

  async analyze(transcript: string): Promise<string> {
    try {
      const result = await this.retry(async () => {
        const content = createUserContent([
          `以下の文章を分析して、重要なポイントを3-5個にまとめてください：\n\n${transcript}\n\n` +
          'フォーマット：\n- ポイント1\n- ポイント2\n- ポイント3'
        ]);

        const response = await this.ai.models.generateContent({
          model: this.model,
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
  }
}
