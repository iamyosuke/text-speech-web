import { transcripts, sessions } from '@/app/db/schema';
import { InferSelectModel, InferInsertModel } from 'drizzle-orm';

export type Transcript = InferSelectModel<typeof transcripts>;
export type CreateTranscript = InferInsertModel<typeof transcripts>;

export type Session = InferSelectModel<typeof sessions>;
export type CreateSession = InferInsertModel<typeof sessions>;

export type SessionWithTranscript = Session & {
  transcripts: Transcript[];
};
