"use client";

import { cn } from "@/shared/utils/cn";
import { FavoritePairItem } from "./types";
import { IconButton } from "@/shared/ui/IconButton";
import { StarFilledIcon, StarIcon } from "@/shared/assets/icons";

export interface FavoritesViewProps {
  readonly favoritePairs: readonly FavoritePairItem[];
  readonly onToggleFavorite: (id: string) => void;
}

export function FavoritesView({
  favoritePairs,
  onToggleFavorite,
}: FavoritesViewProps) {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-12 p-[var(--spacing-200)] shadow-2xl flex flex-col gap-[var(--spacing-200)]">
      <div className="flex items-start justify-between text-text-secondary gap-[var(--spacing-100)] text-preset-4 font-bold tracking-widest uppercase">
        <span>Pinned Pairs</span>
        <div className="tabular-nums">{favoritePairs.length} Favorites</div>
      </div>

      {favoritePairs.length === 0 ? (
        <div className="text-center py-[var(--spacing-800)] text-text-secondary text-preset-4">
          No pinned pairs available.
        </div>
      ) : (
        <ul className="flex flex-col gap-[var(--spacing-200)]">
          {favoritePairs.map((pair) => {
            const isPositive = pair.changePercent >= 0;

            return (
              <li
                key={pair.id}
                className="flex items-center justify-between bg-neutral-800 border border-border-subtle rounded-8 p-[var(--spacing-100)] hover:border-neutral-600 transition-colors"
              >
                <div className="flex items-center gap-[var(--spacing-150)] text-preset-4 text-text-primary font-bold uppercase tracking-wide">
                  <span>{pair.fromCode}</span>
                  <span className="text-text-secondary font-normal text-preset-4">
                    →
                  </span>
                  <span>{pair.toCode}</span>
                </div>

                <div className="flex items-center gap-[var(--spacing-300)] ml-auto mr-[var(--spacing-300)]">
                  <div className="flex flex-col items-end gap-[var(--spacing-100)]">
                    <span className="text-preset-3 text-text-primary font-bold tabular-nums">
                      {pair.rate.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                    </span>

                    <span
                      className={cn(
                        "text-preset-6 font-bold tabular-nums flex items-center gap-1",
                        isPositive ? "text-emerald-500" : "text-rose-500",
                      )}
                      aria-label={`Daily change: ${isPositive ? "up" : "down"} ${Math.abs(pair.changePercent)}%`}
                    >
                      <span>{isPositive ? "▲" : "▼"}</span>
                      <span>
                        {isPositive ? "+" : ""}
                        {pair.changePercent.toFixed(2)}%
                      </span>
                    </span>
                  </div>
                </div>

                <IconButton
                  onClick={() => onToggleFavorite(pair.id)}
                  aria-pressed={pair.isFavorite}
                  aria-label={`Remove ${pair.fromCode} to ${pair.toCode} pair from favorites`}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-8 border transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    pair.isFavorite
                      ? "border-brand bg-brand-muted text-brand"
                      : "border-border-subtle text-text-secondary hover:text-text-primary hover:border-text-secondary",
                  )}
                >
                  {pair.isFavorite ? <StarFilledIcon /> : <StarIcon />}
                </IconButton>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
