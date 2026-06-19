"use client";

import { SwapButton } from "@/shared/components/SwapButton";

export default function SwapButtonWrapper() {
  const handleSwap = () => {
    console.log("Swapped!");
  };

  return (
    <div className="w-full max-w-[1200px] bg-[#050505] p-[1.5rem] rounded-12 border border-neutral-900">
      {/* 💡 CONTENEDOR FLEX: Controla el espacio real mediante gap */}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 w-full">
        {/* Panel Izquierdo (SEND) */}
        <div className="w-full sm:flex-1 bg-neutral-900/40 border border-neutral-800/60 p-[1.5rem] rounded-12 h-[5rem] flex items-center">
          <span className="text-text-muted font-mono text-[0.875rem]">
            SEND PANEL
          </span>
        </div>

        {/* 💡 EL BOTÓN INTERMEDIO: Fluye de manera natural en el Flexbox */}
        <div className="shrink-0 z-10 flex items-center justify-center">
          <SwapButton onClick={handleSwap} />
        </div>

        {/* Panel Derecho (RECEIVE) */}
        <div className="w-full sm:flex-1 bg-neutral-900/40 border border-neutral-800/60 p-[1.5rem] rounded-12 h-[5rem] flex items-center justify-end">
          <span className="text-text-muted font-mono text-[0.875rem]">
            RECEIVE PANEL
          </span>
        </div>
      </div>
    </div>
  );
}
