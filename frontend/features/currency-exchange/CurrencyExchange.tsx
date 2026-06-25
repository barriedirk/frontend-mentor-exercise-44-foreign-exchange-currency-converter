"use client";

import { useMemo, useState } from "react";

import { MOCK_CURRENCY_GROUPS } from "@/domain/currency/mocks";
import { CurrencyGroup } from "@/domain/currency/currency";
import CurrencyExchangeView from "./CurrencyExchangeView";

const CURRENCY_GROUPS: readonly CurrencyGroup[] = MOCK_CURRENCY_GROUPS;

export default function CurrencyExchange() {
  const [sendAmount, setSendAmount] = useState("1000");
  const [sendCurrencyCode, setSendCurrencyCode] = useState("USD");

  const [receiveAmount, setReceiveAmount] = useState("400");
  const [receiveCurrencyCode, setReceiveCurrencyCode] = useState("EUR");

  const [isActionActive, setIsActionActive] = useState(false);

  const conversionRate = useMemo(() => {
    // TODO: implement conversion rate calculation
    return `${sendAmount} ${sendCurrencyCode} = ${receiveAmount} ${receiveCurrencyCode}`;
  }, [sendAmount, sendCurrencyCode, receiveAmount, receiveCurrencyCode]);

  const handleSwap = () => {
    setSendCurrencyCode(receiveCurrencyCode);
    setReceiveCurrencyCode(sendCurrencyCode);
    setSendAmount(receiveAmount);
    setReceiveAmount(sendAmount);
  };

  const handleActionActive = () => {
    // TODO: implement action active
    setIsActionActive(!isActionActive);
  };

  const handleLogConversion = () => {
    // TODO: implement log conversion
  };

  return (
    <CurrencyExchangeView
      sendAmount={sendAmount}
      setSendAmount={setSendAmount}
      sendCurrencyCode={sendCurrencyCode}
      setSendCurrencyCode={setSendCurrencyCode}
      receiveAmount={receiveAmount}
      setReceiveAmount={setReceiveAmount}
      receiveCurrencyCode={receiveCurrencyCode}
      setReceiveCurrencyCode={setReceiveCurrencyCode}
      currencyGroups={CURRENCY_GROUPS}
      conversionRate={conversionRate}
      isActionActive={isActionActive}
      onSwap={handleSwap}
      onActionActive={handleActionActive}
      onLogConversion={handleLogConversion}
    />
  );
}
