export function PropertyCardSkeleton() {
  return (
    <div className="lux-card overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-[#E8E1D7]" />
      <div className="p-6 space-y-3">
        <div className="h-6 bg-[#E8E1D7] rounded w-3/4" />
        <div className="h-4 bg-[#E8E1D7] rounded w-1/2" />
        <div className="flex gap-4 pt-2">
          <div className="h-4 bg-[#E8E1D7] rounded w-16" />
          <div className="h-4 bg-[#E8E1D7] rounded w-16" />
          <div className="h-4 bg-[#E8E1D7] rounded w-16" />
        </div>
        <div className="h-8 bg-[#E8E1D7] rounded w-24 mt-2" />
      </div>
    </div>
  );
}

export function PropertyDetailSkeleton() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-[#E8E1D7] rounded-2xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-8 bg-[#E8E1D7] rounded w-3/4" />
              <div className="h-4 bg-[#E8E1D7] rounded w-1/2" />
              <div className="h-32 bg-[#E8E1D7] rounded" />
            </div>
            <div>
              <div className="lux-card p-6 space-y-4">
                <div className="h-10 bg-[#E8E1D7] rounded" />
                <div className="h-10 bg-[#E8E1D7] rounded" />
                <div className="h-10 bg-[#E8E1D7] rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ListingSkeleton() {
  return (
    <div className="lux-card p-6 animate-pulse">
      <div className="flex gap-4">
        <div className="w-32 h-24 bg-[#E8E1D7] rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-[#E8E1D7] rounded w-3/4" />
          <div className="h-4 bg-[#E8E1D7] rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-6 bg-[#E8E1D7] rounded w-16" />
            <div className="h-6 bg-[#E8E1D7] rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="lux-card p-6 animate-pulse">
      <div className="h-4 bg-[#E8E1D7] rounded w-24 mb-3" />
      <div className="h-8 bg-[#E8E1D7] rounded w-16" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="lux-card overflow-hidden">
      <div className="p-6 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-16 h-16 bg-[#E8E1D7] rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#E8E1D7] rounded w-3/4" />
              <div className="h-3 bg-[#E8E1D7] rounded w-1/2" />
            </div>
            <div className="h-8 bg-[#E8E1D7] rounded w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="lux-card p-8 animate-pulse space-y-6">
      <div className="h-6 bg-[#E8E1D7] rounded w-1/4" />
      <div className="space-y-4">
        <div>
          <div className="h-4 bg-[#E8E1D7] rounded w-24 mb-2" />
          <div className="h-12 bg-[#E8E1D7] rounded" />
        </div>
        <div>
          <div className="h-4 bg-[#E8E1D7] rounded w-24 mb-2" />
          <div className="h-12 bg-[#E8E1D7] rounded" />
        </div>
        <div>
          <div className="h-4 bg-[#E8E1D7] rounded w-24 mb-2" />
          <div className="h-32 bg-[#E8E1D7] rounded" />
        </div>
      </div>
      <div className="h-12 bg-[#E8E1D7] rounded" />
    </div>
  );
}
