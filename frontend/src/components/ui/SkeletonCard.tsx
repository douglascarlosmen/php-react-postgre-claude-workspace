export default function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg border border-border p-3 space-y-2 animate-pulse">
      <div className="h-4 bg-gray-100 rounded w-full" />
      <div className="h-3 bg-gray-100 rounded w-2/3" />
      <div className="flex gap-1.5 mt-1">
        <div className="h-5 w-12 bg-gray-100 rounded-full" />
        <div className="h-5 w-16 bg-gray-100 rounded-full" />
      </div>
    </div>
  )
}
