"use client";

import { Logo } from "@/shared/ui/Logo";
import { useHeaderData } from "./hooks/useHeaderData";

export default function Header() {
  const { totalCurrencies } = useHeaderData();

  return (
    <header className="flex flex-row justify-between items-center p-[var(--spacing-200)] p-[var(--spacing-300)]">
      <Logo />
      <div
        className="flex flex-row items-center gap-2 text-preset-6 sm:text-preset-5 text-text-secondary font-mono"
        aria-label="Platform metadata"
      >
        <span>{totalCurrencies} CURRENCIES</span>
        <span aria-hidden="true">·</span>
        <span>EOD</span>
        <span aria-hidden="true">·</span>
        <span>ECB DATA</span>
      </div>
    </header>
  );
}
