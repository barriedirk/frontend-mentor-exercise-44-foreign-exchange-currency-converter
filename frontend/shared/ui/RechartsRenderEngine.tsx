"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface RechartsRenderEngineProps {
  readonly data: readonly any[];
}

export function RechartsRenderEngine({ data }: RechartsRenderEngineProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data as any[]}
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
            fontSize: "0.75rem", // 12px cumpliendo la regla de accesibilidad
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
            fontSize: "0.75rem", // 12px cumpliendo la regla de accesibilidad
            fontFamily: "JetBrains Mono, monospace",
          }}
          dx={-10}
          tickCount={4}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-background, #0a0a0a)",
            borderColor: "var(--color-border-subtle, #1f1f1f)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.75rem",
          }}
          labelStyle={{ color: "var(--color-text-accent)" }}
          itemStyle={{ color: "var(--color-text-primary)" }}
        />

        <Area
          type="linear"
          dataKey="rate"
          stroke="var(--color-border-accent, #bef264)"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#chartGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
