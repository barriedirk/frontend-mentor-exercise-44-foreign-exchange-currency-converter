import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterRateItem } from "@/shared/api/types";
import {
  currenciesMapQueryKey,
  fetchCurrenciesMap,
} from "@/shared/api/queries/currenciesMap";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface CurrencyPairRate {
  currency: {
    code: CurrencyCode;
    name: string;
  };
  rate: number;
  isFavorite: boolean;
}

export function useCompareRates(
  baseCurrency: CurrencyCode,
  favoriteCodes: Set<CurrencyCode>,
) {
  const queryClient = useQueryClient();

  return useQuery<CurrencyPairRate[]>({
    queryKey: ["rates", "compare", baseCurrency],
    queryFn: async (): Promise<CurrencyPairRate[]> => {
      const currenciesMap = await queryClient.ensureQueryData<
        Record<string, string>
      >({
        queryKey: currenciesMapQueryKey,
        queryFn: fetchCurrenciesMap,
        staleTime: Infinity,
      });

      const { data } = await apiClient.get<FrankfurterRateItem[]>("/rates", {
        params: { base: baseCurrency },
      });

      return data.map((item): CurrencyPairRate => {
        const targetCode = item.quote;

        return {
          currency: {
            code: targetCode,
            name: currenciesMap[targetCode] || "Unknown Currency",
          },
          rate: item.rate,
          isFavorite: favoriteCodes.has(targetCode),
        };
      });
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
