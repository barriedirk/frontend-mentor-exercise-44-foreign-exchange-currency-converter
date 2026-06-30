import { cn } from "@/shared/utils/cn";

import { useId, useMemo, useState } from "react";

import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/Popover";
import { CurrencyGroup } from "@/domain/currency/currency";
import { ALLOWED_CURRENCIES } from "@/shared/constants/currencies";
import { CurrencyDropdownPanel } from "@/domain/currency/ui/CurrencyDropdownPanel";
import { AmountInput } from "@/shared/ui/AmountInput";
import { CurrencyBadge } from "@/shared/ui/CurrencyBadge";
import { CurrencyMetadata } from "@/shared/types/CurrencyMetadata";

interface CurrencyInputPanelProps extends Readonly<
  Omit<React.HTMLAttributes<HTMLFieldSetElement>, "onChange">
> {
  readonly label: "SEND" | "RECEIVE";
  readonly value: string;
  readonly currencyCode: string;
  readonly onValueChange?: (value: string) => void;
  readonly onCurrencySelect?: (currency: CurrencyMetadata) => void;
  readonly readOnly?: boolean;
  readonly currencyGroups: CurrencyGroup[];
}

export function CurrencyInputPanel({
  className,
  label,
  value,
  currencyCode,
  onValueChange,
  onCurrencySelect,
  readOnly = false,
  currencyGroups,
  ...props
}: CurrencyInputPanelProps) {
  const labelId = useId();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const activeCurrency = useMemo(() => {
    return ALLOWED_CURRENCIES.find((c) => c.code === currencyCode);
  }, [currencyCode]);

  const filteredGroups = useMemo(() => {
    const cleanSearch = searchQuery.toLowerCase().trim();
    if (!cleanSearch) return currencyGroups;

    return currencyGroups
      .map((group) => ({
        title: group.title,
        currencies: group.currencies.filter(
          (item) =>
            item.code.toLowerCase().startsWith(cleanSearch) ||
            item.name.toLowerCase().startsWith(cleanSearch),
        ),
      }))
      .filter((group) => group.currencies.length > 0);
  }, [searchQuery, currencyGroups]);

  return (
    <fieldset
      aria-labelledby={labelId}
      className={cn(
        "flex flex-col gap-[0.5rem] w-full p-[var(--spacing-250)] bg-surface-input border border-neutral-800/60 rounded-12 font-mono transition-all focus-within:border-neutral-700 focus-within:bg-neutral-900/80",
        className,
      )}
      {...props}
    >
      <span
        id={labelId}
        className="text-preset-4 text-text-tertiary uppercase tracking-widest font-medium"
      >
        {label}
      </span>
      <div className="flex items-center justify-between gap-[1rem] w-full">
        <AmountInput
          value={value}
          readOnly={readOnly}
          className={cn(
            {
              "text-brand": label === "RECEIVE",
              "cursor-default": readOnly,
            },
            "text-preset-2",
          )}
          onChange={onValueChange ?? (() => {})}
          aria-label={`${label} amount`}
          aria-readonly={readOnly}
        />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-[0.5rem] bg-neutral-800 border border-neutral-700/50 hover:bg-neutral-700 h-[3rem] px-[1rem] rounded-12 text-text-primary font-bold text-preset-3 transition-all cursor-pointer outline-none shrink-0 select-none"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-label={`Select ${label.toLowerCase()} currency. Current: ${currencyCode}`}
            >
              <CurrencyBadge
                size="sm"
                code={activeCurrency?.code.slice(0, 2).toLowerCase()}
              />

              <span className="uppercase tracking-wide">
                {activeCurrency?.code}
              </span>

              <ChevronDownIcon size={12} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="z-50 animate-in fade-in-50 duration-200">
            <CurrencyDropdownPanel
              groups={filteredGroups as readonly CurrencyGroup[]}
              selectedCode={activeCurrency?.code}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectCurrency={(currency) => {
                onCurrencySelect?.(currency);
                setIsOpen(false);
                setSearchQuery("");
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </fieldset>
  );
}
