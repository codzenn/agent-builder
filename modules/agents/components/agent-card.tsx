"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useDeleteAgent } from "@/modules/agents/hooks/use-agents";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type AgentCardProps = {
  agent: {
    id: string;
    name: string;
    description: string;
    icon: string;
    updatedAt: Date;
  };
};

export function AgentCard({ agent }: AgentCardProps) {
  const deleteAgent = useDeleteAgent();

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
            {agent.icon}
          </span>
          <div className="min-w-0 pt-0.5">
            <CardTitle className="truncate text-base font-semibold tracking-tight text-card-foreground">
              {agent.name}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
              {agent.description || "No description yet"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto pb-4">
        <p className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(agent.updatedAt, { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="gap-2 border-t border-border pt-4">
        <Button
          className="h-9 flex-1 rounded-full"
          render={<Link href={`/agents/${agent.id}/builder`} />}
          nativeButton={false}
        >
          Open builder
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button variant="outline" className="h-9 rounded-full px-4" />
            }
          >
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete &quot;{agent.name}&quot;?</AlertDialogTitle>
              <AlertDialogDescription>
                This deletes the agent and all its test chats. You can&apos;t undo this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {/* Once deleted, this card (and the dialog) disappears from the list. */}
              <AlertDialogAction
                variant="destructive"
                disabled={deleteAgent.isPending}
                onClick={() => deleteAgent.mutate(agent.id)}
              >
                {deleteAgent.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
