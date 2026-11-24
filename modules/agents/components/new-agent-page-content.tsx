"use client";

import { TemplateCard } from "@/modules/agents/components/template-card";
import { useCreateBlankAgent } from "@/modules/agents/hooks/use-agents";
import { templates } from "@/modules/agents/lib/templates";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NewAgentPageContent() {
  const createBlank = useCreateBlankAgent();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          New workflow
        </p>
        <h1 className="font-heading text-3xl font-semibold tracking-[-0.05em] text-foreground sm:text-4xl">
          Start with a strong first draft.
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Pick a template to get moving quickly, or build a custom agent from a clean canvas.
        </p>
      </div>

      <section aria-labelledby="agent-templates-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2 id="agent-templates-heading" className="text-sm font-semibold text-foreground">
            Choose a starting point
          </h2>
          <span className="text-xs text-muted-foreground">
            {templates.length + 1} ways to begin
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3.5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
                  ✳
                </span>
                <div className="pt-0.5">
                  <CardTitle className="text-base font-semibold tracking-tight text-card-foreground">
                    Blank canvas
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm leading-5 text-muted-foreground">
                    Make it yours from the very first step.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 pb-5">
              <p className="text-sm leading-6 text-muted-foreground">
                Start with empty instructions and add only the tools and steps your idea needs.
              </p>
            </CardContent>
            <CardFooter className="border-t border-border pt-4">
              <Button
                className="h-9 w-full rounded-full"
                onClick={() => createBlank.mutate()}
                disabled={createBlank.isPending}
              >
                {createBlank.isPending ? "Creating..." : "Start from scratch"}
              </Button>
            </CardFooter>
          </Card>

          {templates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>
    </main>
  );
}
