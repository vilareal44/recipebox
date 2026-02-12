# Claude Code Demo Project — RecipeBox

You are creating a full-stack web application called **RecipeBox** from scratch in this empty folder. RecipeBox is a personal recipe collection manager where users can create, browse, edit, and delete recipes organized by category.

This is a Turborepo monorepo using Bun, with a NestJS API backend (SQLite via Drizzle ORM) and a React SPA frontend (Vite + TanStack Query + Tailwind CSS 4). There is NO authentication — this is a simple CRUD demo app.

## Tech Stack (exact versions)

| Layer | Technology |
|-------|------------|
| Monorepo | Turborepo 2 |
| Package manager | Bun |
| Language | TypeScript 5 (strict mode) |
| Backend | NestJS 11 |
| ORM | Drizzle ORM 0.38+ with `better-sqlite3` |
| Database | SQLite (local file `./data/recipes.db`) |
| Frontend | React 19, Vite 6 |
| Server state | TanStack Query 5 |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| Validation | Zod 3 |
| Icons | Lucide React |
| Notifications | Sonner |

## Project Structure

```
recipebox/
├── package.json            # Workspaces: ["apps/*"]
├── turbo.json
├── tsconfig.json           # Base tsconfig
├── apps/
│   ├── api/                # NestJS 11 backend
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── nest-cli.json
│   │   ├── drizzle.config.ts
│   │   ├── data/           # SQLite DB file lives here (gitignored)
│   │   └── src/
│   │       ├── main.ts
│   │       ├── app.module.ts
│   │       ├── database/
│   │       │   ├── database.module.ts   # @Global(), provides DATABASE_CONNECTION
│   │       │   └── schema/
│   │       │       ├── index.ts
│   │       │       └── recipes.ts       # recipes table
│   │       ├── common/
│   │       │   └── pipes/
│   │       │       └── zod-validation.pipe.ts
│   │       └── recipes/
│   │           ├── recipes.module.ts
│   │           ├── recipes.controller.ts
│   │           ├── recipes.service.ts
│   │           └── dto/
│   │               ├── create-recipe.dto.ts
│   │               └── update-recipe.dto.ts
│   └── web/                # React 19 SPA
│       ├── package.json
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           ├── index.css           # Tailwind import
│           ├── router.tsx
│           ├── lib/
│           │   ├── api.ts          # API client class
│           │   └── query-client.ts
│           ├── hooks/
│           │   └── use-recipes.ts  # useRecipes, useRecipe, useCreateRecipe, useUpdateRecipe, useDeleteRecipe
│           ├── components/
│           │   ├── recipe-card.tsx
│           │   ├── recipe-form.tsx
│           │   └── layout.tsx      # Header + main container
│           └── pages/
│               ├── home.tsx        # List all recipes with category filter
│               ├── recipe-detail.tsx
│               ├── create-recipe.tsx
│               └── edit-recipe.tsx
└── .gitignore
```

## Database Schema

One table: `recipes`

```typescript
// apps/api/src/database/schema/recipes.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const recipes = sqliteTable('recipes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack'
  prepTime: integer('prep_time').notNull(),    // minutes
  cookTime: integer('cook_time').notNull(),    // minutes
  servings: integer('servings').notNull(),
  ingredients: text('ingredients').notNull(),   // JSON string array
  instructions: text('instructions').notNull(), // JSON string array (ordered steps)
  imageUrl: text('image_url'),                  // optional URL
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export type Recipe = typeof recipes.$inferSelect;
export type NewRecipe = typeof recipes.$inferInsert;
```

## API Endpoints

