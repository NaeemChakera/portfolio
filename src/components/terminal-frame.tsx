import type { ReactNode } from "react";

export function TerminalFrame({
  title,
  children,
  className = "",
  fill = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  /** Stretch to the parent's height (equal-height card grids). */
  fill?: boolean;
}) {
  return (
    <div
      className={`group rounded-lg border border-border bg-surface overflow-hidden ${fill ? "flex h-full flex-col" : ""} ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="terminal-control terminal-control-close h-2.5 w-2.5 rounded-full" />
        <span className="terminal-control terminal-control-minimize h-2.5 w-2.5 rounded-full" />
        <span className="terminal-control terminal-control-maximize h-2.5 w-2.5 rounded-full" />
        <span className="ml-2 font-mono text-xs text-muted truncate">
          {title}
        </span>
      </div>
      <div className={fill ? "flex-1" : undefined}>{children}</div>
    </div>
  );
}
