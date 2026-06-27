"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { stockSchema, StockFormData } from "@/schemas/stock.schema";
import { Product } from "@/types/product";

interface StockFormProps {
  products: Product[];
  defaultValues?: Partial<StockFormData>;
  loading?: boolean;
  submitLabel: string;
  onSubmit: (data: StockFormData) => void | Promise<void>;
}

export default function StockForm({
  products,
  defaultValues,
  loading = false,
  submitLabel,
  onSubmit,
}: StockFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StockFormData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
      note: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    reset({
      productId: "",
      quantity: 1,
      note: "",
      ...defaultValues,
    });
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product */}
      <div className="space-y-2">
        <Label htmlFor="productId">Product</Label>

        <select
          id="productId"
          {...register("productId")}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} ({product.sku})
            </option>
          ))}
        </select>

        {errors.productId && (
          <p className="text-sm text-destructive">{errors.productId.message}</p>
        )}
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <Label htmlFor="quantity">Quantity</Label>

        <Input
          id="quantity"
          type="number"
          min={1}
          {...register("quantity", {
            valueAsNumber: true,
          })}
        />

        {errors.quantity && (
          <p className="text-sm text-destructive">{errors.quantity.message}</p>
        )}
      </div>

      {/* Remarks */}
      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>

        <Textarea id="remarks" rows={4} {...register("note")} />

        {errors.note && (
          <p className="text-sm text-destructive">{errors.note.message}</p>
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
