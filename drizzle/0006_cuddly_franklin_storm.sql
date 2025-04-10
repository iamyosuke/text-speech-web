CREATE TABLE "text_speech_web"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "text_speech_web"."sessions" ADD COLUMN "user_id" uuid;--> statement-breakpoint
ALTER TABLE "text_speech_web"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "text_speech_web"."users"("id") ON DELETE no action ON UPDATE no action;