import { Suspense } from "react";
import SearchPageClient from "./page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - NOIR",
  description: "Find premium phones, audio, wearables, and accessories.",
};

export default function SearchPage() {

  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  );
}
