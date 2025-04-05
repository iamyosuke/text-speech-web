// npx drizzle-kit generate
// npx drizzle-kit migrate
import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// スキーマ名を定義
export const mySchema = pgSchema('text_speech_web');

// トランスクリプトテーブル
export const transcripts = mySchema.table('transcripts', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  analysis: text('analysis').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// セッションテーブル
export const sessions = mySchema.table('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  transcriptId: uuid('transcript_id')
    .notNull()
    .references(() => transcripts.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
