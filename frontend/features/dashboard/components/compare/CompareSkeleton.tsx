export function CompareSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <div className="h-4 w-48 bg-gray-700/40 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gray-700/40 rounded animate-pulse" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-[#141414] border border-gray-800/40 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-800 animate-pulse" />

              <div className="space-y-2">
                <div className="h-4 w-12 bg-gray-700/60 rounded animate-pulse" />
                <div className="h-3 w-24 bg-gray-800 rounded animate-pulse" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="space-y-1.5 flex flex-col items-end">
                <div className="h-5 w-20 bg-gray-700/60 rounded animate-pulse" />

                <div className="h-3 w-14 bg-gray-800 rounded animate-pulse" />
              </div>

              <div className="w-8 h-8 rounded-lg bg-gray-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
