"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Modal, ModalAction } from "@/components/modal";
import { Reveal } from "@/components/reveal";
import { TerminalFrame } from "@/components/terminal-frame";
import type { Project } from "@/lib/github";

const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Reveal key={project.name}>
            <TerminalFrame title={slug(project.name)}>
              <ProjectCard project={project} onOpen={() => setActive(project)} />
            </TerminalFrame>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const body = (
    <>
      <h3 className="font-medium">{project.name}</h3>
      <p className="mt-1.5 text-sm text-ink/80">{project.description}</p>
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
    </>
  );
  const interactive =
    "magnetic-control block w-full p-4 text-left transition-colors hover:bg-bg/60";

  // Has something to show in the popup: a README or a live site.
  if (project.readmeHtml || project.homepage) {
    return (
      <button type="button" onClick={onOpen} className={interactive}>
        {body}
      </button>
    );
  }
  // Anything else with a link (LinkedIn posts, or a repo whose README
  // couldn't be fetched) opens in a new tab instead of leaving the site.
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={interactive}
      >
        {body}
      </a>
    );
  }
  return <div className="p-4">{body}</div>;
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Websites default to the live site; README is one click away.
  const [view, setView] = useState<"site" | "readme">("site");
  const [openFor, setOpenFor] = useState<Project | null>(null);
  if (project !== openFor) {
    setOpenFor(project);
    setView(project?.homepage ? "site" : "readme");
  }

  if (!project) return null;

  const showSite = view === "site" && project.homepage;
  const hasBoth = Boolean(project.homepage && project.readmeHtml);

  return (
    <Modal
      open
      onClose={onClose}
      title={showSite ? project.homepage!.replace(/^https?:\/\//, "") : `${slug(project.name)}/README.md`}
      bodyClassName={showSite ? "flex flex-col" : "overflow-y-auto overscroll-contain"}
      actions={
        <>
          {hasBoth && (
            <div className="hidden overflow-hidden rounded border border-border font-mono text-xs sm:flex">
              {(["site", "readme"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`h-7 px-2 transition-colors ${
                    view === v ? "bg-ink/10 text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          {project.homepage && (
            <ModalAction href={project.homepage} accent>
              <ExternalLink size={12} />
              <span className="hidden sm:inline">open in new tab</span>
            </ModalAction>
          )}
          {project.repoUrl && (
            <ModalAction href={project.repoUrl}>
              <span className="hidden sm:inline">Open on</span> GitHub
            </ModalAction>
          )}
        </>
      }
    >
      {hasBoth && (
        // Phones: the view toggle lives here instead of the cramped title bar.
        <div className="flex border-b border-border font-mono text-xs sm:hidden">
          {(["site", "readme"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={`flex-1 py-2 ${view === v ? "bg-ink/10 text-ink" : "text-muted"}`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {showSite ? (
        <SiteView url={project.homepage!} embeddable={project.embeddable !== false} />
      ) : project.readmeHtml ? (
        <article
          className="readme px-5 py-6 sm:px-8"
          dangerouslySetInnerHTML={{ __html: project.readmeHtml }}
        />
      ) : (
        <p className="p-6 font-mono text-sm text-muted">No README for this project.</p>
      )}
    </Modal>
  );
}

function SiteView({ url, embeddable }: { url: string; embeddable: boolean }) {
  if (!embeddable) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="max-w-sm font-mono text-sm text-muted">
          This site doesn&apos;t allow being shown inside another page.
        </p>
        <ModalAction href={url} accent>
          <ExternalLink size={12} /> open in new tab
        </ModalAction>
      </div>
    );
  }
  return (
    <>
      <iframe
        src={url}
        title="Live site preview"
        loading="lazy"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        className="min-h-0 w-full flex-1 bg-white"
      />
      {/* Scrolling an embedded page is awkward on touch, so phones get a
          big, obvious escape hatch. */}
      <div className="shrink-0 border-t border-border p-3 sm:hidden">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-accent flex items-center justify-center gap-2 rounded-md bg-accent py-2.5 font-mono text-sm text-bg"
        >
          <ExternalLink size={14} /> open in new tab
        </a>
      </div>
    </>
  );
}
