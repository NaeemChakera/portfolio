export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} — built with Next.js, R3F &amp; Framer Motion.</p>
        <p>designed &amp; coded from scratch</p>
      </div>
    </footer>
  );
}
