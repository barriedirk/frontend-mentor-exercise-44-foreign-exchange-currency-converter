import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import HistoryChartView from "./HistoryChartView";
import { useHistoricalRates } from "./hooks/useHistoricalRates";
import { MarketChartBase, SandboxStat } from "./types";
import HistoryChartSkeleton from "./HistoryChartSkeleton";

export default function HistoryChart() {
  const sendCurrencyCode = useExchangeStore((s) => s.sendCurrencyCode);
  const receiveCurrencyCode = useExchangeStore((s) => s.receiveCurrencyCode);
  const { data, isPending, error } = useHistoricalRates();

  const chartData = useMemo<MarketChartBase | null>(() => {
    if (!data?.points) return null;

    const formattedPoints = data.points.map((point) => {
      const dateObj = new Date(`${point.date}T00:00:00`);
      const formattedDate = Number.isNaN(dateObj.getTime())
        ? point.date
        : dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });

      return {
        date: formattedDate,
        rate: point.rate,
      };
    });

    return {
      baseCurrency: sendCurrencyCode,
      quoteCurrency: receiveCurrencyCode,
      data: formattedPoints,
    };
  }, [data?.points, sendCurrencyCode, receiveCurrencyCode]);

  const stats = useMemo<SandboxStat[]>(() => {
    if (!data?.metrics) return [];

    const { open, last, change, percentageChange } = data.metrics;

    let trend: "up" | "down" | "neutral" = "neutral";
    if (change > 0) trend = "up";
    if (change < 0) trend = "down";

    const changePrefix = change > 0 ? "+" : "";

    return [
      {
        label: "Open",
        value: open.toFixed(4),
        trend: "neutral",
      },
      {
        label: "Last",
        value: last.toFixed(4),
        trend: "neutral",
      },
      {
        label: "Change",
        value: `${changePrefix}${change.toFixed(4)}`,
        trend,
      },
      {
        label: "% Change",
        value: `${changePrefix}${percentageChange.toFixed(2)}%`,
        trend,
      },
    ];
  }, [data?.metrics]);

  if (isPending) {
    return <HistoryChartSkeleton />;
  }

  if (error || sendCurrencyCode === receiveCurrencyCode) {
    return (
      <div className="p-6 text-center text-sm text-red-500">
        {error
          ? "Failed to load market history."
          : "Select different currencies to view historical data."}
      </div>
    );
  }

  if (!chartData) return null;

  return <HistoryChartView sandboxStats={stats} chartData={chartData} />;
}
