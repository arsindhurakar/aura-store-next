import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { FieldError } from "@/components/common/FieldError";
import { FieldLabel } from "@/components/common/FieldLabel";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateProduct,
  useUpdateProduct,
} from "@/features/products/hooks/use-product-mutations";
import { Product } from "@/features/products/types/product.types";
import {
  mapFormToCreateProductDto,
  mapFormToUpdateProductDto,
} from "@/features/products/utils/product.dto.util";
import { productFormSchema, type ProductFormInput } from "@/lib/validators";

type Props = {
  open: boolean;
  mode: "create" | "edit";
  product: Product | null;
  onDone: () => void;
};

const defaultValues: ProductFormInput = {
  name: "",
  brand: "",
  category: "phones",
  price: 0,
  salePrice: 0,
  stockStatus: "in_stock",
  description: "",
};

export function ProductFormDialog({ open, mode, product, onDone }: Props) {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isPending = createProduct.isPending || updateProduct.isPending;

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form]);

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && product) {
      form.reset({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice ?? 0,
        stockStatus: product.stockStatus,
        description: product.description,
      });
    }
  }, [open, mode, product, form]);

  const onSubmit = (data: ProductFormInput) => {
    if (mode === "edit" && product) {
      updateProduct.mutate(
        {
          id: product.id,
          body: mapFormToUpdateProductDto(data),
        },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            onDone();
          },
          onError: (err: Error) => {
            toast.error(err.message);
          },
        },
      );

      return;
    }

    createProduct.mutate(mapFormToCreateProductDto(data), {
      onSuccess: () => {
        toast.success("Product created successfully");
        onDone();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  };

  const handleCancel = () => {
    onDone();
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">
          {mode === "edit" ? "Edit product" : "New product"}
        </DialogTitle>
      </DialogHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <FieldLabel>Name</FieldLabel>
          <Input
            {...form.register("name")}
            className={fieldClass}
            disabled={isPending}
          />
          <FieldError error={form.formState.errors.name?.message} />
        </div>

        <div>
          <FieldLabel>Brand</FieldLabel>
          <Input
            {...form.register("brand")}
            className={fieldClass}
            disabled={isPending}
          />
          <FieldError error={form.formState.errors.brand?.message} />
        </div>

        <div>
          <FieldLabel>Category</FieldLabel>
          <Controller
            control={form.control}
            name="category"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="phones">Mobile Phones</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="wearables">Wearables</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError error={form.formState.errors.category?.message} />
        </div>

        <div>
          <FieldLabel>Price (NPR)</FieldLabel>
          <Input
            type="number"
            {...form.register("price", {
              valueAsNumber: true,
            })}
            className={fieldClass}
            disabled={isPending}
          />

          <FieldError error={form.formState.errors.price?.message} />
        </div>

        <div>
          <FieldLabel>Sale Price (NPR)</FieldLabel>
          <Input
            type="number"
            {...form.register("salePrice", {
              valueAsNumber: true,
            })}
            className={fieldClass}
            disabled={isPending}
          />

          <FieldError error={form.formState.errors.salePrice?.message} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>Stock Status</FieldLabel>

          <Controller
            control={form.control}
            name="stockStatus"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isPending}
              >
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select stock status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="in_stock">In Stock</SelectItem>
                  <SelectItem value="low_stock">Low Stock</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError error={form.formState.errors.stockStatus?.message} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>Description</FieldLabel>

          <textarea
            rows={4}
            {...form.register("description")}
            className={textareaClass}
            disabled={isPending}
          />

          <FieldError error={form.formState.errors.description?.message} />
        </div>

        <DialogFooter className="sm:col-span-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isPending}>
            {mode === "edit" ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

const fieldClass = "mt-2 rounded-xl border-border";

const textareaClass =
  "mt-2 w-full resize-none rounded-xl border border-border bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30";
