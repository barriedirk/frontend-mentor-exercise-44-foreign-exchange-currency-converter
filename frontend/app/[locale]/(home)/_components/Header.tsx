"use client";

import { Logo } from "@/shared/ui/Logo";
import { useHeaderData } from "./hooks/useHeaderData";
import { InfoButton } from "./InfoButton";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslations } from "next-intl";

export default function Header() {
  const { totalCurrencies } = useHeaderData();
  const t = useTranslations("Header");

  return (
    <header className="relative z-40 flex flex-row justify-between items-center p-[var(--spacing-200)] sm:p-[var(--spacing-300)]">
      <Logo />
      <div className="flex flex-row items-center gap-1 sm:gap-6">
        <div
          className="flex flex-row items-center gap-0.5 sm:gap-2 text-preset-7 sm:text-preset-5 text-text-secondary font-mono"
          aria-label="Platform metadata"
        >
          <span>
            {totalCurrencies} {t("currencies")}
          </span>
          <span aria-hidden="true" className="hidden sm:inline opacity-40">
            ·
          </span>
          <span className="hidden md:inline">EOD</span>
          <span aria-hidden="true" className="hidden md:inline opacity-40">
            ·
          </span>
          <span className="hidden md:inline">ECB DATA</span>
        </div>
        <div
          className="hidden xs:block h-4 w-[1px] bg-gray-800"
          aria-hidden="true"
        />
        <div className="flex flex-row items-center gap-1 sm:gap-2 p-0.5 sm:p-1 rounded-md border border-gray-400">
          <ThemeToggle />
          <LanguageToggle />
          <InfoButton />
        </div>
      </div>
    </header>
  );
}
