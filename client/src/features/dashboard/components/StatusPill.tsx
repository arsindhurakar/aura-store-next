import { STATUS_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest",
        status === "delivered" && "border-success/40 text-success",
        status === "shipped" && "border-accent/40 text-accent",
        status === "processing" && "border-chart-4/40 text-chart-4",
        status === "pending" && "border-border text-muted-foreground",
        status === "cancelled" && "border-destructive/40 text-destructive",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
