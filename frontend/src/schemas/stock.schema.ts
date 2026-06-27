import { z } from "zod";

export const stockSchema = z.object({
  productId: z.string().min(1, "Product is required"),

  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .positive("Quantity must be greater than 0"),

  note: z
    .string()
    .max(255, "Remarks cannot exceed 255 characters")
    .optional()
    .or(z.literal("")),
});

export type StockFormData = z.infer<typeof stockSchema>;
