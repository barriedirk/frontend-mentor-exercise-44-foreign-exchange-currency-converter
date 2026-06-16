import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const tabButtonVariants = cva(
  "inline-flex items-center gap-[0.75rem] bg-transparent text-text-primary font-mono text-preset-3-bold tracking-wider cursor-pointer select-none outline-none transition-all pb-[0.5rem] relative",
  {
    variants: {
      isActive: {
        true: "border-b-2 border-brand pb-[calc(0.5rem-2px)]",
        false: "border-b-2 border-transparent hover:text-text-secondary",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
);

export interface TabButtonProps
  extends
    Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>,
    Readonly<VariantProps<typeof tabButtonVariants>> {
  readonly label: string;
  readonly count?: number;
}

export function TabButton({
  className,
  isActive,
  label,
  count,
  ...props
}: TabButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        tabButtonVariants({ isActive }),
        "focus-visible:ring-2 focus-visible:ring-brand focus-visible:rounded-12 focus-visible:border-transparent px-[0.5rem] focus-visible:py-[0.5rem] focus-visible:my-[-0.5rem]",
        className,
      )}
      {...props}
    >
      <span className="uppercase">{label}</span>
      {typeof count === "number" && (
        <span
          className={cn(
            "inline-grid place-items-center min-w-[1.5rem] h-[1.5rem] rounded-full text-brand font-mono text-preset-4-bold px-[0.25rem]",
            "bg-brand/15",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
