"use client";

import { CurrencyInputPanel } from "@/shared/components/CurrencyInputPanel";
import { SwapButton } from "@/shared/components/SwapButton";

import { CurrencyGroup } from "@/domain/currency/currency";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/shared/ui/Button";
import { StarIcon, StarFilledIcon } from "@/shared/assets/icons";

interface CurrencyExchangeProps {
  readonly conversionRate: string;
  readonly sendAmount: string;
  readonly setSendAmount: Dispatch<SetStateAction<string>>;
  readonly sendCurrencyCode: string;
  readonly setSendCurrencyCode: Dispatch<SetStateAction<string>>;
  readonly receiveAmount: string;
  readonly setReceiveAmount: Dispatch<SetStateAction<string>>;
  readonly receiveCurrencyCode: string;
  readonly setReceiveCurrencyCode: Dispatch<SetStateAction<string>>;
  readonly currencyGroups: readonly CurrencyGroup[];
  readonly isActionActive: boolean;
  readonly onSwap: () => void;
  readonly onActionActive: () => void;
  readonly onLogConversion: () => void;
}

export default function CurrencyExchangeView({
  conversionRate,
  sendAmount,
  setSendAmount,
  sendCurrencyCode,
  setSendCurrencyCode,
  receiveAmount,
  setReceiveAmount,
  receiveCurrencyCode,
  setReceiveCurrencyCode,
  currencyGroups,
  isActionActive,
  onSwap,
  onActionActive,
  onLogConversion,
}: CurrencyExchangeProps) {
  return (
    <section
      aria-label="Currency converter calculator"
      className="w-full max-w-[1200px] bg-surface-card pt-[var(--spacing-300)] rounded-12 border border-border-subtle"
    >
      <div className="flex flex-col sm:flex-row items-center gap-[var(--spacing-200)] w-full px-[var(--spacing-300)] mb-[var(--spacing-300)]">
        <CurrencyInputPanel
          label="SEND"
          value={sendAmount}
          currencyCode={sendCurrencyCode}
          onValueChange={(value) => setSendAmount(value)}
          onCurrencySelect={(currency) => setSendCurrencyCode(currency.code)}
          currencyGroups={currencyGroups as CurrencyGroup[]}
        />

        <div className="shrink-0 z-10">
          <SwapButton onClick={onSwap} />
        </div>

        <CurrencyInputPanel
          label="RECEIVE"
          value={receiveAmount}
          currencyCode={receiveCurrencyCode}
          readOnly
          onValueChange={(value) => setReceiveAmount(value)}
          onCurrencySelect={(currency) => setReceiveCurrencyCode(currency.code)}
          currencyGroups={currencyGroups as CurrencyGroup[]}
        />
      </div>
      <div className="text-preset-4 mt-[var(--spacing-200)] flex flex-col sm:flex-row sm:justify-between items-center gap-[var(--spacing-200)] py-[var(--spacing-300)] px-[var(--spacing-300)] border-t border-neutral-300 border-dotted">
        <p className="text-center sm:text-left w-full">{conversionRate}</p>
        <div className="flex flex-row gap-2 w-full justify-center gap-5">
          <Button variant="actionActive" onClick={onActionActive}>
            {isActionActive ? <StarFilledIcon /> : <StarIcon />}
            Action Active
          </Button>
          <Button variant="actionDoubleBorder" onClick={onLogConversion}>
            LOG CONVERSION
          </Button>
        </div>
      </div>
    </section>
  );
}
