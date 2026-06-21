"use client";

import { CurrencyInputPanel } from "@/shared/components/CurrencyInputPanel";
import { SwapButton } from "@/shared/components/SwapButton";

import { MOCK_CURRENCY_GROUPS } from "@/domain/currency/mocks";
import { CurrencyGroup } from "@/domain/currency/currency";
import { useState } from "react";

export default function CurrencySwapButtonWrapper() {
  const [sendAmount, setSendAmount] = useState("1000");
  const [sendCurrencyCode, setSendCurrencyCode] = useState("USD");

  const [receiveAmount, setReceiveAmount] = useState("400");
  const [receiveCurrencyCode, setReceiveCurrencyCode] = useState("EUR");

  const handleSwap = () => {
    setSendCurrencyCode(receiveCurrencyCode);
    setReceiveCurrencyCode(sendCurrencyCode);
  };

  const currencyGroups: CurrencyGroup[] = [...MOCK_CURRENCY_GROUPS];

  return (
    <div className="w-full max-w-[1200px] bg-[#050505] p-[1.5rem] rounded-12 border border-neutral-900">
      <div className="flex flex-col sm:flex-row items-center gap-[1.5rem] w-full">
        <CurrencyInputPanel
          label="SEND"
          value={sendAmount}
          currencyCode={sendCurrencyCode}
          onValueChange={(value) => setSendAmount(value)}
          onCurrencySelect={(currency) => setSendCurrencyCode(currency.code)}
          currencyGroups={currencyGroups}
        />

        <div className="shrink-0 z-10">
          <SwapButton onClick={handleSwap} />
        </div>

        <CurrencyInputPanel
          label="RECEIVE"
          value={receiveAmount}
          currencyCode={receiveCurrencyCode}
          readOnly
          onValueChange={(value) => setReceiveAmount(value)}
          onCurrencySelect={(currency) => setReceiveCurrencyCode(currency.code)}
          currencyGroups={currencyGroups}
        />
      </div>
    </div>
  );
}
