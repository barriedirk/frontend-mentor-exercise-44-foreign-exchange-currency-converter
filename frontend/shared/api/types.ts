import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface FrankfurterRateItem {
  readonly date: string;
  readonly base: CurrencyCode;
  readonly quote: CurrencyCode;
  readonly rate: number;
}

export interface FrankfurterCurrencyMeta {
  readonly iso_code: CurrencyCode;
  readonly iso_numeric: string;
  readonly name: string;
  readonly symbol: string;
  readonly start_date: string;
}

export interface FrankfurterSingleRateResponse {
  readonly date: string;
  readonly base: CurrencyCode;
  readonly quote: CurrencyCode;
  readonly rate: number;
}
