CREATE TABLE "text_speech_web"."subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_time" timestamp DEFAULT now(),
	"subscription_id" text,
	"stripe_user_id" text,
	"status" text,
	"start_date" text,
	"email" text,
	"user_id" text
);
