import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { useCompareRates } from "./useCompareRates";
import { CurrencyCode } from "@/shared/types/CurrencyCode";

export function useCompareData() {
  const baseCurrency = useExchangeStore((state) => state.sendCurrencyCode);
  const globalFavorites = useExchangeStore((state) => state.favorites);
  const toggleGlobalFavorite = useExchangeStore(
    (state) => state.toggleFavorite,
  );

  const favoriteCodesSet = useMemo(() => {
    const targetsForBase = globalFavorites.reduce<CurrencyCode[]>(
      (acc, pair) => {
        if (pair.startsWith(`${baseCurrency}-`)) {
          acc.push(pair.split("-")[1]);
        }
        return acc;
      },
      [],
    );

    return new Set<CurrencyCode>(targetsForBase);
  }, [globalFavorites, baseCurrency]);

  const {
    data: pairs = [],
    isLoading,
    isError,
    refetch,
  } = useCompareRates(baseCurrency, favoriteCodesSet);

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
    isLoading,
    isError,
    refetch,
    toggleFavorite: handleToggleFavorite,
  };
}
