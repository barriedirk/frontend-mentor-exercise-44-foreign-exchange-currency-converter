import { CurrencyCode } from "@/shared/types/CurrencyCode";

// @TODO: remove
export interface LogEntryItem {
  readonly id: string;
  readonly timestamp: string; // E,g: "20M", "1H", "13 May"
  readonly fromCode: CurrencyCode;
  readonly toCode: CurrencyCode;
  readonly fromAmount: number;
  readonly toAmount: number;
}

export interface LogEntry {
  readonly id: string;
  readonly timestamp: string;
  readonly fromCode: CurrencyCode;
  readonly toCode: CurrencyCode;
  readonly amountFrom: number;
  readonly amountTo: number;
  readonly rate: number;
  readonly formattedDate: string;
}
