"use client";

import { useState } from "react";
import { AmountInput } from "@/shared/ui/AmountInput";

export function InteractiveAmountWrapper() {
  const [amount, setAmount] = useState<string>("1000");

  return (
    <div className="w-full">
      <AmountInput value={amount} onChange={setAmount} />
      <p className="text-preset-5 text-text-muted mt-[0.5rem] font-mono">
        Raw value in state:{" "}
        <span className="text-brand">{amount || "empty"}</span>
      </p>
    </div>
  );
}
