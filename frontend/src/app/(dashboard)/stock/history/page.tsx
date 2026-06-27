"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import StockHistoryTable from "@/components/stock/StockHistoryTable";
import stockService from "@/services/stock.service";

import { StockHistory } from "@/types/stock";

export default function StockHistoryPage() {
  const [records, setRecords] = useState<StockHistory[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchHistory() {
    try {
      setLoading(true);

      const history = await stockService.getStockHistory();

      setRecords(history);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load stock history.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Stock History</h1>

        <p className="text-muted-foreground">
          View all inventory transactions.
        </p>
      </div>

      {loading ? (
        <div className="rounded-lg border p-8 text-center">Loading...</div>
      ) : (
        <StockHistoryTable records={records} />
      )}
    </div>
  );
}
