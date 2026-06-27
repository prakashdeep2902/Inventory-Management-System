"use client";

import { StockHistory } from "@/types/stock";

interface StockInTableProps {
  records: StockHistory[];
}

export default function StockInTable({ records }: StockInTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Remarks</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-6 text-center text-muted-foreground"
              >
                No stock records found.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="px-4 py-3">{record.product.name}</td>

                <td className="px-4 py-3">{record.product.sku}</td>

                <td className="px-4 py-3">{record.quantity}</td>

                <td className="px-4 py-3">{record.remarks || "-"}</td>

                <td className="px-4 py-3">
                  {new Date(record.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
