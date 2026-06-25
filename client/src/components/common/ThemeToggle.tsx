import { Moon, Sun } from "lucide-react";
import { useUI } from "@/store/ui.store";

export function ThemeToggle() {
  const { theme, toggleTheme } = useUI();
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full cursor-pointer border border-border text-muted-foreground transition hover:text-foreground hover:border-border-strong"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
