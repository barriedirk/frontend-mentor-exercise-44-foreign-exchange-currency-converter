"use client";

import * as React from "react";
import {
  TimeframeTabs,
  type Timeframe,
} from "@/shared/components/TimeframeTabs";

export default function Timeframe() {
  const [range, setRange] = React.useState<Timeframe>("1M");

  return <TimeframeTabs activeTab={range} onChange={setRange} />;
}