All endpoints under `/recipes` prefix:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/recipes` | List all recipes. Optional query param `?category=breakfast` to filter. |
| `GET` | `/recipes/:id` | Get single recipe by ID. 404 if not found. |
| `POST` | `/recipes` | Create new recipe. Validate with Zod. Return created recipe. |
| `PUT` | `/recipes/:id` | Update existing recipe. Validate with Zod. 404 if not found. |
| `DELETE` | `/recipes/:id` | Delete recipe. 404 if not found. Return `{ success: true }`. |

## DTOs (Zod Schemas)

### CreateRecipeDto
```typescript
export const createRecipeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required').max(1000),
  category: z.enum(['breakfast', 'lunch', 'dinner', 'dessert', 'snack']),
  prepTime: z.number().int().min(0).max(1440),
  cookTime: z.number().int().min(0).max(1440),
  servings: z.number().int().min(1).max(100),
  ingredients: z.array(z.string().min(1)).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.string().min(1)).min(1, 'At least one instruction is required'),
  imageUrl: z.string().url().optional().or(z.literal('')),
});
```

### UpdateRecipeDto
Same as create but all fields optional (partial).

## Backend Implementation Details

### Database Module (`database.module.ts`)
- Use `@Global()` decorator
- Provider token: `'DATABASE_CONNECTION'`
- Use `drizzle` from `drizzle-orm/better-sqlite3`
- Use `Database` from `better-sqlite3`
- SQLite file path: `path.join(process.cwd(), 'data', 'recipes.db')`
- Create the `data/` directory if it doesn't exist (use `mkdirSync` with `recursive: true`)
- Run `drizzle-orm` `migrate()` on startup to auto-apply migrations

### main.ts
```typescript
// NestJS bootstrap
// Enable CORS for http://localhost:5173
// Listen on port 3001
// Log "API running on http://localhost:3001"
```

### app.module.ts
- Import: `ConfigModule.forRoot({ isGlobal: true })`, `DatabaseModule`, `RecipesModule`
- No auth, no throttling, no queues — keep it simple

### ZodValidationPipe
Same pattern as reference — implements `PipeTransform`, parses with Zod schema, throws `BadRequestException` with structured errors on failure.

### RecipesService
- Inject `DATABASE_CONNECTION`
- Direct Drizzle queries (no repository layer)
- `findAll(category?: string)` — filter with `eq()` if category provided
- `findOne(id: number)` — throw `NotFoundException` if not found
- `create(dto)` — insert and return created recipe (serialize ingredients/instructions as JSON)
- `update(id, dto)` — throw `NotFoundException` if not found, update `updatedAt`
- `remove(id)` — throw `NotFoundException` if not found

**Important**: Since `ingredients` and `instructions` are stored as JSON text in SQLite, serialize them with `JSON.stringify()` on write and parse with `JSON.parse()` on read. Create private helper methods `serializeRecipe` and `deserializeRecipe` for this.

### RecipesController
- `@Controller('recipes')`
- Use `ZodValidationPipe` for POST and PUT body validation
- Use `ParseIntPipe` for `:id` params
- Return proper HTTP status codes (201 for create, 200 for everything else)

### Drizzle Config (`drizzle.config.ts`)
```typescript
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './src/database/schema/index.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/recipes.db',
  },
});
```

### Seed Data
After creating the database module, create a seed script at `apps/api/src/database/seed.ts` that inserts 6 diverse sample recipes (2 breakfast, 1 lunch, 1 dinner, 1 dessert, 1 snack) with realistic data. Add a script `"db:seed": "bun run src/database/seed.ts"` to the API package.json.

## Frontend Implementation Details

### API Client (`lib/api.ts`)
```typescript
// Simple API client class (no auth needed)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;
  constructor(baseUrl: string) { this.baseUrl = baseUrl; }

  async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `HTTP ${response.status}`);
    }
    return response.json();
  }

  get<T>(endpoint: string) { return this.fetch<T>(endpoint); }
  post<T>(endpoint: string, data: unknown) { return this.fetch<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }); }
  put<T>(endpoint: string, data: unknown) { return this.fetch<T>(endpoint, { method: 'PUT', body: JSON.stringify(data) }); }
  delete<T>(endpoint: string) { return this.fetch<T>(endpoint, { method: 'DELETE' }); }
}

