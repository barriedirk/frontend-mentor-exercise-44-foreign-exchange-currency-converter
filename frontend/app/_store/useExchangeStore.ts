import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CurrencyCode } from "@/shared/types/CurrencyCode";
import { UITimeframe } from "@/shared/types/UITimeframe";
import { LogEntry } from "@/features/dashboard/components/log/types";

export interface ExchangeState {
  readonly sendCurrencyCode: CurrencyCode;
  readonly receiveCurrencyCode: CurrencyCode;
  readonly timeframe: UITimeframe;
  readonly favorites: readonly string[];
  readonly logs: readonly LogEntry[];

  addLogEntry: (entry: Omit<LogEntry, "id" | "timestamp">) => void;
  clearLogs: () => void;
  deleteLogEntry: (id: string) => void;
  setSendCurrencyCode: (code: CurrencyCode) => void;
  setReceiveCurrencyCode: (code: CurrencyCode) => void;
  setTimeframe: (timeframe: UITimeframe) => void;
  swapCurrencies: () => void;
  toggleFavorite: (pair: string) => void;
}

const MAX_LOG_ENTRIES = 50;

export const useExchangeStore = create<ExchangeState>()(
  persist(
    (set) => ({
      sendCurrencyCode: "USD",
      receiveCurrencyCode: "EUR",
      timeframe: "1M",
      favorites: ["USD-EUR", "GBP-USD", "USD-JPY", "EUR-GBP"],
      logs: [],

      addLogEntry: (entry) =>
        set((state) => {
          const newEntry: LogEntry = {
            ...entry,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
          };
          const updatedLogs = [newEntry, ...state.logs].slice(
            0,
            MAX_LOG_ENTRIES,
          );

          return { logs: updatedLogs };
        }),

      clearLogs: () => set({ logs: [] }),

      deleteLogEntry: (id) =>
        set((state) => ({
          logs: state.logs.filter((item) => item.id !== id),
        })),

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
    }),
    {
      name: "global-forex-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        logs: state.logs,
      }),
    },
  ),
);
