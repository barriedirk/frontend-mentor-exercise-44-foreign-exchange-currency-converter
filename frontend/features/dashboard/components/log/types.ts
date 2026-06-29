import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface LogEntryItem {
  readonly id: string;
  readonly timestamp: string; // E,g: "20M", "1H", "13 May"
  readonly fromCode: CurrencyCode;
  readonly toCode: CurrencyCode;
  readonly fromAmount: number;
  readonly toAmount: number;
}
