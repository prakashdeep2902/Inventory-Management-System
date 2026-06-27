"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StockForm from "./StockForm";

import stockService from "@/services/stock.service";
import { Product } from "@/types/product";
import { StockFormData } from "@/schemas/stock.schema";

interface StockOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSuccess: () => Promise<void> | void;
}

export default function StockOutDialog({
  open,
  onOpenChange,
  products,
  onSuccess,
}: StockOutDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: StockFormData) {
    try {
      setLoading(true);

      await stockService.stockOut({
        productId: Number(data.productId),
        quantity: data.quantity,
        note: data.note || undefined,
      });

      toast.success("Stock removed successfully.");

      onOpenChange(false);

      await onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to remove stock.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Stock Out</DialogTitle>
        </DialogHeader>

        <StockForm
          products={products}
          loading={loading}
          submitLabel="Remove Stock"
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
