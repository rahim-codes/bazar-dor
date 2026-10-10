export default function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="w-full h-24 bg-base-200 rounded-3xl"></div>

      {/* Control Bar Skeleton */}
      <div className="w-full h-12 bg-base-200 rounded-2xl"></div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-36 bg-base-200 rounded-2xl p-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-base-300 rounded-2xl shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-base-300 rounded-md w-3/4"></div>
                <div className="h-3 bg-base-300 rounded-md w-1/2"></div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div className="h-6 bg-base-300 rounded-md w-1/3"></div>
              <div className="h-5 bg-base-300 rounded-full w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
