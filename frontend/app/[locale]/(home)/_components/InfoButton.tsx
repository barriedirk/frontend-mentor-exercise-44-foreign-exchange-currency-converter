"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/Popover";

const textFormatters = {
  codeStyle: (chunks: ReactNode) => (
    <code className="text-text-accent bg-surface-card px-1 py-0.5 rounded">
      {chunks}
    </code>
  ),
  italicStyle: (chunks: ReactNode) => <em>{chunks}</em>,
};

export function InfoButton() {
  const t = useTranslations("InfoButton");

  return (
    <div className="flex relative z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded transition-colors font-mono font-bold border border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:bg-surface-input data-[state=open]:text-text-primary data-[state=open]:bg-surface-hover data-[state=open]:bg-surface-input"
            title={t("title")}
            aria-label={t("ariaLabel")}
          >
            !
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="z-100 w-80 sm:w-96 bg-surface-card border border-surface-hover rounded-lg p-[var(--spacing-200)] shadow-xl font-mono text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-row justify-between items-center border-b border-subtle pb-[var(--spacing-100)] mb-[var(--spacing-100)]">
            <h3 className="text-preset-5 font-bold text-text-primary flex items-center gap-[var(--spacing-100)]">
              {t("heading")}
            </h3>
            <span className="text-preset-6 text-text-secondary opacity-50 uppercase tracking-wider">
              {t("disclaimer")}
            </span>
          </div>

          <div className="space-y-[var(--spacing-100)] text-preset-6 text-text-secondary leading-relaxed">
            <p>{t.rich("apiNotice", textFormatters)}</p>
            <p>{t("simulationNotice")}</p>

            <ul className="space-y-[var(--spacing-100)] pl-[var(--spacing-100)] border-l border-subtle">
              <li>
                <strong className="text-text-primary">
                  {t("liveMarketsLabel")}
                </strong>{" "}
                {t.rich("liveMarketsText", textFormatters)}
              </li>
              <li>
                <strong className="text-text-primary">
                  {t("historicalTrendsLabel")}
                </strong>{" "}
                {t("historicalTrendsText")}
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
