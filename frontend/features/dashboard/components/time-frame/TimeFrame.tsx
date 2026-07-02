"use client";

import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { TimeframeTabs } from "@/shared/components/TimeframeTabs";

export default function Timeframe() {
  const timeframe = useExchangeStore((state) => state.timeframe);
  const setTimeframe = useExchangeStore((state) => state.setTimeframe);

  return (
    <TimeframeTabs
      activeTab={timeframe}
      onChange={(newRange) => setTimeframe(newRange as any)}
    />
  );
}
