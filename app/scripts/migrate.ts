import { db } from "../src/lib/db";
import { runMigrations } from "../src/lib/db/migrate";

runMigrations(db)
  .then(() => {
    console.log(
      process.env.DATABASE_URL
        ? "Database is up to date (Postgres)."
        : "Database is up to date (local PGlite).",
    );
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
