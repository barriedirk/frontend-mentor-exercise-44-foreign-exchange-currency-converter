import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface CurrencyInfo {
  readonly code: CurrencyCode;
  readonly name: string;
}

export interface ConversionState {
  readonly baseAmount: number;
  readonly baseCurrency: CurrencyCode;
}

export interface ComparePanelProps {
  readonly conversion: ConversionState;
  readonly pairs: readonly CurrencyPairRate[];
  readonly onToggleFavorite: (code: CurrencyCode) => void;
}

export interface CurrencyPairRate {
  currency: {
    code: CurrencyCode;
    name: string;
  };
  rate: number;
  isFavorite: boolean;
}
