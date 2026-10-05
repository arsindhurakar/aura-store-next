import { Suspense } from "react";
import SearchPageClient from "./page-client";
import { Metadata } from "next";

import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const metadata: Metadata = {
  title: "Search - NOIR",
  description: "Find premium phones, audio, wearables, and accessories.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchPageClient />
    </Suspense>
  );
}
