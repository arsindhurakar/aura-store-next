import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface-elev mx-auto flex max-w-md flex-col items-center rounded-2xl px-8 py-16 text-center">
      {icon && (
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="font-display text-2xl">{title}</h3>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
