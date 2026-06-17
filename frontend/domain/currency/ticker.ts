export interface TickerRate {
  readonly id: string;
  readonly pair: string;
  readonly value: number | string;
  readonly change: number;
}
