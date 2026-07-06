import { useId } from "react";

export default function HistoryChartSkeleton() {
  const baseId = useId();

  return (
    <section className="w-full space-y-6 animate-pulse p-4">
      <div className="w-full flex flex-col md:flex-row gap-[var(--spacing-300)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`${baseId}-stat-${index}`}
              className="p-4 bg-gray-100 rounded-xl space-y-2 border border-gray-200/50"
            >
              <div className="h-4 bg-gray-200 rounded-md w-16" />
              <div className="h-6 bg-gray-300 rounded-md w-24 sm:w-20" />
            </div>
          ))}
        </div>
        <div className="flex-1 md:basis-1/3 items-center flex md:justify-end">
          <div className="flex items-center gap-[0.25rem] p-[0.25rem]  rounded-8 border border-gray-200/50 h-fit w-fit select-none bg-gray-100">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`${baseId}-timeframe-${index}`}
                className="h-[2rem] px-[0.75rem] flex items-center justify-center font-mono text-preset-5 rounded-6 transition-all cursor-pointer outline-none bg-gray-200"
              >
                <div className="h-4 bg-gray-200 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full h-[320px] bg-gray-100 rounded-xl p-6 border border-gray-200/50 flex flex-col justify-between">
        <div className="w-full h-px bg-gray-200" />
        <div className="w-full h-px bg-gray-200" />
        <div className="w-full h-px bg-gray-200" />
        <div className="w-full h-px bg-gray-200" />

        <div className="flex justify-between pt-2">
          <div className="h-3 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-10" />
          <div className="h-3 bg-gray-200 rounded w-10" />
        </div>
      </div>
    </section>
  );
}
function useID() {
  throw new Error("Function not implemented.");
}
