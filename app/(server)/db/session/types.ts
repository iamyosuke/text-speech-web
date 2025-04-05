export interface SessionData {
  id: string;
  transcriptId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSessionParams {
  transcriptId: string;
}
