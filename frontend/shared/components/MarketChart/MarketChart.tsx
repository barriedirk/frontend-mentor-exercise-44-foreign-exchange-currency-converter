"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { MarketChartBase } from "@/shared/types/MarketChartRate";
import { cn } from "@/shared/utils/cn";

const RechartsRenderEngine = dynamic(
  () =>
    import("@/shared/ui/RechartsRenderEngine").then(
      (mod) => mod.RechartsRenderEngine,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full animate-pulse bg-neutral-800/20 rounded-12" />
    ),
  },
);

const EMPTY_CHART_DATA: any[] = [];

interface MarketChartProps extends MarketChartBase {
  readonly className?: string;
  readonly updatedAt?: string;
}

export function MarketChart({
  baseCurrency,
  quoteCurrency,
  updatedAt = "Just now",
  className,
  data = EMPTY_CHART_DATA,
}: MarketChartProps) {
  const latestRate = useMemo(() => {
    if (data.length === 0) return 0;

    return data.at(-1)?.rate ?? 0;
  }, [data]);

  return (
    <section
      aria-label={`Market historical trend chart - ${baseCurrency}/${quoteCurrency}`}
      aria-describedby="chart-summary-data"
      className={cn(
        "w-full bg-surface-main p-[1.5rem] rounded-12 border border-border-subtle font-mono flex flex-col gap-[1.5rem]",
        className,
      )}
    >
      <div id="chart-summary-data" className="sr-only">
        base/quote: {baseCurrency}/{quoteCurrency} - last Rate:{" "}
        {latestRate.toFixed(4)} - updated at: {updatedAt}
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="text-preset-3 font-bold text-text-primary tracking-wider uppercase">
            {baseCurrency}/{quoteCurrency}
          </h2>
        </div>
        <div className="flex flex-row items-end gap-2 text-neutral-200 text-preset-5 ">
          <span className="font-bold tracking-tight">
            {latestRate.toFixed(4)}
          </span>
          <span aria-hidden="true" className="text-primary">
            ·
          </span>
          <span className="uppercase tracking-wider">{updatedAt}</span>
        </div>
      </div>

      <div className="w-full h-[300px] -ml-[0.5rem] sm:-ml-[2rem]">
        <RechartsRenderEngine data={data} />
      </div>
    </section>
  );
}
