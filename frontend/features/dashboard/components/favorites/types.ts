import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface FavoritePairItem {
  readonly id: string; // e.g., "USD-EUR"
  readonly fromCode: CurrencyCode;
  readonly toCode: CurrencyCode;
  readonly rate: number;
  readonly changePercent: number; // e.g., 0.16 o -0.22
  readonly isFavorite: boolean;
}
