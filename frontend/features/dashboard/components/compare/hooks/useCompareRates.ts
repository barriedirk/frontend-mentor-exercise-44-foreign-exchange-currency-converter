import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import {
  FrankfurterRateItem,
  FrankfurterCurrencyMeta,
} from "@/shared/api/types";
import { CurrencyPairRate } from "../types";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

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
        queryKey: ["currencies", "map"],
        queryFn: async () => {
          const { data } =
            await apiClient.get<FrankfurterCurrencyMeta[]>("/currencies");
          return data.reduce((acc, curr): Record<string, string> => {
            acc[curr.iso_code] = curr.name;
            return acc;
          }, {});
        },
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
