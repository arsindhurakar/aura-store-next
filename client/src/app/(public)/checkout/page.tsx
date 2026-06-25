import { Suspense } from "react";
import CheckoutPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - NOIR",
  description: "Review your order and complete your purchase securely.",
};

export default function CheckoutPage() {

  return (
    <Suspense fallback={null}>
      <CheckoutPageClient />
    </Suspense>
  );
}
