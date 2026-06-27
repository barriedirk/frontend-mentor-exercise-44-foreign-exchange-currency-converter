import * as React from "react";
import { cn } from "@/shared/utils/cn";

export type Timeframe = "1D" | "1W" | "1M" | "3M" | "1Y" | "5Y";

interface TimeframeTabsProps extends Readonly<
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
> {
  readonly activeTab: Timeframe;
  readonly onChange: (tab: Timeframe) => void;
}

const TIMEFRAMES: readonly Timeframe[] = ["1D", "1W", "1M", "3M", "1Y", "5Y"];

export function TimeframeTabs({
  className,
  activeTab,
  onChange,
  ...props
}: TimeframeTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[0.25rem] p-[0.25rem] bg-surface-card rounded-8 border border-neutral-800/50 h-fit w-fit select-none",
        className,
      )}
      {...props}
    >
      {TIMEFRAMES.map((tf) => {
        const isActive = activeTab === tf;

        return (
          <button
            key={tf}
            type="button"
            onClick={() => onChange(tf)}
            className={cn(
              "h-[2rem] px-[0.75rem] flex items-center justify-center font-mono text-preset-5 rounded-6 transition-all cursor-pointer outline-none",
              {
                "text-text-secondary bg-transparent hover:text-text-primary hover:bg-neutral-800/50":
                  !isActive,
                "text-text-primary bg-neutral-800 border border-neutral-700/30 shadow-sm":
                  isActive,
              },
            )}
          >
            {tf}
          </button>
        );
      })}
    </div>
  );
}
