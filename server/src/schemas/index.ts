import z from "zod/v3";

export const urlSchema = z.string().url();
