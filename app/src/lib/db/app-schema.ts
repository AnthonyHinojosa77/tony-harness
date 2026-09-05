import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./schema";

/** Preferences chosen during onboarding and changed later in Settings. */
export const userSettings = pgTable("user_settings", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  /** OpenRouter model ids shown in the main picker, in order. */
  favoriteModels: jsonb("favorite_models").$type<string[]>().notNull(),
  /** Primary navigation: a plain list or the park map. */
  navigation: text("navigation").$type<"list" | "park">().notNull(),
  /** Read-aloud voice: Speechify's API or the device's own. */
  voice: text("voice").$type<"speechify" | "device">().notNull(),
  /** Spending alert threshold per month, in US cents. */
  monthlyLimitCents: integer("monthly_limit_cents").notNull(),
  onboardedAt: timestamp("onboarded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
