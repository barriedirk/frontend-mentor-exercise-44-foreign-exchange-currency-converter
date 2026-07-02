import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterCurrencyMeta } from "@/shared/api/types";
import { CurrencyGroup } from "@/domain/currency/currency";
import { CurrencyMetadata } from "@/shared/types/CurrencyMetadata";
import { POPULAR_CURRENCY_CODES } from "@/shared/constants/popularCurrencies";

export function useCurrencyGroups() {
  return useQuery<CurrencyGroup[]>({
    queryKey: ["currencies", "groups"],
    queryFn: async (): Promise<CurrencyGroup[]> => {
      const { data } =
        await apiClient.get<FrankfurterCurrencyMeta[]>("/currencies");

      const popular: CurrencyMetadata[] = [];
      const others: CurrencyMetadata[] = [];

      data.forEach((currency) => {
        const currencyMetadata: CurrencyMetadata = {
          code: currency.iso_code,
          name: currency.name,
          symbol: currency.symbol,
        };

        if (POPULAR_CURRENCY_CODES.includes(currencyMetadata.code)) {
          popular.push(currencyMetadata);
        } else {
          others.push(currencyMetadata);
        }
      });

      return [
        {
          id: "popular-currencies",
          title: "POPULAR",
          currencies: popular,
        },
        {
          id: "other-currencies",
          title: "OTHER CURRENCIES",
          currencies: others,
        },
      ];
    },
    staleTime: Infinity,
  });
}
