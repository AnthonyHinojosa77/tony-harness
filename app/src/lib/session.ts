import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** The signed-in user for this request, or null. */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Use at the top of any page that needs a signed-in user. */
export async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/sign-in");
  return session;
}
