"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import StockInDialog from "@/components/stock/StockInDialog";
import StockInTable from "@/components/stock/StockInTable";

import productService from "@/services/product.service";
import stockService from "@/services/stock.service";

import { Product } from "@/types/product";
import { StockHistory } from "@/types/stock";

export default function StockInPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [records, setRecords] = useState<StockHistory[]>([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  async function fetchData() {
    try {
      setLoading(true);

      const [productsData, historyData] = await Promise.all([
        productService.getProducts(),
        stockService.getStockHistory(),
      ]);

      setProducts(productsData.data);

      setRecords(historyData.filter((record) => record.action === "IN"));
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
          <h1 className="text-3xl font-bold">Stock In</h1>
          <p className="text-muted-foreground">Add stock to your inventory.</p>
        </div>

        <Button onClick={() => setOpenDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="rounded-lg border p-8 text-center">Loading...</div>
      ) : (
        <StockInTable records={records} />
      )}

      {/* Dialog */}
      <StockInDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        products={products}
        onSuccess={fetchData}
      />
    </div>
  );
}
