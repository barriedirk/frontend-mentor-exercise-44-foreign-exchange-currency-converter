import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterRateItem } from "@/shared/api/types";
import {
  currenciesMapQueryKey,
  fetchCurrenciesMap,
} from "@/shared/api/queries/currenciesMap";
import { TickerItem } from "@/domain/currency/ticker";

function calculateNextModifiers(
  prev: Record<string, number>,
): Record<string, number> {
  const next = { ...prev };

  for (const key of Object.keys(next)) {
    const jitter = (Math.random() - 0.5) * 0.04;
    next[key] = Number((next[key] + jitter).toFixed(2));
  }

  return next;
}

export function useHeaderData() {
  const { data: currenciesMap } = useQuery({
    queryKey: currenciesMapQueryKey,
    queryFn: fetchCurrenciesMap,
    staleTime: Infinity,
  });

  const totalCurrencies = currenciesMap ? Object.keys(currenciesMap).length : 0;

  const { data: rawRates } = useQuery({
    queryKey: ["rates", "ticker"],
    queryFn: async () => {
      const { data } = await apiClient.get<FrankfurterRateItem[]>("/rates", {
        params: { base: "USD" },
      });
      return data.filter((item) => ["EUR", "JPY", "GBP"].includes(item.quote));
    },
    staleTime: 1000 * 60 * 30, // 30 minutos de caché para datos EOD
  });

  const [tickerModifiers, setTickerModifiers] = useState<
    Record<string, number>
  >({
    EUR: -0.14,
    JPY: 0.04,
    GBP: 0.15,
  });

  useEffect(() => {
    if (!rawRates) return;

    const interval = setInterval(() => {
      setTickerModifiers(calculateNextModifiers);
    }, 4000);

    return () => clearInterval(interval);
  }, [rawRates]);

  const tickerItems = useMemo<readonly TickerItem[]>(() => {
    if (!rawRates) return [];

    return rawRates.map((item) => {
      const code = item.quote;
      const baseRate = item.rate;
      const currentChange = tickerModifiers[code] ?? 0;
      const simulatedRate = baseRate * (1 + currentChange / 100);

      return {
        pair: `USD/${code}`,
        rate: Number(simulatedRate.toFixed(4)),
        change: Math.abs(currentChange),
        isPositive: currentChange >= 0,
      };
    });
  }, [rawRates, tickerModifiers]);

  return {
    totalCurrencies,
    tickerItems,
    isLoading: !currenciesMap || !rawRates,
  };
}
