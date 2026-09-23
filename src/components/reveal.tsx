"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Fades/slides/un-blurs a block into place the first time it scrolls into
// view, using the browser's native IntersectionObserver rather than an
// animation library — each instance observes only itself, so several of
// these on a page reveal independently as you reach each one.
//
// The actual visual effect lives in globals.css (.reveal / .reveal-visible);
// this component's only job is to add the "-visible" class at the right
// moment and stop observing once it has (a one-time reveal).
//
// Accessibility: prefers-reduced-motion skips the observer entirely and
// shows the final state immediately — also backstopped by a plain CSS
// media query in globals.css in case JS is slow to run.
export function Reveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}