import { Suspense } from "react";
import CartPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart - NOIR",
  description: "Review items in your cart and proceed to secure checkout.",
};

export default function CartPage() {

  return (
    <Suspense fallback={null}>
      <CartPageClient />
    </Suspense>
  );
}
