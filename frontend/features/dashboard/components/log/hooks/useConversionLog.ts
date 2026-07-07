import { useEffect, useMemo, useState } from "react";

import { ExchangeState, useExchangeStore } from "@/app/_store/useExchangeStore";
import { useHydratedStore } from "@/shared/hooks/useHydratedStore";
import { LogEntry } from "../types";
import { formatLogTimestamp } from "@/shared/utils/formatLogTimestamp";

export function useConversionLog() {
  const [now, setNow] = useState(() => Date.now());
  const logs = useHydratedStore<ExchangeState, readonly LogEntry[]>(
    useExchangeStore,
    (state) => state.logs,
  );
  const clearLogs = useExchangeStore((state) => state.clearLogs);
  const deleteLogEntry = useExchangeStore((state) => state.deleteLogEntry);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedLogs = useMemo<LogEntry[]>(() => {
    return (logs ?? []).map((log) => ({
      ...log,
      formattedDate: formatLogTimestamp(log.timestamp, now),
    }));
  }, [logs, now]);

  return {
    logs: formattedLogs,
    isHydrating: logs === undefined,
    isEmpty: logs !== undefined && logs?.length === 0,
    clearHistory: clearLogs,
    deleteLogEntry,
  };
}
