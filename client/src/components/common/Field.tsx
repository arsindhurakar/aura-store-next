export function Field({
  label,
  defaultValue,
}: {
  label: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>

      <input
        defaultValue={defaultValue}
        className="mt-2 w-full max-w-md rounded-xl border border-border bg-transparent px-4 py-2.5 text-sm focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </label>
  );
}
