"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/Popover";

export function InfoButton() {
  return (
    <div className="flex relative z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-8 h-8 flex items-center justify-center rounded transition-colors font-mono font-bold border border-transparent text-text-secondary hover:text-text-primary hover:bg-[var(--color-bg-hover)] hover:border-[var(--color-border-subtle)] data-[state=open]:text-text-primary data-[state=open]:bg-[var(--color-bg-hover)] data-[state=open]:border-[var(--color-border-subtle)]"
            title="Data Source Information"
            aria-label="Toggle data simulation notice"
          >
            !
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="z-100 w-80 sm:w-96 bg-surface-card border border-surface-hover rounded-lg p-[var(--spacing-200)] shadow-xl font-mono text-left animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="flex flex-row justify-between items-center border-b border-subtle pb-[var(--spacing-100)] mb-[var(--spacing-100)]">
            <h3 className="text-preset-5 font-bold text-text-primary flex items-center gap-[var(--spacing-100)]">
              Data Simulation
            </h3>
            <span className="text-preset-6 text-text-secondary opacity-50 uppercase tracking-wider">
              Disclaimer
            </span>
          </div>

          <div className="space-y-[var(--spacing-100)] text-preset-6 text-text-secondary leading-relaxed">
            <p>
              This dashboard consumes the free{" "}
              <code className="text-[var(--color-accent)] bg-[var(--color-bg-code)] px-1 py-0.5 rounded">
                Frankfurter API
              </code>{" "}
              (ECB EOD rates).
            </p>
            <p>
              To deliver a high-fidelity experience, the following client-side
              simulations are active:
            </p>
            <ul className="space-y-[var(--spacing-100)] pl-[var(--spacing-100)] border-l border-subtle">
              <li>
                <strong className="text-text-primary">● Live Markets:</strong>{" "}
                Micro-fluctuations (<em>jitter</em>) are injected every 4
                seconds.
              </li>
              <li>
                <strong className="text-text-primary">
                  ● Historical Trends:
                </strong>{" "}
                A 4-day lookback window is used to obtain opening baseline
                metrics.
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
