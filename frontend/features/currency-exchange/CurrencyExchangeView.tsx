"use client";

import { CurrencyInputPanel } from "@/shared/components/CurrencyInputPanel";
import { SwapButton } from "@/shared/components/SwapButton";

import { CurrencyGroup } from "@/domain/currency/currency";
import { Button } from "@/shared/ui/Button";
import { StarIcon, StarFilledIcon } from "@/shared/assets/icons";

interface CurrencyExchangeProps {
  readonly conversionRate: string;
  readonly sendAmount: string;
  readonly setSendAmount: (value: string) => void;
  readonly sendCurrencyCode: string;
  readonly setSendCurrencyCode: (value: string) => void;
  readonly receiveAmount: string;
  readonly setReceiveAmount: (value: string) => void;
  readonly receiveCurrencyCode: string;
  readonly setReceiveCurrencyCode: (value: string) => void;
  readonly currencyGroups: readonly CurrencyGroup[];
  readonly isFavorited: boolean;
  readonly onSwap: () => void;
  readonly onToggleFavorite: () => void;
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
  isFavorited,
  onSwap,
  onToggleFavorite,
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
          <Button variant="actionActive" onClick={onToggleFavorite}>
            {isFavorited ? <StarFilledIcon /> : <StarIcon />}
            Favorited
          </Button>
          <Button variant="actionDoubleBorder" onClick={onLogConversion}>
            LOG CONVERSION
          </Button>
        </div>
      </div>
    </section>
  );
}
