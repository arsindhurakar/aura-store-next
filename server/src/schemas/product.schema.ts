import z from "zod/v3";
import { urlSchema } from "./index.js";

export const createProductSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  price: z.coerce.number().positive(),
  salePrice: z.coerce.number().positive().optional(),
  description: z.string().min(10),
  tagline: z.string().optional(),
  category: z.enum(["phones", "audio", "wearables", "accessories"]),
  brand: z.string().min(2),
  stockStatus: z.enum(["in_stock", "low_stock", "out_of_stock"]),
  images: z.array(urlSchema).min(1),
  featured: z.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
