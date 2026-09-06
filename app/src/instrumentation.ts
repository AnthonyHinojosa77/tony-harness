/**
 * Runs once when the server starts. Brings the database up to date so a
 * fresh deployment, or a fresh PGlite folder, is ready before the first request.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { db } = await import("@/lib/db");
  const { runMigrations } = await import("@/lib/db/migrate");
  await runMigrations(db);
}
