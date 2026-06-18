import * as React from "react";
import { cn } from "@/shared/utils/cn";

interface SwapButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> {}

export function SwapButton({ className, ...props }: SwapButtonProps) {
  return (
    <button
      type="button"
      aria-label="Swap currencies"
      className={cn(
        "size-[2.5rem] flex items-center justify-center rounded-full shrink-0 border select-none cursor-pointer outline-none transition-all duration-200",
        "bg-neutral-900 border-neutral-800 text-text-muted",
        "hover:text-text-primary hover:border-neutral-700 hover:bg-neutral-800",
        "focus-visible:ring-1 focus-visible:ring-neutral-700 focus-visible:border-neutral-700",
        "active:scale-95 active:bg-neutral-800/80",
        className,
      )}
      {...props}
    >
      <svg
        className="size-[1.25rem] transition-transform duration-300 pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          d="M7 16V4m0 0L3 8m4-4l4 4m10 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </button>
  );
}
