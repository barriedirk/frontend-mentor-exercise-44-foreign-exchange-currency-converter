"use client";

import { MarketStatCard } from "@/shared/components/MarketStatCard";
import { SandboxStat } from "./types";
import Timeframe from "../time-frame/TimeFrame";
import { MarketChart } from "../market-chart/MarketChart";

interface HistoryChartViewProps {
  readonly sandboxStats: readonly SandboxStat[];
}

export default function HistoryChartView({
  sandboxStats,
}: HistoryChartViewProps) {
  return (
    <section
      aria-label="History Chart section"
      className="w-full flex flex-col gap-[var(--spacing-300)]"
    >
      <div className="w-full flex flex-col md:flex-row gap-[var(--spacing-300)]">
        <div className="flex-1 md:basis-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sandboxStats.map((stat) => (
            <MarketStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </div>
        <div className="flex-1 md:basis-1/3 items-center flex md:justify-end">
          <Timeframe />
        </div>
      </div>
      <div>
        <MarketChart />
      </div>
    </section>
  );
}
