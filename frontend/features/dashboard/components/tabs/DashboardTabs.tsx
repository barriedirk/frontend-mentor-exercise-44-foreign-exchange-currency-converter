"use client";

import { useEffect, useState } from "react";
import { DashboardTabsMobileView } from "./DashboardTabsMobileView";
import { DashboardTabsView } from "./DashboardTabsView";
import HistoryChart from "../history-chart/HistoryChart";
import { Compare } from "../compare/Compare";

type TabId = "history" | "compare" | "favorites" | "log";

interface TabItem {
  id: TabId;
  label: string;
  badge?: number;
}

const TABS_CONFIG: readonly TabItem[] = [
  { id: "history", label: "History" },
  { id: "compare", label: "Compare" },
  { id: "favorites", label: "Favorites", badge: 10 },
  { id: "log", label: "Log", badge: 8 },
] as const;

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("compare");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia("(max-width: 639px)");

    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="w-full flex flex-col gap-[var(--spacing-100)]">
      <div aria-hidden={!isMobile}>
        <DashboardTabsMobileView
          tabItems={TABS_CONFIG}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div aria-hidden={isMobile}>
        <DashboardTabsView
          tabItems={TABS_CONFIG}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      <div className="mt-5">
        {activeTab === "history" && <HistoryChart />}
        {activeTab === "compare" && <Compare />}
        {activeTab === "favorites" && <div>Favorites Panel Content</div>}
        {activeTab === "log" && <div>Log Panel Content</div>}
      </div>
    </div>
  );
}
