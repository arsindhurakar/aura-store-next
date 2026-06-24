export function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 border-b border-border pb-10 lg:grid-cols-[280px_1fr]">
      <div>
        <h2 className="font-display text-xl">{title}</h2>

        <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}
