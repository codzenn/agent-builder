import { Suspense } from "react";
import { Logo } from "@/components/logo";
import { requireUnauth } from "@/modules/auth/actions";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import { ArrowRight, GithubLogo, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInContent />
    </Suspense>
  );
}

function SignInFallback() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-md animate-pulse rounded-3xl border border-border bg-card p-8">
        <div className="mx-auto mb-6 h-10 w-40 rounded bg-muted" />
        <div className="mx-auto h-7 w-48 rounded bg-muted" />
        <div className="mx-auto mt-3 h-4 w-64 rounded bg-muted/60" />
        <div className="mt-8 h-12 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

async function SignInContent() {
  await requireUnauth();

  return (
    <main className="relative flex min-h-screen flex-1 items-center justify-center bg-background px-5 py-8 sm:px-8 sm:py-12">
      <ModeToggle className="absolute right-5 top-5 sm:right-8 sm:top-8" />
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-border bg-card shadow-xl lg:min-h-[590px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-border bg-muted p-10 text-card-foreground lg:flex xl:p-14">
          <div className="absolute -left-24 -top-20 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <Logo href="/" />
            <div className="mt-24 max-w-md">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Sparkle className="size-5" weight="fill" />
              </span>
              <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-[-0.05em] xl:text-5xl">
                Give your ideas a way to work.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">
                Build helpful agents with visual workflows, connected tools, and a playground to
                test what you create.
              </p>
            </div>
          </div>
          <div className="relative flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
            <span>A focused space for your next idea</span>
            <ArrowRight className="size-4" />
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
          <div className="w-full max-w-sm">
            <div className="mb-10 lg:hidden">
              <Logo href="/" />
            </div>
            <div className="mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary lg:hidden">
              <Sparkle className="size-5" weight="fill" />
            </div>
            <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
              Your workspace awaits
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground">
              Welcome back.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Sign in with GitHub to continue building your agents.
            </p>
            <SignInForm />
            <p className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
              <GithubLogo className="mt-0.5 size-4 shrink-0" />
              GitHub is used to securely authenticate your account.
            </p>
            <p className="mt-10 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">
              By continuing, you agree to use Agent Builder responsibly and keep your connected
              tools under your control.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
