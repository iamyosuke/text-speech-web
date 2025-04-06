CREATE TABLE "text_speech_web"."sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"transcript_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "text_speech_web"."transcripts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"content" text NOT NULL,
	"analysis" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "text_speech_web"."sessions" ADD CONSTRAINT "sessions_transcript_id_transcripts_id_fk" FOREIGN KEY ("transcript_id") REFERENCES "text_speech_web"."transcripts"("id") ON DELETE no action ON UPDATE no action;