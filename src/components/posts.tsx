"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Modal, ModalAction } from "@/components/modal";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TerminalFrame } from "@/components/terminal-frame";
import { posts, type PostEntry } from "@/lib/data";

/**
 * LinkedIn's official embed URL for a post, built from its normal link
 * (".../posts/naeemchakera_...-activity-7511597831112093696-L0PL?...").
 */
function embedUrl(href: string) {
  const m = href.match(/(activity|ugcPost|share)[-:](\d{15,})/);
  return m
    ? `https://www.linkedin.com/embed/feed/update/urn:li:${m[1]}:${m[2]}`
    : undefined;
}

export function Posts() {
  const [active, setActive] = useState<PostEntry | null>(null);
  if (posts.length === 0) return null;

  return (
    <section id="posts" className="mx-auto max-w-4xl px-6 py-16 scroll-mt-20">
      <SectionHeading command="cat ./posts" title="Posts" />

      <div className="grid gap-5 sm:grid-cols-2">
        {posts.map((post) => (
          <Reveal key={post.href} className="h-full">
            <TerminalFrame title="linkedin.com/in/naeemchakera" fill>
              <button
                type="button"
                onClick={() =>
                  embedUrl(post.href)
                    ? setActive(post)
                    : window.open(post.href, "_blank", "noopener")
                }
                className="magnetic-control flex h-full w-full flex-col p-4 text-left transition-colors hover:bg-bg/60"
              >
                <h3 className="font-medium">{post.title}</h3>
                <p className="mt-1.5 text-sm text-ink/80">{post.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-3">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded border border-border px-2 py-0.5 font-mono text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 flex items-center gap-1 font-mono text-xs text-accent">
                  read post <ArrowUpRight size={12} />
                </p>
              </button>
            </TerminalFrame>
          </Reveal>
        ))}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? `linkedin post — ${active.title}` : ""}
        bodyClassName="overflow-y-auto overscroll-contain bg-bg"
        actions={
          active && (
            <ModalAction href={active.href} accent>
              <ExternalLink size={12} />
              <span className="hidden sm:inline">Open on</span> LinkedIn
            </ModalAction>
          )
        }
      >
        {active && (
          // LinkedIn's embed is a fixed-width card: center it and let the
          // popup body scroll if the post is long.
          <div className="mx-auto h-full w-full max-w-[560px] sm:py-6">
            <iframe
              src={embedUrl(active.href)}
              title={`LinkedIn post: ${active.title}`}
              allowFullScreen
              className="h-full min-h-[600px] w-full bg-white sm:rounded-lg"
            />
          </div>
        )}
      </Modal>
    </section>
  );
}
