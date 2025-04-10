ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "subscription_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "stripe_user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "text_speech_web"."users" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "text_speech_web"."users" ADD COLUMN "subscription" text;--> statement-breakpoint
ALTER TABLE "text_speech_web"."subscriptions" ADD CONSTRAINT "subscriptions_subscription_id_unique" UNIQUE("subscription_id");--> statement-breakpoint
ALTER TABLE "text_speech_web"."users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");