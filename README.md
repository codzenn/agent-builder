# Agent Builder

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescript-lang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-1.4-f9f1e5?logo=bun&logoColor=black)](https://bun.sh/)

A modern Next.js foundation for building an agent-oriented web application.

</div>

## Overview

Agent Builder is a production-oriented frontend starter built with the Next.js App Router and a comprehensive, customizable UI component system. It includes responsive provider composition, light and dark themes, server-state tooling, and the base styling and utility layers needed to develop AI agent workflows.

> **Current state:** This repository provides the application shell and UI foundation. Agent orchestration, API integrations, authentication, persistence, and feature-specific workflows have not yet been implemented.

## Features

- App Router architecture with React Server Components
- React 19 and strict TypeScript configuration
- Tailwind CSS 4 with light and dark design tokens
- System-aware theme switching through `next-themes`
- TanStack Query provider for client-side server state
- Radix-style UI primitives composed for accessible interactions
- Toast notifications, tooltips, dialogs, menus, forms, charts, tables, and more
- Phosphor icons and `cn`-based class composition
- Turbopack and Next.js cache-component configuration
- Path alias support with `@/*`

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16.4 |
| UI library | React 19.3 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4, tw-animate-css |
| Components | shadcn/UI and Base UI |
| State | TanStack React Query 5 |
| Theming | next-themes |
| Icons | Phosphor Icons |
| Charts | Recharts |
| Syntax highlighting | Shiki |
| Package manager | Bun |

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- Bun 1.4.5 or newer (recommended)

Bun is declared as the package manager in `package.json`. Node.js with npm, pnpm, or Yarn can also be used.

### Installation

Clone the repository:

```bash
git clone https://github.com/codzenn/agent-builder.git
cd agent-builder
```

Install dependencies with Bun:

```bash
bun install
```

Or use npm:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

The application uses hot reloading. Changes to files under `app/` and `components/` are reflected without restarting the server.

### Environment Variables

No environment variables are required for the current implementation.

When integrations are added, create a local `.env.local` file and document each variable here. Add `.env.local.example` to the repository so required configuration can be reproduced safely.

## Available Scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Next.js development server |
| `bun run build` | Create an optimized production build |
| `bun run start` | Serve the production build |
| `bun run lint` | Run ESLint |

Equivalent npm commands are available, for example `npm run dev`, `npm run build`, and `npm run lint`.

## Project Structure

```text
agent-builder/
├── app/
│   ├── layout.tsx          # Root layout, providers, fonts, metadata
│   ├── page.tsx            # Application entry page
│   ├── globals.css         # Tailwind setup and design tokens
│   └── favicon.ico
├── components/
│   ├── providers/          # Theme, query, and tooltip providers
│   └── ui/                 # Reusable UI component library
├── hooks/
│   └── use-*.ts            # Shared React hooks
├── lib/
│   ├── highlighter.tsx     # Syntax highlighting utilities
│   └── utils.ts            # Shared utility functions
├── public/                 # Static assets
├── components.json         # shadcn/UI configuration
├── next.config.ts          # Next.js and Turbopack configuration
├── tsconfig.json           # TypeScript and path aliases
└── package.json
```

## Application Providers

The application-level providers are composed in `components/providers/provider.tsx`:

- **ThemeProvider** applies system, light, or dark appearance using `next-themes`
- **TooltipProvider** supplies tooltip behavior throughout the component tree
- **QueryProvider** creates and owns a TanStack `QueryClient`
- **Toaster** renders application notifications

Provider composition is intentionally centralized so new global context can be added consistently.

## Styling and Components

Global styles and theme variables live in `app/globals.css`. Components follow the existing `components/ui` pattern and can be extended or replaced with project-specific implementations.

When adding components:

- Keep reusable UI primitives in `components/ui`
- Keep application-specific composition in `components/` or `app/`
- Use Tailwind utilities and existing design tokens
- Import shared modules through the `@/` alias
- Preserve keyboard interaction and accessible labels

## Production Build

Create and verify the production bundle:

```bash
bun run lint
bun run build
bun run start
```

The default service URL is [http://localhost:3000](http://localhost:3000).

For platforms such as Vercel or any Node.js hosting environment, set the Node.js runtime to 20.9 or newer and run:

```bash
bun install --production
bun run build
bun run start
```

## Quality and Testing

Use the following checks before submitting changes:

```bash
bun run lint
bun run build
```

No automated test runner or test suite is configured yet. Add focused unit and integration tests when implementing agent workflows and API boundaries.

## Security

- Never commit API keys, credentials, or private configuration
- Store runtime secrets in environment variables or a secret manager
- Validate data at server and API boundaries
- Redact sensitive content from logs and persisted telemetry
- Review third-party agent tools and network permissions before granting access

## Contributing

Contributions are welcome. To contribute:

1. Create a focused feature branch.
2. Follow the existing Next.js, TypeScript, and component conventions.
3. Keep changes scoped and document public configuration or behavior.
4. Run lint and build checks.
5. Open a pull request with the motivation, implementation summary, and verification steps.

Before major architectural work, open an issue to align on scope and direction.

## License

No license has been specified for this repository. All rights remain with the repository owner until a license is added.
