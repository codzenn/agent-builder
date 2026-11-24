<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

# Agent Builder Repository Guidelines

These repository-specific instructions apply to automated coding agents and human contributors.

## Project Overview

Agent Builder is a full-stack Next.js application for creating, configuring, persisting, and testing AI agents.

Core technologies:

- Next.js 16 App Router
- React 19
- TypeScript 5 with strict mode
- Tailwind CSS 4
- Zustand and TanStack React Query
- Better Auth with GitHub OAuth
- PostgreSQL and Drizzle ORM
- LangGraph and LangChain
- OpenAI chat models
- Server-Sent Events
- Bun as the declared package manager

Prefer existing repository patterns over introducing a new framework or abstraction.

## Repository Map

```text
app/
  (auth)/                 Public authentication pages
  (dashboard)/            Protected workspace pages
  api/auth/[...all]/      Better Auth handler
  api/agents/[agentId]/   Streaming agent run endpoint

components/
  providers/              Global providers
  ui/                     Reusable UI primitives

db/
  schema.ts               Drizzle PostgreSQL schema

drizzle/
  */migration.sql         Generated migrations

lib/
  auth.ts                 Better Auth configuration
  db.ts                   Shared database client
  utils.ts                Shared utilities

modules/
  agents/                 Agent CRUD, templates, hooks, and UI
  auth/                   Authentication actions and components
  builder/                Canvas, nodes, settings, and tool selection
  playground/             Test chat and streaming client
  runtime/                Graph compilation and execution
  tools/                  Built-in and custom tools
  workflows/              Workflow schema and migrations
```

Use the `@/` TypeScript path alias for repository imports.

## Tooling

Use the existing Bun scripts:

```bash
bun install
bun run dev
bun run lint
bun run build
bun run db:migrate
```

- Do not update dependencies unless the task requires it.
- Preserve the existing Bun lockfile and package manager declaration.
- Prefer repository scripts over direct package executables.
- Do not install global packages.
- Do not remove or replace an existing library for stylistic preference alone.

## Environment and Secrets

Required variables are documented in `README.md`.

Never:

- Commit API keys, OAuth secrets, database passwords, or access tokens
- Reuse or print values from `.env` or `.env.local`
- Add credentials to source, migrations, screenshots, tests, logs, or fixtures
- Commit local environment or database files

Use `.env.local` for local-only configuration.

Server-only variables:

