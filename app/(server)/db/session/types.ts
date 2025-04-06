export interface SessionData {
  id: string;
  transcriptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionWithTranscript extends SessionData {
  title: string;
  content: string;
}

export interface CreateSessionParams {
  transcriptId: string;
}
