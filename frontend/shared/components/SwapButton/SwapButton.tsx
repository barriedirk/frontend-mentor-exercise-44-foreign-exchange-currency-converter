import { ExchangeVerticalIcon } from "@/shared/assets/icons";
import { IconButton } from "@/shared/ui/IconButton";
import { useTranslations } from "next-intl";

interface SwapButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> {}

export function SwapButton({ className, ...props }: SwapButtonProps) {
  const t = useTranslations("Dashboard");

  return (
    <IconButton
      type="button"
      aria-label={t("swapCurrencies")}
      intent="exchange"
      size="sm"
      {...props}
    >
      <ExchangeVerticalIcon className="sm:rotate-90" />
    </IconButton>
  );
}
