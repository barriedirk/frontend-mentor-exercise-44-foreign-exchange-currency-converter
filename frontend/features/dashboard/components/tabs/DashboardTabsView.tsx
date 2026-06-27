"use client";

import { Dispatch, SetStateAction } from "react";
import { cn } from "@/shared/utils/cn";
import { TabId, TabItem } from "./types";
import { useTabsKeyboardNavigation } from "@/shared/hooks/useTabsKeyboardNavigation";

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
  const activeIdx = tabItems.findIndex((tab) => tab.id === activeTab);

  const { tabListRef, tabRefs } = useTabsKeyboardNavigation({
    itemCount: tabItems.length,
    activeIdx,
    onTabChange: (index) => {
      const targetTab = tabItems[index];
      if (targetTab) setActiveTab(targetTab.id);
    },
  });

  return (
    <div className="hidden sm:flex items-center w-full border-b border-border-subtle px-[var(--spacing-200)]">
      <div
        ref={tabListRef}
        role="tablist"
        className="flex gap-[var(--spacing-400)]"
        aria-label="Dashboard navigation tabs"
      >
        {tabItems.map((tab, idx) => {
          const isActive = tab.id === activeTab;
          const tabId = `tab-${tab.id}`;
          const panelId = `panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              id={tabId}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative py-[var(--spacing-300)] text-preset-3 uppercase tracking-wider font-bold transition-all flex items-center gap-[var(--spacing-100)] border-b-2",
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
      </div>
    </div>
  );
}
