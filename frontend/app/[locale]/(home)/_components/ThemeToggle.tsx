"use client";

import { useSyncExternalStore, useEffect } from "react";

type Theme = "dark" | "light";

let isMounted = false;

const themeStore = {
  subscribe(callback: () => void) {
    if (typeof globalThis === "undefined") return () => {};

    const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
    const handleToggle = () => callback();

    media.addEventListener("change", handleToggle);
    globalThis.addEventListener("theme-change", handleToggle);

    if (!isMounted) {
      isMounted = true;
      setTimeout(callback, 0);
    }

    return () => {
      media.removeEventListener("change", handleToggle);
      globalThis.removeEventListener("theme-change", handleToggle);
    };
  },

  getSnapshot() {
    if (!isMounted || typeof globalThis === "undefined") {
      return "dark";
    }

    return (
      (localStorage.getItem("theme") as Theme) ||
      (globalThis.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  },

  getServerSnapshot() {
    return "dark";
  },
};

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);

    globalThis.dispatchEvent(new Event("theme-change"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent hover:border-border-subtle transition-colors font-mono font-bold"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label={`Toggle theme, current: ${theme}`}
    >
      {theme === "dark" ? "☼" : "☾"}
    </button>
  );
}
