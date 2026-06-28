import { CurrencyPairRate, ConversionState } from "./types";

export const MOCK_CONVERSION_STATE: ConversionState = {
  baseAmount: 1000,
  baseCurrency: "USD",
};

export const MOCK_CURRENCY_PAIRS: CurrencyPairRate[] = [
  {
    currency: { code: "GBP", name: "British Pound", flagUrl: "/flags/gbp.svg" },
    rate: 0.7366,
    isFavorite: true,
  },
  {
    currency: { code: "JPY", name: "Japanese Yen", flagUrl: "/flags/jpy.svg" },
    rate: 157.91,
    isFavorite: true,
  },
  {
    currency: { code: "CHF", name: "Swiss Franc", flagUrl: "/flags/chf.svg" },
    rate: 0.9098,
    isFavorite: false,
  },
  {
    currency: {
      code: "CAD",
      name: "Canadian Dollar",
      flagUrl: "/flags/cad.svg",
    },
    rate: 1.3815,
    isFavorite: false,
  },
  {
    currency: {
      code: "AUD",
      name: "Australian Dollar",
      flagUrl: "/flags/aud.svg",
    },
    rate: 1.3874,
    isFavorite: false,
  },
  {
    currency: { code: "INR", name: "Indian Rupee", flagUrl: "/flags/inr.svg" },
    rate: 94.91,
    isFavorite: true,
  },
  {
    currency: { code: "CNY", name: "Chinese Yuan", flagUrl: "/flags/cny.svg" },
    rate: 7.21,
    isFavorite: false,
  },
  {
    currency: {
      code: "BDT",
      name: "Bangladeshi Taka",
      flagUrl: "/flags/bdt.svg",
    },
    rate: 122.92,
    isFavorite: true,
  },
];
