import type { Metadata } from "next";
import ShopPageClient from "./page-client";
import { Suspense } from "react";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const metadata: Metadata = {
  title: "Shop - NOIR",
  description: "Discover premium phones, audio, wearables, and accessories.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ShopPageClient />
    </Suspense>
  );
}
