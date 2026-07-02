import { TabItem } from "./types";

export const TABS_CONFIG: readonly TabItem[] = [
  { id: "history", label: "History" },
  { id: "compare", label: "Compare" },
  { id: "favorites", label: "Favorites", badge: 10 },
  { id: "log", label: "Log", badge: 8 },
] as const;
