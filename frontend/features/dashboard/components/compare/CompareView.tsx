"use client";

import { cn } from "@/shared/utils/cn";
import { ComparePanelProps } from "./types";
import { IconButton } from "@/shared/ui/IconButton";
import { StarFilledIcon, StarIcon } from "@/shared/assets/icons";
import CircleWrapper from "@/shared/ui/CircleWrapper";

export function CompareView({
  conversion,
  pairs,
  onToggleFavorite,
}: ComparePanelProps) {
  const { baseAmount, baseCurrency } = conversion;

  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-12 p-[var(--spacing-200)] shadow-2xl flex flex-col gap-[var(--spacing-200)]">
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between text-text-secondary gap-[var(--spacing-100)] text-preset-4 font-bold tracking-widest uppercase">
        <p>
          <span>Multi-Currency</span>{" "}
          <span className="text-text-primary tabular-nums font-extrabold">
            {Intl.NumberFormat("en-US").format(baseAmount)} From {baseCurrency}
          </span>
        </p>
        <div className="tabular-nums">{pairs.length} Pairs</div>
      </div>

      <ul className="flex flex-col gap-[var(--spacing-200)]">
        {pairs.map(({ currency, rate, isFavorite }) => {
          const convertedValue = baseAmount * rate;

          return (
            <li
              key={currency.code}
              className="flex items-center justify-between bg-neutral-800 border border-border-subtle rounded-8 p-[var(--spacing-100)] hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-center gap-[var(--spacing-200)]">
                <CircleWrapper size="sm">
                  <span
                    className={cn(
                      "fi",
                      `fi-${currency.code?.slice(0, 2).toLowerCase()}`,
                      "fis",
                    )}
                  />
                </CircleWrapper>

                <div className="flex flex-col gap-[var(--spacing-025)]">
                  <span className="text-preset-4 text-text-primary uppercase tracking-wide">
                    {currency.code}
                  </span>
                  <span className="text-preset-5 text-text-secondary">
                    {currency.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center ml-auto mr-[var(--spacing-100)]">
                <div className="flex flex-col gap-[var(--spacing-025)] items-end">
                  <span className="text-preset-3 text-text-primary tabular-nums text-align-right">
                    {Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(convertedValue)}
                  </span>
                  <span className="text-preset-6 text-text-secondary tabular-nums">
                    @ {rate.toFixed(4)}
                  </span>
                </div>
              </div>
              <IconButton
                onClick={() => onToggleFavorite(currency.code)}
                aria-pressed={isFavorite}
                aria-label={`Toggle favorite status for ${currency.name}`}
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-8 border transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand",
                  isFavorite
                    ? "border-brand bg-brand-muted text-brand"
                    : "border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary",
                )}
              >
                {isFavorite ? <StarFilledIcon /> : <StarIcon />}
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
