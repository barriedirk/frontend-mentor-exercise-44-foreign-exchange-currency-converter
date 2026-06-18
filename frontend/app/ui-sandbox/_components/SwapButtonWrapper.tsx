"use client";

import { SwapButton } from "@/shared/components/SwapButton";

export default function SwapButtonWrapper() {
  const handleSwap = () => {
    console.log("Currencies swapped! Disparar acción de Zustand/Redux aquí.");
  };

  return (
    <div className="flex flex-col gap-[1rem] p-[2rem] bg-[#0A0A0A] rounded-12 border border-neutral-900 max-w-[600px]">
      <h3 className="text-text-muted font-mono text-[0.75rem] uppercase tracking-widest mb-[1rem]">
        Swap Button Layout Position Test
      </h3>

      {/* Simulando el contenedor relativo donde flota el botón */}
      <div className="relative flex items-center justify-between gap-[1rem] w-full">
        {/* Panel Izquierdo (SEND) */}
        <div className="flex-1 bg-neutral-900/50 border border-neutral-800 p-[1.5rem] rounded-12 h-[5rem] flex items-center">
          <span className="text-text-muted font-mono text-[0.875rem]">
            SEND PANEL
          </span>
        </div>

        {/* 💡 EL BOTÓN INTERMEDIO */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <SwapButton onClick={handleSwap} />
        </div>

        {/* Panel Derecho (RECEIVE) */}
        <div className="flex-1 bg-neutral-900/50 border border-neutral-800 p-[1.5rem] rounded-12 h-[5rem] flex items-center justify-end">
          <span className="text-text-muted font-mono text-[0.875rem]">
            RECEIVE PANEL
          </span>
        </div>
      </div>
    </div>
  );
}
