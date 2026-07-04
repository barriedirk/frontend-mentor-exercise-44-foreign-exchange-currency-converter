import { CompareView } from "./CompareView";
import { useCompareData } from "./hooks/useCompareData";

export function Compare() {
  const { conversion, pairs, toggleFavorite } = useCompareData();

  return (
    <CompareView
      conversion={conversion}
      pairs={pairs}
      onToggleFavorite={toggleFavorite}
    />
  );
}
