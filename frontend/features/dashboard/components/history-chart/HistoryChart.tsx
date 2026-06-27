import HistoryChartView from "./HistoryChartView";
import { SandboxStat } from "./types";

export default function HistoryChart() {
  const sandboxStats: SandboxStat[] = [
    {
      label: "Open",
      value: "0.8516",
      trend: "neutral" as const,
    },
    {
      label: "Last",
      value: "0.8530",
      trend: "neutral" as const,
    },
    {
      label: "Change",
      value: "+0.0014",
      trend: "up" as const,
    },
    {
      label: "% Change",
      value: "-0.12%",
      trend: "down" as const, // Forzado a negativo para testing de color rojo
    },
  ];

  return <HistoryChartView sandboxStats={sandboxStats} />;
}
