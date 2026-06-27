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

interface StockInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
  onSuccess: () => Promise<void> | void;
}

export default function StockInDialog({
  open,
  onOpenChange,
  products,
  onSuccess,
}: StockInDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: StockFormData) {
    try {
      setLoading(true);

      await stockService.stockIn({
        productId: Number(data.productId),
        quantity: data.quantity,
        note: data.note || undefined,
      });

      toast.success("Stock added successfully.");

      onOpenChange(false);

      await onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add stock.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Stock In</DialogTitle>
        </DialogHeader>

        <StockForm
          products={products}
          submitLabel="Add Stock"
          loading={loading}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
