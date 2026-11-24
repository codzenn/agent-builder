import { headers } from "next/headers";
import { z } from "zod";
import { and, asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  agent as agentTable,
  conversation as conversationTable,
  message as messageTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { runAgentStream } from "@/modules/runtime/lib/run-agent";
import { builderDefinitionSchema } from "@/modules/workflows/lib/schema";
import { loadBuilderDefinition } from "@/modules/workflows/lib/migrate-v1";

// What the chat panel sends us. `definition` is the (maybe unsaved) canvas.
// If it is missing we fall back to the agent's saved draft.
const runRequestSchema = z.object({
  message: z.string().trim().min(1, "Message cannot be empty"),
  conversationId: z.string().optional(),
  definition: builderDefinitionSchema.optional(),
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ agentId: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { agentId } = await params;

  const parsed = runRequestSchema.safeParse(await req.json().catch(() => null));

  if (!parsed.success) {
    return new Response(parsed.error.issues[0]?.message ?? "Invalid request", {
      status: 400,
    });
  }

  const { message, conversationId } = parsed.data;

  const [foundAgent] = await db
    .select()
    .from(agentTable)
    .where(
      and(
        eq(agentTable.id, agentId),
        eq(agentTable.userId, session.user.id),
      ),
    );

  if (!foundAgent) {
    return new Response("Not found", { status: 404 });
  }

  const definition =
    parsed.data.definition ?? loadBuilderDefinition(foundAgent.draftDefinition);

  let conversationIdToUse: string;
  let history: { role: string; content: string }[] = [];

  if (conversationId) {
    const [foundConversation] = await db
      .select()
      .from(conversationTable)
      .where(
        and(
          eq(conversationTable.id, conversationId),
          eq(conversationTable.userId, session.user.id),
          eq(conversationTable.agentId, agentId),
        ),
      );

    if (foundConversation) {
      conversationIdToUse = foundConversation.id;
      const messagesForHistory = await db
        .select({
          role: messageTable.role,
          content: messageTable.content,
        })
        .from(messageTable)
        .where(eq(messageTable.conversationId, conversationIdToUse))
        .orderBy(asc(messageTable.createdAt));

      history = messagesForHistory;
    } else {
      const [createdConversation] = await db
        .insert(conversationTable)
        .values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          agentId,
          title: message.slice(0, 60),
        })
        .returning();

      conversationIdToUse = createdConversation.id;
    }
  } else {
    const [createdConversation] = await db
      .insert(conversationTable)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        agentId,
        title: message.slice(0, 60),
      })
      .returning();

    conversationIdToUse = createdConversation.id;
  }

  await db.insert(messageTable).values({
    id: crypto.randomUUID(),
    conversationId: conversationIdToUse,
    role: "user",
    content: message,
  });

  const toolEvents: { tool: string; status: string; input?: unknown; output?: string }[] = [];
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      function send(data: unknown) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      }

      try {
        const assistantText = await runAgentStream(
          definition,
          history,
          message,
          session.user.id,
          (event) => {
            if (event.type === "tool_started") {
              toolEvents.push({ tool: event.tool, input: event.input, status: "started" });
            }
            if (event.type === "tool_completed") {
              toolEvents.push({ tool: event.tool, output: event.output, status: "completed" });
            }
            send(event);
          },
        );

        await db.insert(messageTable).values({
          id: crypto.randomUUID(),
          conversationId: conversationIdToUse,
          role: "assistant",
          content: assistantText || "No response",
          toolEvents,
        });

        send({ type: "run_completed", conversationId: conversationIdToUse });
      } catch (err) {
        const error = err instanceof Error ? err.message : "Run failed";
        send({ type: "run_failed", error, conversationId: conversationIdToUse });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
