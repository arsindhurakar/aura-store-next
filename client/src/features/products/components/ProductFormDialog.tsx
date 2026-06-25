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
  type ProductFormInput,
  productFormSchema,
} from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function ProductFormDialog({
  editing,
  onDone,
}: {
  editing: string | null;
  onDone: () => void;
}) {
  const form = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      category: "phones",
      price: 0,
      salePrice: 0,
      stockStatus: "in_stock",
      description: "",
    },
  });

  const onSubmit = (data: ProductFormInput) => {
    console.log(data);

    toast.success(
      editing ? "Product updated (mock)" : "Product created (mock)",
    );

    form.reset();

    onDone();
  };

  const onCancel = () => {
    form.reset();
    onDone();
  };

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="font-display text-2xl">
          {editing ? "Edit product" : "New product"}
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
          />

          <FieldError
            error={form.formState.errors.name?.message}
          />
        </div>

        <div>
          <FieldLabel>Brand</FieldLabel>

          <Input
            {...form.register("brand")}
            className={fieldClass}
          />

          <FieldError
            error={form.formState.errors.brand?.message}
          />
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
              >
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="phones">
                    Mobile Phones
                  </SelectItem>

                  <SelectItem value="audio">
                    Audio
                  </SelectItem>

                  <SelectItem value="wearables">
                    Wearables
                  </SelectItem>

                  <SelectItem value="accessories">
                    Accessories
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError
            error={form.formState.errors.category?.message}
          />
        </div>

        <div>
          <FieldLabel>Price (USD)</FieldLabel>

          <Input
            type="number"
            {...form.register("price", {
              valueAsNumber: true,
            })}
            className={fieldClass}
          />

          <FieldError
            error={form.formState.errors.price?.message}
          />
        </div>

        <div>
          <FieldLabel>Sale Price (USD)</FieldLabel>

          <Input
            type="number"
            {...form.register("salePrice", {
              valueAsNumber: true,
            })}
            className={fieldClass}
          />

          <FieldError
            error={form.formState.errors.salePrice?.message}
          />
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
              >
                <SelectTrigger className={fieldClass}>
                  <SelectValue placeholder="Select stock status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="in_stock">
                    In Stock
                  </SelectItem>

                  <SelectItem value="low_stock">
                    Low Stock
                  </SelectItem>

                  <SelectItem value="out_of_stock">
                    Out of Stock
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <FieldError
            error={form.formState.errors.stockStatus?.message}
          />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel>Description</FieldLabel>

          <textarea
            rows={4}
            {...form.register("description")}
            className={textareaClass}
          />

          <FieldError
            error={form.formState.errors.description?.message}
          />
        </div>

        <DialogFooter className="sm:col-span-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

const fieldClass =
  "mt-2 rounded-xl border-border";

const textareaClass =
  "mt-2 w-full rounded-xl border border-border bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none";