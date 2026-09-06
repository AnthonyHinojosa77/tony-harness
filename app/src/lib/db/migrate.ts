import path from "node:path";
import type { Db } from "./index";

// Resolved from the working directory so the same path works from source,
// from the built server, and inside a Vercel function.
const migrationsFolder = path.join(process.cwd(), "drizzle");

/**
 * Brings the connected database up to date with the SQL files in ./drizzle.
 * Safe to run repeatedly; already-applied migrations are skipped.
 */
export async function runMigrations(db: Db) {
  if (process.env.DATABASE_URL) {
    const { migrate } = await import("drizzle-orm/neon-http/migrator");
    await migrate(db as Parameters<typeof migrate>[0], { migrationsFolder });
  } else {
    const { migrate } = await import("drizzle-orm/pglite/migrator");
    await migrate(db as Parameters<typeof migrate>[0], { migrationsFolder });
  }
}
