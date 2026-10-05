import { Suspense } from "react";
import CartPageClient from "./page-client";
import { Metadata } from "next";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const metadata: Metadata = {
  title: "Cart - NOIR",
  description: "Review items in your cart and proceed to secure checkout.",
};

export default function CartPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CartPageClient />
    </Suspense>
  );
}
