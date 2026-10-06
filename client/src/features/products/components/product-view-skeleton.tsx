import { Container } from "@/components/layout/Container";

export function ProductViewSkeleton() {
  return (
    <div className="animate-pulse">
      <Container className="py-10">
        <div className="h-4 w-48 rounded bg-muted" />
      </Container>

      <Container className="grid gap-12 pb-20 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery Skeleton */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-2xl bg-muted" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-muted" />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-col">
          {/* Brand */}
          <div className="h-3 w-20 rounded bg-muted" />

          {/* Title */}
          <div className="mt-3 h-10 w-2/3 rounded-lg bg-muted" />

          {/* Tagline */}
          <div className="mt-3 h-6 w-1/2 rounded bg-muted" />

          {/* Price */}
          <div className="mt-8 h-8 w-24 rounded bg-muted" />

          {/* Status */}
          <div className="mt-3 h-6 w-32 rounded-full bg-muted" />

          {/* Description */}
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
          </div>

          {/* Color Selector */}
          <div className="mt-10">
            <div className="h-4 w-16 rounded bg-muted" />
            <div className="mt-3 flex gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 w-10 rounded-full bg-muted" />
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="mt-10 flex items-center gap-3">
            <div className="h-12 w-32 rounded-full bg-muted" />
            <div className="h-12 flex-1 rounded-full bg-muted" />
          </div>

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-2 gap-3">
            <div className="h-16 rounded-xl bg-muted" />
            <div className="h-16 rounded-xl bg-muted" />
          </div>
        </div>
      </Container>
    </div>
  );
}
