import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CloudSun,
  Code,
  GithubLogo,
  Globe,
  Sparkle,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

const capabilities = [
  {
    icon: <Code className="size-5" weight="duotone" />,
    title: "Shape the workflow",
    description:
      "Connect clear, focused steps in a visual canvas. Your agent's logic stays easy to understand and change.",
  },
  {
    icon: <Wrench className="size-5" weight="duotone" />,
    title: "Give it the right tools",
    description:
      "Add web research, GitHub, weather, calculations, and your own custom tools when you need them.",
  },
  {
    icon: <Sparkle className="size-5" weight="duotone" />,
    title: "Test as you build",
    description:
      "Try real prompts in the built-in playground, refine the instructions, and save when it feels right.",
  },
];

const steps = [
  ["01", "Start with an idea", "Choose a template or begin with a blank canvas."],
  ["02", "Connect the pieces", "Set instructions, add tools, and shape each step."],
  ["03", "Put it to work", "Test conversations and iterate on your agent."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo href="/" compact />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          <a className="text-sm text-muted-foreground transition hover:text-foreground" href="#features">
            Features
          </a>
          <a className="text-sm text-muted-foreground transition hover:text-foreground" href="#how-it-works">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <Link
            href="/login"
            className="rounded-full px-2 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground sm:px-4 sm:text-sm"
          >
            Sign in
          </Link>
          <Button
            render={<Link href="/agents/new" />}
            nativeButton={false}
            className="h-10 rounded-full px-3 sm:px-5"
          >
            <span className="sm:hidden">Build</span>
            <span className="hidden sm:inline">Start building</span> <ArrowUpRight weight="bold" />
          </Button>
        </div>
      </header>

      <section className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid-cols-[0.94fr_1.06fr] lg:gap-8 lg:px-12 lg:pb-28 lg:pt-20">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-medium text-card-foreground shadow-sm">
            <span className="flex size-5 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
              <Sparkle className="size-3" weight="fill" />
            </span>
            A clearer way to build AI agents
          </div>
          <h1 className="max-w-170 text-[clamp(3.35rem,7.2vw,6.35rem)] leading-[0.99] font-semibold tracking-[-0.075em] text-foreground">
            Turn your ideas into <span className="text-primary">capable agents.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Design AI agents that do more than chat. Connect tools, shape workflows visually, and
            test every idea in one focused workspace.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              render={<Link href="/agents/new" />}
              nativeButton={false}
              className="h-12 rounded-full px-6 text-[15px] shadow-lg shadow-primary/20"
            >
              Create your first agent <ArrowRight weight="bold" />
            </Button>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              See how it works <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" weight="bold" /> Visual workflow builder
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400" weight="bold" /> Built-in test chat
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-155 lg:ml-auto">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-[#f7d8c8]/70 blur-3xl dark:opacity-30" />
          <div className="absolute -bottom-16 -left-16 size-64 rounded-full bg-[#dcece0]/80 blur-3xl dark:opacity-30" />
          <div className="relative rounded-[26px] border border-border bg-card p-2.5 shadow-xl sm:rounded-[30px] sm:p-3">
            <div className="overflow-hidden rounded-[19px] border border-border bg-background sm:rounded-[22px]">
          <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3.5 sm:px-5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Sparkle className="size-4" weight="fill" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-card-foreground">Travel planner</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">Agent workflow</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-500" /> Ready to test
                </span>
              </div>
              <div className="grid min-h-77.5 sm:min-h-93.5 md:grid-cols-[1.05fr_0.95fr]">
                <div className="border-b border-border p-4 sm:p-5 md:border-r md:border-b-0">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                      Workflow
                    </span>
                    <span className="text-[10px] text-muted-foreground">3 steps</span>
                  </div>
                  <div className="space-y-0">
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Sparkle className="size-4" weight="duotone" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-card-foreground">Understand request</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">Agent instructions</p>
                      </div>
                    </div>
                    <div className="ml-6.75 h-5 border-l border-dashed border-border" />
                    <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3 shadow-sm shadow-primary/5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CloudSun className="size-4" weight="duotone" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-card-foreground">Check destination</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">Weather · Web search</p>
                      </div>
                    </div>
                    <div className="ml-6.75 h-5 border-l border-dashed border-border" />
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-sm">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <Check className="size-4" weight="bold" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-card-foreground">Build an itinerary</p>
                        <p className="mt-1 text-[10px] text-muted-foreground">Return a helpful plan</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2.5 text-[10px] text-muted-foreground">
                    <span className="flex size-5 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      +
                    </span>
                    Add a tool or step
                  </div>
                </div>
                <div className="flex flex-col p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                      Test chat
                    </span>
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <GithubLogo className="size-3.5" />
                    </span>
                  </div>
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-[11px] leading-5 text-primary-foreground">
                    Plan a relaxed weekend in Copenhagen.
                  </div>
                  <div className="mt-3 flex max-w-[96%] gap-2.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Sparkle className="size-3" weight="fill" />
                    </span>
                    <div className="rounded-2xl rounded-tl-sm border border-border bg-card px-3.5 py-2.5 text-[11px] leading-[1.7] text-muted-foreground">
                      <p className="font-semibold text-card-foreground">Here&apos;s a lovely weekend plan.</p>
                      <p className="mt-1.5">
                        I&apos;ll check the forecast and find a few local favorites to get you started.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-muted px-2 py-1 text-[9px] text-muted-foreground">
                          <Globe className="mr-1 inline size-3" /> Web research
                        </span>
                        <span className="rounded-full bg-muted px-2 py-1 text-[9px] text-muted-foreground">
                          <CloudSun className="mr-1 inline size-3" /> Weather checked
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-[10px] text-muted-foreground">
                    <span>Ask your agent something…</span>
                    <span className="flex size-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <ArrowRight className="size-3.5" weight="bold" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2.5 sm:px-5">
                <span className="text-[10px] text-muted-foreground">A workspace for ideas that can act</span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-foreground">
                  Made for iteration <ArrowUpRight className="size-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              Your agent, your way
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tighter text-foreground sm:text-4xl">
              Everything you need to bring it to life.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
              A practical workspace for building, connecting, and improving useful AI agents.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {capabilities.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <div
                  className={`flex size-11 items-center justify-center rounded-2xl ${
                    "bg-primary/10 text-primary"
                  }`}
                >
                  {item.icon}
                </div>
                <h3 className="mt-5 text-base font-semibold tracking-tight text-card-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              A simple starting point
            </p>
            <h2 className="mt-4 max-w-md text-3xl leading-tight font-semibold tracking-tighter text-foreground sm:text-4xl">
              From first thought to first run.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
              No maze of settings to get started. Build a small workflow, see how it behaves, and
              make it better as you go.
            </p>
          </div>
          <div className="divide-y divide-border">
            {steps.map(([number, title, description]) => (
              <div key={number} className="grid gap-3 py-5 sm:grid-cols-[56px_1fr] sm:gap-5 sm:py-6">
                <span className="pt-1 text-xs font-semibold tracking-wider text-primary">{number}</span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-border bg-card px-6 py-12 text-center shadow-sm sm:px-10 sm:py-16">
          <div className="absolute -left-20 -top-32 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-16 -bottom-36 size-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Your next idea is a good place to start
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-tighter text-card-foreground sm:text-5xl">
              Make something useful with AI.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Start with a template, make it your own, and see what your agent can do.
            </p>
            <Button
              render={<Link href="/agents/new" />}
              nativeButton={false}
              className="mt-8 h-12 rounded-full px-6"
            >
              Start building <ArrowRight weight="bold" />
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <Logo href="/" />
          <p className="text-xs text-muted-foreground">
            Build thoughtfully. Iterate often.
          </p>
          <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary">
            Sign in <ArrowUpRight className="ml-1 inline size-3.5" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
