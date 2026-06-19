import * as React from "react";
import { ExchangeVerticalIcon } from "@/shared/assets/icons";
import { IconButton } from "@/shared/ui/IconButton";

interface SwapButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> {}

export function SwapButton({ className, ...props }: SwapButtonProps) {
  return (
    <IconButton
      type="button"
      aria-label="Swap currencies"
      intent="exchange"
      size="sm"
      {...props}
    >
      <ExchangeVerticalIcon className="rotate-90" />
    </IconButton>
  );
}
