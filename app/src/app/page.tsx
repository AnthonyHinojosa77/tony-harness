import { Wordmark } from "@/components/wordmark";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      <Wordmark size="lg" />
      <p className="font-serif italic text-xl text-muted">
        Your park is being planted.
      </p>
    </main>
  );
}
