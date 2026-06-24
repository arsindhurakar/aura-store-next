import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StaticImageData } from "next/image";

import { Product } from "@/features/products/types";

export interface CartLine {
  productId: string;
  name: string;
  slug: string;
  image: StaticImageData;
  unitPrice: number;
  quantity: number;
  color?: string;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, quantity?: number, color?: string) => void;
  remove: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (product, quantity = 1, color) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.productId === product.id && l.color === color,
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.productId === product.id && l.color === color
                  ? { ...l, quantity: l.quantity + quantity }
                  : l,
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                productId: product.id,
                name: product.name,
                slug: product.slug,
                image: product.images[0],
                unitPrice: product.salePrice ?? product.price,
                quantity,
                color,
              },
            ],
          };
        }),
      remove: (productId) =>
        set((state) => ({
          lines: state.lines.filter((l) => l.productId !== productId),
        })),
      updateQty: (productId, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.productId !== productId)
              : state.lines.map((l) =>
                  l.productId === productId ? { ...l, quantity } : l,
                ),
        })),
      clear: () => set({ lines: [] }),
      count: () => get().lines.reduce((s, l) => s + l.quantity, 0),
      subtotal: () =>
        get().lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
    }),
    { name: "noir-cart" },
  ),
);
