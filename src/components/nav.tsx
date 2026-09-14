"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/lib/data";

const links = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const ids = links.map((l) => l.id);
    const navOffset = 96; // roughly the sticky header height

    function updateActive() {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Near the bottom of the page: always highlight the last link.
      // (The last section is often shorter than the viewport, so its
      // midpoint never crosses a fixed scroll threshold — this is the
      // reliable fallback for that case.)
      if (scrollBottom >= docHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - navOffset <= 0) {
          current = id;
        }
      }
      setActive(current);
    }

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-ink">
          {profile.name.toLowerCase()}
          <span className="text-accent">@</span>csu
          <span className="cursor-blink text-accent">_</span>
        </a>

        <ul className="hidden sm:flex items-center gap-1 font-mono text-sm">
          {links.map((link) => (
            <li key={link.id} className="relative">
              <a
                href={`#${link.id}`}
                className={`block px-3 py-1.5 transition-colors ${
                  active === link.id
                    ? "text-accent"
                    : "text-muted hover:text-ink"
                }`}
              >
                ${link.label}
              </a>
              {active === link.id && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-2 -bottom-[1px] h-[2px] bg-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </li>
          ))}
        </ul>

        <ThemeToggle />
      </nav>
    </header>
  );
}
