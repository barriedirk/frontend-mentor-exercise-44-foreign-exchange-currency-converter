import CurrencyExchange from "../currency-exchange/CurrencyExchange";
import { DashboardTabs } from "./components/tabs/DashboardTabs";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <section className="p-[var(--spacing-200)] w-full max-w-[var(--max-inner-container))] mx-auto flex flex-col gap-[var(--spacing-300)]">
      <h1 className="text-preset-2 text-text-primary">{t("title")}</h1>
      <CurrencyExchange />
      <DashboardTabs />
    </section>
  );
}
