"use client";

import { motion } from "framer-motion";
import { TerminalFrame } from "@/components/terminal-frame";
import { profile } from "@/lib/data";

// What you're working on right now — kept different from mailto.sh's
// "open to internships" message so the two windows don't repeat.
const bootLines = [
  "$ whoami",
  `${profile.name.toLowerCase()} · fort collins, co`,
  "$ ls ./currently-building",
  "cubesat-flight-software/   stm32 · freertos · cfs",
  "quest3-app/   android xr @ sairyo",
  "$ echo $STACK",
  "c · python · typescript · ai agents",
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

// The "naeem@csu — boot log" terminal. Lines type in one after another the
// first time it scrolls into view.
export function BootLog() {
  return (
    <TerminalFrame title="naeem@csu — boot log" className="crt-texture" fill>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
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
  );
}
