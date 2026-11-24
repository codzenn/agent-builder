import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { requireAuth } from "@/modules/auth/actions";
import { UserButton } from "@/modules/auth/components/user-button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div
          className="flex min-h-full flex-1 items-center justify-center bg-background p-6 text-sm text-muted-foreground"
          aria-live="polite"
        >
          Loading your workspace...
        </div>
      }
    >
      <AuthenticatedDashboardLayout>{children}</AuthenticatedDashboardLayout>
    </Suspense>
  );
}

async function AuthenticatedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="flex min-h-full flex-1 bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-5 py-5">
          <Logo href="/agents" />
        </div>
        <nav aria-label="Workspace navigation" className="flex flex-col gap-1.5 p-4">
          <p className="px-3 pb-2 pt-1 text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Workspace
          </p>
          <Link
            href="/agents"
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            My Agents
          </Link>
          <Link
            href="/agents/new"
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Create an agent
          </Link>
        </nav>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border p-4">
          <UserButton user={user.user} compact />
          <ModeToggle />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-col gap-3 border-b border-border bg-card/90 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <Logo href="/agents" showLabel={false} />
            <div className="flex items-center gap-2">
              <ModeToggle />
              <UserButton user={user.user} />
            </div>
          </div>
          <nav aria-label="Workspace navigation" className="flex gap-2">
            <Link
              href="/agents"
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground"
            >
              My Agents
            </Link>
            <Link
              href="/agents/new"
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              Create an agent
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}
