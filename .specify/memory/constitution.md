<!--
  Sync Impact Report
  ==================
  Version change: N/A → 1.0.0 (initial ratification)

  Modified principles: N/A (initial creation)

  Added sections:
    - Core Principles (5): Simplicity First, Monorepo with Clear Separation,
      End-to-End Type Safety, Convention over Configuration, Developer Experience
    - Technical Stack
    - Development Workflow
    - Governance

  Removed sections: N/A

  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ reviewed — no changes needed,
      Constitution Check section is generic and will be filled per-feature
    - .specify/templates/spec-template.md ✅ reviewed — no changes needed,
      user story structure is project-agnostic
    - .specify/templates/tasks-template.md ✅ reviewed — no changes needed,
      phase structure accommodates monorepo layout
    - .specify/templates/commands/*.md — no command templates found

  Follow-up TODOs: none
-->

# RecipeBox Constitution

## Core Principles

### I. Simplicity First

RecipeBox is a demo CRUD application. All implementation decisions MUST favor the simplest viable approach.

- There MUST be no authentication, authorization, rate limiting, or request queuing.
- Abstract layers (repositories, generic base classes, service buses) MUST NOT be introduced unless a concrete, immediate need is demonstrated.
- Each module MUST contain only the controller, service, and DTOs required for its domain.
- If a feature can be achieved with fewer files or lines of code without sacrificing clarity, the simpler version MUST be preferred.

**Rationale**: This project exists to demonstrate full-stack patterns cleanly. Unnecessary complexity obscures the patterns it is meant to showcase.

### II. Monorepo with Clear Separation

The repository MUST contain exactly two independent applications (`apps/api` and `apps/web`) managed by Turborepo workspaces.

- Each app MUST have its own `package.json`, `tsconfig.json`, build scripts, and dev server.
- The API and web apps MUST communicate exclusively via REST HTTP calls — no shared runtime packages, no direct imports across app boundaries.
- Types MAY be duplicated by convention (e.g., a `Recipe` interface in both apps) rather than extracted into a shared package.
- Turborepo tasks (`dev`, `build`, `check-types`) MUST orchestrate both apps from the repository root.

**Rationale**: Clear boundaries prevent accidental coupling and keep each app independently deployable and understandable.

### III. End-to-End Type Safety

TypeScript strict mode MUST be enabled in both apps. Runtime validation MUST use Zod schemas.

- API DTOs MUST define Zod schemas as the single source of truth for request validation.
- The custom `ZodValidationPipe` MUST be applied to all write endpoints (POST, PUT).
- Frontend types MUST mirror the API response shape; discrepancies indicate a bug.
- `any` types MUST NOT be used. `unknown` with narrowing is acceptable when interfacing with untyped libraries.

**Rationale**: Type safety across both layers catches integration errors at compile time rather than at runtime.

### IV. Convention over Configuration

The project MUST follow predictable, repeatable patterns that minimize per-feature decision-making.

- Path aliases (`@/*` → `./src/*`) MUST be configured in both `tsconfig.json` and Vite config.
- Database schema MUST be defined as code via Drizzle ORM; raw SQL MUST NOT be used for schema definitions.
- Migrations MUST auto-apply on API startup via `DatabaseModule`.
- Seed data MUST be available via `bun run db:seed` for reproducible local development.
- JSON-serialized columns (`ingredients`, `instructions`) MUST be handled by dedicated `serializeRecipe`/`deserializeRecipe` helpers in the service layer.

**Rationale**: Consistent conventions reduce onboarding friction and eliminate "how should I do X?" questions.

### V. Developer Experience

Starting the full project MUST require no manual configuration beyond `bun install` and `bun dev`.

- `bun run dev` at the root MUST start both API (port 3001) and web (port 5173) concurrently via Turborepo.
- `bun run build` MUST build both apps; `bun run check-types` MUST type-check both apps.
- Database scripts (`db:generate`, `db:migrate`, `db:seed`, `db:studio`) MUST be available in the API workspace.
- CORS MUST be pre-configured for `http://localhost:5173` so frontend-to-API calls work out of the box.
- Existing processes on target ports MUST be killed before starting new dev servers to avoid port conflicts.

**Rationale**: A zero-friction dev loop encourages experimentation and keeps the focus on building features.

## Technical Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Monorepo | Turborepo | 2.x |
| Package manager | Bun | 1.1+ |
| Language | TypeScript | 5.x (strict) |
| Backend framework | NestJS | 11.x |
| ORM | Drizzle ORM | 0.38+ |
| Database driver | better-sqlite3 | 11.x |
| Database | SQLite | local file (`apps/api/data/recipes.db`) |
| Frontend framework | React | 19.x |
| Bundler | Vite | 6.x |
| Server state | TanStack Query | 5.x |
| Styling | Tailwind CSS | 4.x (via `@tailwindcss/vite`) |
| Routing | React Router | 7.x |
| Validation | Zod | 3.x |
| Icons | Lucide React | 0.460+ |
| Notifications | Sonner | 2.x |

Technology changes MUST be documented in this table and require a constitution amendment.

## Development Workflow

The canonical workflow for a fresh clone:

```bash
bun install              # Install all workspace dependencies
cd apps/api
bun run db:generate      # Generate Drizzle migration files
bun run db:migrate       # Apply migrations (creates SQLite file)
bun run db:seed          # Insert sample recipes
cd ../..
bun run dev              # Start API + Web concurrently
```

- No linting or automated testing is configured yet.
- When lint/test tooling is added, it MUST be registered as a Turborepo task and runnable from the root.

## Governance

- This constitution is the primary guide for architectural and technical decisions in RecipeBox.
- All feature implementations and code reviews MUST verify compliance with the Core Principles.
- Amendments to this constitution MUST include:
  1. A description of the change and its rationale.
  2. An updated version number following semantic versioning (MAJOR for principle removals/redefinitions, MINOR for additions/expansions, PATCH for clarifications).
  3. An updated `Last Amended` date.
  4. A Sync Impact Report documenting affected templates and artifacts.
- Complexity MUST be justified: any deviation from Simplicity First requires explicit documentation of why the simpler alternative was rejected.

**Version**: 1.0.0 | **Ratified**: 2026-03-11 | **Last Amended**: 2026-03-11
