import { CurrencyMetadata } from "../types/CurrencyMetadata";

export const ALLOWED_CURRENCIES: CurrencyMetadata[] = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/." },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
] as const;

export type CurrencyCode = (typeof ALLOWED_CURRENCIES)[number]["code"];
