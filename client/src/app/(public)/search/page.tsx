import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - NOIR",
  description: "Search premium phones, audio, wearables and accessories.",
};

export default function Page() {

  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  );
}
