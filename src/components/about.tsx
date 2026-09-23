import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { Reveal } from "@/components/reveal";
import { bio, factSheet } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
      <SectionHeading command="cat about.md" title="About" />

      <div className="grid gap-8 sm:grid-cols-[1.3fr_0.7fr]">
        <Reveal className="max-w-lg leading-relaxed text-ink/90 whitespace-pre-line">
          {bio}
        </Reveal>

        <Reveal delayMs={150}>
          <TerminalFrame title="profile.json">
            <dl className="divide-y divide-border font-mono text-sm">
              {factSheet.map((fact) => (
                <div
                  key={fact.label}
                  className="flex justify-between gap-4 px-4 py-2.5"
                >
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="text-right text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </TerminalFrame>
        </Reveal>
      </div>
    </section>
  );
}