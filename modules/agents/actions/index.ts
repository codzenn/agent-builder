"use server";

import type { Edge, Node } from "@xyflow/react";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { agent } from "@/db/schema";
import { requireAuth } from "@/modules/auth/actions";
import { migrateV1ToV2 } from "@/modules/workflows/lib/migrate-v1";
import {
  builderDefinitionSchema,
  defaultBuilderDefinition,
  type BuilderDefinition,
} from "@/modules/workflows/lib/schema";
import { getTemplate } from "../lib/templates";

export type SaveAgentInput = {
  name: string;
  description: string;
  draftDefinition: BuilderDefinition;
  canvas: { nodes: Node[]; edges: Edge[] };
};

export async function listAgents() {
  const user = await requireAuth();

  return db
    .select()
    .from(agent)
    .where(eq(agent.userId, user.user.id))
    .orderBy(desc(agent.updatedAt));
}

export async function fetchAgent(agentId: string) {
  const user = await requireAuth();

  const [result] = await db
    .select()
    .from(agent)
    .where(and(eq(agent.id, agentId), eq(agent.userId, user.user.id)));

  return result;
}

export async function createBlankAgent() {
  const user = await requireAuth();
  const [result] = await db
    .insert(agent)
    .values({
      id: crypto.randomUUID(),
      userId: user.user.id,
      name: "Untitled Agent",
      draftDefinition: defaultBuilderDefinition(),
    })
    .returning();

  return result;
}

export async function createFromTemplate(templateId: string) {
  const user = await requireAuth();
  const template = getTemplate(templateId);

  if (!template) {
    throw new Error("Template not found");
  }

  const [result] = await db
    .insert(agent)
    .values({
      id: crypto.randomUUID(),
      userId: user.user.id,
      templateId: template.id,
      name: template.name,
      description: template.description,
      icon: template.icon,
      welcomeMessage: template.welcomeMessage,
      starterPrompts: template.starterPrompts,
      // Templates are written in the simple V1 format; we store them as a V2 graph.
      draftDefinition: migrateV1ToV2(template.definition),
    })
    .returning();

  return result;
}

export async function deleteAgent(agentId: string) {
  const user = await requireAuth();

  await db
    .delete(agent)
    .where(and(eq(agent.id, agentId), eq(agent.userId, user.user.id)));
}

export async function saveAgent(agentId: string, data: SaveAgentInput) {
  const user = await requireAuth();

  const [existingAgent] = await db
    .select({ userId: agent.userId })
    .from(agent)
    .where(eq(agent.id, agentId));

  if (!existingAgent) {
    throw new Error("Agent not found");
  }

  if (existingAgent.userId !== user.user.id) {
    throw new Error("Agent not found");
  }

  // Server actions can be called by anyone, so check the shape before saving.
  const draftDefinition = builderDefinitionSchema.parse(data.draftDefinition);

  const [result] = await db
    .update(agent)
    .set({
      name: data.name,
      description: data.description,
      draftDefinition,
      canvas: data.canvas,
    })
    .where(and(eq(agent.id, agentId), eq(agent.userId, user.user.id)))
    .returning();

  return result;
}
