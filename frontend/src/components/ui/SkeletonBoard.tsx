export default function SkeletonBoard() {
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-border bg-card shrink-0">
        <div className="h-6 w-32 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="flex-1 p-6 flex gap-4 items-start overflow-hidden">
        {[1, 2, 3].map((col) => (
          <div key={col} className="w-72 shrink-0 bg-surface rounded-xl border border-border p-3 space-y-2">
            <div className="h-4 w-20 bg-gray-100 rounded animate-pulse mb-4" />
            {[1, 2, 3, 4].map((card) => (
              <div key={card} className="bg-card rounded-lg border border-border p-3 space-y-2">
                <div className="h-4 bg-gray-100 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
