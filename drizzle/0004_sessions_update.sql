ALTER TABLE "text_speech_web"."sessions" 
  ADD COLUMN "title" text NOT NULL DEFAULT 'Untitled Session',
  DROP COLUMN "transcript_id";

ALTER TABLE "text_speech_web"."transcripts"
  ADD COLUMN "session_id" uuid NOT NULL REFERENCES "text_speech_web"."sessions"("id");
