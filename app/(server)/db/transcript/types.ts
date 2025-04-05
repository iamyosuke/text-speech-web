export interface TranscriptData {
  id: string;
  content: string;
  analysis: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTranscriptParams {
  content: string;
  analysis: string;
}
