import { useState } from "react";
import { MOCK_FAVORITE_PAIRS } from "./mockData";

import { FavoritesView } from "./FavoriteView";

export function Favorites() {
  const [favoritePairs, setFavoritePairs] = useState(MOCK_FAVORITE_PAIRS);

  const handleToggleFavorite = (id: string) => {
    setFavoritePairs((prevPairs) =>
      prevPairs.map((pair) =>
        pair.id === id ? { ...pair, isFavorite: !pair.isFavorite } : pair,
      ),
    );
  };

  const activeFavorites = favoritePairs.filter((pair) => pair.isFavorite);

  return (
    <FavoritesView
      favoritePairs={activeFavorites}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
