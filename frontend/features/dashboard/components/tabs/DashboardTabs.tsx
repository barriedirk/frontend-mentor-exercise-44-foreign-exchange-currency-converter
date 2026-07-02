"use client";

import { useEffect, useState } from "react";
import { DashboardTabsMobileView } from "./DashboardTabsMobileView";
import { DashboardTabsView } from "./DashboardTabsView";
import HistoryChart from "../history-chart/HistoryChart";
import { Compare } from "../compare/Compare";
import { Favorites } from "../favorites/Favorites";
import { Log } from "../log/Log";
import { TabId } from "./types";
import { TABS_CONFIG } from "./constant";

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("history");
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
        {activeTab === "favorites" && <Favorites />}
        {activeTab === "log" && <Log />}
      </div>
    </div>
  );
}
