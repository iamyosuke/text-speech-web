// npx drizzle-kit generate
// npx drizzle-kit migrate
import { pgSchema, text, timestamp, uuid } from 'drizzle-orm/pg-core';
// スキーマ名を定義
export const mySchema = pgSchema('text_speech_web');


// ユーザーテーブル
