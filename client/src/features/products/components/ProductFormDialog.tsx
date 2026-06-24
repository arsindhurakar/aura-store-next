import { FieldLabel } from "@/components/common/FieldLabel";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type ProductFormInput, productFormSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

  const handleSubmit = () => {
    toast.success(
      editing ? "Product updated (mock)" : "Product created (mock)",
    );

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
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <label className="sm:col-span-2">
          <FieldLabel>Name</FieldLabel>

          <input {...form.register("name")} className={input} />
        </label>

        <label>
          <FieldLabel>Brand</FieldLabel>

          <input {...form.register("brand")} className={input} />
        </label>

        <label>
          <FieldLabel>Category</FieldLabel>

          <select {...form.register("category")} className={input}>
            <option value="phones">Mobile Phones</option>
            <option value="audio">Audio</option>
            <option value="wearables">Wearables</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>

        <label>
          <FieldLabel>Price (USD)</FieldLabel>

          <input
            type="number"
            {...form.register("price", {
              valueAsNumber: true,
            })}
            className={input}
          />
        </label>

        <label>
          <FieldLabel>Sale Price (USD)</FieldLabel>

          <input
            type="number"
            {...form.register("salePrice", {
              valueAsNumber: true,
            })}
            className={input}
          />
        </label>

        <label className="sm:col-span-2">
          <FieldLabel>Stock Status</FieldLabel>

          <select {...form.register("stockStatus")} className={input}>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </label>

        <label className="sm:col-span-2">
          <FieldLabel>Description</FieldLabel>

          <textarea
            rows={4}
            {...form.register("description")}
            className={input}
          />
        </label>

        <DialogFooter className="sm:col-span-2">
          <button
            type="button"
            onClick={onDone}
            className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
          >
            Save
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

const input =
  "mt-2 w-full rounded-xl border border-border bg-transparent px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30";
