import { CurrencyCode } from "@/shared/types/CurrencyCode";

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
