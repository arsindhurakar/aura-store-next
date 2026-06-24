import { Switch } from "../ui/switch";

export function Toggle({
  label,
  desc,
  defaultChecked,
}: {
  label: string;
  desc: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="surface-elev flex items-center justify-between gap-6 rounded-xl p-4">
      <div>
        <div className="text-sm font-medium">{label}</div>

        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>

      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
