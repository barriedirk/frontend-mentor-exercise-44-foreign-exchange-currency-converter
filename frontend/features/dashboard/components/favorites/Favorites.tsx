import { useExchangeStore } from "@/app/_store/useExchangeStore";
import { useFavoritesData } from "./hooks/useFavoritesData";
import { FavoritesView } from "./FavoritesView";
import { FavoritesSkeleton } from "./FavoritesSkeleton";

export function Favorites() {
  const toggleFavorite = useExchangeStore((state) => state.toggleFavorite);
  const { data: favoritePairs, isLoading, hasError } = useFavoritesData();

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  if (hasError) {
    return (
      <div className="p-6 text-center text-sm text-red-500">
        Error synchronizing exchange rates.
      </div>
    );
  }

  if (favoritePairs.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-400 border border-dashed rounded-xl">
        No favorite currency pairs saved yet.
      </div>
    );
  }

  return (
    <FavoritesView
      favoritePairs={favoritePairs}
      onToggleFavorite={(id) => toggleFavorite(id)} // Modifica el array global en Zustand
    />
  );
}
