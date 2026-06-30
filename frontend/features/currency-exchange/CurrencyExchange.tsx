"use client";

import { useMemo, useState } from "react";
import { useCurrencyGroups } from "./hooks/useCurrencyGroups";
import { useExchangeRate } from "./hooks/useExchangeRate";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

import CurrencyExchangeView from "./CurrencyExchangeView";

export default function CurrencyExchange() {
  const { data: currencyGroups = [] } = useCurrencyGroups();

  const [sendCurrencyCode, setSendCurrencyCode] = useState<CurrencyCode>("USD");
  const [receiveCurrencyCode, setReceiveCurrencyCode] =
    useState<CurrencyCode>("EUR");
  const [isActionActive, setIsActionActive] = useState(false);

  const [amount, setAmount] = useState<string>("1000");
  const [independentField, setIndependentField] = useState<"send" | "receive">(
    "send",
  );

  const { data: rate = 1 } = useExchangeRate(
    sendCurrencyCode,
    receiveCurrencyCode,
  );

  const isSameCurrency = sendCurrencyCode === receiveCurrencyCode;

  const { sendAmount, receiveAmount } = useMemo(() => {
    const numericAmount = Number(amount) || 0;

    if (independentField === "send") {
      const calculatedReceive = isSameCurrency
        ? numericAmount
        : numericAmount * rate;
      return {
        sendAmount: amount,
        receiveAmount:
          calculatedReceive === 0 ? "" : calculatedReceive.toFixed(2),
      };
    } else {
      const calculatedSend = isSameCurrency
        ? numericAmount
        : numericAmount / rate;
      return {
        sendAmount: calculatedSend === 0 ? "" : calculatedSend.toFixed(2),
        receiveAmount: amount,
      };
    }
  }, [amount, independentField, rate, isSameCurrency]);

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

  const handleSwap = () => {
    setSendCurrencyCode(receiveCurrencyCode);
    setReceiveCurrencyCode(sendCurrencyCode);
    setIndependentField(independentField === "send" ? "receive" : "send");
  };

  const handleActionActive = () => {
    setIsActionActive((prev) => !prev);
  };

  const handleLogConversion = () => {
    console.log(
      `Log: ${sendAmount} ${sendCurrencyCode} -> ${receiveAmount} ${receiveCurrencyCode}`,
    );
  };

  return (
    <CurrencyExchangeView
      sendAmount={sendAmount}
      setSendAmount={handleSetSendAmount}
      sendCurrencyCode={sendCurrencyCode}
      setSendCurrencyCode={setSendCurrencyCode}
      receiveAmount={receiveAmount}
      setReceiveAmount={handleSetReceiveAmount}
      receiveCurrencyCode={receiveCurrencyCode}
      setReceiveCurrencyCode={setReceiveCurrencyCode}
      currencyGroups={currencyGroups}
      conversionRate={conversionRate}
      isActionActive={isActionActive}
      onSwap={handleSwap}
      onActionActive={handleActionActive}
      onLogConversion={handleLogConversion}
    />
  );
}
