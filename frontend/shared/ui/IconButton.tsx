// src/shared/ui/IconButton.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/utils/cn";

const iconButtonVariants = cva(
  "inline-grid place-items-center rounded-12 transition-all cursor-pointer select-none outline-none border w-[3.5rem] h-[3.5rem]",
  {
    variants: {
      intent: {
        exchange:
          "bg-surface-input text-text-primary border-transparent hover:bg-surface-hover focus:ring-2 focus:ring-brand focus:border-brand",
        delete:
          "bg-surface-input text-text-muted border-transparent hover:bg-surface-hover hover:text-danger focus:ring-2 focus:ring-brand focus:border-brand",
      },
    },
    defaultVariants: {
      intent: "exchange",
    },
  },
);

export interface IconButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof iconButtonVariants>
> {}

export function IconButton({
  className,
  intent,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn(iconButtonVariants({ intent }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
