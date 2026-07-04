import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { TabItem } from "../types";

export function useTabsConfig() {
  const baseCurrency = useExchangeStore((state) => state.sendCurrencyCode);
  const favorites = useExchangeStore((state) => state.favorites);
  const logCount = useExchangeStore((state) => state.logs.length);

  const compareFavoritesCount = useMemo(() => {
    return favorites.filter((pair) => pair.startsWith(`${baseCurrency}-`))
      .length;
  }, [favorites, baseCurrency]);

  const tabsConfig = useMemo<readonly TabItem[]>(() => {
    return [
      {
        id: "history",
        label: "History",
      },
      {
        id: "compare",
        label: "Compare",
        badge: compareFavoritesCount > 0 ? compareFavoritesCount : undefined,
      },
      {
        id: "favorites",
        label: "Favorites",
        badge: favorites.length > 0 ? favorites.length : undefined,
      },
      {
        id: "log",
        label: "Log",
        badge: logCount > 0 ? logCount : undefined,
      },
    ] as const;
  }, [favorites.length, compareFavoritesCount, logCount]);

  return tabsConfig;
}
