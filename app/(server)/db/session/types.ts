import { TranscriptData } from "../transcript/types";

export interface SessionData {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionWithTranscript extends SessionData {
  transcripts: TranscriptData[];
}

export interface CreateSessionParams {
  title: string;
}
