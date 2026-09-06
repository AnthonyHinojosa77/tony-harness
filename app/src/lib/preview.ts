/**
 * "Preview mode" means the app is running without its durable pieces:
 * no permanent database or no fixed sign-in secret. Everything works, but
 * accounts and chats last only until the server restarts.
 */
export function isPreview() {
  return (
    process.env.NODE_ENV === "production" &&
    (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET)
  );
}
