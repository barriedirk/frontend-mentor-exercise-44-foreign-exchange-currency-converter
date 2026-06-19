"use client";

import { CurrencyInputPanel } from "@/shared/components/CurrencyInputPanel";
import { SwapButton } from "@/shared/components/SwapButton";

export default function CurrencySwapButtonWrapper() {
  const handleSwap = () => {
    console.log("Swapped!");
  };

  const sendAmount = "1000";
  const receiveAmount = "400";

  return (
    <div className="w-full max-w-[1200px] bg-[#050505] p-[1.5rem] rounded-12 border border-neutral-900">
      <div className="flex flex-col sm:flex-row items-center gap-[1.5rem] w-full">
        <CurrencyInputPanel
          label="SEND"
          value={sendAmount}
          currencyCode="USD"
          onValueChange={() => {}}
        />

        <div className="shrink-0 z-10">
          <SwapButton onClick={handleSwap} />
        </div>

        <CurrencyInputPanel
          label="RECEIVE"
          value={receiveAmount}
          currencyCode="EUR"
          readOnly
        />
      </div>
    </div>
  );
}
