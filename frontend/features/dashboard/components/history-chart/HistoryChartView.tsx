"use client";

import Timeframe from "../time-frame/TimeFrame";
import { MarketStatCard } from "@/shared/components/MarketStatCard";
import { SandboxStat } from "./types";
import { MarketChart } from "@/shared/components/MarketChart/MarketChart";
import { MarketChartBase } from "@/shared/types/MarketChartRate";
import { formatToCETStyle } from "@/shared/utils/formatToCETStyle";

interface HistoryChartViewProps {
  readonly sandboxStats: readonly SandboxStat[];
  readonly chartData: MarketChartBase;
}

export default function HistoryChartView({
  sandboxStats,
  chartData,
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
      <div className="border border-border-subtle rounded-12 overflow-hidden">
        <MarketChart updatedAt={formatToCETStyle(new Date())} {...chartData} />
      </div>
    </section>
  );
}
