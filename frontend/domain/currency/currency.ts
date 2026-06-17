export interface CurrencyItem {
  readonly code: string;
  readonly name: string;
  readonly flagUrl?: string;
  readonly flagSvg?: React.ReactNode;
}

export interface CurrencyGroup {
  readonly title: string;
  readonly items: readonly CurrencyItem[];
}
