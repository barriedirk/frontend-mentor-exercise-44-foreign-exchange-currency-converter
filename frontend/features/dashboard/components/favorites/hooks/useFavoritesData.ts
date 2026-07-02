import { useQueries } from "@tanstack/react-query";
import { useExchangeStore } from "@/app/_store/useExchangeStore";

export interface FavoritePairData {
  readonly id: string;
  readonly fromCode: string;
  readonly toCode: string;
  readonly rate: number;
  readonly changePercent: number;
  readonly isFavorite: boolean;
}

interface FrankfurterV2Rate {
  readonly date: string;
  readonly rate: number;
}

export function useFavoritesData() {
  const favorites = useExchangeStore((s) => s.favorites);

  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 4);

  const format = (d: Date) => d.toISOString().split("T")[0];

  const queries = useQueries({
    queries: favorites.map((pairId) => {
      const [fromCode, toCode] = pairId.split("-");

      return {
        queryKey: ["favoritePair", pairId],
        queryFn: async (): Promise<FavoritePairData> => {
          const url = `https://api.frankfurter.dev/v2/rates?from=${format(startDate)}&to=${format(endDate)}&base=${fromCode}&quotes=${toCode}`;
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error(`Failed to fetch pair ${pairId}`);
          }

          const data: readonly FrankfurterV2Rate[] = await response.json();

          if (!data || data.length === 0) {
            return {
              id: pairId,
              fromCode,
              toCode,
              rate: 0,
              changePercent: 0,
              isFavorite: true,
            };
          }

          const openRate = data[0].rate;
          const currentRate = data.at(-1)!.rate;
          const changePercent = ((currentRate - openRate) / openRate) * 100;

          return {
            id: pairId,
            fromCode,
            toCode,
            rate: currentRate,
            changePercent: Number(changePercent.toFixed(2)),
            isFavorite: true,
          };
        },
        staleTime: 1000 * 60 * 15, //  15 minutes
      };
    }),
  });

  const isLoading = queries.some((q) => q.isPending);
  const hasError = queries.some((q) => q.isError);

  const data = queries
    .map((q) => q.data)
    .filter((item): item is FavoritePairData => !!item);

  return {
    data,
    isLoading,
    hasError,
  };
}
