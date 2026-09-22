"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Types `text` out character by character the first time it scrolls into
// view (each instance watches its own position, so — with several of
// these on a page — every block starts typing independently as you reach
// it, rather than the whole section firing together). Speed scales with
// length so a long paragraph doesn't take forever and a short one doesn't
// feel instant.
//
// Accessibility: the animated characters are aria-hidden — a screen
// reader gets the full text immediately via a visually-hidden twin,
// rather than waiting through the animation or hearing partial words.
// `prefers-reduced-motion` skips the animation entirely.
export function TypewriterText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || text.length === 0) {
      // No animation loop to defer this through — reduced motion means
      // showing the final state right away.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayed(text);
      setDone(true);
      return;
    }

    const perCharMs = Math.max(6, Math.min(18, 1800 / text.length));
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, perCharMs);

    return () => clearInterval(id);
  }, [isInView, text]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {displayed}
        {isInView && !done && <span className="cursor-blink text-accent">_</span>}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
