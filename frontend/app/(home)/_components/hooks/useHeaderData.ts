import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterRateItem } from "@/shared/api/types";

interface TickerItem {
  pair: string;
  rate: number;
  change: number;
  isPositive: boolean;
}

/**
 * Función pura extraída fuera del componente.
 * Resuelve el bache de SonarQube al aplanar la lógica y usar un bucle imperativo.
 */
function calculateNextModifiers(
  prev: Record<string, number>,
): Record<string, number> {
  const next = { ...prev };

  // 'for...of' es una estructura de control, NO una función. Anidamiento = 0.
  for (const key of Object.keys(next)) {
    const jitter = (Math.random() - 0.5) * 0.04;
    next[key] = Number((next[key] + jitter).toFixed(2));
  }

  return next;
}

export function useHeaderData() {
  const queryClient = useQueryClient();

  const currenciesCache = queryClient.getQueryData<Record<string, string>>([
    "currencies",
    "map",
  ]);
  const totalCurrencies = currenciesCache
    ? Object.keys(currenciesCache).length
    : 0;

  const { data: rawRates } = useQuery({
    queryKey: ["rates", "ticker"],
    queryFn: async () => {
      const { data } = await apiClient.get<FrankfurterRateItem[]>("/rates", {
        params: { base: "USD" },
      });
      return data.filter((item) => ["EUR", "JPY", "GBP"].includes(item.quote));
    },
    staleTime: 1000 * 60 * 30,
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
    isLoading: !rawRates,
  };
}
