import { MarketChart } from "@/shared/components/MarketChart/MarketChart";
import { MarketChartBase } from "@/shared/types/MarketChartRate";

// Mock Data adaptado de la estructura de series de tiempo de la API (ej: USD/EUR)
const MOCK_CHART_DATA: MarketChartBase = {
  baseCurrency: "USD",
  quoteCurrency: "EUR",
  data: [
    { date: "Apr 14", rate: 0.857 },
    { date: "Apr 17", rate: 0.851 },
    { date: "Apr 21", rate: 0.846 },
    { date: "Apr 24", rate: 0.8495 },
    { date: "Apr 28", rate: 0.843 },
    { date: "May 02", rate: 0.858 },
    { date: "May 06", rate: 0.8515 },
    { date: "May 10", rate: 0.8612 },
    { date: "May 14", rate: 0.853 },
  ],
};

export function MarketChartWrapper() {
  return (
    <div className="border border-border-subtle rounded-12 overflow-hidden">
      <MarketChart updatedAt="May 14 16:00 CET" {...MOCK_CHART_DATA} />
    </div>
  );
}
