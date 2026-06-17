import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { CurrencyItem } from "../currency";

interface CurrencyOptionProps extends Readonly<
  React.HTMLAttributes<HTMLButtonElement>
> {
  readonly currency: CurrencyItem;
  readonly isSelected?: boolean;
}

export function CurrencyOption({
  className,
  currency,
  isSelected,
  ...props
}: CurrencyOptionProps) {
  return (
    <button
      type="button"
      className={cn(
        "w-full h-[4rem] px-[1rem] flex items-center gap-[1rem] bg-transparent text-left font-mono transition-all outline-none rounded-12 border border-transparent select-none cursor-pointer",
        "hover:bg-surface-hover hover:border-border-subtle focus-visible:bg-surface-hover focus-visible:border-border-subtle",
        className,
      )}
      {...props}
    >
      <div className="size-[1.5rem] rounded-full overflow-hidden shrink-0 bg-neutral-800 flex items-center justify-center">
        {currency.flagSvg ?? (
          <span className="text-[0.6rem]">{currency.code.slice(0, 2)}</span>
        )}
      </div>

      <span className="text-preset-3-bold text-text-primary tracking-wider uppercase">
        {currency.code}
      </span>

      <span className="text-preset-3 text-text-muted flex-1 truncate">
        {currency.name}
      </span>

      {isSelected && (
        <span className="text-text-primary font-bold text-preset-3 ml-auto">
          ✓
        </span>
      )}
    </button>
  );
}
