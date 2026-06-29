import { useState } from "react";
import { MOCK_CONVERSION_STATE, MOCK_CURRENCY_PAIRS } from "./mockData";
import { CurrencyCode } from "./types";

import { FavoritesView } from "./FavoriteView";

export function Favorites() {
  const [pairs, setPairs] = useState(MOCK_CURRENCY_PAIRS);

  const handleToggleFavorite = (code: CurrencyCode) => {
    setPairs((prevPairs) =>
      prevPairs.map((pair) =>
        pair.currency.code === code
          ? { ...pair, isFavorite: !pair.isFavorite }
          : pair,
      ),
    );
  };

  return (
    <FavoritesView
      conversion={MOCK_CONVERSION_STATE}
      pairs={pairs}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
