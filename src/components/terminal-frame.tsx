import type { ReactNode } from "react";

export function TerminalFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted/40" />
        <span className="ml-2 font-mono text-xs text-muted truncate">
          {title}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
