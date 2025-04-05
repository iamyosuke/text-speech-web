import { AudioProcessor } from './audioProcessor';
import { TranscriptRepository } from '../../db/transcript/repository';
import { SessionRepository } from '../../db/session/repository';

export class TranscriptionService {
  constructor(
    private audioProcessor: AudioProcessor,
    private transcriptRepo: TranscriptRepository,
    private sessionRepo: SessionRepository
  ) {}

  async processAudio(audioBlob: Blob) {
    try {
      // 1. 音声の文字起こし
      const transcript = await this.audioProcessor.transcribe(audioBlob);
      
      // 2. 文字起こしテキストの分析
      const analysis = await this.audioProcessor.analyze(transcript);
      
      // 3. DBへの保存
      const transcriptRecord = await this.transcriptRepo.create({
        content: transcript,
        analysis
      });
      
      const session = await this.sessionRepo.create({
        transcriptId: transcriptRecord.id
      });

      // 4. レスポンスの返却
      return {
        success: true,
        data: {
          transcript,
          analysis,
          sessionId: session.id
        }
      };
    } catch (error) {
      console.error('Error in processAudio:', error);
      return {
        success: false,
        error: 'Failed to process audio'
      };
    }
  }
}
