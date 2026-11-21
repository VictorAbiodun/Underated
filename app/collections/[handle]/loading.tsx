export default function Loading() {
  return (
    <div className="min-h-screen px-4 pb-16 pt-2 sm:px-6 md:px-10 lg:px-12 animate-pulse">
      {/* Category Pills Skeleton */}
      <div className="-mx-4 mb-6 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-7 w-16 shrink-0 rounded-full bg-[#181818]"
          />
        ))}
      </div>

      {/* Header Skeleton */}
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <div className="h-9 w-32 rounded bg-[#181818]" />
        <div className="flex gap-1.5">
          <div className="h-9 w-9 rounded bg-[#181818]" />
          <div className="h-9 w-9 rounded bg-[#181818]" />
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex flex-col gap-2.5">
            <div className="aspect-[4/5] w-full rounded bg-[#141414]" />
            <div className="h-3 w-3/4 rounded bg-[#181818]" />
            <div className="h-3 w-1/3 rounded bg-[#181818]" />
          </div>
        ))}
      </div>
    </div>
  );
}
