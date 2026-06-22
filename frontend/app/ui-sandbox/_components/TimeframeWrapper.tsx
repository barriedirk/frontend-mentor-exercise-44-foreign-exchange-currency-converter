"use client";

import * as React from "react";
import {
  TimeframeTabs,
  type Timeframe,
} from "@/shared/components/TimeframeTabs";

export default function TimeframeWrapper() {
  const [range, setRange] = React.useState<Timeframe>("1M");

  return (
    <div className="flex flex-col gap-[1rem] p-[1.5rem] bg-[#0A0A0A] rounded-12 border border-neutral-900 max-w-[400px]">
      <div className="flex items-center justify-between">
        <span className="text-text-muted font-mono text-preset-5 uppercase">
          Selected Range: <strong className="text-text-primary">{range}</strong>
        </span>

        {/* Componente Controlado */}
        <TimeframeTabs activeTab={range} onChange={setRange} />
      </div>
    </div>
  );
}
