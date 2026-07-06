"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = () => {
    const nextLocale = locale === "en" ? "es" : "en";

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={handleLanguageChange}
      disabled={isPending}
      type="button"
      aria-label="Toggle language"
      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-card font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed select-none"
    >
      <span className={locale === "en" ? "text-text-accent font-bold" : ""}>
        EN
      </span>
      <span className="text-neutral-600">/</span>
      <span className={locale === "es" ? "text-text-accent font-bold" : ""}>
        ES
      </span>

      {isPending && (
        <span className="ml-1 animate-pulse text-neutral-500">...</span>
      )}
    </button>
  );
}
