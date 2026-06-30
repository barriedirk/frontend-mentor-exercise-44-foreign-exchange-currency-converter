import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterCurrencyMeta } from "@/shared/api/types";
import { CurrencyGroup } from "@/domain/currency/currency";

export function useCurrencyGroups() {
  return useQuery<CurrencyGroup[]>({
    queryKey: ["currencies", "groups"],
    queryFn: async (): Promise<CurrencyGroup[]> => {
      const { data } =
        await apiClient.get<FrankfurterCurrencyMeta[]>("/currencies");

      return [
        {
          id: "active-currencies",
          title: "Available Currencies",
          currencies: data.map((c) => ({
            code: c.iso_code,
            name: c.name,
            symbol: c.symbol,
          })),
        },
      ];
    },
    staleTime: Infinity, // Los metadatos de monedas no cambian en producción; se congelan en caché.
  });
}
