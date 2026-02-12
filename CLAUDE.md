# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RecipeBox is a full-stack recipe management app built as a Turborepo monorepo with two apps:
- **`apps/api`** — NestJS 11 REST API with SQLite (Drizzle ORM)
- **`apps/web`** — React 19 SPA with Vite, TanStack Query, Tailwind CSS v4

## Commands

### Development
```bash
bun run dev          # Start both API (port 3001) and web (port 5173) via Turbo
bun run build        # Build both apps
bun run check-types  # Type-check all workspaces
```

### API (`apps/api`)
```bash
cd apps/api
bun run db:generate  # Generate Drizzle migration after schema changes
bun run db:migrate   # Apply migrations
bun run db:seed      # Seed database with sample recipes
bun run db:studio    # Open Drizzle Studio GUI
```

### Web (`apps/web`)
```bash
cd apps/web
bun run dev          # Vite dev server on port 5173
bun run preview      # Preview production build
```

No linting or testing is configured yet.

## Architecture

### API (`apps/api`)

NestJS modular architecture with dependency injection:
- **AppModule** imports `DatabaseModule` (global DB singleton) and `RecipesModule`
- **RecipesModule** contains the controller, service, and DTOs
- **Database**: SQLite via `better-sqlite3` + Drizzle ORM. DB file at `apps/api/data/recipes.db`. Migrations auto-run on startup.
- **Validation**: Zod schemas in DTOs, applied through a custom `ZodValidationPipe`
- **CORS**: Configured for `http://localhost:5173`

REST endpoints:
```
GET    /recipes          # List all (optional ?category= filter)
GET    /recipes/:id
POST   /recipes
PUT    /recipes/:id
DELETE /recipes/:id
```

Schema lives in `apps/api/src/database/schema/recipes.ts`. `ingredients` and `instructions` are stored as JSON-stringified text columns.

### Web (`apps/web`)

- **Routing**: React Router v7 — `/`, `/recipes/new`, `/recipes/:id`, `/recipes/:id/edit`
- **Server state**: TanStack Query v5 with cache invalidation on mutations
- **API client**: Custom fetch wrapper in `src/lib/api.ts`, base URL from `VITE_API_URL` env var
- **Hooks**: `src/hooks/use-recipes.ts` encapsulates all CRUD query/mutation hooks
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Icons**: lucide-react
- **Toasts**: sonner

### Path Aliases

Both apps use `@/*` → `./src/*` path alias (configured in tsconfig and vite config).

## Key Files

| File | Purpose |
|------|---------|
| `apps/api/src/database/schema/recipes.ts` | DB schema (Drizzle) |
| `apps/api/src/recipes/recipes.service.ts` | Business logic + serialization |
| `apps/api/src/common/pipes/zod-validation.pipe.ts` | Request validation pipe |
| `apps/api/drizzle.config.ts` | Drizzle Kit config |
| `apps/web/src/lib/api.ts` | Fetch wrapper (base URL from `VITE_API_URL`) |
| `apps/web/src/lib/query-client.ts` | TanStack Query config |
| `apps/web/src/hooks/use-recipes.ts` | CRUD query/mutation hooks |
| `apps/web/src/types.ts` | Shared `Recipe` type |
| `apps/web/src/router.tsx` | Route definitions |

## Gotchas

- **Kill before start**: Always kill existing processes on a port before starting a dev server (`lsof -ti:3001 | xargs kill -9` for API, `lsof -ti:5173 | xargs kill -9` for web)
- **Auto-migration**: `DatabaseModule` runs Drizzle migrations automatically on API startup
- **JSON columns**: `ingredients` and `instructions` are stored as JSON-stringified text; the service layer handles serialization/deserialization via `serializeRecipe`/`deserializeRecipe`
- **Image URL coercion**: Empty string `imageUrl` is converted to `null` in the service layer
- **Valid categories**: `breakfast`, `lunch`, `dinner`, `dessert`, `snack` (defined in Zod DTO schema)
- **Query client defaults**: `staleTime: 60s`, `retry: 1`, `refetchOnWindowFocus: false` (configured in `src/lib/query-client.ts`)
