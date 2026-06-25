import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(8, "Please enter your full delivery address"),
  notes: z.string().max(500).optional().or(z.literal("")),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const productFormSchema = z.object({
  name: z.string().min(2, "Please enter the product name"),
  brand: z.string().min(2, "Please enter the brand name"),
  category: z.enum(["phones", "audio", "wearables", "accessories"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
  salePrice: z.coerce
    .number({
      invalid_type_error: "Sale price must be a number",
    })
    .nonnegative("Sale price cannot be negative")
    .optional()
    .or(z.literal(0)),
  stockStatus: z.enum(["in_stock", "low_stock", "out_of_stock"], {
    errorMap: () => ({ message: "Please select stock status" }),
  }),
  description: z.string().min(10, "Please enter a more detailed description"),
});
export type ProductFormInput = z.infer<typeof productFormSchema>;
