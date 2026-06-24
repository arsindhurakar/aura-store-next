import { useEffect } from "react";
import { useUI } from "@/store/ui.store";

export function ThemeBoot() {
  const theme = useUI((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    root.style.colorScheme = theme;
  }, [theme]);
  return null;
}
