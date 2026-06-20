"use client";

import { useMemo, useState } from "react";

import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/Popover";
import { CurrencyDropdownPanel } from "@/domain/currency/ui/CurrencyDropdownPanel";
import { CurrencyItem } from "@/domain/currency/currency";
import { MOCK_CURRENCY_GROUPS } from "@/domain/currency/mocks";

export default function CurrencyDropdownWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    CurrencyItem | undefined
  >(
    MOCK_CURRENCY_GROUPS[0].items[1], // EUR
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const cleanSearch = searchQuery.toLowerCase().trim();
    if (!cleanSearch) return MOCK_CURRENCY_GROUPS;

    return MOCK_CURRENCY_GROUPS.map((group) => ({
      title: group.title,
      items: group.items.filter(
        (item) =>
          item.code.toLowerCase().includes(cleanSearch) ||
          item.name.toLowerCase().includes(cleanSearch),
      ),
    })).filter((group) => group.items.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-neutral-950 text-text-primary p-[2rem] space-y-[3rem]">
      <section className="space-y-[1rem]">
        <h2 className="text-[0.75rem] font-mono text-text-muted tracking-widest uppercase">
          2. Currency Dropdown (Domain + Shared Composition)
        </h2>

        <div className="flex flex-col items-start gap-[1rem]">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="h-[3.5rem] px-[1.5rem] bg-neutral-900 border border-border-subtle rounded-12 font-mono text-preset-3 text-text-primary flex items-center gap-[1rem] hover:bg-neutral-800 transition-colors cursor-pointer outline-none focus-visible:border-text-primary"
              >
                <span>
                  {selectedCurrency
                    ? `Selected: ${selectedCurrency.code}`
                    : "Select Currency"}
                </span>
                <span className="text-[0.6rem] text-text-muted">▼</span>
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
      </section>
    </div>
  );
}