- `DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `OPENAI_API_KEY`
- `TAVILY_API_KEY`

Do not access server-only environment variables from client components.

## TypeScript and React

- Preserve strict TypeScript; do not introduce `any`.
- Prefer existing inferred types and Zod-inferred types.
- Use `unknown` and explicit narrowing for external data.
- Keep route files thin and place feature behavior in `modules/<feature>/`.
- Mark components `"use client"` only when browser APIs or client state are required.
- Reuse `components/ui`, providers, TanStack Query hooks, and `lib/utils`.
- Preserve accessibility attributes, keyboard behavior, focus handling, labels, and loading states.
- Preserve light and dark themes and existing design tokens.
- Avoid new global state or abstractions without a demonstrated need.

## Tailwind CSS

- Use Tailwind CSS 4 utilities and existing CSS variables.
- Use canonical utilities instead of arbitrary values when equivalent.
- Preserve existing responsive breakpoints and design tokens.
- Reuse `components/ui` primitives for controls and overlays.
- Do not introduce another styling system or duplicate utility helper.

## Authentication and Authorization

Authentication is configured in `lib/auth.ts` with Better Auth and GitHub OAuth.

- Use `requireAuth()` for protected server actions.
- Use `requireUnauth()` for public-only authentication pages.
- Validate sessions in protected API routes.
- Scope agents and conversations to `session.user.id`.
- Return `401` for missing authentication and `404` for inaccessible or missing resources.
- Never trust ownership or user identifiers supplied only by the client.
- Preserve GitHub access-token handling used by repository tools.

## Database and Drizzle

The schema is in `db/schema.ts`.

Before changing a table or column:

1. Update `db/schema.ts`.
2. Generate or add the matching migration under `drizzle/`.
3. Run migrations against an appropriate database.
4. Update affected actions, routes, hooks, and types.
5. Verify ownership and cascade behavior.

Rules:

- Scope user-owned queries to the authenticated user.
- Use Drizzle parameterization; never interpolate SQL values.
- Preserve foreign-key cascade behavior unless explicitly changed.
- Keep JSONB types narrow and documented.
- Do not reset, drop, or destructively replace production data.
- Do not edit or rewrite applied migration history.

## Workflow and Runtime

Workflow definitions are validated through Zod in `modules/workflows/lib/schema.ts`.

Preserve exactly:

- One `start` node
- One `end` node
- At least one `agent` node
- A valid linear path from Start to End
- No cycles
- Edges that reference existing nodes

Execution limits must remain enforced:

- `maxGraphSteps`
- `maxToolCalls`
- `timeoutMs`

Do not bypass graph validation, tool-call limits, graph-step limits, run timeouts, or ownership checks.

Unsaved canvas definitions may be used by test chat. The run route must fall back to the saved definition when no definition is submitted.

## Tool Implementations

Built-in tools live in `modules/tools/lib/`.

When adding a tool:

1. Implement a LangChain `StructuredTool`.
2. Define input with Zod.
3. Register it in `modules/tools/lib/registry.ts`.
4. Add it to the builder catalog if users must select it.
5. Return bounded, stable text or serialized JSON.
6. Handle missing configuration and provider failures explicitly.

Custom HTTP tools must preserve:

- Parameter interpolation
- Timeout handling
- Bounded response text
- Explicit HTTP errors
- Safe server-side execution

GitHub tools must use the authenticated user's GitHub token and configured repository defaults.

## Streaming API

The run endpoint is `app/api/agents/[agentId]/runs/route.ts`.

Preserve:

- Authentication
- Zod request validation
- Agent ownership validation
- Server-Sent Event headers
- Conversation and message persistence
- Tool event persistence
- Explicit completed and failed run events

Update the streaming client and chat panel consistently when changing runtime events.
Do not silently return success-shaped output for provider or tool failures.

## Server Actions and Route Handlers

- Use server actions for existing agent CRUD features.
- Use route handlers for streaming HTTP or external protocol handlers.
- Validate all external input.
- Keep side effects in server code.
- Never expose secrets or database objects to client components.
- Update affected React Query state after mutations.
- Preserve ownership checks on update and delete operations.

## Error Handling

- Make failures explicit.
- Do not use broad silent `catch` blocks or success-shaped fallbacks.
- Preserve actionable user-facing errors.
- Log only safe operational details.
- Never log API keys, OAuth tokens, database passwords, or private user content.
- Convert provider and network failures into typed or user-readable errors.

## Validation and Testing

There is no automated test runner configured in `package.json`.

Run the smallest relevant checks, then escalate where needed:

```bash
bun run lint
bun run build
```

For database changes, also run:

```bash
bun run db:migrate
```

Add focused tests for behavior that would fail without the change, especially authentication, ownership, graph validation, limits, streaming, custom HTTP tools, and migrations.
Do not add a new test framework for a trivial change.

## Change Quality

Before completing a change:

- Verify it end-to-end across every affected surface
- Remove unrelated edits
- Preserve behavior outside the requested scope
- Update directly related documentation
- Run lint and build checks
- Inspect the final diff
- Confirm no secrets were introduced

Do not:

- Refactor unrelated code
- Rename stable APIs without necessity
- Perform destructive Git operations
- Use `git reset --hard`
- Amend commits unless explicitly requested
- Add placeholders that appear to be implemented features

## Git Workflow

- Keep commits focused and descriptive.
- Do not commit generated build output or local caches.
- Do not commit `.next/`, `node_modules/`, `.env*`, or `*.tsbuildinfo`.
- When creating a commit, include:

  ```text
  Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
  ```

## Production Readiness

Before deployment:

- Run migrations
- Set required variables through a secret manager
- Use a strong unique `BETTER_AUTH_SECRET`
- Configure the production GitHub OAuth callback
- Restrict database network access
- Apply provider spend and rate limits
- Apply egress restrictions for custom HTTP tools
- Add observability without logging secrets or private prompts
- Verify proxy and platform streaming timeouts
- Configure backups and restore testing
