"use client";

import { DataTicker } from "@/shared/components/Currency/ui/DataTicker";
import { useHeaderData } from "./hooks/useHeaderData";

export default function LiveMarkets() {
  const { tickerItems } = useHeaderData();

  return <DataTicker rates={tickerItems} />;
}
