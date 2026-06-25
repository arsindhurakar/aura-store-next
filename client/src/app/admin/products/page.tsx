"use client";

import { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

import { formatPrice, STATUS_LABEL, CATEGORY_LABELS } from "@/lib/constants";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductFormDialog } from "@/features/products/components/ProductFormDialog";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const { data: products } = useProducts();

  const [editing, setEditing] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-eyebrow">Catalogue</div>

          <h1 className="mt-2 font-display text-4xl tracking-tight">
            Products
          </h1>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditing(null)}
            >
              <Plus className="h-4 w-4" />
              New product
            </Button>
          </DialogTrigger>

          <ProductFormDialog editing={editing} onDone={() => setOpen(false)} />
        </Dialog>
      </div>

      <div className="surface-elev overflow-hidden rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4 font-normal">Product</th>

              <th className="hidden px-6 py-4 font-normal md:table-cell">
                Category
              </th>

              <th className="hidden px-6 py-4 font-normal md:table-cell">
                Stock
              </th>

              <th className="px-6 py-4 text-right font-normal">Price</th>

              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {(products ?? []).map((product) => (
              <tr key={product.id} className="transition hover:bg-muted/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="product-frame h-12 w-12 shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">
                        {product.name}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="hidden px-6 py-4 text-sm text-muted-foreground md:table-cell">
                  {CATEGORY_LABELS[product.category]}
                </td>

                <td className="hidden px-6 py-4 text-sm md:table-cell">
                  {STATUS_LABEL[product.stockStatus]}
                </td>

                <td className="px-6 py-4 text-right text-sm">
                  {formatPrice(product.salePrice ?? product.price)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Dialog
                      open={editing === product.id && open}
                      onOpenChange={(isOpen) => {
                        setOpen(isOpen);

                        if (!isOpen) {
                          setEditing(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          onClick={() => {
                            setEditing(product.id);
                            setOpen(true);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition cursor-pointer hover:bg-muted hover:text-foreground"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                      </DialogTrigger>

                      <ProductFormDialog
                        editing={editing}
                        onDone={() => {
                          setOpen(false);
                          setEditing(null);
                        }}
                      />
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this product?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This will remove &quot;{product.name}&quot; from the
                            catalogue. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() =>
                              toast.success("Product deleted (mock)")
                            }
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
