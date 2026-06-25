import CurrencyExchange from "../currency-exchange/CurrencyExchange";
import { DashboardTabs } from "./components/DashboardTabs";

export default function Dashboard() {
  return (
    <section className="p-[var(--spacing-200)] w-full max-w-[var(--max-inner-container))] mx-auto">
      <h1 className="text-preset-2 text-text-primary mb-[var(--spacing-400)]">
        CHECK THE RATE
      </h1>
      <CurrencyExchange />
      <DashboardTabs />
    </section>
  );
}
