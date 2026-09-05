import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Wordmark } from "@/components/wordmark";

type Props = {
  title: string;
  footer: { text: string; linkText: string; href: string };
  children: ReactNode;
};

export function AuthShell({ title, footer, children }: Props) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5 py-12">
      <Wordmark size="md" />
      <Card variant="stamp" className="flex w-full max-w-sm flex-col gap-5 p-6">
        <h1 className="font-serif text-3xl">{title}</h1>
        {children}
      </Card>
      <p className="text-sm font-semibold text-muted">
        {footer.text}{" "}
        <Link href={footer.href} className="font-extrabold text-ink underline">
          {footer.linkText}
        </Link>
      </p>
    </main>
  );
}
