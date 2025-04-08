// npx drizzle-kit generate
// npx drizzle-kit migrate
import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// スキーマ名を定義
export const mySchema = pgSchema('text_speech_web');

// セッションテーブル
export const sessions = mySchema.table('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull().default('Untitled Session'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// トランスクリプトテーブル
export const transcripts = mySchema.table('transcripts', {
  id: uuid('id').primaryKey().defaultRandom(),
  sessionId: uuid('session_id')
    .notNull()
    .references(() => sessions.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// リレーションの定義
export const sessionRelations = relations(sessions, ({ many }) => ({
  transcripts: many(transcripts),
}));

export const transcriptRelations = relations(transcripts, ({ one }) => ({
  session: one(sessions, {
    fields: [transcripts.sessionId],
    references: [sessions.id],
  }),
}));

