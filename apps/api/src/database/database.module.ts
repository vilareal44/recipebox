import { Global, Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as Database from 'better-sqlite3';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from './schema';

const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE_CONNECTION,
      useFactory: () => {
        const dataDir = join(process.cwd(), 'data');
        mkdirSync(dataDir, { recursive: true });
        const sqlite = new Database(join(dataDir, 'recipes.db'));
        const db = drizzle(sqlite, { schema });
        migrate(db, { migrationsFolder: join(process.cwd(), 'drizzle') });
        return db;
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}

export { DATABASE_CONNECTION };
