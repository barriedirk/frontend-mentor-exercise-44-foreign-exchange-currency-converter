"use client";

import { Logo } from "@/shared/ui/Logo";
import { useHeaderData } from "./hooks/useHeaderData";
import { InfoButton } from "./InfoButton";

export default function Header() {
  const { totalCurrencies } = useHeaderData();

  return (
    <header className="relative z-40 flex flex-row justify-between items-center p-[var(--spacing-200)] sm:p-[var(--spacing-300)]">
      <Logo />
      <div className="flex flex-row items-center gap-4 sm:gap-6">
        <div
          className="flex flex-row items-center gap-2 text-preset-6 sm:text-preset-5 text-text-secondary font-mono"
          aria-label="Platform metadata"
        >
          <span>{totalCurrencies} CURRENCIES</span>
          <span aria-hidden="true" className="hidden sm:inline opacity-40">
            ·
          </span>
          <span className="hidden sm:inline">EOD</span>
          <span aria-hidden="true" className="hidden sm:inline opacity-40">
            ·
          </span>
          <span className="hidden sm:inline">ECB DATA</span>
        </div>
        <div
          className="hidden xs:block h-4 w-[1px] bg-gray-800"
          aria-hidden="true"
        />
        <div className="flex flex-row items-center gap-2 bg-gray-950/50 p-1 rounded-md border border-gray-900">
          {/* <ThemeToggle />
          <LanguageToggle />*/}
          <InfoButton />
        </div>
      </div>
    </header>
  );
}
