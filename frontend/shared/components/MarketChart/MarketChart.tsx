"use client";

import { useMemo } from "react";

import { MarketChartBase } from "@/shared/types/MarketChartRate";
import { cn } from "@/shared/utils/cn";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MarketChartProps extends MarketChartBase {
  readonly className?: string;
  readonly updatedAt?: string;
}

export function MarketChart({
  baseCurrency,
  quoteCurrency,
  updatedAt = "Just now",
  className,
  data = [],
}: MarketChartProps) {
  const latestRate = useMemo(() => {
    if (data.length === 0) return 0;

    return data.at(-1)?.rate ?? 0;
  }, [data]);

  return (
    <section
      aria-label={`Market historical trend chart - ${baseCurrency}/${quoteCurrency}`}
      className={cn(
        "w-full bg-neutral-950 p-[1.5rem] rounded-12 border border-border-subtle font-mono flex flex-col gap-[1.5rem]",
        className,
      )}
    >
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
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand, #bef264)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand, #bef264)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="var(--color-text-secondary, #737373)"
              style={{
                fontSize: "0.625rem",
                fontFamily: "JetBrains Mono, monospace",
              }}
              dy={10}
            />

            <YAxis
              domain={["dataMin - 0.005", "dataMax + 0.005"]}
              orientation="left"
              tickLine={false}
              axisLine={false}
              stroke="var(--color-text-secondary, #737373)"
              style={{
                fontSize: "0.625rem",
                fontFamily: "JetBrains Mono, monospace",
              }}
              dx={-10}
              tickCount={4}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                borderColor: "var(--color-border-subtle, #1f1f1f)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "10px",
              }}
              labelStyle={{ color: "var(--color-text-muted)" }}
              itemStyle={{ color: "var(--color-brand)" }}
            />

            <Area
              type="linear"
              dataKey="rate"
              stroke="var(--color-brand, #bef264)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
