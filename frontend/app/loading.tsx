export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col gap-8 px-4 py-12 max-w-7xl mx-auto">
      {/* hero skeleton */}
      <div className="h-[480px] rounded-xl bg-neutral-100 animate-pulse" />
      {/* section skeletons */}
      <div className="h-8 w-48 rounded bg-neutral-100 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-xl bg-neutral-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
