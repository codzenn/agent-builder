CREATE TABLE "conversation" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"agent_id" text NOT NULL,
	"title" text DEFAULT 'Test chat' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" text PRIMARY KEY,
	"conversation_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"tool_events" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "conversation_userId_idx" ON "conversation" ("user_id");--> statement-breakpoint
CREATE INDEX "conversation_agentId_idx" ON "conversation" ("agent_id");--> statement-breakpoint
CREATE INDEX "message_conversationId_idx" ON "message" ("conversation_id");--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_agent_id_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE CASCADE;