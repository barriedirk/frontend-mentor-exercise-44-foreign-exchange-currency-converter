// src/shared/ui/CurrencySelectButton.tsx
import * as React from "react";
import { cn } from "@/shared/utils/cn";

export interface CurrencySelectButtonProps extends Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> {
  readonly code: string;
  readonly flagUrl: string;
}

export function CurrencySelectButton({
  className,
  code,
  flagUrl,
  ...props
}: CurrencySelectButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        // Base rígida extraída de tu Figma (Dimensiones, fuentes y radios)
        "inline-flex items-center gap-[0.75rem] bg-surface-input text-text-primary border border-transparent rounded-12 px-[1rem] py-[0.75rem] font-mono text-preset-3-bold tracking-wider transition-all cursor-pointer h-fit w-fit select-none outline-none",
        // Hover State
        "hover:bg-surface-hover",
        // Focus / Active State (Tu borde lima exacto con anillo de retroalimentación)
        "focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-brand focus:ring-2 focus:ring-brand focus:border-brand",
        // Disabled State
        "disabled:pointer-events-none disabled:opacity-30",
        className,
      )}
      {...props}
    >
      {/* Contenedor de la Bandera */}
      <img
        src={flagUrl}
        alt={`${code} flag`}
        className="h-[1.5rem] w-[2rem] object-cover rounded-2"
        loading="lazy"
      />

      {/* Código de Divisa */}
      <span>{code}</span>

      {/* Chevron Nativo SVG */}
      <svg
        className="w-[1rem] h-[1rem] text-text-muted transition-transform group-focus:text-brand"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
}
