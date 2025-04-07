export interface TranscriptData {
  id: string;
  sessionId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTranscriptParams {
  sessionId: string;
  content: string;
}
