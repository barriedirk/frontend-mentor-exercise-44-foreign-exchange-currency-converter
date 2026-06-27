"use client";

import { Dispatch, SetStateAction, useId, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { TabId, TabItem } from "./types";
import { useMenuKeyboardNavigation } from "@/shared/hooks/useMenuKeyboardNavigation";

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

  const { containerRef, triggerRef, itemRefs, toggleMenu } =
    useMenuKeyboardNavigation({
      itemCount: tabItems.length,
      isOpen,
      setIsOpen,
    });

  const currentTabLabel = tabItems.find((tab) => tab.id === activeTab)?.label;
  const activeIdx = tabItems.findIndex((tab) => tab.id === activeTab);

  return (
    <nav
      ref={containerRef}
      className="relative w-full sm:hidden border border-[var(--color-border-focus)] rounded-8"
      aria-label="Dashboard mobile navigation"
    >
      <button
        id={buttonId}
        ref={triggerRef}
        onClick={() => toggleMenu(activeIdx)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label="Select dashboard tab"
        className="w-full h-[40px] px-[var(--spacing-300)] bg-neutral-700 border border-border-subtle rounded-8 flex items-center justify-between text-preset-5 text-text-primary uppercase font-bold tracking-wider"
      >
        <span className="text-preset-3 text-foreground">{currentTabLabel}</span>
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

      {isOpen && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className="absolute w-full left-0 right-0 mt-[var(--spacing-050)] bg-neutral-700 border border-border-subtle rounded-8 overflow-hidden z-50 shadow-xl divide-y divide-border-subtle"
        >
          {tabItems.map((tab, idx) => {
            const isActive = tab.id === activeTab;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                type="button"
                role="menuitem"
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsOpen(false);
                  triggerRef.current?.focus();
                }}
                className={cn(
                  "w-full px-[var(--spacing-300)] py-[var(--spacing-200)] text-left text-preset-5 uppercase tracking-wider flex items-center justify-between outline-none focus:bg-neutral-600",
                  isActive
                    ? "text-brand font-bold bg-neutral-600"
                    : "text-text-secondary",
                )}
              >
                <span className="text-preset-3">{tab.label}</span>
                {tab.badge !== undefined && (
                  <span className="text-preset-6 px-[6px] py-[2px] rounded-full bg-brand-muted text-brand font-bold tabular-nums">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
