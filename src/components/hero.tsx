"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TerminalFrame } from "@/components/terminal-frame";
import { profile } from "@/lib/data";

const TerminalScene = dynamic(
  () => import("@/components/scene/terminal-scene").then((m) => m.TerminalScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center font-mono text-xs text-muted">
        loading scene…
      </div>
    ),
  }
);

const bootLines = [
  "$ whoami",
  profile.name,
  "$ status --check",
  profile.status,
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.35, delayChildren: 0.2 },
  },
};

const line = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pt-16 pb-20 sm:pt-24">
      <div className="grid gap-10 sm:grid-cols-[1.1fr_0.9fr] sm:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-sm text-accent"
          >
            {profile.focus}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-balance"
          >
            {profile.name}, building the bridge between hardware and the
            people who use it.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md text-muted"
          >
            {profile.role} at {profile.school}, headed toward technical
            support and B2B SaaS — where I can turn a hard problem into a
            plain-language fix.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="rounded-md bg-accent px-4 py-2 font-mono text-sm text-bg transition-opacity hover:opacity-90"
            >
              get in touch
            </a>
            <a
              href="#projects"
              className="rounded-md border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              see the work
            </a>
          </motion.div>
        </div>

        <TerminalFrame title="naeem@csu — boot log" className="crt-texture">
          <div className="aspect-square">
            <TerminalScene />
          </div>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-1 border-t border-border px-4 py-3 font-mono text-xs text-accent"
          >
            {bootLines.map((text, i) => (
              <motion.p key={i} variants={line}>
                {text}
                {i === bootLines.length - 1 && (
                  <span className="cursor-blink">_</span>
                )}
              </motion.p>
            ))}
          </motion.div>
        </TerminalFrame>
      </div>
    </section>
  );
}
