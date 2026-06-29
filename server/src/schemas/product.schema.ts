import z from "zod/v3";
import { urlSchema } from "./index.js";

export const createProductSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  salePrice: z.coerce.number().positive().optional(),
  description: z.string().trim().min(10, "Description is too short"),
  tagline: z.string().trim().optional(),
  category: z.enum(["phones", "audio", "wearables", "accessories"]),
  brand: z.string().trim().min(2, "Brand is required"),
  stockStatus: z.enum(["in_stock", "low_stock", "out_of_stock"]),
  images: z.array(urlSchema).min(1, "At least one image is required"),
  featured: z.boolean().default(false),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
  });

export type UpdateProductInput = z.infer<typeof updateProductSchema>;
