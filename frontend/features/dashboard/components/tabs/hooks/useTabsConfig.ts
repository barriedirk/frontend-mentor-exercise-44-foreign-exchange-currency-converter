import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { TabItem } from "../types";

export function useTabsConfig() {
  const favoritesCount = useExchangeStore((state) => state.favorites.length);
  const logCount = useExchangeStore((state) => state.history.length);

  const tabsConfig = useMemo<readonly TabItem[]>(() => {
    return [
      {
        id: "history",
        label: "History",
      },
      {
        id: "compare",
        label: "Compare",
      },
      {
        id: "favorites",
        label: "Favorites",
        badge: favoritesCount > 0 ? favoritesCount : undefined,
      },
      {
        id: "log",
        label: "Log",
        badge: logCount > 0 ? logCount : undefined,
      },
    ] as const;
  }, [favoritesCount, logCount]);

  return tabsConfig;
}
