'server only'
import db from '@/app/db';
import { eq } from 'drizzle-orm';
import { transcripts } from '@/app/db/schema';
import { CreateTranscript } from '@/app/lib/type';

export async function createTranscript(data: CreateTranscript) {
  const transcript = await db.insert(transcripts).values({
    ...data,
  });
  return transcript;
}

export async function getTranscriptBySessionId(sessionId: string) {
  const transcript = await db.select().from(transcripts).where(eq(transcripts.sessionId, sessionId));
  return transcript;
}


export async function getTranscriptById(id: string) {
  const transcript = await db.select().from(transcripts).where(eq(transcripts.id, id));
  return transcript;
}