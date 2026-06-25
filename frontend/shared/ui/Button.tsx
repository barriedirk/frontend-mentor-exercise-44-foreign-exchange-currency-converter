import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 font-mono uppercase tracking-wider transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30 cursor-pointer h-fit w-fit select-none rounded-8",
  {
    variants: {
      variant: {
        action:
          "bg-transparent text-text-primary border border-brand hover:bg-surface-hover active:bg-brand active:text-neutral-900 focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-surface-main rounded-[0.5rem]",
        actionActive:
          "bg-brand text-neutral-900 font-bold shadow-sm hover:opacity-90 rounded-[0.5rem]",
        actionDoubleBorder:
          "bg-transparent text-text-primary border-2 border-double border-brand hover:bg-surface-hover rounded-[0.5rem]",

        clear:
          "bg-surface-card text-text-muted border border-transparent hover:text-text-secondary hover:bg-surface-input active:border-border-subtle rounded-[0.5rem]",
        clearBorder:
          "bg-transparent text-text-muted border border-border-subtle hover:text-text-primary rounded-[0.5rem]",

        favorite:
          "bg-surface-card text-text-primary border border-border-subtle hover:bg-surface-hover gap-[0.5rem] rounded-[0.5rem]",
        favorited:
          "bg-brand text-neutral-900 font-bold gap-[0.5rem] hover:opacity-90 rounded-[0.5rem]",
        favoriteOutline:
          "bg-transparent text-text-primary border border-border-subtle hover:border-brand rounded-[0.5rem]",
        favoriteOutlineActive:
          "bg-transparent text-brand border border-brand rounded-[0.5rem]",

        tab: "text-text-secondary font-bold text-preset-3 pb-[0.5rem] relative bg-transparent border-b-2 border-transparent hover:text-text-primary rounded-none",
        tabActive:
          "text-text-primary font-bold text-preset-3 pb-[0.5rem] relative bg-transparent border-b-2 border-brand rounded-none",
        tabBordered:
          "text-text-primary font-bold text-preset-3 p-[0.75rem] border-2 border-brand rounded-[0.5rem] bg-transparent",
      },
      size: {
        default: "px-[1.25rem] py-[0.75rem] text-preset-4",
        sm: "px-[0.75rem] py-[0.5rem] text-preset-5",
        lg: "px-[2rem] py-[1rem] text-preset-3-bold",
        icon: "p-[0.625rem] rounded-[0.5rem]",
        iconCircle: "p-[0.625rem] rounded-full",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "action",
      size: "default",
    },
  },
);

export interface ButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
      badgeCount?: number;
    }
> {}

export function Button({
  className,
  variant,
  size,
  badgeCount,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}

      {typeof badgeCount === "number" && (
        <span className="ml-[0.75rem] flex h-[1rem] min-w-[1rem] items-center justify-center rounded-full px-[0.25rem] text-preset-6 font-bold font-mono bg-surface-input text-text-secondary">
          {badgeCount}
        </span>
      )}
    </button>
  );
}
