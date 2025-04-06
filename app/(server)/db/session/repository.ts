import { eq, asc } from 'drizzle-orm';
import { sessions, transcripts } from '@/app/db/schema';
import type { CreateSessionParams, SessionData, SessionWithTranscript } from './types';
import db from '@/app/db';

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

  async findAll(): Promise<SessionWithTranscript[]> {
    const result = await db
      .select()
      .from(sessions)
      .innerJoin(transcripts, eq(sessions.transcriptId, transcripts.id))
      .orderBy(asc(sessions.createdAt));

    return result.map(row => ({
      id: row.sessions.id,
      transcriptId: row.sessions.transcriptId,
      createdAt: row.sessions.createdAt,
      updatedAt: row.sessions.updatedAt,
      content: row.transcripts.content,
      // トランスクリプトの最初の行をタイトルとして使用
      title: row.transcripts.content.split('\n')[0] || 'Untitled Session'
    }));
  }
}
