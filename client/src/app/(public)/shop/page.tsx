import type { Metadata } from "next";
import ShopPageClient from "./page-client";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop - NOIR",
  description: "Shop premium phones, audio, wearables and accessories.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageClient />
    </Suspense>
  );
}
