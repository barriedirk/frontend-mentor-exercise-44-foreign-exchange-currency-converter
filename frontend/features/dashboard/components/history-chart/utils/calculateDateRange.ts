import { Timeframe } from "@/shared/types/UITimeframe";

export function calculateDateRange(timeframe: Timeframe): {
  readonly startDate: string;
  readonly endDate: string;
} {
  const endDate = new Date();
  const startDate = new Date();

  switch (timeframe) {
    case "1D":
      startDate.setDate(endDate.getDate() - 4); // Security window to get BCE data
      break;
    case "1W":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "1M":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "3M":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    case "1Y":
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;
    case "5Y":
      startDate.setFullYear(endDate.getFullYear() - 5);
      break;
  }

  const format = (date: Date): string => date.toISOString().split("T")[0];

  return {
    startDate: format(startDate),
    endDate: format(endDate),
  };
}
