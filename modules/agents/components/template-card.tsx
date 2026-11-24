"use client";

import { useCreateFromTemplate } from "@/modules/agents/hooks/use-agents";
import type { AgentTemplate } from "@/modules/agents/lib/templates";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TemplateCard({ template }: { template: AgentTemplate }) {
  const createFromTemplate = useCreateFromTemplate();

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
            {template.icon}
          </span>
          <div className="pt-0.5">
            <CardTitle className="text-base font-semibold tracking-tight text-card-foreground">
              {template.name}
            </CardTitle>
            <CardDescription className="mt-1 text-sm leading-5 text-muted-foreground">
              {template.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-5">
        <p className="text-sm leading-6 text-muted-foreground">
          {template.welcomeMessage}
        </p>
        <ul className="mt-4 space-y-2 border-t border-border pt-3">
          {template.starterPrompts.slice(0, 2).map((prompt) => (
            <li key={prompt} className="flex gap-2 text-xs leading-5 text-muted-foreground">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#d9855d]" />
              <span>{prompt}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="border-t border-border pt-4">
        <Button
          className="h-9 w-full rounded-full"
          onClick={() => createFromTemplate.mutate(template.id)}
          disabled={createFromTemplate.isPending}
        >
          {createFromTemplate.isPending ? "Creating..." : "Use template"}
        </Button>
      </CardFooter>
    </Card>
  );
}
