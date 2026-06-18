"use client";

import { MarketStatCard } from "@/shared/components/MarketStatCard";

export default function MarketStatsWrapper() {
  const sandboxStats = [
    {
      label: "Open",
      value: "0.8516",
      trend: "neutral" as const,
    },
    {
      label: "Last",
      value: "0.8530",
      trend: "neutral" as const,
    },
    {
      label: "Change",
      value: "+0.0014",
      trend: "up" as const,
    },
    {
      label: "% Change",
      value: "-0.12%",
      trend: "down" as const, // Forzado a negativo para testing de color rojo
    },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 p-[2rem] flex flex-col gap-[2rem]">
      <div className="border-b border-neutral-800 pb-[1rem]">
        <h1 className="text-text-primary font-mono text-[1.5rem] uppercase tracking-wider">
          MarketStatCard Testing Environment
        </h1>
        <p className="text-text-muted font-mono text-[0.875rem] mt-[0.25rem]">
          Testing flexible row layout, semantic colors, and font-mono alignment.
        </p>
      </div>

      <div className="w-full max-w-[1200px] bg-[#0A0A0A] p-[1.5rem] rounded-12 border border-neutral-900">
        <div className="w-full flex items-center justify-between gap-[1rem] flex-wrap">
          {sandboxStats.map((stat) => (
            <MarketStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[1rem] max-w-[300px]">
        <h2 className="text-text-muted font-mono text-[0.75rem] uppercase tracking-widest">
          Individual Variants
        </h2>
        <MarketStatCard
          label="Static Neutral"
          value="1,244.50"
          trend="neutral"
        />
        <MarketStatCard label="Bullish Market" value="+15.43%" trend="up" />
        <MarketStatCard label="Bearish Market" value="-4.21%" trend="down" />
      </div>
    </div>
  );
}
