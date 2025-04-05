import { db } from '@/app/db';
import { eq, desc } from 'drizzle-orm';
import { transcripts } from '@/app/db/schema';
import type { CreateTranscriptParams, TranscriptData } from './types';

export class TranscriptRepository {
  async create(data: CreateTranscriptParams): Promise<TranscriptData> {
    const now = new Date();
    const result = await db.insert(transcripts).values({
      ...data,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return result[0];
  }

  async findById(id: string): Promise<TranscriptData | null> {
    const result = await db
      .select()
      .from(transcripts)
      .where(eq(transcripts.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findLatest(): Promise<TranscriptData[]> {
    return await db
      .select()
      .from(transcripts)
      .orderBy(desc(transcripts.createdAt))
      .limit(10);
  }
}
