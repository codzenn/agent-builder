"use client";

import Link from "next/link";
import { AgentCard } from "@/modules/agents/components/agent-card";
import { useAgents } from "@/modules/agents/hooks/use-agents";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function AgentsPageContent() {
  const { data: agents, isLoading } = useAgents();

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-6" aria-live="polite">
        <Spinner />
      </div>
    );
  }

  const list = agents ?? [];

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Your workspace
          </p>
          <h1 className="font-heading text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl">
            My agents
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Shape your ideas into workflows that can take action.
          </p>
        </div>
        <Button
          render={<Link href="/agents/new" />}
          nativeButton={false}
          className="h-10 rounded-full px-5"
        >
          <span className="text-lg leading-none">+</span> Create agent
        </Button>
      </div>

      {list.length === 0 ? (
        <section className="relative flex min-h-105 flex-1 flex-col items-center justify-center overflow-hidden rounded-[26px] border border-border bg-card px-6 py-12 text-center shadow-sm">
          <div className="absolute -top-20 left-1/2 size-60 -translate-x-1/2 rounded-full bg-[#f9e4da]/60 blur-3xl" />
          <div className="relative flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary shadow-sm">
            ✳
          </div>
          <h2 className="relative mt-6 text-xl font-semibold tracking-tight text-card-foreground">
            Your first agent starts here
          </h2>
          <p className="relative mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Start with a ready-made template or build a workflow from scratch. You can shape the
            instructions and tools as you go.
          </p>
          <Button
            className="relative mt-6 h-10 rounded-full px-5"
            render={<Link href="/agents/new" />}
            nativeButton={false}
          >
            Explore templates
          </Button>
        </section>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground">Your agents</p>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
              {list.length} {list.length === 1 ? "agent" : "agents"}
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
