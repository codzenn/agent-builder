import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { requireAuth, signOut } from "@/modules/auth/actions";

export default function Home() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <AuthenticatedHome />
    </Suspense>
  );
}

function HomeFallback() {
  return (
    <div className="relative flex flex-1 items-start justify-between p-4">
      <Logo href="/" />
      <div className="flex items-center gap-3" aria-hidden="true">
        <ModeToggle />
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <div className="h-9 w-20 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}

async function AuthenticatedHome() {
  const session = await requireAuth();

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="absolute inset-x-4 top-4 flex items-center justify-between">
        <Logo href="/" />
        <div className="flex items-center gap-3">
          <ModeToggle />
          <span className="text-sm">{session.user.name ?? session.user.email}</span>
          <form action={signOut}>
            <Button type="submit" variant="destructive">
              Sign out
            </Button>
          </form>
        </div>
      </header>
    </div>
  );
}
