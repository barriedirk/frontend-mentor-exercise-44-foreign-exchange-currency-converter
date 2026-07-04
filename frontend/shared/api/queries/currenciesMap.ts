import { apiClient } from "@/shared/api/apiClient";
import { FrankfurterCurrencyMeta } from "@/shared/api/types";

export const currenciesMapQueryKey = ["currencies", "map"] as const;

export async function fetchCurrenciesMap(): Promise<Record<string, string>> {
  const { data } =
    await apiClient.get<FrankfurterCurrencyMeta[]>("/currencies");

  return data.reduce((acc, curr): Record<string, string> => {
    acc[curr.iso_code] = curr.name;
    return acc;
  }, {});
}
