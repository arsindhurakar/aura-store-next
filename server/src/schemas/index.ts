import z from "zod/v3";

export const urlSchema = z.string().url();

export const paramIdSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+$/, { message: "Invalid ID" }),
});
