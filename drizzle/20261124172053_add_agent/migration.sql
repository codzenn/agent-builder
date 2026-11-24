CREATE TABLE "agent" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"template_id" text,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"icon" text DEFAULT '🤖' NOT NULL,
	"welcome_message" text DEFAULT '' NOT NULL,
	"starter_prompts" jsonb DEFAULT '[]' NOT NULL,
	"draft_definition" jsonb NOT NULL,
	"canvas" jsonb DEFAULT '{}' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "agent_userId_idx" ON "agent" ("user_id");--> statement-breakpoint
ALTER TABLE "agent" ADD CONSTRAINT "agent_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;