import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import * as authSchema from "./schema";
import * as appSchema from "./app-schema";

const schema = { ...authSchema, ...appSchema };

/**
 * One database handle for the whole app.
 *
 * With DATABASE_URL set (Vercel, Neon) it talks to Postgres over HTTP.
 * Without it (local development, tests) it uses PGlite, a Postgres that
 * runs inside the process and stores its files under ./.pglite.
 * PGLITE_DIR=memory keeps everything in memory, which tests use.
 */
function createDb() {
  const url = process.env.DATABASE_URL;
  if (url) {
    return drizzleNeon({ client: neon(url), schema });
  }
  const dir = process.env.PGLITE_DIR ?? "./.pglite";
  if (dir === "memory") {
    return drizzlePglite({ schema });
  }
  return drizzlePglite({ connection: { dataDir: dir }, schema });
}

type Db = ReturnType<typeof createDb>;

// One instance per process. Next.js bundles server code per route, and each
// bundle would otherwise open its own PGlite on the same folder and see
// different data. Sharing through globalThis keeps every route on one handle.
const globalStore = globalThis as unknown as { __workParkDb?: Db };
export const db: Db = globalStore.__workParkDb ?? (globalStore.__workParkDb = createDb());
export type { Db };
export { schema };
