import * as React from "react";
import { cn } from "@/shared/utils/cn";
import { SearchInput } from "@/shared/ui/SearchInput";
import { CurrencyGroup, CurrencyItem } from "@/domain/currency/currency";
import { CurrencyOption } from "./CurrencyOption";

interface CurrencyDropdownPanelProps extends Readonly<
  React.HTMLAttributes<HTMLDivElement>
> {
  readonly groups: readonly CurrencyGroup[];
  readonly selectedCode?: string;
  readonly onSelectCurrency: (currency: CurrencyItem) => void;
  readonly searchValue: string;
  readonly onSearchChange: (value: string) => void;
}

export function CurrencyDropdownPanel({
  className,
  groups,
  selectedCode,
  onSelectCurrency,
  searchValue,
  onSearchChange,
  ...props
}: CurrencyDropdownPanelProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[26rem] bg-[#141414] border border-border-subtle rounded-16 p-[1rem] flex flex-col gap-[1rem] shadow-2xl",
        className,
      )}
      {...props}
    >
      <SearchInput
        placeholder="Search currencies..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-[3.5rem]"
      />

      <div className="flex-1 overflow-y-auto max-h-[28rem] pr-[0.25rem] space-y-[1.25rem] no-scrollbar">
        {groups.map((group) => {
          if (group.items.length === 0) return null;

          return (
            <div key={group.title} className="space-y-[0.5rem]">
              <div className="flex items-center justify-between px-[0.5rem] font-mono text-[0.75rem] text-text-muted uppercase tracking-widest border-b border-border-subtle/30 pb-[0.25rem]">
                <span>{group.title}</span>
                <span className="tabular-nums">{group.items.length}</span>
              </div>
              <div className="space-y-[0.25rem]">
                {group.items.map((currency) => (
                  <CurrencyOption
                    key={currency.code}
                    currency={currency}
                    isSelected={currency.code === selectedCode}
                    onClick={() => onSelectCurrency(currency)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
