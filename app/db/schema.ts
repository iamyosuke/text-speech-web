// npx drizzle-kit generate
// npx drizzle-kit migrate
import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
// スキーマ名を定義
export const mySchema = pgSchema('text_speech_web');


// ユーザーテーブル
export const users = mySchema.table('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  fullName: text(),
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});
