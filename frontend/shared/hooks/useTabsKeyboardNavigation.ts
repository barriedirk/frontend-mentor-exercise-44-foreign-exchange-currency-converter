import { useRef, useEffect } from "react";

interface UseTabsKeyboardNavigationProps {
  itemCount: number;
  activeIdx: number;
  onTabChange: (index: number) => void;
}

export function useTabsKeyboardNavigation({
  itemCount,
  activeIdx,
  onTabChange,
}: UseTabsKeyboardNavigationProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const tabList = tabListRef.current;
    if (!tabList) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let nextIdx: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          nextIdx = (activeIdx + 1) % itemCount;
          break;

        case "ArrowLeft":
          e.preventDefault();
          nextIdx = (activeIdx - 1 + itemCount) % itemCount;
          break;

        case "Home":
          e.preventDefault();
          nextIdx = 0;
          break;

        case "End":
          e.preventDefault();
          nextIdx = itemCount - 1;
          break;

        default:
          break;
      }

      if (nextIdx !== null) {
        onTabChange(nextIdx);
        setTimeout(() => tabRefs.current[nextIdx]?.focus(), 0);
      }
    };

    tabList.addEventListener("keydown", handleKeyDown);

    return () => tabList.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, itemCount, onTabChange]);

  return {
    tabListRef,
    tabRefs,
  };
}
