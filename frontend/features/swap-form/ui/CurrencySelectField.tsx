import { useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { CurrencyDropdownPanel } from "@/domain/currency/ui/CurrencyDropdownPanel";
import { CurrencyItem } from "@/shared/types/CurrencyItem";

export function CurrencySelectField() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CurrencyItem | undefined>();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 p-2 bg-neutral-900 rounded-8">
          {selected ? selected.code : "Select Currency"}
        </button>
      </PopoverTrigger>

      <PopoverContent>
        <CurrencyDropdownPanel
          selectedCode={selected?.code}
          onSelectCurrency={(currency) => {
            setSelected(currency);
            setIsOpen(false);
          }}
          searchValue=""
          onSearchChange={() => {}}
          groups={[]}
        />
      </PopoverContent>
    </Popover>
  );
}
