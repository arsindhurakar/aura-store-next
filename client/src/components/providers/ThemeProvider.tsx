"use client";

import { useUI } from "@/store/ui.store";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUI((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return children;
}
