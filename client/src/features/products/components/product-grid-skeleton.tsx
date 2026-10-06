import { Skeleton } from "@/components/ui/skeleton";

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              {/* Brand */}
              <Skeleton className="h-3 w-30" />

              {/* Name */}
              <Skeleton className="h-5 w-3/4" />
            </div>

            {/* Price */}
            <Skeleton className="h-5 w-16" />
          </div>

          {/* Status */}
          <Skeleton className="mt-2 h-3 w-20" />
        </div>
      ))}
    </div>
  );
}
