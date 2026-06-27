import * as React from "react";
import { cn } from "@/shared/utils/cn";

export type StatTrend = "up" | "down" | "neutral";

interface MarketStatCardProps extends Readonly<
  React.HTMLAttributes<HTMLDivElement>
> {
  readonly label: string;
  readonly value: string;
  readonly trend?: StatTrend;
}

export function MarketStatCard({
  className,
  label,
  value,
  trend = "neutral",
  ...props
}: MarketStatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-100)] flex-1 p-[var(--spacing-200)] bg-surface-card rounded-12 border border-border-subtle font-mono select-none",
        className,
      )}
      {...props}
    >
      <span className="text-preset-4 text-foreground/70 uppercase tracking-wider whitespace-nowrap">
        {label}
      </span>

      <div
        className={cn(
          "text-preset-2 md:text-preset-4 tracking-tight flex items-center gap-[0.25rem] uppercase",
          {
            "text-text-primary": trend === "neutral",
            "text-green-500": trend === "up",
            "text-red-500": trend === "down",
          },
        )}
      >
        {label.toLowerCase() === "% change" &&
          ["down", "up"].includes(trend) && (
            <span className="text-[0.85em] leading-none" aria-hidden="true">
              {trend === "down" ? "▼" : "▲"}
            </span>
          )}
        <span>{value}</span>
      </div>
    </div>
  );
}
