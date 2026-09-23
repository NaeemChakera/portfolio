"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Standard hydration-safe pattern for next-themes: the resolved theme
    // is only known on the client, so we render a neutral placeholder
    // until after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-8 w-16 rounded-full border border-border" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle color theme"
      aria-pressed={isDark}
      className="magnetic-control glow-accent relative h-8 w-16 rounded-full border border-border bg-bg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      <span
        className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-bg transition-all duration-200 ${
          isDark ? "left-[calc(100%-1.75rem)]" : "left-0.5"
        }`}
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
