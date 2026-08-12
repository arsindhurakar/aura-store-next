import z from "zod/v3";

export const urlSchema = z.string().url();

export const paramIdSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+$/, { message: "Invalid ID" }),
});

export const productSlugParamsSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Invalid slug format",
  }),
});
