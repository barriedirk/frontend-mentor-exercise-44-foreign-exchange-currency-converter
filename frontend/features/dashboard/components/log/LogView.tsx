"use client";

import { DeleteIcon } from "@/shared/assets/icons";
import { LogEntryItem } from "./types";

export interface LogViewProps {
  readonly logs: readonly LogEntryItem[];
  readonly onDeleteEntry: (id: string) => void;
  readonly onClearAll: () => void;
}

export function LogView({ logs, onDeleteEntry, onClearAll }: LogViewProps) {
  return (
    <div className="w-full bg-surface-card border border-border-subtle rounded-12 p-[var(--spacing-200)] shadow-2xl flex flex-col gap-[var(--spacing-200)]">
      <div className="flex items-start justify-between text-text-secondary gap-[var(--spacing-100)] text-preset-4 font-bold tracking-widest uppercase">
        <h2 className="text-text-primary text-preset-4 font-bold uppercase tracking-wide">
          Conversion Log
        </h2>
        <div className="flex items-center gap-[var(--spacing-300)]">
          <span className="text-text-secondary text-preset-6 font-bold uppercase tracking-wider tabular-nums">
            {logs.length} Logged
          </span>
          {logs.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              aria-label="Clear all conversion logs"
              className="px-[var(--spacing-200)] py-[var(--spacing-100)] border border-border-subtle bg-neutral-800 rounded-6 text-preset-6 text-text-secondary font-bold uppercase tracking-wider hover:bg-neutral-700 hover:text-text-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {logs.length === 0 ? (
        <div className="text-center py-[var(--spacing-800)] text-text-secondary text-preset-4">
          No logs recorded yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-[var(--spacing-200)]">
          {logs.map((log) => (
            <li
              key={log.id}
              className="flex items-center bg-neutral-800 border border-border-subtle rounded-8 p-[var(--spacing-300)] text-text-secondary text-preset-4 font-medium transition-colors hover:border-neutral-600"
            >
              <div className="w-16 tabular-nums text-text-secondary font-bold text-preset-5 uppercase">
                {log.timestamp}
              </div>

              <div className="flex items-center gap-[var(--spacing-150)] text-text-primary font-bold uppercase tracking-wide ml-[var(--spacing-200)]">
                <span>{log.fromCode}</span>
                <span className="text-text-secondary font-normal text-preset-5">
                  →
                </span>
                <span>{log.toCode}</span>
              </div>

              <div className="flex items-center gap-[var(--spacing-400)] ml-auto mr-[var(--spacing-300)] tabular-nums font-bold text-preset-3">
                <span className="text-text-secondary">
                  {Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(log.fromAmount)}
                </span>
                <span className="text-brand">
                  {Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                  }).format(log.toAmount)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onDeleteEntry(log.id)}
                aria-label={`Delete conversion log for ${log.fromCode} to ${log.toCode}`}
                className="cursor-pointer"
              >
                <DeleteIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
