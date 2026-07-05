import { CurrencyMetadata } from "@/shared/types/CurrencyMetadata";

export interface CurrencyGroup {
  readonly id: string;
  readonly title: string;
  readonly currencies: readonly CurrencyMetadata[];
}
