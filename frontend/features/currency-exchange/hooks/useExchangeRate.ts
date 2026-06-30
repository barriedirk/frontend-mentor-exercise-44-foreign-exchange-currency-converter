import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterSingleRateResponse } from "@/shared/api/types";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

export function useExchangeRate(
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
) {
  const isSameCurrency = fromCurrency === toCurrency;

  return useQuery<number>({
    queryKey: ["rates", "single", fromCurrency, toCurrency],
    queryFn: async (): Promise<number> => {
      if (isSameCurrency) return 1;

      const { data } = await apiClient.get<FrankfurterSingleRateResponse>(
        `/rate/${fromCurrency}/${toCurrency}`,
      );
      return data.rate;
    },
    enabled: !!fromCurrency && !!toCurrency,
    staleTime: 1000 * 60 * 2,
  });
}
