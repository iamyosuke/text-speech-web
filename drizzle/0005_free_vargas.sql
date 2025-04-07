ALTER TABLE "text_speech_web"."sessions" DROP CONSTRAINT "sessions_transcript_id_transcripts_id_fk";
--> statement-breakpoint
ALTER TABLE "text_speech_web"."transcripts" ADD COLUMN "session_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."transcripts" ADD CONSTRAINT "transcripts_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "text_speech_web"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "text_speech_web"."sessions" DROP COLUMN "transcript_id";