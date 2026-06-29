import { CurrencyCode } from "@/shared/types/CurrencyCode";

export interface CurrencyInfo {
  readonly code: CurrencyCode;
  readonly name: string;
  readonly flagUrl: string; // O el identificador para tu sistema de iconos/sprites
}

export interface CurrencyPairRate {
  readonly currency: CurrencyInfo;
  readonly rate: number; // Tasa spot unitaria (ej. @ 0.7366)
  readonly isFavorite: boolean; // Control de estado para la estrella
}

export interface ConversionState {
  readonly baseAmount: number; // El monto a convertir (ej. 1000)
  readonly baseCurrency: CurrencyCode; // Moneda origen (ej. 'USD')
}

// Props para el contenedor principal del panel COMPARE
export interface ComparePanelProps {
  readonly conversion: ConversionState;
  readonly pairs: readonly CurrencyPairRate[];
  readonly onToggleFavorite: (code: CurrencyCode) => void;
}
