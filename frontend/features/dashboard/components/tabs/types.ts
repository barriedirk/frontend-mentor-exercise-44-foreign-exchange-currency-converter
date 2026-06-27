export type TabId = "history" | "compare" | "favorites" | "log";

export interface TabItem {
  id: TabId;
  label: string;
  badge?: number;
}
