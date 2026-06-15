"use client";

import { ArrowLeftRight, Star } from "lucide-react";

export function ConverterForm() {
  return (
    <div className="bg-surface-card border border-border-subtle rounded-12 p-300 flex flex-col gap-250">
      {/* Fila Superior: Título y Acción Rápida */}
      <div className="flex justify-between items-center">
        <h2 className="text-preset-3-bold uppercase text-text-primary">
          Conversión de Divisas
        </h2>
        <button className="flex items-center gap-050 text-preset-5 text-text-secondary hover:text-brand transition-colors cursor-pointer">
          <Star className="h-150 w-150" />
          <span>Añadir a favoritos</span>
        </button>
      </div>

      {/* Grid del Formulario de Entrada */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-150 items-center">
        {/* Input de Monto */}
        <div className="md:col-span-3 flex flex-col gap-075">
          <label className="text-preset-5 text-text-secondary uppercase">
            Monto
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="1,000.00"
              defaultValue="1000"
              className="w-full bg-surface-input border border-border-subtle rounded-8 p-150 text-preset-3 font-mono text-text-primary focus:outline-none focus:border-border-focus transition-colors"
            />
          </div>
        </div>

        {/* Selector "De" */}
        <div className="md:col-span-1.5 flex flex-col gap-075">
          <label className="text-preset-5 text-text-secondary uppercase">
            De
          </label>
          <select className="w-full bg-surface-input border border-border-subtle rounded-8 p-150 text-preset-4 font-mono text-text-primary focus:outline-none focus:border-border-focus cursor-pointer">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="PEN">PEN</option>
          </select>
        </div>

        {/* Botón de Intercambio (Swap) */}
        <div className="md:col-span-1 flex justify-center pt-200 md:pt-300">
          <button className="bg-surface-input hover:bg-surface-hover border border-border-subtle p-125 rounded-full text-text-primary hover:text-brand transition-all cursor-pointer shadow-sm">
            <ArrowLeftRight className="h-150 w-150" />
          </button>
        </div>

        {/* Selector "A" */}
        <div className="md:col-span-1.5 flex flex-col gap-075">
          <label className="text-preset-5 text-text-secondary uppercase">
            A
          </label>
          <select className="w-full bg-surface-input border border-border-subtle rounded-8 p-150 text-preset-4 font-mono text-text-primary focus:outline-none focus:border-border-focus cursor-pointer">
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="PEN">PEN</option>
          </select>
        </div>
      </div>

      {/* Pantalla de Resultados de la Conversión */}
      <div className="border-t border-border-subtle pt-200 mt-100 flex flex-col sm:flex-row justify-between items-baseline gap-100">
        <div>
          <span className="text-preset-5 text-text-muted font-mono block">
            1.00 USD =
          </span>
          <div className="text-preset-1 font-bold text-brand mt-050 tracking-tight">
            0.9254{" "}
            <span className="text-preset-2 font-normal text-text-primary">
              EUR
            </span>
          </div>
        </div>

        {/* Timestamp de la Tasa */}
        <span className="text-preset-6 text-text-muted font-mono uppercase bg-surface-input px-100 py-050 rounded-4 border border-border-subtle">
          Última actualización: EOD • ECB DATA
        </span>
      </div>
    </div>
  );
}
