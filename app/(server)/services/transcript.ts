import db  from '@/app/db';
import { transcripts } from '@/app/db/schema';
import { CreateTranscript } from '@/app/lib/type';

export async function createTranscript(data: CreateTranscript) {
  const transcript = await db.insert(transcripts).values({
    ...data,
  });
  return transcript;
}
