import { cn } from "@/shared/utils/cn";
import { CurrencyItem } from "../currency";
import { CurrencyBadge } from "@/shared/ui/CurrencyBadge";

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
      <CurrencyBadge code={currency.code.slice(0, 2).toLowerCase()} size="md" />

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
