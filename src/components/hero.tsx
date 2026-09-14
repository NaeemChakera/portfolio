"use client";

import { motion } from "framer-motion";
import { TerminalFrame } from "@/components/terminal-frame";
import { profile } from "@/lib/data";

const bootLines = [
  "$ whoami",
  profile.name.toLowerCase(),
  "$ cat focus.txt",
  profile.focus,
  "$ status --check",
  profile.status,
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
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
            {profile.name} — bridging end-user needs and the technical
            systems behind them.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md text-muted"
          >
            {profile.role} at {profile.school}, focused on IT support, POS
            systems, and web work — turning a hard technical problem into a
            fix a non-technical person can trust.
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
              href="/public/resume.pdf"
              className="rounded-md border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              see the resume
            </a>
          </motion.div>
        </div>

        <TerminalFrame title="naeem@csu — boot log" className="crt-texture">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-1.5 px-5 py-6 font-mono text-sm text-accent"
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
