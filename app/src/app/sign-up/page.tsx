import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";
import { configuredProviders } from "@/lib/auth-providers";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "Create account" };

export default async function SignUpPage() {
  if (await getSession()) redirect("/chats");
  return (
    <AuthShell
      title="Plant your park"
      footer={{ text: "Already have an account?", linkText: "Sign in", href: "/sign-in" }}
    >
      <SignInForm mode="sign-up" providers={configuredProviders()} />
    </AuthShell>
  );
}
