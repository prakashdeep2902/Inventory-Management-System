import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),

  // Always a string (can be empty)
  description: z.string(),

  sku: z.string().min(2, "SKU is required"),

  price: z
    .number({
      error: "Price is required",
    })
    .min(0, "Price must be at least 0"),

  quantity: z
    .number({
      error: "Quantity is required",
    })
    .min(0, "Quantity must be at least 0"),

  isActive: z.boolean(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
