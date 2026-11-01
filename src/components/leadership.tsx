import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { Reveal } from "@/components/reveal";
import { leadership } from "@/lib/data";

export function Leadership() {
  return (
    <section
      id="leadership"
      className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20"
    >
      <SectionHeading command="sudo lead --roles" title="Leadership" />

      <div className="grid gap-5 sm:grid-cols-2">
        {leadership.map((entry) => (
          <Reveal key={`${entry.role}-${entry.org}`} className="h-full">
            <TerminalFrame title={entry.org.toLowerCase()} fill>
              <div className="p-4">
                <h3 className="font-medium">{entry.role}</h3>
                <p className="font-mono text-xs text-accent">{entry.org}</p>
                <p className="mt-2 text-sm text-ink/80">{entry.summary}</p>
              </div>
            </TerminalFrame>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
