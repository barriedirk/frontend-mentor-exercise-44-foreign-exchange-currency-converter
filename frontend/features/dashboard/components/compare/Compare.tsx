import { CompareSkeleton } from "./CompareSkeleton";
import { CompareView } from "./CompareView";
import { useCompareData } from "./hooks/useCompareData";

export function Compare() {
  const { conversion, pairs, isLoading, isError, refetch, toggleFavorite } =
    useCompareData();

  if (isLoading) {
    return <CompareSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center border border-red-100 rounded-xl bg-red-50/30 space-y-3">
        <p className="text-sm font-medium text-red-600">
          Failed to load real-time currency comparisons.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors focus:outline-none"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <CompareView
      conversion={conversion}
      pairs={pairs}
      onToggleFavorite={toggleFavorite}
    />
  );
}
