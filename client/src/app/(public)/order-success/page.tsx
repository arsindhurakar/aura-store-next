import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Check, ArrowRight, Package } from "lucide-react";
import { Metadata } from "next";

type SuccessPageProps = {
  searchParams: Promise<{
    ref?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Order Confirmed - NOIR",
  description: "We’ve received your order and will begin processing it shortly.",
};

export default async function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const { ref } = await searchParams;

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="relative">
        <div className="absolute inset-0 -z-10 rounded-full bg-accent/20 blur-2xl" />

        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-eyebrow mt-8">Order confirmed</div>

      <h1 className="mt-4 font-display text-5xl tracking-tight text-balance md:text-6xl">
        Thank you. Your order is on its way.
      </h1>

      <p className="mt-4 max-w-md text-muted-foreground">
        We&apos;ve received your order and emailed a confirmation. You&apos;ll
        hear from us again when it ships.
      </p>

      {ref && (
        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border-strong px-5 py-3 text-sm">
          <Package className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">Reference</span>
          <span className="font-mono">{ref}</span>
        </div>
      )}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
        >
          Continue shopping
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full border border-border px-6 text-sm font-medium hover:bg-surface"
        >
          Back to home
        </Link>
      </div>
    </Container>
  );
}
