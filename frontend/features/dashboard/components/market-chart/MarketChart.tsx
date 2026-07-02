import { MarketChart as MarketChartView } from "@/shared/components/MarketChart/MarketChart";
import { MOCK_CHART_DATA } from "./mockup";

export function MarketChart() {
  return (
    <div className="border border-border-subtle rounded-12 overflow-hidden">
      <MarketChartView updatedAt="May 14 16:00 CET" {...MOCK_CHART_DATA} />
    </div>
  );
}
