import type { Metadata } from "next";
import { Wordmark } from "@/components/wordmark";
import { Button, IconButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Composer } from "@/components/ui/composer";
import {
  CompareIcon,
  MicIcon,
  PlayIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { ModelPill } from "@/components/ui/model-pill";
import { BottomNav, SideNav } from "@/components/ui/nav";
import { JudgeNote, RememberedPill } from "@/components/ui/notes";
import { TextField } from "@/components/ui/text-field";

export const metadata: Metadata = { title: "Style" };

const swatches = [
  ["Paper", "bg-paper", "#F6F1E6"],
  ["Card", "bg-card", "#FFFDF8"],
  ["Ink", "bg-ink", "#22332A"],
  ["Tan", "bg-tan", "#E3D9C4"],
  ["Grass", "bg-grass", "#58C26A"],
  ["Grass deep", "bg-grass-deep", "#3E9E50"],
  ["Grass light", "bg-grass-light", "#DDF3E2"],
  ["Lawn", "bg-lawn", "#CFE7D6"],
  ["Sun", "bg-sun", "#FFE27A"],
  ["Pond", "bg-pond", "#D7E9F2"],
] as const;

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-serif text-2xl">{title}</h2>
        {note && <p className="text-sm font-semibold text-muted">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function StylePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-5 py-10">
      <header className="flex flex-col gap-3">
        <Wordmark />
        <h1 className="font-serif text-4xl">Style</h1>
        <p className="max-w-xl text-[15px] font-semibold text-ink-soft">
          Every piece of the interface in one place. The rule: cream paper and
          soft tan edges everywhere, ink outlines only where emphasis belongs.
        </p>
      </header>

      <Section title="Colors">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {swatches.map(([name, cls, hex]) => (
            <div key={name} className="flex flex-col gap-1.5">
              <div className={`h-14 rounded-chip border-2 border-tan ${cls}`} />
              <span className="text-xs font-extrabold">{name}</span>
              <span className="text-[11px] font-semibold text-muted">{hex}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Type"
        note="Nunito for the interface. Instrument Serif for the name, headlines, and italic asides."
      >
        <div className="flex flex-col gap-3">
          <p className="font-serif text-4xl">Anthony&apos;s park</p>
          <p className="font-serif text-2xl">
            All three agree ARM wins on power draw and noise.
          </p>
          <p className="font-serif text-lg italic text-muted">
            chosen automatically · tap to change
          </p>
          <p className="text-[15px] font-semibold">
            Body text at 15px, semibold, comfortable line height for reading on
            a phone.
          </p>
          <p className="text-xs font-extrabold uppercase tracking-[0.05em]">
            Stamped label
          </p>
        </div>
      </Section>

      <Section
        title="Buttons"
        note="Press for the main action. Stamp for emphasis. Soft for everything else."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button icon={<PlayIcon size={16} />}>Listen</Button>
          <Button variant="stamp">Open</Button>
          <Button variant="soft">Move to lawn</Button>
          <Button variant="ghost">Cancel</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" variant="soft">
            Small
          </Button>
          <Button size="md" variant="soft">
            Medium
          </Button>
          <Button size="lg" icon={<PlusIcon size={18} />}>
            New chat
          </Button>
          <IconButton label="Speak">
            <MicIcon className="text-muted" />
          </IconButton>
          <IconButton label="Search" variant="stamp">
            <SearchIcon />
          </IconButton>
        </div>
      </Section>

      <Section title="Chips">
        <div className="flex flex-wrap items-center gap-3">
          <Chip variant="sun" label icon={<CompareIcon size={13} />}>
            Compare · 3 models
          </Chip>
          <Chip variant="grass">Claude</Chip>
          <Chip variant="soft">Home server</Chip>
          <Chip variant="ink">Map</Chip>
          <ModelPill name="Claude Sonnet" />
        </div>
      </Section>

      <Section
        title="Cards"
        note="One stamp card per screen. The rest are soft. Inset sits inside another card."
      >
        <Card variant="stamp" className="flex flex-col gap-3 p-4">
          <p className="font-serif text-xl leading-snug">
            The answer card carries the ink outline.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {["Claude", "GPT", "Gemini"].map((m) => (
              <Card key={m} variant="inset" className="flex flex-col gap-1 p-2.5">
                <span className="text-[11px] font-extrabold text-grass-deep">
                  {m}
                </span>
                <span className="text-[11.5px] font-semibold leading-snug">
                  Inset pocket for a model&apos;s take.
                </span>
              </Card>
            ))}
          </div>
          <JudgeNote>
            Gemini&apos;s multi-arch claim checks out. GPT&apos;s Plex point is
            out of date since the 2025 ARM decoding update.
          </JudgeNote>
          <div className="flex items-center gap-2.5">
            <Button icon={<PlayIcon size={16} />}>Listen</Button>
            <span className="text-xs font-bold text-muted">40 sec</span>
          </div>
        </Card>
        <Card variant="soft" className="p-4 text-sm font-semibold">
          A soft card for lists, settings, and anything that is not the main
          answer.
        </Card>
        <RememberedPill>you are building a home server</RememberedPill>
      </Section>

      <Section title="Inputs">
        <div className="flex max-w-md flex-col gap-4">
          <TextField label="Email" placeholder="you@example.com" hint="We never share it." />
          <TextField
            label="Passcode"
            type="password"
            defaultValue="1234"
            error="That passcode is too short."
          />
        </div>
        <Composer />
      </Section>

      <Section title="Navigation">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="w-full max-w-[390px] overflow-hidden rounded-card border-2 border-tan">
            <BottomNav active="chats" />
          </div>
          <Card variant="soft" className="w-56 p-3">
            <SideNav active="park" />
          </Card>
        </div>
      </Section>
    </main>
  );
}
