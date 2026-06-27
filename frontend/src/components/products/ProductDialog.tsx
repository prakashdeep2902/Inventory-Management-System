"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";

import productService from "@/services/product.service";
import { Product } from "@/types/product";
import { CreateProductFormData } from "@/schemas/product.schema";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  product?: Product | null;
}

export default function ProductDialog({
  open,
  onOpenChange,
  onSuccess,
  product,
}: ProductDialogProps) {
  const [loading, setLoading] = useState(false);

  const isEdit = !!product;

  const handleSubmit = async (data: CreateProductFormData) => {
    try {
      setLoading(true);

      if (isEdit) {
        await productService.updateProduct(product.id, data);
        toast.success("Product updated successfully.");
      } else {
        await productService.createProduct(data);

        toast.success("Product created successfully.");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>

        <ProductForm
          defaultValues={product ?? undefined}
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
