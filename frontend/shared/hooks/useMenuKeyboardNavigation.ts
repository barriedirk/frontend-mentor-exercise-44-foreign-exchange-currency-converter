import { useRef, KeyboardEvent, useEffect } from "react";

interface UseMenuKeyboardNavigationProps {
  itemCount: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function useMenuKeyboardNavigation({
  itemCount,
  isOpen,
  setIsOpen,
}: UseMenuKeyboardNavigationProps) {
  const containerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const listener = (e: globalThis.KeyboardEvent) => {
      handleKeyDown(e as unknown as KeyboardEvent<HTMLElement>);
    };

    container.addEventListener("keydown", listener);
    return () => container.removeEventListener("keydown", listener);
  }, [isOpen, itemCount]);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const currentIdx = itemRefs.current.findIndex(
      (el) => el === document.activeElement,
    );

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (isOpen) {
          const nextIdx = (currentIdx + 1) % itemCount;
          itemRefs.current[nextIdx]?.focus();
        } else {
          setIsOpen(true);
          setTimeout(() => itemRefs.current[0]?.focus(), 0);
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          const prevIdx = (currentIdx - 1 + itemCount) % itemCount;
          itemRefs.current[prevIdx]?.focus();
        }
        break;

      case "Home":
        e.preventDefault();
        if (isOpen) itemRefs.current[0]?.focus();
        break;

      case "End":
        e.preventDefault();
        if (isOpen) itemRefs.current[itemCount - 1]?.focus();
        break;

      case "Escape":
        if (isOpen) {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;

      case "Tab":
        if (isOpen) {
          setIsOpen(false);
        }
        break;

      default:
        break;
    }
  };

  const toggleMenu = (activeIdx?: number) => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      const focusIdx =
        activeIdx !== undefined && activeIdx !== -1 ? activeIdx : 0;
      setTimeout(() => itemRefs.current[focusIdx]?.focus(), 0);
    }
  };

  return {
    containerRef,
    triggerRef,
    itemRefs,
    toggleMenu,
  };
}
