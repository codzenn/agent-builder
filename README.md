# Agent Builder

<div align="center">

<img src="public/agent-builder-logo.svg" alt="Agent Builder logo" width="96" />

<h3>Build AI agents visually. Give them tools. Test every idea.</h3>

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![LangGraph](https://img.shields.io/badge/LangGraph-1.7-1C3C3C)](https://langchain-ai.github.io/langgraphjs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Features](#features) · [Getting Started](#getting-started) · [Configuration](#configuration) · [Architecture](#architecture) · [Development](#development)

</div>

---

## Overview

**Agent Builder** is a full-stack visual workspace for creating, configuring, persisting, and testing AI agents. It combines a React Flow-style canvas with LangGraph execution, OpenAI chat models, tool calling, GitHub authentication, PostgreSQL persistence, and server-sent response streaming.

Every agent is owned by the signed-in user. Unsaved canvas changes can be tested immediately, while saved definitions, agent metadata, conversations, and message history remain in PostgreSQL.

## Features

- **Visual workflow canvas** — Start, Agent, and End nodes with a directed execution graph.
- **Ready-made templates** — Weather, web research, travel, writing, coding, and pull request review assistants.
- **OpenAI model selection** — Choose popular GPT models or enter a compatible model ID.
- **Built-in tools** — Calculator, weather, Tavily web search, webpage reading, and GitHub repository operations.
- **Custom HTTP tools** — Define methods, URLs, headers, request bodies, parameters, and timeouts.
- **Live test chat** — Stream model text and tool activity from unsaved canvas definitions.
- **Conversation memory** — Persist chat history and optionally include it in future agent runs.
- **GitHub sign-in** — Authenticate users and reuse the GitHub account token for repository tools.
- **Agent persistence** — Save names, descriptions, icons, templates, canvas state, and workflow definitions.
- **Execution limits** — Configure graph depth, tool-call limits, and timeout behavior.
- **Responsive workspace** — Desktop sidebar and mobile navigation with light and dark themes.

## How It Works

1. Sign in with GitHub.
2. Start with a template or a blank canvas.
3. Configure an Agent node with instructions, a model, memory, and tools.
4. Connect Start → Agent → End in the visual workflow.
5. Test the unsaved workflow in the chat drawer.
6. Save the agent to persist the workflow and canvas.

The runtime validates the graph, compiles it into a LangGraph workflow, streams model responses, executes tool calls, and stores the completed conversation.

## Architecture

```mermaid
flowchart LR
    A[Next.js UI] --> B[Better Auth]
    B --> C[GitHub OAuth]
    A --> D[Server Actions]
    A --> E[Streaming Run API]
    D --> F[PostgreSQL]
    E --> F
    E --> G[LangGraph Compiler]
    G --> H[OpenAI Chat Models]
    G --> I[Tool Registry]
    I --> J[Weather]
    I --> K[Tavily Search]
    I --> L[GitHub API]
    I --> M[Custom HTTP APIs]
```

| Layer | Implementation |
| --- | --- |
| Framework | Next.js 16 App Router, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, Base UI, shadcn-style components, tw-animate-css |
| Canvas | Zustand plus `@xyflow/react` |
| Server state | TanStack React Query |
| Authentication | Better Auth with GitHub OAuth |
| Database | PostgreSQL through Drizzle ORM |
| Agent runtime | LangGraph and LangChain |
| Model provider | OpenAI-compatible chat models through `ChatOpenAI` |
| Streaming | Server-Sent Events |
| Package manager | Bun |

## Tech Stack

- **UI:** Next.js, React, Tailwind CSS, Phosphor Icons
- **Workflow:** `@xyflow/react`, Zustand
- **AI:** LangGraph, LangChain Core, `@langchain/openai`
- **Data:** Drizzle ORM, PostgreSQL
- **Auth:** Better Auth
- **Tools:** Open-Meteo, Tavily, GitHub REST API
- **Utilities:** Zod validation, TanStack Query, Recharts, Shiki

## Getting Started

### Prerequisites

- [Bun 1.4.5 or later](https://bun.sh/) — recommended package manager
- [PostgreSQL](https://www.postgresql.org/) — local or hosted
- An [OpenAI API key](https://platform.openai.com/api-keys)
- A [GitHub OAuth application](https://github.com/settings/developers)
- A [Tavily API key](https://tavily.com/) for web search and webpage tools

Node.js 20.9 or later is required by the Next.js toolchain. Bun is the package manager recorded in `package.json`.

### 1. Clone the repository

```bash
git clone https://github.com/codzenn/agent-builder.git
cd agent-builder
```

### 2. Install dependencies

```bash
bun install
```

npm, pnpm, and Yarn may also be used, but Bun is recommended for lockfile consistency.

### 3. Configure PostgreSQL

Create a database, for example:

```sql
CREATE DATABASE agent_builder;
```

Then set `DATABASE_URL` to a valid PostgreSQL connection string.

### 4. Configure environment variables

Create `.env.local` in the project root:

```dotenv
DATABASE_URL=postgres://postgres:password@localhost:5432/agent_builder

BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000

GITHUB_CLIENT_ID=your-github-oauth-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-client-secret

OPENAI_API_KEY=sk-your-openai-api-key
TAVILY_API_KEY=tvly-your-tavily-api-key
```

Generate a strong Better Auth secret with:

```bash
openssl rand -base64 32
```

See [Configuration](#configuration) for OAuth callback setup and variable details.

### 5. Run migrations

```bash
bun run db:migrate
```

Drizzle applies migrations from `drizzle/` using `drizzle.config.ts`.

### 6. Start the application

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Configuration

### Environment variables

| Variable | Required | Purpose |
| --- | :---: | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Drizzle and Better Auth |
| `BETTER_AUTH_SECRET` | Yes | Signing and session security secret |
| `BETTER_AUTH_URL` | Yes | Public application URL in the runtime environment |
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth application client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth application client secret |
| `OPENAI_API_KEY` | Yes | Authentication for model calls |
| `TAVILY_API_KEY` | For search | Enables web search and webpage content tools |

Never commit `.env`, `.env.local`, API keys, OAuth secrets, access tokens, or production credentials. `.env*` files are ignored by the repository except for allowed example/template files.

### GitHub OAuth

Create a GitHub OAuth app and configure:

- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

For production, replace both URLs with the deployed origin and keep the `/api/auth/callback/github` path.

The GitHub access token is stored with the user's Better Auth account and is reused by repository tools. GitHub tools report a clear connection error if no token is available.

### OpenAI models

The settings panel includes:

- `gpt-4o-mini`
- `gpt-4o`
- `gpt-4.1-mini`
- `gpt-4.1`
- `o3-mini`

You can also enter another model ID, provided it supports the selected runtime and tool-calling behavior.

## Built-In Tools

| Tool | Provider / behavior |
| --- | --- |
| Calculator | Safely evaluates numeric expressions containing digits and basic operators |
| Weather | Resolves locations through Open-Meteo and returns current plus 3-day forecast data |
| Web Search | Searches Tavily and returns titles, URLs, and snippets |
| Read Webpage | Uses Tavily's webpage extraction capability |
| GitHub Read File | Reads repository file content |
| GitHub Search Code | Searches code inside a configured repository |
| GitHub Get PR | Retrieves pull request metadata |
| GitHub Get Diff | Retrieves a pull request diff |

GitHub tools support owner/repository defaults configured in an agent node, or values supplied by the model.

## Custom HTTP Tools

Custom tools can call external HTTP APIs with:

- GET, POST, PUT, or DELETE methods
- Configurable URL and header templates
- JSON or text request bodies
- String, number, and boolean parameters
- Required or optional parameters
- A per-request timeout

URL, header, and body values support `{{parameter}}` interpolation. Custom tool names are normalized for OpenAI-compatible tool names.

> Custom HTTP tools execute server-side. Only add trusted endpoints and enforce network, authentication, and payload controls appropriate for deployment.

## Workflow Graph

The workflow schema is currently V2:

- Exactly one Start node
- Exactly one End node
- At least one Agent node
- A single linear path from Start to End
- No cycles
- Every edge must reference a known node

Each Agent node defines:

- Instructions
- Model ID
- Tool list
- Optional GitHub owner, repository, and default PR
- Memory inclusion

Execution is bounded by:

| Limit | Default |
| --- | ---: |
| Maximum graph steps | 10 |
| Maximum tool calls | 5 |
| Timeout | 60 seconds |

## Project Structure

```text
agent-builder/
├── app/
│   ├── (auth)/                 # Sign-in routes
│   ├── (dashboard)/            # Authenticated agent workspace
│   ├── api/auth/[...all]/      # Better Auth handler
│   └── api/agents/[agentId]/   # Streaming agent run endpoint
├── components/
│   ├── providers/              # Theme and React Query providers
│   └── ui/                     # Reusable UI primitives
├── db/
│   └── schema.ts               # Drizzle PostgreSQL models
├── drizzle/                    # Generated SQL migrations
├── lib/
│   ├── auth.ts                 # Better Auth configuration
│   └── db.ts                   # Drizzle database client
├── modules/
│   ├── agents/                 # Agent CRUD, hooks, and templates
│   ├── auth/                   # Sign-in and session actions
│   ├── builder/                # Canvas, nodes, settings, and tools
│   ├── playground/             # Streaming test chat
│   ├── runtime/                # Graph compilation and execution
│   ├── tools/                  # Built-in and custom tool implementations
│   └── workflows/              # Workflow schema and migrations
├── public/                     # Static assets
├── drizzle.config.ts
├── next.config.ts
└── package.json
```

## Database Model

The PostgreSQL schema includes:

- `user` — application users
- `session` — Better Auth sessions
- `account` — password and social-provider accounts
- `verification` — verification records
- `agent` — agent metadata, workflow definition, and canvas state
- `conversation` — agent chat conversations
- `message` — persisted chat messages and tool events

Foreign-key cascades remove conversations and messages when their agent or account records are deleted.

## Available Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Next.js development server |
| `bun run build` | Create an optimized production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |
| `bun run db:migrate` | Apply Drizzle migrations |

## Development

Run the main quality checks:

```bash
bun run lint
bun run build
```

No automated test suite is configured in the current `package.json`. For production changes, add focused unit, integration, and end-to-end coverage around workflow validation, tool execution, authentication, and streaming behavior.

### Working with the canvas

- Save persists agent metadata and both workflow and React Flow canvas state.
- Test chat reads the current unsaved canvas state.
- Leaving the builder warns on unsaved local changes.
- The chat endpoint falls back to the saved agent definition when no unsaved definition is submitted.

### Working with conversations

- New test chats create a conversation and persist user/assistant messages.
- Tool calls are included as events on assistant messages.
- When memory is enabled, earlier conversation messages are loaded as runtime history.
- Invalid runs, missing agents, and unauthorized access return explicit API errors.

## Production Deployment

For a Next.js host:

1. Provision PostgreSQL and run `bun run db:migrate`.
2. Set all required environment variables in the host's secret manager.
3. Set `BETTER_AUTH_URL` to the public HTTPS origin.
4. Add the production GitHub OAuth callback:
   `https://your-domain.com/api/auth/callback/github`
5. Build and start the application:

```bash
bun install --frozen-lockfile
bun run build
bun run start
```

The default Next.js port is `3000`. Configure a reverse proxy or platform runtime as needed.

### Production checklist

- Rotate any credentials that have been committed or shared.
- Use HTTPS and a strong, unique `BETTER_AUTH_SECRET`.
- Restrict database access to the application network.
- Add provider spend and rate limits.
- Apply egress restrictions before exposing custom HTTP tools.
- Validate and sanitize external API payloads.
- Add logs and monitoring without storing secrets or private prompts.
- Configure scheduled database backups and restore testing.

## Security

- Authentication is required for agent CRUD and run endpoints.
- Agent and conversation queries are scoped to the authenticated user.
- Workflow definitions are validated with Zod before saving or execution.
- The runtime rejects cyclic graphs and invalid start/end configurations.
- Graph steps and tool calls are bounded.
- Run timeouts use `AbortSignal.timeout`.
- Custom tools are capped by timeout and response text limits.

Credential handling should always use environment variables or a managed secret store. Do not paste API keys into agent instructions, workflow definitions, or persisted canvas state.

## Contributing

Contributions are welcome.

1. Create a focused feature branch.
2. Follow existing Next.js, TypeScript, Drizzle, and component conventions.
3. Keep changes scoped and add documentation for public configuration.
4. Run lint and build checks before opening a pull request.
5. Include reproduction steps and verification notes in the PR.

## License

This project is licensed under the [MIT License](LICENSE).
