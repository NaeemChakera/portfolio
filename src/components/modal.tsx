"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

// A popup window styled like TerminalFrame: traffic-light title bar
// (the dots glow via the shared `.group:hover` rule), scrollable body.
//
// Deliberately not a native <dialog>: showModal() puts the dialog in the
// browser's top layer, above the custom cursor (which hides the real one
// via `cursor: none`), so the pointer would vanish over the popup. A
// portaled div at z-45 sits above the page (.site-content is z-1) and
// below the cursor (z-50).
//
// Closes on Esc, backdrop click and the X button; traps Tab focus inside;
// locks page scroll; returns focus to whatever opened it.
// Phones get a full-screen sheet, sm+ a centered window.
export function Modal({
  open,
  onClose,
  title,
  actions,
  children,
  bodyClassName = "overflow-y-auto",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Extra buttons/links shown in the title bar, before the close button. */
  actions?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    // Compensate for the vanished scrollbar so the page doesn't shift.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    // Reuse the site's .reveal fade: mount hidden, show next frame.
    const frame = requestAnimationFrame(() => setVisible(true));
    panel.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      setVisible(false);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[45] flex items-stretch justify-center sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`reveal ${visible ? "reveal-visible" : ""} group relative flex h-full w-full flex-col overflow-hidden bg-surface sm:h-[85vh] sm:max-w-4xl sm:rounded-lg sm:border sm:border-border sm:shadow-2xl`}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-2">
          <span className="terminal-control terminal-control-close h-2.5 w-2.5 shrink-0 rounded-full" />
          <span className="terminal-control terminal-control-minimize h-2.5 w-2.5 shrink-0 rounded-full" />
          <span className="terminal-control terminal-control-maximize h-2.5 w-2.5 shrink-0 rounded-full" />
          <span className="ml-2 min-w-0 flex-1 truncate font-mono text-xs text-muted">
            {title}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              data-autofocus
              className="magnetic-control glow-white flex h-7 w-7 items-center justify-center rounded border border-border text-muted transition-colors hover:text-ink"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

/** Small title-bar link button, matching the site's mono buttons. */
export function ModalAction({
  href,
  children,
  accent = false,
}: {
  href: string;
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`magnetic-control flex h-7 items-center gap-1.5 whitespace-nowrap rounded px-2 font-mono text-xs transition-opacity ${
        accent
          ? "glow-accent bg-accent text-bg hover:opacity-90"
          : "glow-white border border-border text-ink hover:border-ink/40"
      }`}
    >
      {children}
    </a>
  );
}
