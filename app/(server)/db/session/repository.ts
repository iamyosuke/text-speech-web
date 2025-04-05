import { db } from '@/app/db';
import { eq } from 'drizzle-orm';
import { sessions } from '@/app/db/schema';
import type { CreateSessionParams, SessionData } from './types';

export class SessionRepository {
  async create(data: CreateSessionParams): Promise<SessionData> {
    const now = new Date();
    const result = await db.insert(sessions).values({
      ...data,
      createdAt: now,
      updatedAt: now,
    }).returning();

    return result[0];
  }

  async findById(id: string): Promise<SessionData | null> {
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, id))
      .limit(1);

    return result[0] || null;
  }

  async findByTranscriptId(transcriptId: string): Promise<SessionData | null> {
    const result = await db
      .select()
      .from(sessions)
      .where(eq(sessions.transcriptId, transcriptId))
      .limit(1);

    return result[0] || null;
  }
}
