import { cn } from "../utils/cn";
import CircleWrapper from "./CircleWrapper";

interface CurrencyBadgeProps {
  readonly code: string | undefined;
  readonly size?: "sm" | "md";
}

export function CurrencyBadge({ code, size = "md" }: CurrencyBadgeProps) {
  return (
    <CircleWrapper size={size}>
      <span className={cn("fi", `fi-${code}`, "fis")} />
    </CircleWrapper>
  );
}
