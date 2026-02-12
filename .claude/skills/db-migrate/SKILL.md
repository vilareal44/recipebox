---
name: db-migrate
description: Generate and apply a Drizzle migration after schema changes
disable-model-invocation: true
---

# DB Migration

Run this after making changes to the Drizzle schema in `apps/api/src/database/schema/`.

## Steps

1. Review the schema changes in `apps/api/src/database/schema/`
2. Run `cd apps/api && bun run db:generate` to generate the migration SQL
3. Review the generated migration file in `apps/api/drizzle/`
4. Run `cd apps/api && bun run db:migrate` to apply it
5. Verify the migration applied successfully
