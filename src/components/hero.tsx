"use client";

import { motion } from "framer-motion";
import { PhotoBooth } from "@/components/photo-booth";
import { ResumeButton } from "@/components/resume-button";
import { photos, profile } from "@/lib/data";

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
            {profile.name} — engineering where hardware meets AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-md text-muted"
          >
            {profile.role} at {profile.school} who builds with AI agents as
            teammates — from circuit board to code to shipped product.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="magnetic-control glow-accent rounded-md bg-accent px-4 py-2 font-mono text-sm text-bg transition-opacity hover:opacity-90"
            >
              get in touch
            </a>
            <ResumeButton className="magnetic-control glow-white rounded-md border border-border px-4 py-2 font-mono text-sm transition-colors hover:border-accent hover:text-accent" />
          </motion.div>
        </div>

        {/* Photo first so recruiters see who you are right away. */}
        <PhotoBooth photos={photos} alt="Naeem Chakera" />
      </div>
    </section>
  );
}
