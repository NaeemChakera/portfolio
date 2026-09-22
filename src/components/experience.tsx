import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20"
    >
      <SectionHeading command="history --experience" title="Experience" />

      <ol className="space-y-8 border-l border-border pl-6">
        {experience.map((entry) => (
          <li key={`${entry.role}-${entry.org}`}>
            {entry.dividerBefore && (
              <p className="-ml-6 mb-8 flex items-center gap-3 font-mono text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                {entry.dividerBefore}
                <span className="h-px flex-1 bg-border" />
              </p>
            )}
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="font-mono text-xs text-muted">{entry.period}</p>
              <h3 className="mt-1 font-medium">
                {entry.role} <span className="text-muted">· {entry.org}</span>
              </h3>
              <p className="mt-1.5 max-w-xl text-sm text-ink/80">
                {entry.summary}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
