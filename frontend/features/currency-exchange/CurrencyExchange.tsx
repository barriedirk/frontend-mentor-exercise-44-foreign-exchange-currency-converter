"use client";

import { useMemo, useState } from "react";

import { useDebounce } from "@/shared/hooks/useDebounce";
import { useHydratedStore } from "@/shared/hooks/useHydratedStore";

import CurrencyExchangeView from "./CurrencyExchangeView";
import { useCurrencyGroups } from "./hooks/useCurrencyGroups";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { useExchangeRate } from "./hooks/useExchangeRate";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

export default function CurrencyExchange() {
  const { data: currencyGroups = [] } = useCurrencyGroups();

  const store = useExchangeStore();
  const sendCurrencyCode =
    (useHydratedStore(
      useExchangeStore,
      (s) => s.sendCurrencyCode,
    ) as CurrencyCode) ?? "USD";
  const receiveCurrencyCode =
    (useHydratedStore(
      useExchangeStore,
      (s) => s.receiveCurrencyCode,
    ) as CurrencyCode) ?? "EUR";
  const favorites =
    (useHydratedStore(useExchangeStore, (s) => s.favorites) as string[]) ?? [];

  const [amount, setAmount] = useState<string>("1000");
  const [independentField, setIndependentField] = useState<"send" | "receive">(
    "send",
  );

  const debouncedAmount = useDebounce(amount, 350);
  const { data: rate = 1 } = useExchangeRate(
    sendCurrencyCode,
    receiveCurrencyCode,
  );
  const isSameCurrency = sendCurrencyCode === receiveCurrencyCode;

  const currentPair = `${sendCurrencyCode}-${receiveCurrencyCode}`;
  const isFavorited = useMemo(
    () => favorites.includes(currentPair),
    [favorites, currentPair],
  );

  const { sendAmount, receiveAmount } = useMemo(() => {
    const debouncedNumeric = Number(debouncedAmount) || 0;

    if (independentField === "send") {
      const calculatedReceive = isSameCurrency
        ? debouncedNumeric
        : debouncedNumeric * rate;
      return {
        sendAmount: amount,
        receiveAmount:
          calculatedReceive === 0 ? "" : calculatedReceive.toFixed(2),
      };
    } else {
      const calculatedSend = isSameCurrency
        ? debouncedNumeric
        : debouncedNumeric / rate;
      return {
        sendAmount: calculatedSend === 0 ? "" : calculatedSend.toFixed(2),
        receiveAmount: amount,
      };
    }
  }, [amount, debouncedAmount, independentField, rate, isSameCurrency]);

  const conversionRate = useMemo(() => {
    return `1 ${sendCurrencyCode} = ${rate.toFixed(4)} ${receiveCurrencyCode}`;
  }, [sendCurrencyCode, receiveCurrencyCode, rate]);

  const handleSetSendAmount = (val: string) => {
    setIndependentField("send");
    setAmount(val);
  };

  const handleSetReceiveAmount = (val: string) => {
    setIndependentField("receive");
    setAmount(val);
  };

  const handleLogConversion = () => {
    if (!sendAmount || !receiveAmount) return;

    store.addLog({
      fromCurrency: sendCurrencyCode,
      toCurrency: receiveCurrencyCode,
      amountSent: sendAmount,
      amountReceived: receiveAmount,
      rate,
    });
  };

  return (
    <CurrencyExchangeView
      sendAmount={sendAmount}
      setSendAmount={handleSetSendAmount}
      sendCurrencyCode={sendCurrencyCode}
      setSendCurrencyCode={store.setSendCurrencyCode}
      receiveAmount={receiveAmount}
      setReceiveAmount={handleSetReceiveAmount}
      receiveCurrencyCode={receiveCurrencyCode}
      setReceiveCurrencyCode={store.setReceiveCurrencyCode}
      currencyGroups={currencyGroups}
      conversionRate={conversionRate}
      isFavorited={isFavorited}
      onSwap={store.swapCurrencies}
      onToggleFavorite={() => store.toggleFavorite(currentPair)}
      onLogConversion={handleLogConversion}
    />
  );
}
