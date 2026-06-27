"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Product } from "@/types/product";
import {
  createProductSchema,
  CreateProductFormData,
} from "@/schemas/product.schema";

interface ProductFormProps {
  defaultValues?: Product;
  loading?: boolean;
  onSubmit: (data: CreateProductFormData) => void | Promise<void>;
}

export default function ProductForm({
  defaultValues,
  loading = false,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      price: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    if (!defaultValues) return;

    reset({
      name: defaultValues.name,
      description: defaultValues.description ?? "",
      sku: defaultValues.sku,
      price: Number(defaultValues.price),
      quantity: defaultValues.quantity,
    });
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product Name */}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Product Name
        </label>

        <Input
          id="name"
          placeholder="Enter product name"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>

        <Textarea
          id="description"
          rows={4}
          placeholder="Enter product description"
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* SKU */}
      <div className="space-y-2">
        <label htmlFor="sku" className="text-sm font-medium">
          SKU
        </label>

        <Input id="sku" placeholder="Enter SKU" {...register("sku")} />

        {errors.sku && (
          <p className="text-sm text-red-500">{errors.sku.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Price */}
        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-medium">
            Price
          </label>

          <Input
            id="price"
            type="number"
            step="0.01"
            {...register("price", {
              valueAsNumber: true,
            })}
          />

          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity
          </label>

          <Input
            id="quantity"
            type="number"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />

          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}
