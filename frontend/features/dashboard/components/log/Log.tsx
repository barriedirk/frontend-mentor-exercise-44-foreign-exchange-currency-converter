import { LogView } from "./LogView";
import { useConversionLog } from "./hooks/useConversionLog";

export function Log() {
  const { logs, isHydrating, clearHistory, deleteLogEntry } =
    useConversionLog();

  if (isHydrating) {
    return (
      <div className="p-12 text-center text-sm text-gray-400 animate-pulse bg-gray-50/50 border border-dashed rounded-xl">
        Loading activity register...
      </div>
    );
  }

  return (
    <LogView
      logs={logs}
      onDeleteEntry={deleteLogEntry}
      onClearAll={clearHistory}
    />
  );
}
