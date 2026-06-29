"use client";

import { useEffect, useState } from "react";
import { Minus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import StockOutDialog from "@/components/stock/StockOutDialog";
import StockOutTable from "@/components/stock/StockOutTable";

import productService from "@/services/product.service";
import stockService from "@/services/stock.service";

import { Product } from "@/types/product";
import { StockHistory } from "@/types/stock";

export default function StockOutPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [records, setRecords] = useState<StockHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);

      const [productsResponse, history] = await Promise.all([
        productService.getProducts(),
        stockService.getStockHistory(),
      ]);

      setProducts(productsResponse.data);

      setRecords(history.filter((record) => record.action === "OUT"));
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load stock data.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Stock Out</h1>
          <p className="text-muted-foreground">
            Remove stock from your inventory.
          </p>
        </div>

        <Button onClick={() => setOpenDialog(true)}>
          <Minus className="mr-2 h-4 w-4" />
          Remove Stock
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-lg border p-8 text-center">Loading...</div>
      ) : (
        <StockOutTable records={records} />
      )}

      {/* Dialog */}
      <StockOutDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        products={products}
        onSuccess={fetchData}
      />
    </div>
  );
}
