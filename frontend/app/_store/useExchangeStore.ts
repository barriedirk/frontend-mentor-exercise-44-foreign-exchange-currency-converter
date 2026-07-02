import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CurrencyCode } from "@/shared/types/CurrencyCode";
import { UITimeframe } from "@/shared/types/UITimeframe";

export interface ConversionLog {
  readonly id: string;
  readonly timestamp: number;
  readonly fromCurrency: CurrencyCode;
  readonly toCurrency: CurrencyCode;
  readonly amountSent: string;
  readonly amountReceived: string;
  readonly rate: number;
}

interface ExchangeState {
  readonly sendCurrencyCode: CurrencyCode;
  readonly receiveCurrencyCode: CurrencyCode;
  readonly timeframe: UITimeframe;
  readonly favorites: readonly string[];
  readonly history: readonly ConversionLog[];

  readonly setSendCurrencyCode: (code: CurrencyCode) => void;
  readonly setReceiveCurrencyCode: (code: CurrencyCode) => void;
  readonly setTimeframe: (timeframe: UITimeframe) => void;
  readonly swapCurrencies: () => void;
  readonly toggleFavorite: (pair: string) => void;
  readonly addLog: (log: Omit<ConversionLog, "id" | "timestamp">) => void;
}

export const useExchangeStore = create<ExchangeState>()(
  persist(
    (set) => ({
      sendCurrencyCode: "USD",
      receiveCurrencyCode: "EUR",
      timeframe: "1M",
      favorites: [],
      history: [],

      setSendCurrencyCode: (code) => set({ sendCurrencyCode: code }),
      setReceiveCurrencyCode: (code) => set({ receiveCurrencyCode: code }),
      setTimeframe: (timeframe) => set({ timeframe }),
      swapCurrencies: () =>
        set((state) => ({
          sendCurrencyCode: state.receiveCurrencyCode,
          receiveCurrencyCode: state.sendCurrencyCode,
        })),

      toggleFavorite: (pair) =>
        set((state) => {
          const exists = state.favorites.includes(pair);
          return {
            favorites: exists
              ? state.favorites.filter((p) => p !== pair)
              : [...state.favorites, pair],
          };
        }),

      addLog: (log) =>
        set((state) => ({
          history: [
            {
              ...log,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
            },
            ...state.history,
          ],
        })),
    }),
    {
      name: "global-forex-storage",
    },
  ),
);
