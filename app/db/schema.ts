// npx drizzle-kit generate
// npx drizzle-kit migrate
import { pgSchema, text, timestamp, uuid, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// スキーマ名を定義
export const mySchema = pgSchema('text_speech_web');

// ユーザーテーブル
export const users = mySchema.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull().unique(),
  email: text('email').unique(),
  subscriptionId: text('subscription_id'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// セッションテーブル
export const sessions = mySchema.table('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull().default('Untitled Session'),
  userId: uuid('user_id').references(() => users.id),
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
export const userRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export const sessionRelations = relations(sessions, ({ many, one }) => ({
  transcripts: many(transcripts),
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const transcriptRelations = relations(transcripts, ({ one }) => ({
  session: one(sessions, {
    fields: [transcripts.sessionId],
    references: [sessions.id],
  }),
}));

// サブスクリプションテーブル
export const subscriptions = mySchema.table('subscriptions', {
  id: serial('id').primaryKey(),
  createdTime: timestamp('created_time').defaultNow(),
  subscriptionId: text('subscription_id').notNull().unique(),
  stripeUserId: text('stripe_user_id').notNull(),
  status: text('status').notNull(),
  startDate: text('start_date').notNull(),
  email: text('email').notNull(),
  userId: text('user_id').notNull(),
});
