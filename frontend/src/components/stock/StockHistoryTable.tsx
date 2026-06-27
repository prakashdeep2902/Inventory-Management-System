"use client";

import { StockHistory } from "@/types/stock";

interface StockHistoryTableProps {
  records: StockHistory[];
}

export default function StockHistoryTable({ records }: StockHistoryTableProps) {
  const getBadgeClass = (action: StockHistory["action"]) => {
    switch (action) {
      case "IN":
        return "bg-green-100 text-green-700";

      case "OUT":
        return "bg-red-100 text-red-700";

      case "ORDER":
        return "bg-blue-100 text-blue-700";

      case "CANCEL":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Action</th>
            <th className="px-4 py-3 text-left">Quantity</th>
            <th className="px-4 py-3 text-left">Note</th>
            <th className="px-4 py-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-6 text-center text-muted-foreground"
              >
                No stock history found.
              </td>
            </tr>
          ) : (
            records.map((record) => (
              <tr key={record.id} className="border-t">
                <td className="px-4 py-3">{record.product.name}</td>

                <td className="px-4 py-3">{record.product.sku}</td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getBadgeClass(
                      record.action,
                    )}`}
                  >
                    {record.action}
                  </span>
                </td>

                <td className="px-4 py-3">{record.quantity}</td>

                <td className="px-4 py-3">{record.note || "-"}</td>

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