export const api = new ApiClient(API_BASE_URL);
```

### Query Client (`lib/query-client.ts`)
```typescript
import { QueryClient } from '@tanstack/react-query';
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60, retry: 1, refetchOnWindowFocus: false },
  },
});
```

### Hooks (`hooks/use-recipes.ts`)
Create these hooks using TanStack Query:
- `useRecipes(category?: string)` — `queryKey: ['recipes', { category }]`, fetches `GET /recipes?category=...`
- `useRecipe(id: number)` — `queryKey: ['recipes', id]`, fetches `GET /recipes/:id`
- `useCreateRecipe()` — mutation, `POST /recipes`, invalidates `['recipes']` on success
- `useUpdateRecipe()` — mutation, `PUT /recipes/:id`, invalidates `['recipes']` on success
- `useDeleteRecipe()` — mutation, `DELETE /recipes/:id`, invalidates `['recipes']` on success

### Recipe type on frontend
Define a `Recipe` type in a `types.ts` file or inline:
```typescript
export interface Recipe {
  id: number;
  title: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'snack';
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
```

### Router (`router.tsx`)
```
/              → Home page (recipe list with category filter)
/recipes/new   → Create recipe page
/recipes/:id   → Recipe detail page
/recipes/:id/edit → Edit recipe page
```
Use `createBrowserRouter` from `react-router-dom` v7. Wrap all routes in a `<Layout>` component using the `<Outlet />` pattern.

### Layout Component (`components/layout.tsx`)
- Fixed header with app name "RecipeBox" (link to `/`) and a "New Recipe" button (link to `/recipes/new`)
- Use a chef hat or utensils icon from Lucide
- Clean, minimal design with white background
- Max-width container (`max-w-6xl mx-auto`) for main content
- Use Tailwind CSS 4

### Home Page (`pages/home.tsx`)
- Category filter tabs at the top: All, Breakfast, Lunch, Dinner, Dessert, Snack
- Active tab highlighted with a colored underline or background
- Grid of recipe cards (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
- Loading skeleton state while fetching
- Empty state with illustration/message when no recipes match filter
- Each card links to `/recipes/:id`

### Recipe Card (`components/recipe-card.tsx`)
- Display: title, category badge, description (truncated 2 lines), prep+cook time, servings
- If `imageUrl` exists, show it as card header image. If not, show a colored placeholder based on category.
- Category badge colors: breakfast=amber, lunch=green, dinner=blue, dessert=pink, snack=orange
- Hover effect: subtle shadow elevation
- Click navigates to detail page

### Recipe Detail Page (`pages/recipe-detail.tsx`)
- Back button (navigates to `/`)
- Full recipe display: title, category badge, description, times, servings
- Ingredients list (bulleted)
- Instructions list (numbered steps)
- Image if available
- Edit button (navigates to `/recipes/:id/edit`)
- Delete button with confirmation (uses `window.confirm`, navigates to `/` after delete)
- Show toast notification on delete via Sonner

### Recipe Form (`components/recipe-form.tsx`)
Reusable form component used by both Create and Edit pages.

Props: `onSubmit: (data) => void`, `initialData?: Recipe`, `isLoading: boolean`

Fields:
- Title (text input)
- Description (textarea)
- Category (select dropdown)
- Prep Time (number input, minutes)
- Cook Time (number input, minutes)
- Servings (number input)
- Image URL (text input, optional)
- Ingredients (dynamic list — add/remove items, each is a text input)
- Instructions (dynamic list — add/remove steps, each is a textarea)

The dynamic lists should have:
- "Add ingredient" / "Add step" buttons
- Remove button (X) on each item
- Items should maintain order

Use client-side Zod validation matching the API schema. Show inline error messages.

### Create Recipe Page (`pages/create-recipe.tsx`)
- Uses `<RecipeForm>` component
- On submit: call `useCreateRecipe` mutation
- On success: navigate to the created recipe's detail page, show success toast
- Page title: "New Recipe"

### Edit Recipe Page (`pages/edit-recipe.tsx`)
- Fetch recipe by ID using `useRecipe(id)`
- Uses `<RecipeForm>` with `initialData`
- On submit: call `useUpdateRecipe` mutation
- On success: navigate to recipe detail page, show success toast
- Loading state while fetching recipe
- Page title: "Edit Recipe"

### Styling Guidelines
- Use Tailwind CSS 4 utility classes exclusively (no custom CSS except Tailwind import)
- Color scheme: warm, food-themed — use amber/orange as primary accent, neutral grays for text
- Rounded corners (`rounded-xl` for cards, `rounded-lg` for inputs)
- Consistent spacing (`p-6` for cards, `space-y-4` for form fields)
- Responsive design (mobile-first)
- Transitions on interactive elements (`transition-shadow`, `transition-colors`)
- Focus rings on form inputs (`focus:ring-2 focus:ring-amber-500`)

### index.css
```css
@import 'tailwindcss';
```

## Configuration Files

### Root `package.json`
```json
{
  "name": "recipebox",
  "private": true,
  "workspaces": ["apps/*"],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "check-types": "turbo run check-types"
  },
  "devDependencies": {
    "turbo": "^2.4.0",
    "typescript": "^5.7.0"
  },
  "packageManager": "bun@1.1.0"
}
```

### `turbo.json`
```json
{
  "$schema": "https://turborepo.dev/schema.json",
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "check-types": {}
  }
}
```

### API `package.json`
```json
{
  "name": "api",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "nest start",
    "lint": "echo 'no lint configured'",
    "check-types": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:seed": "bun run src/database/seed.ts",
    "db:studio": "drizzle-kit studio"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.0",
    "@nestjs/config": "^4.0.0",
    "@nestjs/core": "^11.0.0",
    "@nestjs/platform-express": "^11.0.0",
    "better-sqlite3": "^11.0.0",
    "drizzle-orm": "^0.38.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^11.0.0",
    "@types/better-sqlite3": "^7.6.0",
    "@types/node": "^22.10.0",
    "drizzle-kit": "^0.30.0",
    "typescript": "^5.7.0"
  }
}
```

### Web `package.json`
```json
{
  "name": "web",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "echo 'no lint configured'",
    "check-types": "tsc --noEmit",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.62.0",
    "lucide-react": "^0.460.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.1.1",
    "sonner": "^2.0.7",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.7"
  }
}
```

### API `tsconfig.json`
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### API `nest-cli.json`
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

### Web `tsconfig.json`
```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### Web `vite.config.ts`
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Web `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RecipeBox</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `.gitignore`
```
node_modules
dist
.turbo
*.db
apps/api/data/
.env
.env.local
```

## Verification Steps

After building everything, do the following in order:

1. Run `bun install` at the root — ensure no errors
2. Run `cd apps/api && bun run db:generate` — generate initial migration
3. Run `cd apps/api && bun run db:migrate` — apply migration (creates SQLite file)
4. Run `cd apps/api && bun run db:seed` — seed sample recipes
5. Go back to root and run `bun dev` — start both API and Web
6. Verify API: `curl http://localhost:3001/recipes` — should return 6 recipes as JSON
7. Verify Web: open `http://localhost:5173` in browser — should show recipe cards
8. Test create: use the UI or `curl -X POST http://localhost:3001/recipes -H 'Content-Type: application/json' -d '{"title":"Test","description":"A test recipe","category":"snack","prepTime":5,"cookTime":10,"servings":2,"ingredients":["item 1"],"instructions":["step 1"]}'` — should return 201 with created recipe
9. Test update and delete work correctly
10. Fix any TypeScript errors: `bun run check-types`

If anything fails, debug and fix it before considering the task complete. The project MUST compile, run, and serve both the API and web app successfully with `bun dev` from the root.
