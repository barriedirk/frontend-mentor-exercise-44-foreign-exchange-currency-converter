import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { useCompareRates } from "./useCompareRates";
import { CurrencyPairRate } from "../types";

const SUPPORTED_CURRENCIES = [
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "BDT", name: "Bangladeshi Taka" },
] as const;

export function useCompareData() {
  const baseCurrency = useExchangeStore((state) => state.sendCurrencyCode);
  const globalFavorites = useExchangeStore((state) => state.favorites);
  const toggleGlobalFavorite = useExchangeStore(
    (state) => state.toggleFavorite,
  );

  const mockRates: Record<string, number> = {
    GBP: 0.7366,
    JPY: 157.91,
    CHF: 0.9098,
    CAD: 1.3815,
    AUD: 1.3874,
    INR: 94.91,
    CNY: 7.21,
    BDT: 122.92,
  };

  const pairs = useMemo<readonly CurrencyPairRate[]>(() => {
    return SUPPORTED_CURRENCIES.map((currency) => {
      const pairToken = `${baseCurrency}-${currency.code}`;

      return {
        currency: currency,
        rate: mockRates[currency.code] ?? 1,
        isFavorite: globalFavorites.includes(pairToken),
      };
    });
  }, [baseCurrency, globalFavorites]);

  const handleToggleFavorite = (targetCurrencyCode: string) => {
    const pairToken = `${baseCurrency}-${targetCurrencyCode}`;
    toggleGlobalFavorite(pairToken);
  };

  return {
    conversion: {
      baseAmount: 1000,
      baseCurrency,
    },
    pairs,
    toggleFavorite: handleToggleFavorite,
  };
}
