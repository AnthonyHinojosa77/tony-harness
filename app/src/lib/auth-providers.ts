/**
 * Which sign-in providers have credentials configured.
 * Read on the server; the sign-in page only shows buttons for these.
 */
export type SocialProvider = "google" | "apple" | "github" | "microsoft";

export const providerLabels: Record<SocialProvider, string> = {
  google: "Google",
  apple: "Apple",
  github: "GitHub",
  microsoft: "Microsoft",
};

type Env = Record<string, string | undefined>;

export function configuredProviders(
  env: Env = process.env,
): SocialProvider[] {
  const out: SocialProvider[] = [];
  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) out.push("google");
  if (
    env.APPLE_CLIENT_ID &&
    env.APPLE_TEAM_ID &&
    env.APPLE_KEY_ID &&
    env.APPLE_PRIVATE_KEY
  )
    out.push("apple");
  if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) out.push("github");
  if (env.MICROSOFT_CLIENT_ID && env.MICROSOFT_CLIENT_SECRET)
    out.push("microsoft");
  return out;
}
