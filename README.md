# RecipeBox

A full-stack recipe management app built as a Turborepo monorepo.

## Tech Stack

**API** (`apps/api`)
- NestJS 11 with TypeScript
- SQLite via better-sqlite3 + Drizzle ORM
- Zod for request validation

**Web** (`apps/web`)
- React 19 with TypeScript
- Vite 6 + Tailwind CSS v4
- React Router v7
- TanStack Query v5
- Sonner (toasts) + Lucide React (icons)

**Tooling**: Turborepo, Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.1.0+

### Install & Run

```bash
bun install
bun run dev
```

This starts both the API (http://localhost:3001) and the web app (http://localhost:5173).

### Seed the Database

```bash
cd apps/api
bun run db:seed
```

Populates the database with 6 sample recipes across all categories.

## Commands

### Root (Turborepo)

| Command | Description |
|---------|-------------|
| `bun run dev` | Start API and web dev servers |
| `bun run build` | Build both apps |
| `bun run check-types` | Type-check all workspaces |

### API (`apps/api`)

| Command | Description |
|---------|-------------|
| `bun run dev` | Start NestJS in watch mode (port 3001) |
| `bun run build` | Build the API |
| `bun run db:generate` | Generate Drizzle migration after schema changes |
| `bun run db:migrate` | Apply migrations |
| `bun run db:seed` | Seed database with sample recipes |
| `bun run db:studio` | Open Drizzle Studio GUI |

### Web (`apps/web`)

| Command | Description |
|---------|-------------|
| `bun run dev` | Start Vite dev server (port 5173) |
| `bun run build` | Type-check and build for production |
| `bun run preview` | Preview the production build |

## API Endpoints

```
GET    /recipes          # List all recipes (optional ?category= filter)
GET    /recipes/:id      # Get a single recipe
POST   /recipes          # Create a recipe
PUT    /recipes/:id      # Update a recipe
DELETE /recipes/:id      # Delete a recipe
```

**Categories**: `breakfast`, `lunch`, `dinner`, `dessert`, `snack`

## Project Structure

```
recipebox/
├── apps/
│   ├── api/                        # NestJS REST API
│   │   ├── src/
│   │   │   ├── database/           # DB module, schema, seed script
│   │   │   ├── recipes/            # Controller, service, DTOs
│   │   │   └── common/pipes/       # Zod validation pipe
│   │   ├── drizzle/                # Migration files
│   │   └── data/                   # SQLite database (gitignored)
│   └── web/                        # React SPA
│       └── src/
│           ├── components/         # Layout, RecipeCard, RecipeForm
│           ├── pages/              # Home, RecipeDetail, Create, Edit
│           ├── hooks/              # TanStack Query CRUD hooks
│           └── lib/                # API client, query client config
├── turbo.json
└── package.json
```

## Environment Variables

The web app reads `VITE_API_URL` to set the API base URL. Defaults to `http://localhost:3001` if not set.
