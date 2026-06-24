export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs uppercase tracking-widest text-muted-foreground">
      {children}
    </span>
  );
}
