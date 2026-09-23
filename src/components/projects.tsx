import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20"
    >
      <SectionHeading command="ls ./projects" title="Projects" />

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.name}>
            <TerminalFrame title={project.name.toLowerCase().replace(/\s+/g, "-")}>
              <a
                href={project.href ?? "#"}
                className="magnetic-control block p-4 transition-colors hover:bg-bg/60"
              >
                <h3 className="font-medium">{project.name}</h3>
                <p className="mt-1.5 text-sm text-ink/80">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </a>
            </TerminalFrame>
          </Reveal>
        ))}
      </div>
    </section>
  );
}