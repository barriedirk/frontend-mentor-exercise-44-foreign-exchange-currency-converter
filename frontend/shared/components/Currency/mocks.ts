import type { CurrencyGroup } from "./currency";
import type { TickerRate } from "./ticker";

export const MOCK_TICKER_RATES: readonly TickerRate[] = [
  { id: "1", pair: "EUR/USD", value: "1.0924", change: 0.12 },
  { id: "2", pair: "USD/JPY", value: "156.42", change: -0.45 },
  { id: "3", pair: "GBP/USD", value: "1.2711", change: 0.05 },
  { id: "4", pair: "AUD/USD", value: "0.6643", change: -0.18 },
];

export const MOCK_FX_RATES: readonly TickerRate[] = [
  { id: "1", pair: "EUR/USD", value: "1.0824", change: -0.14 },
  { id: "2", pair: "USD/JPY", value: "157.91", change: 0.04 },
  { id: "3", pair: "GBP/USD", value: "1.3575", change: -0.22 },
  { id: "4", pair: "AUD/USD", value: "0.6641", change: 0.15 },
];

export const MOCK_CURRENCY_GROUPS: readonly CurrencyGroup[] = [
  {
    title: "Popular",
    items: [
      { code: "USD", name: "US Dollar" },
      { code: "EUR", name: "Euro" },
      { code: "GBP", name: "British Pound" },
    ],
  },
  {
    title: "Other Currencies",
    items: [
      { code: "AED", name: "UAE Dirham" },
      { code: "ARS", name: "Argentine Peso" },
      { code: "AUD", name: "Australian Dollar" },
      { code: "BDT", name: "Bangladeshi Taka" },
    ],
  },
];
