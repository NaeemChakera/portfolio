"use client";

import { Download, ExternalLink } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Modal, ModalAction } from "@/components/modal";

const RESUME = "/resume_naeem_chakera.pdf";
// Desktop with a mouse: show the PDF in a popup. Phones and tablets keep
// the plain new-tab link, where the OS PDF viewer does a better job.
const DESKTOP = "(min-width: 1024px) and (pointer: fine)";

export function ResumeButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    // Let modified clicks (cmd/ctrl/middle) do their usual thing.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (!window.matchMedia(DESKTOP).matches) return;
    e.preventDefault();
    setOpen(true);
  }

  return (
    <>
      <a
        href={RESUME}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={className}
      >
        see the resume
      </a>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="resume_naeem_chakera.pdf"
        bodyClassName="flex"
        actions={
          <>
            <ModalAction href={RESUME} accent>
              <ExternalLink size={12} /> open in new tab
            </ModalAction>
            <a
              href={RESUME}
              download
              aria-label="Download resume"
              className="magnetic-control glow-white flex h-7 w-7 items-center justify-center rounded border border-border text-muted transition-colors hover:text-ink"
            >
              <Download size={14} />
            </a>
          </>
        }
      >
        <iframe
          src={`${RESUME}#view=FitH`}
          title="Resume — Naeem Chakera"
          className="h-full w-full bg-white"
        />
      </Modal>
    </>
  );
}
