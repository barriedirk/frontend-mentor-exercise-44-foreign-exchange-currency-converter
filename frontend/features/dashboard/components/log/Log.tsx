import { useState } from "react";
import { MOCK_LOGS } from "./mockData";

import { LogView } from "./LogView";
import { LogEntryItem } from "./types";

export function Log() {
  const [logs, setLogs] = useState<LogEntryItem[]>(MOCK_LOGS);

  const handleDeleteEntry = (id: string) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== id));
  };

  const handleClearAll = () => {
    setLogs([]);
  };

  return (
    <LogView
      logs={logs}
      onDeleteEntry={handleDeleteEntry}
      onClearAll={handleClearAll}
    />
  );
}
