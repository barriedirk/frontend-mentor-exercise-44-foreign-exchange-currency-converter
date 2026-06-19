import * as React from "react";
import { cn } from "@/shared/utils/cn";

interface CurrencyInputPanelProps extends Readonly<
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
> {
  readonly label: "SEND" | "RECEIVE";
  readonly value: string;
  readonly currencyCode: string;
  readonly onValueChange?: (value: string) => void;
  readonly onCurrencyClick?: () => void;
  readonly readOnly?: boolean;
}

export function CurrencyInputPanel({
  className,
  label,
  value,
  currencyCode,
  onValueChange,
  onCurrencyClick,
  readOnly = false,
  ...props
}: CurrencyInputPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[0.5rem] w-full p-[1.5rem] bg-neutral-900/40 border border-neutral-800/60 rounded-12 font-mono transition-all focus-within:border-neutral-700 focus-within:bg-neutral-900/80",
        className,
      )}
      {...props}
    >
      {/* LABEL SUPERIOR */}
      <span className="text-[0.75rem] text-text-muted uppercase tracking-widest font-medium">
        {label}
      </span>

      {/* CONTENEDOR DE INPUT Y SELECTOR */}
      <div className="flex items-center justify-between gap-[1rem] w-full">
        {/* INPUT NUMÉRICO */}
        <input
          type="text"
          inputMode="decimal"
          pattern="^[0-9]*[.,]?[0-9]*$"
          placeholder="0.00"
          value={value}
          readOnly={readOnly}
          onChange={(e) => onValueChange?.(e.target.value)}
          className={cn(
            "w-full bg-transparent text-[2.5rem] font-bold text-text-primary outline-none tracking-tight p-0 border-none min-w-0",
            {
              "text-brand": label === "RECEIVE", // Si en tu Figma el panel de recibir tiene un color destacado (como el verde lima de tu captura)
              "cursor-default": readOnly,
            },
          )}
        />

        {/* BOTÓN SELECTOR DE MONEDA (Abre el Dropdown) */}
        <button
          type="button"
          onClick={onCurrencyClick}
          className="flex items-center gap-[0.5rem] bg-neutral-800 border border-neutral-700/50 hover:bg-neutral-700 h-[3rem] px-[1rem] rounded-12 text-text-primary font-bold text-[1rem] transition-all cursor-pointer outline-none shrink-0 select-none"
        >
          {/* 💡 Aquí es donde consumiremos tu lógica de banderas redondeadas */}
          <div className="size-[1.25rem] rounded-full overflow-hidden shrink-0 bg-neutral-900 flex items-center justify-center isolation-isolate">
            <span
              className={cn(
                "fi",
                `fi-${currencyCode.slice(0, 2).toLowerCase()}`,
                "fis",
                "block w-full h-full rounded-full",
              )}
            />
          </div>

          <span className="uppercase tracking-wide">{currencyCode}</span>

          {/* Flecha hacia abajo indicando dropdown */}
          <svg
            className="size-[1rem] text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
