"use client";

import { motion, useReducedMotion } from "framer-motion";

// Fades and slides `text` up into place the first time it scrolls into
// view (each instance watches its own position, so — with several of
// these on a page — every block animates independently as you reach it,
// rather than the whole section firing together).
//
// Accessibility: respects `prefers-reduced-motion` via framer-motion's
// `useReducedMotion`, which drops the animation to a plain opacity swap
// with no vertical movement.
export function ScrollReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: "easeOut" }}
    >
      {text}
    </motion.p>
  );
}
