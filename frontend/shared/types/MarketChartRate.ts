export interface MarketChartBase {
  readonly baseCurrency: string;
  readonly quoteCurrency: string;
  readonly data: readonly MarketChartRate[];
}

export interface MarketChartRate {
  readonly date: string; // Ex: "Apr 14" or "2026-06-21"
  readonly rate: number; // Ex: 0.8530
}

export interface MarketChartRaw {
  readonly quote: string;
  readonly base: string;
  readonly date: string;
  readonly rate: number;
}
