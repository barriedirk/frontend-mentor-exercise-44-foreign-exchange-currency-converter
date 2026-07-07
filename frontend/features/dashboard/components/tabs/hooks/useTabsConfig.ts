import { useMemo } from "react";
import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { TabItem } from "../types";
import { useTranslations } from "next-intl";

export function useTabsConfig() {
  const t = useTranslations("Dashboard.Tabs");
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
        label: t("history"),
      },
      {
        id: "compare",
        label: t("compare"),
        badge: compareFavoritesCount > 0 ? compareFavoritesCount : undefined,
      },
      {
        id: "favorites",
        label: t("favorites"),
        badge: favorites.length > 0 ? favorites.length : undefined,
      },
      {
        id: "log",
        label: t("log"),
        badge: logCount > 0 ? logCount : undefined,
      },
    ] as const;
  }, [favorites.length, compareFavoritesCount, logCount, t]);

  return tabsConfig;
}
