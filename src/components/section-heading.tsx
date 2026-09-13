export function SectionHeading({
  command,
  title,
}: {
  command: string;
  title: string;
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-sm text-accent">
        <span className="text-muted">$</span> {command}
      </p>
      <h2 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
