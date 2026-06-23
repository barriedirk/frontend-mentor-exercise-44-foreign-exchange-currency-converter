import { MOCK_FX_RATES } from "@/domain/currency/mocks";
import { DataTicker } from "@/domain/currency/ui/DataTicker";

export default function LiveMarkets() {
  return <DataTicker rates={MOCK_FX_RATES} />;
}
