import { cn } from "@/shared/utils/cn";
import type { TickerRate } from "../ticker";
import { TrendUpLinearIcon } from "@/shared/assets/icons/TrendUpLinearIcon";
import { TrendDownLinearIcon } from "@/shared/assets/icons/TrendDownLinearIcon";

interface DataTickerProps extends Readonly<
  React.HTMLAttributes<HTMLDivElement>
> {
  readonly rates: readonly TickerRate[];
}

export function DataTicker({ className, rates, ...props }: DataTickerProps) {
  return (
    <div
      className={cn(
        "w-full h-[35px] sm:h-[40px] bg-neutral-950 border-b border-border-subtle flex items-center overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div className="h-full bg-brand px-[var(--spacing-250)] flex items-center gap-[var(--spacing-100)] shrink-0 z-10">
        <span className="size-[var(--spacing-100)] bg-neutral-950 rounded-full animate-pulse" />
        <span className="font-mono text-preset-6 sm:text-preset-4 text-neutral-950 uppercase font-bold tracking-wider">
          Live Markets
        </span>
      </div>

      <div className="flex w-max items-center animate-ticker hover:[animation-play-state:paused] cursor-pointer">
        {[...new Array(2)].map((_, i) => (
          <div
            key={i}
            aria-hidden={i > 0}
            className="flex items-center h-full divide-x divide-border-subtle shrink-0 text-preset-6 sm:text-preset-5"
          >
            {rates.map((item) => {
              const isPositive = item.change >= 0;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-[1rem] px-[2rem] h-full font-mono shrink-0"
                >
                  <span className="text-text-muted">{item.pair}</span>
                  <span className="text-text-primary font-bold tabular-nums">
                    {item.value}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-[0.2rem] font-bold transition-colors h-full",
                      isPositive ? "text-success" : "text-danger",
                    )}
                  >
                    {isPositive ? (
                      <TrendUpLinearIcon className="w-[0.55rem] h-[0.55rem] shrink-0" />
                    ) : (
                      <TrendDownLinearIcon className="w-[0.55rem] h-[0.55rem] shrink-0" />
                    )}

                    {/* Porcentaje */}
                    <span className="tabular-nums">
                      {isPositive ? "+" : ""}
                      {item.change}%
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
