import { useQuery } from "@tanstack/react-query";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { Timeframe } from "@/shared/types/UITimeframe";

export interface HistoricalChartPoint {
  readonly date: string;
  readonly rate: number;
}

export interface HistoricalDataMetrics {
  readonly points: readonly HistoricalChartPoint[];
  readonly metrics: {
    readonly open: number;
    readonly last: number;
    readonly change: number;
    readonly percentageChange: number;
  };
}

interface FrankfurterV2Rate {
  readonly date: string;
  readonly base: string;
  readonly quote: string;
  readonly rate: number;
}

export function calculateDateRange(timeframe: Timeframe): {
  readonly startDate: string;
  readonly endDate: string;
} {
  const endDate = new Date();
  const startDate = new Date();

  switch (timeframe) {
    case "1D":
      startDate.setDate(endDate.getDate() - 4);
      break;
    case "1W":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "1M":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "3M":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "1Y":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "5Y":
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
  }

  const format = (date: Date): string => date.toISOString().split("T")[0];

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
}

export function useHistoricalRates() {
  const sendCurrencyCode = useExchangeStore((s) => s.sendCurrencyCode);
  const receiveCurrencyCode = useExchangeStore((s) => s.receiveCurrencyCode);
  const timeframe = useExchangeStore((s) => s.timeframe);

  const { startDate, endDate } = calculateDateRange(timeframe);
  const isSameCurrency = sendCurrencyCode === receiveCurrencyCode;

  return useQuery<HistoricalDataMetrics>({
    queryKey: [
      "historicalRates",
      sendCurrencyCode,
      receiveCurrencyCode,
      timeframe,
    ],

    queryFn: async () => {
      const url = `https://api.frankfurter.dev/v2/rates?from=${startDate}&to=${endDate}&base=${sendCurrencyCode}&quotes=${receiveCurrencyCode}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Frankfurter v2 HTTP Error: ${response.status} ${response.statusText}`,
        );
      }

      const data: readonly FrankfurterV2Rate[] = await response.json();

      if (!data || data.length === 0) {
        return {
          points: [],
          metrics: { open: 1, last: 1, change: 0, percentageChange: 0 },
        };
      }

      const points: readonly HistoricalChartPoint[] = data.map((item) => ({
        date: item.date,
        rate: item.rate,
      }));

      const open = points[0].rate;
      const last = points.at(-1)!.rate;
      const change = last - open;
      const percentageChange = (change / open) * 100;

      return {
        points,
        metrics: {
          open,
          last,
          change,
          percentageChange,
        },
      };
    },

    enabled: !isSameCurrency,
    staleTime: 1000 * 60 * 60,
  });
}
