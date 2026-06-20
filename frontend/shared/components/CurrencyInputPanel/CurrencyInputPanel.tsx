import { cn } from "@/shared/utils/cn";
import CircleWrapper from "@/shared/ui/CircleWrapper";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/Popover";
import { CurrencyGroup, CurrencyItem } from "@/domain/currency/currency";
import { useMemo, useState } from "react";
import { ALLOWED_CURRENCIES } from "@/shared/constants/currencies";
import { CurrencyDropdownPanel } from "@/domain/currency/ui/CurrencyDropdownPanel";

interface CurrencyInputPanelProps extends Readonly<
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
> {
  readonly label: "SEND" | "RECEIVE";
  readonly value: string;
  readonly currencyCode: string;
  readonly onValueChange?: (value: string) => void;
  readonly onCurrencyClick?: () => void;
  readonly readOnly?: boolean;
  readonly currencyGroups: CurrencyGroup[];
}

export function CurrencyInputPanel({
  className,
  label,
  value,
  currencyCode,
  onValueChange,
  onCurrencyClick,
  readOnly = false,
  currencyGroups,
  ...props
}: CurrencyInputPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<
    CurrencyItem | undefined
  >(
    ALLOWED_CURRENCIES.find(
      (currency) => currency.code === currencyCode,
    ) as CurrencyItem,
  );
  const filteredGroups = useMemo(() => {
    const cleanSearch = searchQuery.toLowerCase().trim();
    if (!cleanSearch) return currencyGroups;

    return currencyGroups
      .map((group) => ({
        title: group.title,
        items: group.items.filter(
          (item) =>
            item.code.toLowerCase().includes(cleanSearch) ||
            item.name.toLowerCase().includes(cleanSearch),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [searchQuery]);

  return (
    <div
      className={cn(
        "flex flex-col gap-[0.5rem] w-full p-[1.5rem] bg-neutral-900/40 border border-neutral-800/60 rounded-12 font-mono transition-all focus-within:border-neutral-700 focus-within:bg-neutral-900/80",
        className,
      )}
      {...props}
    >
      <span className="text-[0.75rem] text-text-muted uppercase tracking-widest font-medium">
        {label}
      </span>
      <div className="flex items-center justify-between gap-[1rem] w-full">
        <input
          type="text"
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.00"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onValueChange?.(e.target.value)}
          className={cn(
            "w-full bg-transparent text-[2.5rem] font-bold text-text-primary outline-none tracking-tight p-0 border-none min-w-0",
            {
              "text-brand": label === "RECEIVE",
              "cursor-default": readOnly,
            },
          )}
        />
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              onClick={onCurrencyClick}
              className="flex items-center gap-[0.5rem] bg-neutral-800 border border-neutral-700/50 hover:bg-neutral-700 h-[3rem] px-[1rem] rounded-12 text-text-primary font-bold text-[1rem] transition-all cursor-pointer outline-none shrink-0 select-none"
            >
              <CircleWrapper size="sm">
                <span
                  className={cn(
                    "fi",
                    `fi-${selectedCurrency?.code.slice(0, 2).toLowerCase()}`,
                    "fis",
                  )}
                />
              </CircleWrapper>

              <span className="uppercase tracking-wide">
                {selectedCurrency?.code}
              </span>

              <ChevronDownIcon size={12} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="z-50 animate-in fade-in-50 duration-200">
            <CurrencyDropdownPanel
              groups={filteredGroups}
              selectedCode={selectedCurrency?.code}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectCurrency={(currency) => {
                setSelectedCurrency(currency);
                setIsOpen(false);
                setSearchQuery("");
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
