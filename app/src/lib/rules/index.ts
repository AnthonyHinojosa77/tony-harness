import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { rules } from "@/lib/db/app-schema";
import { defaultRules } from "./default-rules";

export { defaultRules };

export const rulesMaxLength = 40_000;

/** The user's live rules, or the repository defaults if they never edited them. */
export async function getRules(userId: string): Promise<{ content: string; edited: boolean; updatedAt: Date | null }> {
  const rows = await db.select().from(rules).where(eq(rules.userId, userId)).limit(1);
  const row = rows[0];
  if (!row) return { content: defaultRules, edited: false, updatedAt: null };
  return { content: row.content, edited: row.content !== defaultRules, updatedAt: row.updatedAt };
}

export async function saveRules(userId: string, content: string) {
  const trimmed = content.replace(/\r\n/g, "\n").trim();
  if (!trimmed) throw new Error("Rules cannot be empty.");
  if (trimmed.length > rulesMaxLength) throw new Error("Rules are too long.");
  await db
    .insert(rules)
    .values({ userId, content: trimmed })
    .onConflictDoUpdate({ target: rules.userId, set: { content: trimmed } });
}

export async function resetRules(userId: string) {
  await db.delete(rules).where(eq(rules.userId, userId));
}
