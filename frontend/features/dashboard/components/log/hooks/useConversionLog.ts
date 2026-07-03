import { useMemo } from "react";

import { ExchangeState, useExchangeStore } from "@/app/_store/useExchangeStore";
import { useHydratedStore } from "@/shared/hooks/useHydratedStore";
import { LogEntry } from "../types";

export function useConversionLog() {
  const logs = useHydratedStore<ExchangeState, readonly LogEntry[]>(
    useExchangeStore,
    (state) => state.logs,
  );
  const clearLogs = useExchangeStore((state) => state.clearLogs);
  const deleteLogEntry = useExchangeStore((state) => state.deleteLogEntry);

  const dateTimeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [],
  );

  const formattedLogs = useMemo(() => {
    return (logs ?? []).map((log) => ({
      ...log,
      formattedDate: dateTimeFormatter.format(new Date(log.timestamp)),
    }));
  }, [logs, dateTimeFormatter]);

  return {
    logs: formattedLogs,
    isHydrating: logs === undefined,
    isEmpty: logs !== undefined && logs?.length === 0,
    clearHistory: clearLogs,
    deleteLogEntry,
  };
}
