"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Mock Data adaptado de la estructura de series de tiempo de la API (ej: USD/EUR)
const MOCK_CHART_DATA = [
  { date: "Apr 14", rate: 0.857 },
  { date: "Apr 17", rate: 0.851 },
  { date: "Apr 21", rate: 0.846 },
  { date: "Apr 24", rate: 0.8495 },
  { date: "Apr 28", rate: 0.843 },
  { date: "May 02", rate: 0.858 },
  { date: "May 06", rate: 0.8515 },
  { date: "May 10", rate: 0.8612 },
  { date: "May 14", rate: 0.853 },
];

interface MarketChartProps {
  readonly baseCurrency?: string;
  readonly quoteCurrency?: string;
}

export function MarketChart({
  baseCurrency = "USD",
  quoteCurrency = "EUR",
}: MarketChartProps) {
  // Obtenemos el último valor para el header del gráfico
  const latestRate = useMemo(() => {
    if (MOCK_CHART_DATA.length === 0) return 0;
    return MOCK_CHART_DATA[MOCK_CHART_DATA.length - 1].rate;
  }, []);

  return (
    <section
      aria-label="Market historical trend chart"
      className="w-full bg-neutral-950 p-[1.5rem] rounded-12 border border-border-subtle font-mono flex flex-col gap-[1.5rem]"
    >
      {/* HEADER DEL GRÁFICO */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-[0.25rem]">
          <h2 className="text-[1rem] font-bold text-text-primary tracking-wider uppercase">
            {baseCurrency}/{quoteCurrency}
          </h2>
        </div>
        <div className="flex flex-col items-end gap-[0.25rem]">
          <span className="text-[1.125rem] font-bold text-brand tracking-tight">
            {latestRate.toFixed(4)}
          </span>
          <span className="text-[0.75rem] text-text-muted uppercase tracking-wider">
            May 14 16:00 CET
          </span>
        </div>
      </div>

      {/* CONTENEDOR DEL GRÁFICO */}
      <div className="w-full h-[300px] -ml-[1.5rem] sm:-ml-[2rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={MOCK_CHART_DATA}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              {/* 💡 GRADIENTE PERSONALIZADO: Aplica el color brand arriba y se desvanece a 0 opacidad abajo */}
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-brand, #bef264)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-brand, #bef264)"
                  stopOpacity={0.0}
                />
              </linearGradient>
            </defs>

            {/* EJE X */}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              stroke="var(--color-text-muted, #737373)"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
              dy={10}
            />

            {/* EJE Y */}
            <YAxis
              domain={["dataMin - 0.005", "dataMax + 0.005"]}
              orientation="left"
              tickLine={false}
              axisLine={false}
              stroke="var(--color-text-muted, #737373)"
              style={{ fontSize: "0.75rem", fontFamily: "monospace" }}
              dx={-10}
              tickCount={4}
            />

            {/* TOOLTIP INTERACTIVO */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                borderColor: "var(--color-border-subtle, #1f1f1f)",
                borderRadius: "8px",
                fontFamily: "monospace",
              }}
              labelStyle={{ color: "var(--color-text-muted)" }}
              itemStyle={{ color: "var(--color-brand)" }}
            />

            {/* ÁREA DEL GRÁFICO */}
            <Area
              type="monotone"
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
