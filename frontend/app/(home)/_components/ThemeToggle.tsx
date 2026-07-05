"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersLight = globalThis.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches;

    const initialTheme: Theme =
      savedTheme || (systemPrefersLight ? "light" : "dark");

    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  };

  if (!mounted) {
    return (
      <div
        className="w-8 h-8 rounded border border-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border-subtle transition-colors font-mono font-bold"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Toggle theme, current: ${theme}`}
    >
      {theme === "dark" ? "☼" : "☾"}
    </button>
  );
}
