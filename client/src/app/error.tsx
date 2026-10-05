"use client"; // Error boundaries must be client components

import { useEffect } from "react";

import { ErrorState } from "@/components/common/ErrorState";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState reset={reset} />;
}
