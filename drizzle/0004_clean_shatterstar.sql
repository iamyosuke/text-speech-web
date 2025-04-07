ALTER TABLE "text_speech_web"."sessions" ADD COLUMN "title" text DEFAULT 'Untitled Session' NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."transcripts" DROP COLUMN "analysis";