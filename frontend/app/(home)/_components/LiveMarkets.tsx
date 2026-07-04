"use client";

import { DataTicker } from "@/domain/currency/ui/DataTicker";
import { useHeaderData } from "./hooks/useHeaderData";

export default function LiveMarkets() {
  const { tickerItems } = useHeaderData();

  return <DataTicker rates={tickerItems} />;
}
