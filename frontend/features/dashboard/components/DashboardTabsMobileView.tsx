"use client";

import { Dispatch, SetStateAction, useId, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { TabId, TabItem } from "./types";

interface DashboardTabsMobileViewProps {
  readonly tabItems: readonly TabItem[];
  readonly activeTab: TabId;
  readonly setActiveTab: Dispatch<SetStateAction<TabId>>;
}
export function DashboardTabsMobileView({
  tabItems,
  activeTab,
  setActiveTab,
}: DashboardTabsMobileViewProps) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonId = useId();
  const menuId = useId();

  const currentTabLabel = tabItems.find((tab) => tab.id === activeTab)?.label;

  return (
    <div className="relative w-full sm:hidden px-[var(--spacing-300)] py-[var(--spacing-200)]">
      <button
        id={buttonId}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label="Select dashboard tab"
        className="w-full h-[40px] px-[var(--spacing-300)] bg-neutral-700 border border-border-subtle rounded-8 flex items-center justify-between text-preset-5 text-text-primary uppercase font-bold tracking-wider"
      >
        <span>{currentTabLabel}</span>
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Listado desplegable */}
      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className="absolute left-[var(--spacing-300)] right-[var(--spacing-300)] mt-[var(--spacing-050)] bg-neutral-700 border border-border-subtle rounded-8 overflow-hidden z-50 shadow-xl divide-y divide-border-subtle"
        >
          {tabItems.map((tab) => (
            <li key={tab.id}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-[var(--spacing-300)] py-[var(--spacing-200)] text-left text-preset-5 uppercase tracking-wider flex items-center justify-between",
                  tab.id === activeTab
                    ? "text-brand font-bold bg-neutral-600"
                    : "text-text-secondary",
                )}
              >
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="text-preset-6 px-[6px] py-[2px] rounded-full bg-brand-muted text-brand font-bold tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}
