"use client";

import { Dispatch, SetStateAction } from "react";
import { cn } from "@/shared/utils/cn";
import { TabId, TabItem } from "./types";

interface DashboardTabsViewProps {
  readonly tabItems: readonly TabItem[];
  readonly activeTab: TabId;
  readonly setActiveTab: Dispatch<SetStateAction<TabId>>;
}

export function DashboardTabsView({
  tabItems,
  activeTab,
  setActiveTab,
}: DashboardTabsViewProps) {
  return (
    <div className="hidden sm:flex items-center w-full border-b border-border-subtle px-[var(--spacing-400)]">
      <nav
        className="flex gap-[var(--spacing-400)]"
        aria-label="Dashboard navigation tabs"
      >
        {tabItems.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabId = `tab-${tab.id}`;
          const panelId = `panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-[var(--spacing-300)] text-preset-4 uppercase tracking-wider font-bold transition-all flex items-center gap-[var(--spacing-100)] border-b-2",
                isActive
                  ? "border-brand text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary",
              )}
            >
              <span>{tab.label}</span>

              {tab.badge !== undefined && (
                <span
                  aria-label={`${tab.badge} items`}
                  className={cn(
                    "text-preset-6 px-[6px] py-[2px] rounded-full font-bold tabular-nums transition-colors",
                    isActive
                      ? "bg-brand text-neutral-950"
                      : "bg-neutral-500 text-text-secondary",
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
