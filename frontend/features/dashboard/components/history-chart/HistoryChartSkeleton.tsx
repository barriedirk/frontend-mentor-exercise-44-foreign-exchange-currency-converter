export default function HistoryChartSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-xl space-y-2 border border-gray-200/50"
          >
            <div className="h-4 bg-gray-200 rounded-md w-16" />
            <div className="h-6 bg-gray-300 rounded-md w-24" />
          </div>
        ))}
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
    </div>
  );
}
