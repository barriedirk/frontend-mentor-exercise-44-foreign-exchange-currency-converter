import CurrencyExchange from "../currency-exchange/CurrencyExchange";
import { DashboardTabs } from "./components/tabs/DashboardTabs";

export default function Dashboard() {
  return (
    <section className="p-[var(--spacing-200)] w-full max-w-[var(--max-inner-container))] mx-auto flex flex-col gap-[var(--spacing-300)]">
      <h1 className="text-preset-2 text-text-primary">CHECK THE RATE</h1>
      <CurrencyExchange />
      <DashboardTabs />
    </section>
  );
}
