export function FieldError({
  error,
}: {
  error?: string;
}) {
  if (!error) return null;

  return (
    <p className="mt-1 text-xs text-destructive">
      {error}
    </p>
  );
}