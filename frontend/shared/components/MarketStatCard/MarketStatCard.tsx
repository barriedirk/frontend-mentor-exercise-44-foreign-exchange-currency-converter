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
        "flex flex-col gap-[0.5rem] min-w-[12rem] flex-1 p-[1.25rem] bg-surface-card rounded-12 border border-border-subtle font-mono select-none",
        className,
      )}
      {...props}
    >
      <span className="text-preset-4 text-text-muted uppercase tracking-wider">
        {label}
      </span>

      <div
        className={cn(
          "text-preset-2-bold tracking-tight flex items-center gap-[0.25rem] uppercase",
          {
            "text-text-primary": trend === "neutral",
            "text-green-500": trend === "up",
            "text-red-500": trend === "down",
          },
        )}
      >
        {trend === "up" && (
          <span className="text-[0.85em] leading-none" aria-hidden="true">
            ▲
          </span>
        )}
        {trend === "down" && (
          <span className="text-[0.85em] leading-none" aria-hidden="true">
            ▼
          </span>
        )}
        <span>{value}</span>
      </div>
    </div>
  );
}
